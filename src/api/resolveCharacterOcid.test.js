import axios from "axios";
import { resolveCharacterOcid } from "./resolveCharacterOcid";
import { CHARACTER_NAME_MAX_LENGTH, getCharacterNameCandidates, validateCharacterName } from "../utils/characterName";

// 이 파일은 실제 넥슨 API를 호출하지 않고 Axios의 결과를 미리 정해 동작을 검사함
// mockResolvedValue: 성공 결과 지정 / mockRejectedValue: 실패 결과 지정
// ...Once: 다음 한 번의 호출에만 적용 / mock.calls: 호출할 때 전달한 인자 목록
// expect(...).resolves: 성공값 검사 / rejects: 실패 검사 / toHaveBeenCalledTimes: 요청 횟수 검사
// 프록시가 전달하는 실제 넥슨 오류 스키마를 사용함. code가 아니라 name임
const missing = (name = "OPENAPI00004") => ({
  response: {
    status: 400,
    data: {
      error: {
        name,
        message: "Please input valid parameter"
      }
    }
  }
});

// 테스트가 resolve/reject를 직접 호출하기 전까지 응답을 대기시킴
// 실제 타이머 없이 '응답 도착 전에 취소함' 같은 순서를 재현할 때 사용함
const deferred = () => {
  let resolve;
  let reject;
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

// 각 테스트에서 Axios 호출을 감시하고, 끝나면 원래 함수로 돌려놓음
beforeEach(() => jest.spyOn(axios, "get"));

afterEach(() => jest.restoreAllMocks());

test.each([
  "abcdefg", "Ab가1Cd", "a".repeat(CHARACTER_NAME_MAX_LENGTH), "메이플123"
])("후보의 전체 길이를 유지하고 중복과 개수를 제한함: %s", name => {
  // 실행: 입력 이름의 대소문자 후보를 생성함
  const candidates = getCharacterNameCandidates(name);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(candidates[0]).toBe(name);
  expect(candidates.length).toBeLessThanOrEqual(20);
  expect(new Set(candidates).size).toBe(candidates.length);
  for (const candidate of candidates) {
    expect(candidate.length).toBe(name.length);
    expect(candidate.toLowerCase()).toBe(name.toLowerCase());
  }
});

test("한글과 숫자로만 된 이름은 후보를 하나만 만듦", () => {
  // 실행·확인: 함수를 호출하여 기대한 결과인지 검사함
  expect(getCharacterNameCandidates("메이플123")).toEqual(["메이플123"]);
});

test("공백과 한글 표현을 정리하되 대소문자는 유지함", () => {
  // 실행·확인: 함수를 호출하여 기대한 결과인지 검사함
  expect(validateCharacterName(" 가 A b1 \n")).toBe("가Ab1");
  expect(validateCharacterName("a".repeat(15))).toHaveLength(15);
});

test.each(["", "  ", "abcㄱ", "ㅏ", "닉/네임", "a".repeat(16), null])("잘못된 입력은 요청 전에 거부함: %s", async name => {
  // 실행·확인: 함수를 호출하여 기대한 결과인지 검사함
  await expect(resolveCharacterOcid(name)).rejects.toThrow();
  expect(axios.get).not.toHaveBeenCalled();
});

test("원문 조회 성공 시 요청 한 번으로 종료함", async () => {
  // 준비: Axios가 실제 통신 대신 OCID "id"를 반환하도록 설정함
  axios.get.mockResolvedValue({
    data: {
      ocid: "id"
    }
  });

  // 실행: 공백이 포함된 원문을 공통 조회 함수에 전달함
  const ocid = await resolveCharacterOcid(" AbC ");

  // 확인: OCID가 맞고, 후보 조회 없이 한 번만 요청했는지 검사함
  expect(ocid).toBe("id");
  expect(axios.get).toHaveBeenCalledTimes(1);

  // mock.calls[0]은 첫 호출의 인자 배열이며 [1]은 Axios의 두 번째 인자인 설정 객체임
  expect(axios.get.mock.calls[0][1].params.character_name).toBe("AbC");
});

// 같은 HTTP 400이라도 본문의 name에 따라 후보를 시도할지 달라짐
test.each(["OPENAPI00003", "OPENAPI00004"])(
  "식별자/파라미터 오류 %s일 때만 다음 후보를 조회함",
  async (name) => {
    axios.get
      .mockRejectedValueOnce(missing(name))
      .mockResolvedValueOnce({ data: { ocid: "candidate-result" } });

    const ocid = await resolveCharacterOcid("AbC");

    expect(ocid).toBe("candidate-result");
    expect(axios.get).toHaveBeenCalledTimes(2);
  },
);

test.each(["OPENAPI00005", "OPENAPI00006", "OPENAPI00009", "OPENAPI00010"])(
  "HTTP 400이어도 키/경로/데이터 준비/점검 오류 %s는 재시도하지 않음",
  async (name) => {
    axios.get.mockRejectedValue(missing(name));

    await expect(resolveCharacterOcid("AbC")).rejects.toThrow();

    expect(axios.get).toHaveBeenCalledTimes(1);
  },
);

test("프록시가 전달한 넥슨 error.name을 실제 조회 함수가 읽어 후보 검색을 이어감", async () => {
  const { createOcidHandler } = require("../../server/ocid");

  // 프록시에서 넥슨으로 보내는 요청을 가짜로 만듦
  const upstreamClient = {
    get: jest.fn()
      .mockRejectedValueOnce(missing())
      .mockResolvedValueOnce({ status: 200, data: { ocid: "matched" } }),
  };
  const handler = createOcidHandler(upstreamClient, "https://example.test", () => "test-key");

  // 프런트의 Axios 호출을 실제 프록시 처리 함수에 연결함
  // 서버와 프런트가 서로 다른 오류 필드를 사용하는 문제를 잡기 위한 검사임
  axios.get.mockImplementation(async (url, options) => {
    let status = 200;
    let body;
    const response = {
      status(value) {
        status = value;
        return this;
      },
      json(value) {
        body = value;
        return this;
      },
    };

    await handler({ query: options.params }, response);

    // Axios의 기본 동작처럼 HTTP 오류는 예외로 전달함
    if (status >= 400) {
      const error = new Error("Proxy request failed");
      error.response = { status, data: body };
      throw error;
    }

    return { status, data: body };
  });

  const ocid = await resolveCharacterOcid("AbC");

  expect(ocid).toBe("matched");
  expect(upstreamClient.get).toHaveBeenCalledTimes(2);
});

test("이름 조회 오류에만 다음 후보를 시도하고 성공하면 종료함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockRejectedValueOnce(missing()).mockResolvedValue({
    data: {
      ocid: "match"
    }
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(resolveCharacterOcid("AbC")).resolves.toBe("match");
  expect(axios.get.mock.calls.map(call => call[1].params.character_name)).toEqual(["AbC", "abc"]);
});

