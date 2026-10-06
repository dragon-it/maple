import { isRequestCanceled, throwIfAborted } from "./requestCancellation";
import {
  getGuildBasicInformation,
  getGuildRanking,
  getOcidApi,
  getOguildId,
  getGuildMembers,
} from "./api";
import apiFunctions from "./ApiFuntion";

// 캐릭터 대소문자 조합 생성 함수 (최대 개수 제한으로 성능 최적화)
const getLimitedCaseCombinations = (str, limit = 20) => {
  let combinations = [""];
  for (let char of str) {
    const nextCombinations = [];
    const lower = char.toLowerCase();
    const upper = char.toUpperCase();

    for (let combo of combinations) {
      nextCombinations.push(combo + lower);
      if (lower !== upper && nextCombinations.length < limit) {
        nextCombinations.push(combo + upper);
      }
      if (nextCombinations.length >= limit) {
        break;
      }
    }
    combinations = nextCombinations;
    if (combinations.length >= limit) {
      break;
    }
  }
  return combinations;
};

// 캐릭터 OCID 함수
const getOcid = async (characterName, signal) => {
  throwIfAborted(signal);
  try {
    const isKorean = /^[가-힣]+$/.test(characterName); // 한글인지 확인
    const combinations = isKorean
      ? [characterName]
      : getLimitedCaseCombinations(characterName, 20); // 한글이면 조합 생성 생략

    // 조합에서 최대 20개까지만 시도하도록 제한 (이미 함수에서 제한됨)
    const limitedCombinations = combinations;

    // 1. 입력한 이름 그대로 먼저 시도
    try {
      const ocidData = await getOcidApi(characterName, { signal }); // OCID API 호출
      throwIfAborted(signal);
      if (ocidData) {
        return ocidData.ocid; // OCID 반환
      }
    } catch (error) {
      throwIfAborted(signal);
      if (isRequestCanceled(error)) throw error;
      console.log(
        `Direct search failed for ${characterName}, trying combinations...`,
      );
    }

    // 2. 제한된 대소문자 조합 시도 (10개까지만)
    for (let name of limitedCombinations) {
      try {
        const ocidData = await getOcidApi(name, { signal }); // OCID API 호출
        throwIfAborted(signal);
        if (ocidData) {
          return ocidData.ocid; // OCID 반환
        }
      } catch (error) {
        throwIfAborted(signal);
        if (isRequestCanceled(error)) throw error;
        console.log(`Failed for ${name}: ${error.message}`);
        continue; // 오류 발생 시 다음 조합으로 넘어감
      }
    }

    return null; // 모든 조합을 시도한 후에도 OCID를 찾지 못한 경우 null 반환
  } catch (error) {
    throwIfAborted(signal);
    if (isRequestCanceled(error)) throw error;
    console.error(`getOcid error: ${error.message}`);
    return null; // 예기치 않은 오류 발생 시 null 반환
  }
};

const UserApi = async (characterName, { signal } = {}) => {
  throwIfAborted(signal);
  if (!characterName.trim()) throw new Error("닉네임을 입력해주세요.");
  if (/^[ㄱ-ㅎ]+$/.test(characterName)) {
    throw new Error("초성만으로 검색할 수 없습니다.");
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(characterName)) {
    throw new Error("특수문자가 포함된 닉네임은 검색할 수 없습니다.");
  }

  const ocid = await getOcid(characterName, signal);
  throwIfAborted(signal);
  if (!ocid) throw new Error("OCID 가져오기 오류");

  const apiResults = await Promise.all(
    apiFunctions.map(({ function: apiFunction }) =>
      apiFunction(ocid, { signal }),
    ),
  );
  throwIfAborted(signal);
  const result = Object.fromEntries(
    apiFunctions.map(({ name }, index) => [name, apiResults[index]]),
  );
  if (!result.getCombinedData?.getBasicInformation) {
    throw new Error("기본 정보가 없습니다.");
  }
  return { ocid, result };
};

// 호출자의 화면 상태를 변경하지 않고 해당 길드의 데이터만 반환
export const loadGuildData = async (guildName, worldName, { signal } = {}) => {
  throwIfAborted(signal);
  if (!guildName || !worldName) return null;
  const [oguildId, guildRankInformation] = await Promise.all([
    getOguildId(guildName, worldName, { signal }),
    getGuildRanking(guildName, worldName, { signal }),
  ]);
  throwIfAborted(signal);
  if (!oguildId?.oguild_id) throw new Error("길드를 찾을 수 없습니다.");
  const guildBasicInformation = await getGuildBasicInformation(
    oguildId.oguild_id,
    { signal },
  );
  throwIfAborted(signal);
  if (!guildBasicInformation) throw new Error("길드 기본 정보가 없습니다.");
  if (
    guildBasicInformation.guild_name !== guildName ||
    guildBasicInformation.world_name !== worldName
  ) {
    throw new Error("요청한 길드와 응답의 식별자가 다릅니다.");
  }
  const guildMembers = guildBasicInformation.guild_member || [];
  let members;
  try {
    members = await getGuildMembers(guildMembers, { signal });
    throwIfAborted(signal);
  } catch (error) {
    throwIfAborted(signal);
    if (isRequestCanceled(error)) throw error;
  }
  const guildMembersData = guildMembers.map((name, index) => {
    const member = Array.isArray(members) ? members[index] : null;
    return member && Object.keys(member).length
      ? member
      : {
          character_name: name,
          character_level: null,
          character_image: null,
        };
  });
  return { guildBasicInformation, guildRankInformation, guildMembersData };
};

export default UserApi;
