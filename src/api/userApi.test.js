import axios from "axios";
import UserApi from "./userApi";

// UserApi와 공통 조회는 실제 코드를 실행하고 Axios 통신만 가짜로 대체함
// 화면에서 사용하는 진입점이 공통 조회에 연결됐는지 확인하기 위한 테스트임
beforeEach(() => {
  jest.spyOn(axios, "get");
});

afterEach(() => {
  jest.restoreAllMocks();
});

const nameError = {
  response: {
    status: 400,
    data: {
      error: { name: "OPENAPI00004", message: "Please input valid parameter" },
    },
  },
};

const characterData = {
  getBasicInformation: { character_name: "Ab가1" },
};

// OCID 이후 종합 정보와 경험치 이력까지 기존 응답 형태로 연결함
const successfulResponse = (url) => ({
  status: 200,
  data: url === "/api/ocid"
    ? { ocid: "character-id" }
    : url === "/api/character/information"
      ? characterData
      : { history: [] },
});

test("일반 검색도 이름을 정리하고 원문 성공 시 후속 데이터를 반환함", async () => {
  // 준비: 실제 API 대신 경로별 정상 응답을 반환함
  axios.get.mockImplementation(async (url) => successfulResponse(url));
  const controller = new AbortController();

  // 실행: 입력 공백이 포함된 일반 캐릭터 검색을 호출함
  const result = await UserApi(" Ab가1 ", { signal: controller.signal });

  // 확인: 원문 OCID 1회, 종합 정보 1회, 경험치 1회만 요청함
  expect(axios.get).toHaveBeenCalledTimes(3);
  expect(axios.get.mock.calls[0][1].params.character_name).toBe("Ab가1");
  expect(result).toEqual({
    ocid: "character-id",
    result: {
      getCombinedData: characterData,
      getExpHistory: { history: [] },
    },
  });

  // OCID는 공유 요청의 신호를 사용하고 후속 요청에는 호출자 신호를 그대로 전달함
  for (const [, options] of axios.get.mock.calls.slice(1)) {
    expect(options.params.ocid).toBe("character-id");
    expect(options.signal).toBe(controller.signal);
  }
});

test("긴 이름의 후보가 잘리지 않으며 최대 20회만 조회함", async () => {
  axios.get.mockRejectedValue(nameError);

  await expect(UserApi("abcdefg")).rejects.toThrow("캐릭터를 찾지 못했습니다");

  const calls = axios.get.mock.calls;
  const names = calls.map(([, options]) => options.params.character_name);
  expect(names[0]).toBe("abcdefg");
  expect(names).toHaveLength(20);
  expect(new Set(names).size).toBe(20);
  expect(names.every((name) => name.length === 7)).toBe(true);
  expect(calls.every(([url]) => url === "/api/ocid")).toBe(true);
});

test("이름 후보에서 성공하면 그 OCID로 후속 조회를 이어감", async () => {
  axios.get
    .mockRejectedValueOnce(nameError)
    .mockImplementation(async (url) => successfulResponse(url));

  const result = await UserApi("AbC");

  expect(result.ocid).toBe("character-id");
  const names = axios.get.mock.calls
    .filter(([url]) => url === "/api/ocid")
    .map(([, options]) => options.params.character_name);
  expect(names).toEqual(["AbC", "abc"]);
});

test.each([
  [400, "OPENAPI00005"],
  [403, "OPENAPI00002"],
  [429, "OPENAPI00007"],
  [500, "OPENAPI00001"],
])("일반 검색도 서비스 오류 %s/%s에서는 한 번만 요청함", async (status, name) => {
  axios.get.mockRejectedValue({
    response: {
      status,
      data: { error: { name, message: "조회 서비스 오류" } },
    },
  });

  await expect(UserApi("abcdefg")).rejects.toThrow("조회 서비스 오류");

  expect(axios.get).toHaveBeenCalledTimes(1);
});

test.each(["", "abcㄱ", "닉/네임", "a".repeat(16), null])(
  "일반 검색의 잘못된 입력 %s는 요청 전에 거부함",
  async (name) => {
    await expect(UserApi(name)).rejects.toThrow();

    expect(axios.get).not.toHaveBeenCalled();
  },
);

test("일반 검색을 동시에 호출하면 OCID 요청을 공유함", async () => {
  axios.get.mockImplementation(async (url) => successfulResponse(url));

  await Promise.all([UserApi(" AbC "), UserApi("AbC")]);

  const ocidCalls = axios.get.mock.calls.filter(([url]) => url === "/api/ocid");
  expect(ocidCalls).toHaveLength(1);
  // 종합 정보와 경험치는 공유 범위가 아니므로 각 호출에서 조회함
  expect(axios.get).toHaveBeenCalledTimes(5);
});