test("긴 이름도 잘리지 않은 서로 다른 후보 20개까지만 조회함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockRejectedValue(missing());

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(resolveCharacterOcid("abcdefg")).resolves.toBeNull();
  const names = axios.get.mock.calls.map(call => call[1].params.character_name);
  expect(names).toHaveLength(20);
  expect(new Set(names).size).toBe(20);
  expect(names.every(name => name.length === 7)).toBe(true);
});

test.each([400, 403, 404, 429, 500, 503])("후보 재시도 대상이 아닌 HTTP 오류 %s는 즉시 중단함", async status => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockRejectedValue({
    response: {
      status,
      data: {}
    }
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(resolveCharacterOcid("AbC")).rejects.toThrow();
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("연결 실패와 잘못된 응답에는 후보를 재시도하지 않음", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockRejectedValueOnce(new axios.AxiosError("Network Error"));

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await expect(resolveCharacterOcid("AbC")).rejects.toThrow();
  axios.get.mockResolvedValueOnce({
    data: {}
  });
  await expect(resolveCharacterOcid("AbC")).rejects.toThrow("식별자");
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test("같은 이름의 조회를 공유하고 한 호출자의 취소는 다른 호출에 영향을 주지 않음", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const request = deferred();
  const controller = new AbortController();
  axios.get.mockReturnValue(request.promise);
  const a = resolveCharacterOcid(" AbC ", {
    signal: controller.signal
  });
  const canceled = expect(a).rejects.toMatchObject({
    code: "ERR_CANCELED"
  });
  const b = resolveCharacterOcid("AbC");

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  // 공유 조회를 시작하는 마이크로태스크가 실행될 때까지 기다림
  await Promise.resolve();

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(axios.get).toHaveBeenCalledTimes(1);
  controller.abort();
  await canceled;
  expect(axios.get.mock.calls[0][1].signal.aborted).toBe(false);
  request.resolve({
    data: {
      ocid: "shared"
    }
  });
  await expect(b).resolves.toBe("shared");
  axios.get.mockResolvedValue({
    data: {
      ocid: "fresh"
    }
  });
  await expect(resolveCharacterOcid("AbC")).resolves.toBe("fresh");
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test("마지막 호출자가 취소하면 요청을 중단하고 같은 이름을 다시 검색할 수 있음", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const old = deferred();
  const controller = new AbortController();
  axios.get.mockReturnValueOnce(old.promise).mockResolvedValue({
    data: {
      ocid: "new"
    }
  });
  const a = resolveCharacterOcid("AbC", {
    signal: controller.signal
  });
  const canceled = expect(a).rejects.toMatchObject({
    code: "ERR_CANCELED"
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  // 공유 조회를 시작하는 마이크로태스크가 실행될 때까지 기다림
  await Promise.resolve();
  controller.abort();
  await canceled;

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(axios.get.mock.calls[0][1].signal.aborted).toBe(true);
  await expect(resolveCharacterOcid("AbC")).resolves.toBe("new");
  old.resolve({
    data: {
      ocid: "old"
    }
  });
  // 공유 조회를 시작하는 마이크로태스크가 실행될 때까지 기다림
  await Promise.resolve();
});

test("대소문자가 다른 원문은 별도로 조회함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockResolvedValue({
    data: {
      ocid: "id"
    }
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  await Promise.all([resolveCharacterOcid("AbC"), resolveCharacterOcid("abc")]);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test("공유 요청이 실패한 뒤에도 다시 검색할 수 있음", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  axios.get.mockRejectedValueOnce({
    response: {
      status: 503
    }
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  const failures = await Promise.allSettled([resolveCharacterOcid("AbC"), resolveCharacterOcid("AbC")]);

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(failures.every(result => result.status === "rejected")).toBe(true);
  expect(axios.get).toHaveBeenCalledTimes(1);
  axios.get.mockResolvedValueOnce({
    data: {
      ocid: "recovered"
    }
  });
  await expect(resolveCharacterOcid("AbC")).resolves.toBe("recovered");
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test("한 호출자가 취소해도 다른 호출자를 위한 후보 조회는 계속함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const request = deferred();
  const controller = new AbortController();
  axios.get.mockReturnValueOnce(request.promise).mockResolvedValueOnce({
    data: {
      ocid: "alternative"
    }
  });
  const a = resolveCharacterOcid("AbC", {
    signal: controller.signal
  });
  const canceled = expect(a).rejects.toMatchObject({
    code: "ERR_CANCELED"
  });
  const b = resolveCharacterOcid("AbC");

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  // 공유 조회를 시작하는 마이크로태스크가 실행될 때까지 기다림
  await Promise.resolve();
  controller.abort();
  await canceled;
  request.reject(missing());

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  await expect(b).resolves.toBe("alternative");
  expect(axios.get).toHaveBeenCalledTimes(2);
});
