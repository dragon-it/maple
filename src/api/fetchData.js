import {
  getGuildBasicInformation,
  getGuildRanking,
  getOcidApi,
  getCombinedData,
  getOguildId,
  getGuildMembers,
} from "./api.js";
import apiFunctions from "./ApiFuntion.js";

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
    try {
      const isChosung = /^[ㄱ-ㅎ]+$/.test(characterName);
      if (isChosung) {
        throw new Error("초성만으로 검색할 수 없습니다.");
      }

      setLoading(true);
      const ocid = await getOcid(characterName);
      if (ocid) {
        const apiPromises = apiFunctions.map(({ function: apiFunction }) =>
          apiFunction(ocid)
        );

        const apiResults = await Promise.all(apiPromises);

        const resultObject = {};
        apiFunctions.forEach(({ name }, index) => {
          resultObject[name] = apiResults[index];
        });

        if (!resultObject.getCombinedData.getBasicInformation) {
          throw new Error("기본 정보가 없습니다.");
        }

        const { character_guild_name, world_name } =
          resultObject.getCombinedData.getBasicInformation;

        // 병렬로 실행할 Promise 배열 생성
        const promises = [
          getOguildId(character_guild_name, world_name), // 길드 ID 가져오기
        ];

        let oguildId, guildBasicInformation, guildRankInformation;

        try {
          // 길드 정보와 랭킹 정보도 병렬로 처리
          [oguildId] = await Promise.all(promises);

          // 길드 기본 정보와 랭킹 정보 병렬 호출
          [guildBasicInformation, guildRankInformation] = await Promise.all([
            getGuildBasicInformation(oguildId.oguild_id),
            getGuildRanking(character_guild_name, world_name),
          ]);
        } catch (error) {
          throw new Error("길드 정보 또는 랭킹 정보를 가져오는 중 오류 발생");
        }

        if (guildBasicInformation) {
          const { guild_member } = guildBasicInformation;

          let fetchedMembersData = [];
          try {
            fetchedMembersData = await getGuildMembers(guild_member);

            if (!Array.isArray(fetchedMembersData)) {
              throw new Error("길드 멤버 데이터 형식이 잘못되었습니다.");
            }

            fetchedMembersData = guild_member.map((member, index) => {
              const memberData = fetchedMembersData[index] || {};
              return {
                character_name: member,
                character_level: memberData.character_level || null,
                character_image: memberData.character_image || null,
                character_class: memberData.character_class || null,
              };
            });
          } catch (error) {
            console.error("Failed to fetch members data", error);
            fetchedMembersData = guild_member.map((member) => ({
              character_name: member,
              character_class: null,
              character_level: null,
              character_image: null,
            }));
          }

          resultObject.guildMembersData = fetchedMembersData;
        }

        resultObject.guildBasicInformation = guildBasicInformation;
        resultObject.guildRankInformation = guildRankInformation;

        const combinedData = await getCombinedData(ocid);

        setResult(resultObject);
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
