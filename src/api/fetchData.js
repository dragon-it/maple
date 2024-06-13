import { getGuildBasicInformation, getOcidApi, getOguildId } from "./api";
import apiFunctions from "../components/user/ApiFuntion";

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
  if (characterName.trim() !== "") {
    try {
      setLoading(true);
      const ocid = await getOcid(characterName);
      if (ocid) {
        const results = await Promise.all(
          apiFunctions.map(({ function: apiFunction }) => apiFunction(ocid))
        );

        const resultObject = Object.fromEntries(
          apiFunctions.map(({ name }, index) => [name, results[index]])
        );

        if (!resultObject.getBasicInformation) {
          throw new Error("기본 정보가 없습니다.");
        }

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
        setError("OCID 가져오기 오류.");
      }
    } catch (error) {
      setError(`검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
};

export default fetchData;
