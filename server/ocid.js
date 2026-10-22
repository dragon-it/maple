// 요청 함수와 서버 설정을 받아 Express에서 사용할 처리 함수를 생성함
// 테스트에서는 client에 가짜 요청 함수를 넣어 실제 넥슨 API 호출을 피함
function createOcidHandler(client, baseUrl, getApiKey) {
  return async function handleOcidRequest(req, res) {
    const characterName = req.query.character_name;

    // 빈 이름이나 배열 형태의 파라미터는 넥슨에 요청하기 전에 차단함
    if (typeof characterName !== "string" || !characterName.trim()) {
      return res.status(400).json({
        error: {
          name: "INVALID_NAME",
          message: "닉네임을 입력해주세요.",
        },
      });
    }

    try {
      // 키는 서버에서만 읽고 닉네임은 쿼리 파라미터로 전달함
      const response = await client.get(`${baseUrl}/maplestory/v1/id`, {
        params: { character_name: characterName },
        headers: { "x-nxopen-api-key": getApiKey() },
      });

      const ocid = response.data?.ocid;

      // 성공 상태여도 OCID가 없으면 사용할 수 없는 응답으로 처리함
      // 502는 넥슨 오류 변환이 아니라 프록시가 비정상 응답을 받은 경우에 사용함
      if (response.status !== 200 || typeof ocid !== "string" || !ocid) {
        return res.status(502).json({
          error: {
            name: "INVALID_RESPONSE",
            message: "캐릭터 조회 응답이 올바르지 않습니다.",
          },
        });
      }

      return res.json({ ocid });
    } catch (error) {
      const status = error.response?.status;
      const upstreamError = error.response?.data?.error;

      const hasErrorStatus =
        Number.isInteger(status) && status >= 400 && status <= 599;
      const hasErrorBody =
        typeof upstreamError?.name === "string" &&
        typeof upstreamError?.message === "string";

      // 넥슨 오류의 HTTP 상태와 name/message를 그대로 전달함
      // Axios 오류 전체에는 API 키가 포함될 수 있어 본문 필드만 선택함
      if (hasErrorStatus && hasErrorBody) {
        return res.status(status).json({
          error: {
            name: upstreamError.name,
            message: upstreamError.message,
          },
        });
      }

      // 연결 실패 등 유효한 넥슨 오류 본문이 없는 경우에만 별도 안내를 생성함
      return res.status(hasErrorStatus ? status : 502).json({
        error: {
          name: "OCID_UNAVAILABLE",
          message: "캐릭터 조회 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
        },
      });
    }
  };
}

module.exports = { createOcidHandler };
