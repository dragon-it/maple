import { throwIfAborted } from "./requestCancellation";
import { resolveCharacterOcid } from "./resolveCharacterOcid";
import characterCaptureApi from "./ApiFuntion";

const characterCaptureFetch = async (characterName, { signal } = {}) => {
  throwIfAborted(signal);
  const ocid = await resolveCharacterOcid(characterName, { signal });
  throwIfAborted(signal);
  if (!ocid) {
    throw new Error("존재하지 않는 캐릭터 명이거나 오랫동안 접속하지 않은 캐릭터입니다.");
  }
  const apiResults = await Promise.all(
    characterCaptureApi.map(({ function: apiFunction }) => apiFunction(ocid, { signal })),
  );
  throwIfAborted(signal);
  const result = Object.fromEntries(
    characterCaptureApi.map(({ name }, index) => [name, apiResults[index]]),
  );
  if (!result.getCombinedData?.getBasicInformation) {
    throw new Error("기본 정보가 없습니다.");
  }
  return result;
};

export default characterCaptureFetch;
