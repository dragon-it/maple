import axios from 'axios';

const BASE_URL = 'https://open.api.nexon.com';
const API_KEY = 'test_1f336620ba5ba22af11842fa88ace876194988027e7df07e146a23e8cc7636663251b93aabcfaaa7285bca2d2daa3681';

// 일반적인 API 호출 함수
const callMapleStoryAPI = async (endpoint, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/maplestory/v1/${endpoint}`, {
      params: {
        ...params,
      },
      headers: {
        'x-nxopen-api-key': API_KEY,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint} information:`, error);
    return false;
  }
};

// 날짜를 얻는 함수
const getFormattedDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

// 사용 예시
const getOcidApi = async (characterName) => {
  return callMapleStoryAPI('id', { 'character_name': characterName });
};

const getBasicInformation = async (ocid) => {
  return callMapleStoryAPI('character/basic', { ocid, date: getFormattedDate() });
};

const getCharacterStat = async (ocid) => {
  return callMapleStoryAPI('character/stat', { ocid, date: getFormattedDate() });
};

const getCharacterPopularity = async (ocid) => {
  return callMapleStoryAPI('character/popularity', { ocid, date: getFormattedDate() });
};

const getHyperStat = async (ocid) => {
  return callMapleStoryAPI('character/hyper-stat', { ocid, date: getFormattedDate() });
};

const getPropensity = async (ocid) => {
  return callMapleStoryAPI('character/propensity', { ocid, date: getFormattedDate() });
};

const getAbility = async (ocid) => {
  return callMapleStoryAPI('character/ability', { ocid, date: getFormattedDate() });
};

const getItemEquipment = async (ocid) => {
  return callMapleStoryAPI('character/item-equipment', { ocid, date: getFormattedDate() });
};

const getCashItemEquipment = async (ocid) => {
  return callMapleStoryAPI('character/cashitem-equipment', { ocid, date: getFormattedDate() });
};

const getSymbolEquipment = async (ocid) => {
  return callMapleStoryAPI('character/symbol-equipment', { ocid, date: getFormattedDate() });
};

const getSetEffect = async (ocid) => {
  return callMapleStoryAPI('character/set-effect', { ocid, date: getFormattedDate() });
};

const getBeautyEquipment = async (ocid) => {
  return callMapleStoryAPI('character/beauty-equipment', { ocid, date: getFormattedDate() });
};

const getAndroidEquipment = async (ocid) => {
  return callMapleStoryAPI('character/android-equipment', { ocid, date: getFormattedDate() });
};

const getPetEquipment = async (ocid) => {
  return callMapleStoryAPI('character/pet-equipment', { ocid, date: getFormattedDate() });
};

const getSkill = async (ocid) => {
  return callMapleStoryAPI('character/skill', { ocid, date: getFormattedDate() });
};

const getLinkSkill = async (ocid) => {
  return callMapleStoryAPI('character/link-skill', { ocid, date: getFormattedDate() });
};

const getVMatrix = async (ocid) => {
  return callMapleStoryAPI('character/vmatrix', { ocid, date: getFormattedDate() });
};

const getHexaMatrix = async (ocid) => {
  return callMapleStoryAPI('character/hexamatrix', { ocid, date: getFormattedDate() });
};

const getHexaMatrixStat = async (ocid) => {
  return callMapleStoryAPI('character/hexamatrix-stat', { ocid, date: getFormattedDate() });
};

const getDojang = async (ocid) => {
  return callMapleStoryAPI('character/dojang', { ocid, date: getFormattedDate() });
};

export {   
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
  getVMatrix,
  getHexaMatrix,
  getHexaMatrixStat,
  getDojang 
};
