/**
 * MapleStory API를 호출하는 함수
 * @param {object} params - API 호출 시 전달할 파라미터
 * @returns {object|boolean} - API 응답 데이터 또는 실패 시 false 반환
 */

export const rediectToAuthCode = () => {
  const baseUrl = process.env.OAUTH_BASE_URL;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.OAUTH_CLIENT_ID,
    redirect_uri: "https://mezzangtest/oauth/callback",
    scope: "maplestory.characterlist,maplestory.starforce",
    state: "random_string_for_csrf_prevention",
  });

  window.location.href = `${baseUrl}?${params.toString()}`;
};
