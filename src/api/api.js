import axios from "axios";

/**
 * MapleStory API를 호출하는 함수
 * @param {string} endpoint - API의 엔드포인트
 * @param {object} params - API 호출 시 전달할 파라미터
 * @returns {object|boolean} - API 응답 데이터 또는 실패 시 false 반환
 */

const callMapleStoryAPI = async (endpoint, params) => {
  try {
    const response = await axios.get(`/api/${endpoint}`, params);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        `API call to /api/${endpoint} failed with status: ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error(`Error in API call to /api/${endpoint}:`, error.message);
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
  return callMapleStoryAPI("notice-event");
};

// 선데이메이플 공지 디테일
const getNoticeDetail = async (notice_id) => {
  return callMapleStoryAPI("notice-event/detail", {
    notice_id,
  });
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
  return callMapleStoryAPI("guild/basic", {
    oguild_id: oguildId,
  });
};

// 길드 멤버 정보 함수
const getGuildMembers = async (guildMembers) => {
  return callMapleStoryAPI("guild/members", { guildMembers });
};

// Combined API 호출 함수
const getCombinedData = async (ocid) => {
  try {
    const response = await axios.get(`/api/character/information`, { ocid });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch combined data");
      return false;
    }
  } catch (error) {
    console.error("Error fetching combined data:", error);
    return false;
  }
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
