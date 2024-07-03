import { getGuildBasicInformation, getOcidApi, getOguildId } from "./api";
import apiFunctions from "../components/user/ApiFuntion";

/**
 * 주어진 문자열의 모든 대소문자 조합을 생성하는 함수
 * @param {string} str - 입력 문자열
 * @returns {string[]} - 대소문자 조합 배열
 */

// 주어진 문자열의 모든 대소문자 조합 생성 함수
const getAllCaseCombinations = (str) => {
  if (str.length === 0) return [""]; // 문자열이 빈 경우, 빈 문자열 배열 반환

  const firstChar = str[0]; // 문자열의 첫 번째 문자
  const rest = getAllCaseCombinations(str.slice(1)); // 첫 번째 문자를 제외한 나머지 문자열의 조합을 재귀적으로 계산

  const combinations = []; // 조합을 저장할 배열
  for (let sub of rest) {
    // 나머지 문자열의 조합을 순회
    combinations.push(firstChar.toLowerCase() + sub); // 첫 번째 문자를 소문자로 결합한 조합 추가
    combinations.push(firstChar.toUpperCase() + sub); // 첫 번째 문자를 대문자로 결합한 조합 추가
  }
  return combinations; // 모든 조합을 반환
};

// 캐릭터 OCID 함수
const getOcid = async (characterName) => {
  try {
    const isKorean = /^[가-힣]+$/.test(characterName); // 한글인지 확인
    const combinations = isKorean
      ? [characterName]
      : getAllCaseCombinations(characterName); // 한글이면 조합 생성 생략
    for (let name of combinations) {
      // 각 조합을 순회
      try {
        const ocidData = await getOcidApi(name); // OCID API 호출
        if (ocidData) {
          // OCID 데이터를 성공적으로 받은 경우
          return ocidData.ocid; // OCID 반환
        }
      } catch (error) {
        continue; // 오류 발생 시 다음 조합으로 넘어감
      }
    }
    return null; // 모든 조합을 시도한 후에도 OCID를 찾지 못한 경우 null 반환
  } catch (error) {
    return null; // 예기치 않은 오류 발생 시 null 반환
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
    // 캐릭터 이름이 비어있지 않은 경우
    try {
      // 초성만으로 구성된 문자열인지 확인하는 정규 표현식
      const isChosung = /^[ㄱ-ㅎ]+$/.test(characterName);
      if (isChosung) {
        throw new Error("초성만으로 검색할 수 없습니다.");
      }

      setLoading(true); // 로딩 상태를 true로 설정
      const ocid = await getOcid(characterName); // OCID를 가져옴
      if (ocid) {
        const results = await Promise.all(
          apiFunctions.map(({ function: apiFunction }) => apiFunction(ocid))
        );

        const resultObject = Object.fromEntries(
          apiFunctions.map(({ name }, index) => [name, results[index]])
        );

        if (!resultObject.getBasicInformation) {
          throw new Error("기본 정보가 없습니다."); // 기본 정보가 없는 경우 오류 발생
        }
        // 객체 구조 분해 할당
        // character_guild_name = resultObject.getBasicInformation.character_guild_name
        // world_name = resultObject.getBasicInformation.world_name
        const { character_guild_name, world_name } =
          resultObject.getBasicInformation;

        // OguildId 가져오기
        const oguildId = await getOguildId(character_guild_name, world_name);

        const guildBasicInformation = await getGuildBasicInformation(
          oguildId.oguild_id
        );

        // 결과 객체에 길드 정보 추가
        resultObject.guildBasicInformation = guildBasicInformation;

        setResult(resultObject);
      } else {
        setError("OCID 가져오기 오류"); // OCID를 가져오지 못한 경우 오류 메시지
      }
    } catch (error) {
      setError(`검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false); // 로딩 상태를 false로 설정
    }
  }
};

export default fetchData;
