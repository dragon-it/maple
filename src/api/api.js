import axios from "axios";

const BASE_URL = "https://open.api.nexon.com";

/**
 * MapleStory API를 호출하는 함수
 * @param {string} endpoint - API의 엔드포인트
 * @param {object} params - API 호출 시 전달할 파라미터
 * @returns {object|boolean} - API 응답 데이터 또는 실패 시 false 반환
 */

const callMapleStoryAPI = async (endpoint, params) => {
  try {
    // axios를 사용하여 GET 요청을 보냄.
    const response = await axios.get(`${BASE_URL}/maplestory/v1/${endpoint}`, {
      params: {
        ...params, // 전달받은 파라미터 설정
      },
      headers: {
        "x-nxopen-api-key": process.env.REACT_APP_API_KEY, // API 키를 헤더에 포함.
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getYesterDayFormatted = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
};

// Ocid 함수
const getOcidApi = async (characterName) => {
  return callMapleStoryAPI("ocid", { character_name: characterName });
};

// 선데이메이플 공지
const getNotice = async () => {
  try {
    const result = await callMapleStoryAPI("notice-event");
    console.log("Notice data received:", result);
    return result;
  } catch (error) {
    console.error("Error fetching notice data:", error.message);
    throw error;
  }
};

// 선데이메이플 공지 디테일
const getNoticeDetail = async (notice_id) => {
  return callMapleStoryAPI("notice-event/detail", { notice_id });
};

// 길드 id
const getOguildId = async (guildName, worldName) => {
  return callMapleStoryAPI("guild/id", {
    guild_name: guildName,
    world_name: worldName,
  });
};

// 길드 정보 함수
const getGuildBasicInformation = async (oguildId) => {
  return callMapleStoryAPI("guild/basic", { oguild_id: oguildId });
};

// 길드 멤버 정보 함수
const getGuildMembers = async (guildMembers) => {
  return callMapleStoryAPI("guild/members", { guildMembers });
};

// Combined API 호출 함수
const getCombinedData = async (ocid) => {
  return callMapleStoryAPI("character/information", { ocid }); // endpoint 경로 확인
};

// 길드 랭킹 함수
const getGuildRanking = async (guildName, worldName) => {
  return callMapleStoryAPI("ranking/guild", {
    guild_name: guildName,
    world_name: worldName,
  });
};

export {
  callMapleStoryAPI,
  getYesterDayFormatted,
  getOcidApi,
  getOguildId,
  getGuildBasicInformation,
  getGuildRanking,
  getCombinedData,
  getGuildMembers,
  getNotice,
  getNoticeDetail,
};
