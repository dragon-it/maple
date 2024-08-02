import axios from "axios";

/**
 * MapleStory API를 호출하는 함수
 * @param {string} endpoint - API의 엔드포인트
 * @param {object} params - API 호출 시 전달할 파라미터
 * @returns {object|boolean} - API 응답 데이터 또는 실패 시 false 반환
 */
const callMapleStoryAPI = async (endpoint, params) => {
  try {
    const response = await axios.post(`/api/${endpoint}`, params);
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

const getTodayFormatted = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getFormattedDate = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (hour < 8 || (hour === 8 && minutes < 30)) {
    return getYesterDayFormatted();
  } else {
    return getTodayFormatted();
  }
};

// Ocid 함수
const getOcidApi = async (characterName) => {
  return callMapleStoryAPI("ocid", { character_name: characterName });
};

// 길드 id
const getOguildId = async (guildName, worldName) => {
  console.log(
    `getOguildId called with guildName: ${guildName}, worldName: ${worldName}`
  );
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

// Combined API 호출 함수
const getCombinedData = async (ocid) => {
  try {
    const response = await axios.post(`/api/character/information`, { ocid });

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
const getGuildRanking = async (ocid, guildName, worldName) => {
  // 주간 명성치 랭킹
  const resultFameRanking = await callMapleStoryAPI("ranking/guild", {
    ocid,
    date: getFormattedDate(),
    ranking_type: 0,
    guild_name: guildName,
    world_name: worldName,
  });
  // 플래그 랭킹
  const resultFlagRanking = await callMapleStoryAPI("ranking/guild", {
    ocid,
    date: getFormattedDate(),
    ranking_type: 1,
    guild_name: guildName,
    world_name: worldName,
  });
  // 수로 랭킹
  const resultSuroRanking = await callMapleStoryAPI("ranking/guild", {
    ocid,
    date: getFormattedDate(),
    ranking_type: 2,
    guild_name: guildName,
    world_name: worldName,
  });

  return {
    FameRanking: resultFameRanking,
    FlagRanking: resultFlagRanking,
    SuroRanking: resultSuroRanking,
  };
};

export {
  callMapleStoryAPI,
  getYesterDayFormatted,
  getOcidApi,
  getOguildId,
  getGuildBasicInformation,
  getGuildRanking,
  getCombinedData,
};
