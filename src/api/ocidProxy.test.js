const {
  createOcidHandler
} = require("../../server/ocid");

// jest.fn(): 실제 통신 대신 호출 내역을 기록하는 가짜 함수를 만듦
// mockResolvedValue(): 성공 응답, mockRejectedValue(): 실패 응답을 미리 지정함
// mockReturnThis(): res.status(400).json(...)처럼 이어서 호출할 수 있게 함
// expect(): 실제 결과가 기대한 값/호출 횟수와 일치하는지 확인함
const run = async (client, query = {
  character_name: "AbC"
}) => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
  const handler = createOcidHandler(client, "https://example.test", () => "test-key");
  // Express 서버를 띄우지 않고 가짜 req/res로 처리 함수만 실행함
  await handler({
    query
  }, res);
  return res;
};

test("조회 성공 시 필요한 OCID만 반환함", async () => {
  // 준비: 넥슨이 OCID와 추가 필드를 반환한 상황을 만듦
  const get = jest.fn().mockResolvedValue({
    status: 200,
    data: {
      ocid: "id",
      other: "omit"
    }
  });

  // 실행: 프록시 처리 함수에 가짜 요청 함수를 넣음
  const res = await run({
    get
  });

  // 확인: 추가 필드를 제외하고 OCID만 전달했으며 닉네임도 올바르게 보냈는지 확인함
  expect(res.json).toHaveBeenCalledWith({
    ocid: "id"
  });
  expect(get.mock.calls[0][1].params).toEqual({
    character_name: "AbC"
  });
});

// 각 행의 상태/name으로 같은 검사를 반복함. 400을 404로 바꾸지 않는지도 확인함
test.each([
  [400, "OPENAPI00003"],
  [400, "OPENAPI00004"],
  [400, "OPENAPI00005"],
  [400, "OPENAPI00009"],
  [400, "OPENAPI00010"],
  [403, "OPENAPI00002"],
  [429, "OPENAPI00007"],
  [500, "OPENAPI00001"],
  [503, "OPENAPI00011"]
])("넥슨 오류의 상태 %s와 name %s를 그대로 전달함", async (status, name) => {
  // 준비: 문서와 같은 error.name/message 형태로 넥슨 오류를 만듦
  const upstreamError = {
    name,
    message: "Nexon error message"
  };
  const get = jest.fn().mockRejectedValue({
    response: {
      status,
      data: {
        error: upstreamError
      }
    },
    config: {
      headers: {
        "x-nxopen-api-key": "do-not-forward"
      }
    }
  });

  // 실행
  const res = await run({
    get
  });

  // 확인: HTTP 상태와 공개 오류 필드만 전달하고 Axios 요청 설정은 제외함
  expect(res.status).toHaveBeenCalledWith(status);
  expect(res.json).toHaveBeenCalledWith({
    error: upstreamError
  });
  expect(JSON.stringify(res.json.mock.calls)).not.toContain("do-not-forward");
});

test("연결 실패 또는 OCID가 없는 성공 응답은 프록시 오류 502로 처리함", async () => {
  // 넥슨의 유효한 오류 응답 자체가 없으므로 프록시에서 안내를 만드는 두 상황임
  for (const get of [jest.fn().mockRejectedValue(new Error("network")), jest.fn().mockResolvedValue({
    status: 200,
    data: {}
  })]) {
    const res = await run({
      get
    });
    expect(res.status).toHaveBeenCalledWith(502);
  }
});

test.each([undefined, "", ["a", "b"]])("잘못된 닉네임 파라미터 %s는 넥슨에 요청하지 않음", async name => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const get = jest.fn();

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  const res = await run({
    get
  }, {
    character_name: name
  });

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(res.status).toHaveBeenCalledWith(400);
  expect(get).not.toHaveBeenCalled();
});

test("오류 본문이 잘못돼도 HTTP 상태는 유지하고 프록시 안내를 제공함", async () => {
  // 준비: 이 테스트에 필요한 입력값과 가짜 응답을 구성함
  const get = jest.fn().mockRejectedValue({
    response: {
      status: 429,
      data: "unexpected body"
    }
  });

  // 실행: 검사할 함수를 호출하고 비동기 결과를 기다림
  const res = await run({
    get
  });

  // 확인: 결과와 상태 또는 요청 횟수가 기대한 조건에 맞는지 검사함
  expect(res.status).toHaveBeenCalledWith(429);
  expect(res.json.mock.calls[0][0].error.name).toBe("OCID_UNAVAILABLE");
});
