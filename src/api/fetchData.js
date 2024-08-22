import {
  getGuildBasicInformation,
  getGuildRanking,
  getOcidApi,
  getCombinedData,
  getOguildId,
  getGuildMembers,
} from "./api";
import apiFunctions from "./ApiFuntion";

/**
 * 주어진 문자열의 모든 대소문자 조합을 생성하는 함수
 * @param {string} str - 입력 문자열
 * @returns {string[]} - 대소문자 조합 배열
 */
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

    // 2. 대소문자 조합 시도
    for (let name of combinations) {
      try {
        const ocidData = await getOcidApi(name); // OCID API 호출
        if (ocidData) {
          return ocidData.ocid; // OCID 반환
        }
      } catch (error) {
        continue; // 오류 발생 시 다음 조합으로 넘어감
      }
    }

    return null; // 모든 조합을 시도한 후에도 OCID를 찾지 못한 경우 null 반환
  } catch (error) {
    console.error(`getOcid error: ${error.message}`);
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
      // 특수문자 체크 정규식
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
      if (isChosung) {
        throw new Error("초성만으로 검색할 수 없습니다.");
      } else if (specialCharRegex.test(characterName)) {
        throw new Error("특수문자가 포함된 닉네임은 검색할 수 없습니다.");
      }

      setLoading(true);
      const ocid = await getOcid(characterName);
      if (ocid) {
        const apiResults = await Promise.all(
          apiFunctions.map(({ function: apiFunction }) => apiFunction(ocid))
        );
        console.log(apiResults);

        const resultObject = {};
        apiFunctions.forEach(({ name }, index) => {
          resultObject[name] = apiResults[index];
        });

        console.log(resultObject);
        if (!resultObject.getCombinedData.getBasicInformation) {
          throw new Error("기본 정보가 없습니다.");
        }

        const { character_guild_name, world_name } =
          resultObject.getCombinedData.getBasicInformation;

        const oguildId = await getOguildId(character_guild_name, world_name);

        const guildBasicInformation = await getGuildBasicInformation(
          oguildId.oguild_id
        );

        const guildRankInformation = await getGuildRanking(
          character_guild_name,
          world_name
        );

        if (guildBasicInformation) {
          const { guild_member } = guildBasicInformation;

          // 길드 멤버 정보 가져오기
          let fetchedMembersData = [];
          try {
            fetchedMembersData = await getGuildMembers(guild_member);

            if (!Array.isArray(fetchedMembersData)) {
              console.error(fetchedMembersData);
              throw new Error("길드 멤버 데이터 형식이 잘못되었습니다.");
            }
          } catch (error) {
            console.error("Failed to fetch members data", error);
            // 호출 실패한 경우에도 닉네임만 저장
            fetchedMembersData = guild_member.map((member) => ({
              character_name: member,
              character_level: null,
              character_image: null,
            }));
          }

          // 빈 객체로 나오는 멤버 정보 처리
          fetchedMembersData = fetchedMembersData.map((memberData, index) => {
            if (Object.keys(memberData).length === 0) {
              return {
                character_name: guild_member[index],
                character_level: null,
                character_image: null,
              };
            }
            return memberData;
          });

          // 결과 객체에 길드 멤버 정보 추가
          resultObject.guildMembersData = fetchedMembersData;
        }

        // 결과 객체에 길드 정보 추가
        resultObject.guildBasicInformation = guildBasicInformation;
        resultObject.guildRankInformation = guildRankInformation;

        // getCombinedData 호출 및 로그 출력
        const combinedData = await getCombinedData(ocid);
        console.log("getCombinedData response:", combinedData);

        setResult(resultObject);
        console.log(resultObject);
      } else {
        setError("OCID 가져오기 오류");
      }
    } catch (error) {
      console.error(`fetchData error: ${error.message}`);
      setError(`검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
};

export default fetchData;
