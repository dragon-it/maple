import axios from 'axios';

const BASE_URL = 'https://open.api.nexon.com';
const API_KEY = 'test_1f336620ba5ba22af11842fa88ace8762d04e2c0990208617922362a4441232adf9c3d4feeed4aa9b7ea7aa0d04c773b';

// 캐릭터 ocid 호출
const getOcidApi = async (characterName) => {
  try {
    const response = await axios.get(`${BASE_URL}/maplestory/v1/id`, {
      params: {
        'character_name': characterName,
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
    console.error('Error fetching OCID:', error);
    return false;
  }
};

// 캐릭터 기본 정보 호출
// 캐릭터 기본 정보 호출
const getBasicInformation = async (ocid) => {
  try {
    // 어제 날짜 계산
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0];

    const response = await axios.get(`${BASE_URL}/maplestory/v1/character/basic`, {
      params: {
        ocid: ocid,
        date: formattedDate,
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
    console.error('Error fetching basic information:', error);
    return false;
  }
};

export { getOcidApi, getBasicInformation };









export default getOcidApi;




