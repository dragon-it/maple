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

// 날짜 함수
const getFormattedDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
};

// Ocid 함수
const getOcidApi = async (characterName) => {
  return callMapleStoryAPI("id", { character_name: characterName });
};

// 캐릭터 기본 정보 함수
const getBasicInformation = async (ocid) => {
  return callMapleStoryAPI("character/basic", {
    ocid,
  });
};

// 캐릭터 스탯 함수
const getCharacterStat = async (ocid) => {
  return callMapleStoryAPI("character/stat", {
    ocid,
  });
};

// 캐릭터 인기도 함수
const getCharacterPopularity = async (ocid) => {
  return callMapleStoryAPI("character/popularity", {
    ocid,
  });
};

// 하이퍼 스탯 함수
const getHyperStat = async (ocid) => {
  return callMapleStoryAPI("character/hyper-stat", {
    ocid,
  });
};

// 성향 함수
const getPropensity = async (ocid) => {
  return callMapleStoryAPI("character/propensity", {
    ocid,
  });
};

// 어빌리티 함수
const getAbility = async (ocid) => {
  return callMapleStoryAPI("character/ability", {
    ocid,
  });
};

// 장비 아이템 함수
const getItemEquipment = async (ocid) => {
  return callMapleStoryAPI("character/item-equipment", {
    ocid,
  });
};

// 캐시 아이템 함수
const getCashItemEquipment = async (ocid) => {
  return callMapleStoryAPI("character/cashitem-equipment", {
    ocid,
  });
};

// 장착 심볼 함수
const getSymbolEquipment = async (ocid) => {
  return callMapleStoryAPI("character/symbol-equipment", {
    ocid,
  });
};

// 장비 세트 효과 함수
const getSetEffect = async (ocid) => {
  return callMapleStoryAPI("character/set-effect", {
    ocid,
  });
};

// 헤어, 성형, 피부 함수
const getBeautyEquipment = async (ocid) => {
  return callMapleStoryAPI("character/beauty-equipment", {
    ocid,
  });
};

// 안드로이드 함수
const getAndroidEquipment = async (ocid) => {
  return callMapleStoryAPI("character/android-equipment", {
    ocid,
  });
};

// 펫, 펫스킬, 펫장비 함수
const getPetEquipment = async (ocid) => {
  return callMapleStoryAPI("character/pet-equipment", {
    ocid,
  });
};

// 스킬 함수
const getSkill = async (ocid) => {
  // character_skill_grade 값으로 5를 사용한 API 호출
  const resultForGrade5 = await callMapleStoryAPI("character/skill", {
    ocid,
    character_skill_grade: 5,
  });

  // character_skill_grade 값으로 6을 사용한 API 호출
  const resultForGrade6 = await callMapleStoryAPI("character/skill", {
    ocid,
    character_skill_grade: 6,
  });

  // 두 결과를 병합한 뒤 반환
  return {
    grade5: resultForGrade5,
    grade6: resultForGrade6,
  };
};

// 링크 스킬 함수
const getLinkSkill = async (ocid) => {
  return callMapleStoryAPI("character/link-skill", {
    ocid,
  });
};

// 6차 스킬 함수
const getHexaMatrix = async (ocid) => {
  return callMapleStoryAPI("character/hexamatrix", {
    ocid,
  });
};

// 6차 스탯 함수
const getHexaMatrixStat = async (ocid) => {
  return callMapleStoryAPI("character/hexamatrix-stat", {
    ocid,
  });
};

// 무릉 도장 기록 함수
const getDojang = async (ocid) => {
  return callMapleStoryAPI("character/dojang", {
    ocid,
    date: getFormattedDate(),
  });
};

// 유니온 함수
const getUnion = async (ocid) => {
  return callMapleStoryAPI("user/union", {
    ocid,
  });
};

// 유니온 아티팩트 함수
const getUnionArtiFact = async (ocid) => {
  return callMapleStoryAPI("user/union-artifact", {
    ocid,
  });
};

// 유니온 레이더 함수
const getUnionRaider = async (ocid) => {
  return callMapleStoryAPI("user/union-raider", {
    ocid,
  });
};

// 길드 OguildId 취득 함수
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
    date: getFormattedDate(),
  });
};

export {
  callMapleStoryAPI,
  getFormattedDate,
  getOcidApi,
  getBasicInformation,
  getCharacterStat,
  getCharacterPopularity,
  getHyperStat,
  getPropensity,
  getAbility,
  getItemEquipment,
  getCashItemEquipment,
  getSymbolEquipment,
  getSetEffect,
  getBeautyEquipment,
  getAndroidEquipment,
  getPetEquipment,
  getSkill,
  getLinkSkill,
  getHexaMatrix,
  getHexaMatrixStat,
  getDojang,
  getUnionArtiFact,
  getUnion,
  getUnionRaider,
  getOguildId,
  getGuildBasicInformation,
};
