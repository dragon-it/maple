import { getOcidApi } from "./api.js";
import apiFunctions from "./ApiFuntion.js";

/**
 * 주어진 문자열의 모든 대소문자 조합을 생성하는 함수
 * @param {string} str - 입력 문자열
 * @returns {string[]} - 대소문자 조합 배열
 */
const getAllCaseCombinations = (str) => {
  if (str.length === 0) return [""];
  const firstChar = str[0];
  const rest = getAllCaseCombinations(str.slice(1));
  const combinations = [];
  for (let sub of rest) {
    combinations.push(firstChar.toLowerCase() + sub);
    combinations.push(firstChar.toUpperCase() + sub);
  }
  return combinations;
};

// 캐릭터 OCID 함수
const getOcid = async (characterName) => {
  try {
    const isKorean = /^[가-힣]+$/.test(characterName);
    const combinations = isKorean
      ? [characterName]
      : getAllCaseCombinations(characterName);

    // 1. 입력한 이름 그대로 먼저 시도
    try {
      const ocidData = await getOcidApi(characterName);
      if (ocidData) return ocidData.ocid;
    } catch (error) {
      console.log(
        `Direct search failed for ${characterName}, trying combinations...`
      );
    }

    // 2. 대소문자 조합 시도
    for (let name of combinations) {
      try {
        const ocidData = await getOcidApi(name);
        if (ocidData) return ocidData.ocid;
      } catch (error) {
        continue;
      }
    }
    return null;
  } catch (error) {
    console.error(`getOcid error: ${error.message}`);
    return null;
  }
};

/**
 * 주어진 캐릭터 이름을 사용하여 데이터를 불러오고 결과를 설정하는 함수
 * @param {string} characterName - 캐릭터 이름
 * @param {function} setResult - 결과를 설정하는 함수
 * @param {function} setLoading - 로딩 상태를 설정하는 함수
 * @param {function} setError - 오류 메시지를 설정하는 함수
 */
const fetchData = async (characterName, setResult, setLoading, setError) => {
  if (characterName.trim() !== "") {
    try {
      const isChosung = /^[ㄱ-ㅎ]+$/.test(characterName);
      if (isChosung) throw new Error("초성만으로 검색할 수 없습니다.");

      setLoading(true);
      const ocid = await getOcid(characterName);
      if (!ocid) throw new Error("OCID 가져오기 오류");

      // apiFunctions를 사용하여 모든 API 호출 실행 (길드 관련 호출 제외)
      const apiPromises = apiFunctions
        .filter(
          ({ name }) =>
            ![
              "getGuildBasicInformation",
              "getGuildMembers",
              "getGuildRanking",
            ].includes(name)
        )
        .map(({ function: apiFunction }) => apiFunction(ocid));
      const apiResults = await Promise.all(apiPromises);

      // API 결과를 객체 형태로 변환
      const resultObject = {};
      apiFunctions.forEach(({ name }, index) => {
        if (
          ![
            "getGuildBasicInformation",
            "getGuildMembers",
            "getGuildRanking",
          ].includes(name)
        ) {
          resultObject[name] = apiResults[index];
        }
      });

      setResult(resultObject);
    } catch (error) {
      console.error(`fetchData error: ${error.message}`);
      setError(`검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
};

export default fetchData;
