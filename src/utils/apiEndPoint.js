import axios from "axios";

const BASE_URL = "https://open.api.nexon.com";

export const callMapleStoryAPI = async (endpoint, params) => {
  const url = `${BASE_URL}/maplestory/v1/${endpoint}`;
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
      },
      headers: {
        "x-nxopen-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status ${response.status}`);
    }
  } catch (error) {
    console.error(`API call failed for ${endpoint}: ${error.message}`);
    throw error;
  }
};
