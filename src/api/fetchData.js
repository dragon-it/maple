// fetchData.js

import { getOcidApi } from './api';
import apiFunctions from '../components/user/ApiFuntion';

const getOcid = async (characterName) => {
  try {
    const ocidData = await getOcidApi(characterName);
    if (ocidData) {
      return ocidData.ocid;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting OCID:', error);
    return null;
  }
};

const fetchData = async (characterName, setResult, setLoading, setError) => {
  if (characterName.trim() !== '') {
    try {
      setLoading(true);
      const ocid = await getOcid(characterName);
      if (ocid) {
        console.log('OCID:', ocid);

        const results = [];
        for (const api of apiFunctions) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const result = await api(ocid);
          results.push(result);
        }

        const resultObject = Object.fromEntries(apiFunctions.map((api, index) => [api.name, results[index]]));
        setResult(resultObject);
        console.log(resultObject);
      } else {
        setError('OCID 가져오기 오류.');
      }
    } catch (error) {
      setError(`검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
};

export default fetchData;
