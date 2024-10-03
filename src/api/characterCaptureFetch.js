import { getOcidApi } from "./api";
import apiFunctions from "./ApiFuntion";

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

    // 조합에서 최대 10개까지만 시도하도록 제한
    const limitedCombinations = combinations.slice(0, 20);

    // 1. 입력한 이름 그대로 먼저 시도
    try {
      const ocidData = await getOcidApi(characterName); // OCID API 호출
      if (ocidData) {
        return ocidData.ocid; // OCID 반환
      }
    } catch (error) {
      console.log(
        `Direct search failed for ${characterName}, trying combinations...`
      );
    }

    // 2. 제한된 대소문자 조합 시도 (10개까지만)
    for (let name of limitedCombinations) {
      try {
        const ocidData = await getOcidApi(name); // OCID API 호출
        if (ocidData) {
          return ocidData.ocid; // OCID 반환
        }
      } catch (error) {
        console.log(`Failed for ${name}: ${error.message}`);
        continue; // 오류 발생 시 다음 조합으로 넘어감
      }
    }

    return null; // 모든 조합을 시도한 후에도 OCID를 찾지 못한 경우 null 반환
  } catch (error) {
    console.error(`getOcid error: ${error.message}`);
    return null; // 예기치 않은 오류 발생 시 null 반환
  }
};

const validateCharacterName = (characterName) => {
  if (/[ㄱ-ㅎ]/.test(characterName)) {
    throw new Error("초성이 포함된 닉네임은 검색할 수 없습니다.");
  }
  if (/[!@#$%^&*(),.?":{}|<>]/g.test(characterName)) {
    throw new Error("특수문자가 포함된 닉네임은 검색할 수 없습니다.");
  }
};

const characterCaptureFetch = async (
  characterName,
  setResult = () => {},
  setError = () => {}
) => {
  if (characterName.trim() !== "") {
    try {
      validateCharacterName(characterName);

      const ocid = await getOcid(characterName);
      if (ocid) {
        const apiResults = await Promise.all(
          apiFunctions.map(({ function: apiFunction }) => apiFunction(ocid))
        );

        const resultObject = {};
        apiFunctions.forEach(({ name }, index) => {
          resultObject[name] = apiResults[index];
        });

        if (!resultObject.getCombinedData.getBasicInformation) {
          setError("기본 정보가 없습니다.");
        } else {
          setResult(resultObject);
        }

        return resultObject;
      } else {
        setError(
          "존재하지 않는 캐릭터 명이거나 오랫동안 접속하지 않은 캐릭터입니다.."
        );
      }
    } catch (error) {
      setError(error.message);
    }
  }
};

export default characterCaptureFetch;
