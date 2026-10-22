// 실제 서버에 연결하지 않고 Axios의 성공/취소 결과를 지정하여 취소 전파를 확인함
// spyOn: 호출 내역을 기록함. 각 테스트의 mock 설정으로 실제 통신을 대체함
// test.each: 같은 검사를 UserApi와 characterCaptureFetch에 각각 실행함
// rejects: Promise가 실패했는지 검사함. ERR_CANCELED는 Axios의 취소 오류 코드임
import axios from "axios";
import { getOcidApi, getGuildMembers } from "./api";
import UserApi, { loadGuildData } from "./userApi";
import characterCaptureFetch from "./characterCaptureFetch";

beforeEach(() => {
  jest.spyOn(axios, "get");
  jest.spyOn(axios, "post");
});

afterEach(() => jest.restoreAllMocks());

test("GET과 POST가 취소 신호를 Axios에 전달함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const controller = new AbortController();
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      ocid: "A"
    }
  });
  axios.post.mockResolvedValue({
    status: 200,
    data: []
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await getOcidApi("A", {
    signal: controller.signal
  });
  await getGuildMembers([], {
    signal: controller.signal
  });

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(axios.get.mock.calls[0][1].signal).toBe(controller.signal);
  expect(axios.post.mock.calls[0][2].signal).toBe(controller.signal);
});

test.each([UserApi, characterCaptureFetch])("취소하면 후보 재시도와 후속 요청을 중단함 (%#)", async loader => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const controller = new AbortController();
  axios.get.mockImplementation(async () => {
    controller.abort();
    throw new axios.CanceledError("cancelled");
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(loader("abc", {
    signal: controller.signal
  })).rejects.toMatchObject({
    code: "ERR_CANCELED"
  });
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("이미 취소된 검색은 요청을 보내지 않음", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const controller = new AbortController();
  controller.abort();

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(UserApi("abc", {
    signal: controller.signal
  })).rejects.toMatchObject({
    code: "ERR_CANCELED"
  });
  expect(axios.get).not.toHaveBeenCalled();
});

test("다른 길드의 응답이면 길드원 조회 전에 거부함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockImplementation(async url => ({
    status: 200,
    data: url === "/api/guild/id" ? {
      oguild_id: "guild-a"
    } : url === "/api/guild/basic" ? {
      guild_name: "Other",
      world_name: "Scania",
      guild_member: []
    } : {}
  }));

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(loadGuildData("Expected", "Scania")).rejects.toThrow("식별자");
  expect(axios.post).not.toHaveBeenCalled();
});
