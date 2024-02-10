// api 호출 함수

import { getOcidApi } from './api';
import apiFunctions from '../components/user/ApiFuntion';

const fetchData = async (characterName, setResult, setLoading, setError) => {
  if (characterName.trim() !== '') {
    try {
      setLoading(true);
      const ocidData = await getOcidApi(characterName);
      if (ocidData) {
        console.log('OCID Data:', ocidData.ocid);

        const results = [];
        for (const api of apiFunctions) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const result = await api(ocidData.ocid);
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
