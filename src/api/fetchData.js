import {
  getGuildBasicInformation,
  getGuildRanking,
  getOcidApi,
  getOguildId,
  getGuildMembers,
} from "./api";
import apiFunctions from "./ApiFuntion";

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

const getOcid = async (characterName) => {
  try {
    const isKorean = /^[가-힣]+$/.test(characterName);
    const combinations = isKorean
      ? [characterName]
      : getAllCaseCombinations(characterName);

    try {
      const ocidData = await getOcidApi(characterName);
      if (ocidData) {
        return ocidData.ocid;
      }
    } catch (error) {
      console.log(
        `Direct search failed for ${characterName}, trying combinations...`
      );
    }

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
    console.error(`getOcid error: ${error.message}`);
    return null;
  }
};

const fetchData = async (characterName, setResult, setLoading, setError) => {
  if (characterName.trim() !== "") {
    try {
      const isChosung = /^[ㄱ-ㅎ]+$/.test(characterName);
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
      if (isChosung) {
        throw new Error("초성만으로 검색할 수 없습니다.");
      } else if (specialCharRegex.test(characterName)) {
        throw new Error("특수문자가 포함된 닉네임은 검색할 수 없습니다.");
      }

      setLoading(true);
      const ocid = await getOcid(characterName);
      if (ocid) {
        // 여러 API 호출을 병렬로 처리
        const apiResults = await Promise.all(
          apiFunctions.map(({ function: apiFunction }) => apiFunction(ocid))
        );

        const resultObject = {};
        apiFunctions.forEach(({ name }, index) => {
          resultObject[name] = apiResults[index];
        });

        if (!resultObject.getCombinedData.getBasicInformation) {
          throw new Error("기본 정보가 없습니다.");
        }

        const { character_guild_name, world_name } =
          resultObject.getCombinedData.getBasicInformation;

        // 길드 관련 정보 병렬 처리
        const [oguildId, guildRankInformation] = await Promise.all([
          getOguildId(character_guild_name, world_name),
          getGuildRanking(character_guild_name, world_name),
        ]);

        const guildBasicInformation = await getGuildBasicInformation(
          oguildId.oguild_id
        );

        if (guildBasicInformation) {
          const { guild_member } = guildBasicInformation;

          // 길드 멤버 정보 병렬 처리
          let fetchedMembersData = [];
          try {
            fetchedMembersData = await getGuildMembers(guild_member);
            if (!Array.isArray(fetchedMembersData)) {
              console.error(fetchedMembersData);
              throw new Error("길드 멤버 데이터 형식이 잘못되었습니다.");
            }
          } catch (error) {
            console.error("Failed to fetch members data", error);
            fetchedMembersData = guild_member.map((member) => ({
              character_name: member,
              character_level: null,
              character_image: null,
            }));
          }

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

          resultObject.guildMembersData = fetchedMembersData;
        }

        resultObject.guildBasicInformation = guildBasicInformation;
        resultObject.guildRankInformation = guildRankInformation;

        setResult(resultObject);
      } else {
        setError("OCID 가져오기 오류");
      }
    } catch (error) {
      setError(`검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
};

export default fetchData;
