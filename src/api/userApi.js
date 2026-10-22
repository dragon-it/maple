import { isRequestCanceled, throwIfAborted } from "./requestCancellation";
import {
  getGuildBasicInformation,
  getGuildRanking,
  getOguildId,
  getGuildMembers,
} from "./api";
import apiFunctions from "./ApiFuntion";
import { resolveCharacterOcid } from "./resolveCharacterOcid";

const UserApi = async (characterName, { signal } = {}) => {
  throwIfAborted(signal);
  // 입력 검증, 이름 후보 생성, 요청 공유와 취소를 공통 조회에 맡김
  const ocid = await resolveCharacterOcid(characterName, { signal });
  throwIfAborted(signal);

  // 서비스 장애는 위에서 예외로 전달됨. 모든 후보를 조회한 뒤 못 찾은 경우만 안내함
  if (!ocid) {
    throw new Error("캐릭터를 찾지 못했습니다.");
  }

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
