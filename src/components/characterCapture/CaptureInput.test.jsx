// 입력/체크/제출 동작을 가짜 DOM에서 실행하여 API 호출과 페이지 이동을 확인함
// Simulate: 사용자의 입력 이벤트를 재현함. 실제 브라우저 조작 테스트는 아님
// mockNavigate: 페이지를 실제로 이동하지 않고 이동 요청의 목적지를 기록함
// act: 입력 후 React 상태 갱신이 끝날 때까지 기다림
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Simulate } from "react-dom/test-utils";
import { CaptureInput } from "./CaptureInput";
import characterCaptureFetch from "../../api/characterCaptureFetch";
let mockPath = "/character-capture";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: mockPath
  })
}));
jest.mock("../../api/characterCaptureFetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

const deferred = () => {
  let resolve;
  const promise = new Promise(yes => {
    resolve = yes;
  });
  return {
    promise,
    resolve
  };
};
const main = name => ({
  getCombinedData: {
    getUnionRanking: {
      ranking: [{
        character_name: name
      }]
    }
  }
});
let root, container;

beforeEach(async () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.resetAllMocks();
  mockPath = "/character-capture";
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root.render(<CaptureInput />));
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
const submit = async name => {
  await act(async () => Simulate.change(container.querySelector('input[type="text"]'), {
    target: {
      value: name
    }
  }));
  await act(async () => Simulate.submit(container.querySelector("form")));
};
const checkMain = async () => act(async () => Simulate.change(container.querySelector('input[type="checkbox"]')));

test("일반 캡처 검색은 URL만 이동하고 조회는 페이지에 맡김", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  await submit("AB");

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(mockNavigate).toHaveBeenCalledWith("/character-capture/AB");
  expect(characterCaptureFetch).not.toHaveBeenCalled();
});

test("이전 본캐 찾기 응답은 최신 페이지 이동을 덮지 못함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const a = deferred(),
    b = deferred();
  characterCaptureFetch.mockReturnValueOnce(a.promise).mockReturnValueOnce(b.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await checkMain();
  await submit("A");
  await submit("B");

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(characterCaptureFetch.mock.calls[0][1].signal.aborted).toBe(true);
  await act(async () => b.resolve(main("MainB")));
  await act(async () => a.resolve(main("MainA")));
  expect(mockNavigate.mock.calls).toEqual([["/character-capture/MainB"]]);
});

test("다른 경로로 이동하면 대기 중인 본캐 찾기를 취소함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const request = deferred();
  characterCaptureFetch.mockReturnValue(request.promise);

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await checkMain();
  await submit("A");
  mockPath = "/character-capture/B";
  await act(async () => root.render(<CaptureInput />));

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(characterCaptureFetch.mock.calls[0][1].signal.aborted).toBe(true);
  await act(async () => request.resolve(main("MainA")));
  expect(mockNavigate).not.toHaveBeenCalled();
});

test("유니온 정보가 없으면 입력한 캐릭터로 이동함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  characterCaptureFetch.mockResolvedValue({
    getCombinedData: {}
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await checkMain();
  await submit("A");

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(container.querySelector('[role="alert"]').textContent).toContain("본캐를 찾지 못했습니다");
  expect(mockNavigate).toHaveBeenCalledWith("/character-capture/A");
});
