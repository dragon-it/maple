// fetchData.js

import { getOcidApi } from './api';
import apiFunctions from '../components/user/ApiFuntion';

const getAllCaseCombinations = (str) => {
  if (str.length === 0) return [''];
  const firstChar = str[0];
  const rest = getAllCaseCombinations(str.slice(1));

  const combinations = [];
  for (let sub of rest) {
    combinations.push(firstChar.toLowerCase() + sub);
    combinations.push(firstChar.toUpperCase() + sub);
  }
  return combinations;
};

const getOcid = async (characterName) => {
  try {
    const combinations = getAllCaseCombinations(characterName);
    for (let name of combinations) {
      try {
        const ocidData = await getOcidApi(name);
        if (ocidData) {
          return ocidData.ocid;
        }
      } catch (error) {
        continue;
      }
    }
    return null;
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
        for (const {function: apiFunction} of apiFunctions) {
          await new Promise((resolve) => setTimeout(resolve, 10)); 
          const result = await apiFunction(ocid); 
          results.push(result);
        }

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
