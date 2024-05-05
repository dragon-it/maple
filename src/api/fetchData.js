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
    return null;
  }
};

const fetchData = async (characterName, setResult, setLoading, setError) => {
  if (characterName.trim() !== '') {
    try {
      setLoading(true);
      const ocid = await getOcid(characterName);
      if (ocid) {

        const results = [];
        for (const {function: apiFunction} of apiFunctions) { // 객체 구조 분해 할당을 사용하여 함수를 가져옴
          await new Promise((resolve) => setTimeout(resolve, 50)); 
          const result = await apiFunction(ocid); 
          results.push(result);
        }

        // 객체의 name 속성을 사용하여 결과 객체를 생성합니다.
        const resultObject = Object.fromEntries(apiFunctions.map(({name}, index) => [name, results[index]]));
        setResult(resultObject);
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
