// 실제 서버 대신 가짜 조회 함수를 사용하여 응답 순서를 직접 조절함
// act(): React의 상태 변경과 effect 처리가 끝난 뒤 결과를 검사하도록 기다림
// deferred(): resolve/reject를 호출할 때까지 응답을 대기시키는 테스트 보조 함수임
// current: 테스트 컴포넌트가 마지막 렌더에서 받은 훅 상태를 보관함
import React, { act, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useLatestQuery } from "./useLatestQuery";
import { useCharacterQuery } from "./useCharacterQuery";
import UserApi, { loadGuildData } from "../api/userApi";
jest.mock("../api/userApi", () => ({
  __esModule: true,
  default: jest.fn(),
  loadGuildData: jest.fn()
}));

const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return {
    promise,
    resolve,
    reject
  };
};
const character = (name, guild = name + "Guild") => ({
  ocid: name,
  result: {
    getCombinedData: {
      getBasicInformation: {
        character_name: name,
        character_guild_name: guild,
        world_name: "Scania"
      }
    }
  }
});
let root, container, current;

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.resetAllMocks();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
function Query({
  name,
  loader
}) {
  current = useLatestQuery(name, loader);
  return <div>{JSON.stringify(current)}</div>;
}
function Character({
  name
}) {
  current = useCharacterQuery(name);
  return <div>{JSON.stringify(current)}</div>;
}
const render = async element => act(async () => root.render(element));
const finish = async (request, value, fail = false) => act(async () => {
  if (fail) {
    request.reject(value);
  } else request.resolve(value);
});

test("취소를 무시하는 요청도 늦은 A 응답으로 B 결과를 덮지 못함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const a = deferred(),
    b = deferred();
  const loader = jest.fn(name => name === "A" ? a.promise : b.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Query name="A" loader={loader} />);
  const signal = loader.mock.calls[0][1].signal;
  await render(<Query name="B" loader={loader} />);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(signal.aborted).toBe(true);
  await finish(b, "B result");
  await finish(a, "A result");
  expect(current).toMatchObject({
    result: "B result",
    error: null,
    loading: false
  });
});

test("이전 오류는 현재 검색의 로딩과 오류를 변경하지 못함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const a = deferred(),
    b = deferred();
  const loader = name => name === "A" ? a.promise : b.promise;

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Query name="A" loader={loader} />);
  await render(<Query name="B" loader={loader} />);
  await finish(a, new Error("A failed"), true);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(current).toMatchObject({
    result: null,
    error: null,
    loading: true
  });
  await finish(b, new Error("B failed"), true);
  expect(current).toMatchObject({
    result: null,
    error: "B failed",
    loading: false
  });
});

test("A에서 B를 거쳐 A를 다시 검색하면 마지막 A 요청만 반영함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const oldA = deferred(),
    b = deferred(),
    newA = deferred();
  const loader = jest.fn()
    .mockReturnValueOnce(oldA.promise)
    .mockReturnValueOnce(b.promise)
    .mockReturnValueOnce(newA.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Query name="A" loader={loader} />);
  await render(<Query name="B" loader={loader} />);
  await render(<Query name="A" loader={loader} />);
  await finish(newA, "new A");
  await finish(oldA, "old A");
  await finish(b, "B");

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(current.result).toBe("new A");
});

test("검색어가 없어지면 요청을 취소하고 빈 상태로 대기함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const request = deferred();
  const loader = jest.fn(() => request.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Query name="A" loader={loader} />);
  await render(<Query name={undefined} loader={loader} />);
  await finish(request, "old result");

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(current).toMatchObject({
    result: null,
    error: null,
    loading: false
  });
  expect(loader).toHaveBeenCalledTimes(1);
});

test("StrictMode 재실행과 컴포넌트 해제 시 해당 요청을 취소함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const requests = [];
  const loader = jest.fn(() => {
    const d = deferred();
    requests.push(d);
    return d.promise;
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<StrictMode><Query name="A" loader={loader} /></StrictMode>);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[0][1].signal.aborted).toBe(true);
  await finish(requests[1], "current");
  await finish(requests[0], "obsolete");
  expect(current.result).toBe("current");
  await render(null);
  expect(loader.mock.calls[1][1].signal.aborted).toBe(true);
});

test.each([false, true])("이전 길드 응답의 성공 또는 실패(%s)는 새 캐릭터 상태를 바꾸지 못함", async fail => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const guildA = deferred(),
    guildB = deferred();
  UserApi.mockImplementation(async name => character(name));
  loadGuildData.mockImplementation(name => name === "AGuild" ? guildA.promise : guildB.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Character name="A" />);
  await render(<Character name="B" />);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(loadGuildData.mock.calls[0][2].signal.aborted).toBe(true);
  await finish(guildA, fail ? new Error("old guild failed") : {
    guildBasicInformation: {
      guild_name: "AGuild"
    }
  }, fail);
  expect(current.ocid).toBe("B");
  expect(current.guildLoading).toBe(true);
  expect(current.result.guildBasicInformation).toBeUndefined();
  await finish(guildB, {
    guildBasicInformation: {
      guild_name: "BGuild"
    }
  });
  expect(current.result.guildBasicInformation.guild_name).toBe("BGuild");
  expect(current.guildLoading).toBe(false);
});

test("이전 캐릭터 응답은 불필요한 길드 조회를 시작하지 못함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const a = deferred(),
    b = deferred();
  UserApi.mockImplementation(name => name === "A" ? a.promise : b.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Character name="A" />);
  await render(<Character name="B" />);
  await finish(b, character("B", ""));
  await finish(a, character("A"));

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(current.ocid).toBe("B");
  expect(current.guildLoading).toBe(false);
  expect(loadGuildData).not.toHaveBeenCalled();
});

test("현재 길드 조회만 실패하면 캐릭터 정보는 유지함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  UserApi.mockResolvedValue(character("A"));
  loadGuildData.mockRejectedValue(new Error("guild unavailable"));

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await render(<Character name="A" />);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(current).toMatchObject({
    ocid: "A",
    error: null,
    loading: false,
    guildLoading: false
  });
  expect(current.result.getCombinedData.getBasicInformation.character_name).toBe("A");
});
