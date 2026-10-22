import axios from "axios";
import { resolveCharacterOcid } from "./resolveCharacterOcid";
import { isRequestCanceled, throwIfAborted } from "./requestCancellation";

const fetchPartyProfile = async (key, { signal } = {}) => {
  const { name } = JSON.parse(key);
  const ocid = await resolveCharacterOcid(name, { signal });
  throwIfAborted(signal);
  if (!ocid) throw new Error("캐릭터를 찾지 못했습니다.");

  try {
    const { data } = await axios.get("/api/character/party-profile", {
      params: { ocid },
      signal,
      timeout: 15000,
    });
    throwIfAborted(signal);
    if (!data?.nickname) throw new Error("캐릭터 정보가 올바르지 않습니다.");
    return data;
  } catch (error) {
    throwIfAborted(signal);
    if (isRequestCanceled(error)) throw error;
    const message = error.response?.data?.error;
    throw new Error(typeof message === "string" ? message : "캐릭터 정보를 불러오지 못했습니다.");
  }
};

const profiles = new Map();
const pendingProfiles = new Map();
const PROFILE_TTL = 5 * 60 * 1000;

// 화면을 다시 펼칠 때 마지막 성공 결과를 즉시 표시함
// 유효 기간이 지난 결과의 갱신 여부는 loadPartyProfile에서 판단함
export const getCachedPartyProfile = name => profiles.get(name)?.data ?? null;

// 여러 보스에 같은 닉네임이 있어도 진행 중인 요청과 최근 성공 결과를 공유함
// 닉네임 저장 배열은 그대로 두고, 조회 결과만 메모리에 보관함
export const loadPartyProfile = async (key, { signal } = {}) => {
  throwIfAborted(signal);
  const { name } = JSON.parse(key);
  const cached = profiles.get(name);
  if (cached && Date.now() - cached.savedAt < PROFILE_TTL) return cached.data;

  let pending = pendingProfiles.get(name);
  if (!pending) {
    // 한 행이 사라져도 다른 행이 공유 중인 요청까지 취소하지 않음
    pending = fetchPartyProfile(JSON.stringify({ name }))
      .then(data => {
        profiles.delete(name);
        profiles.set(name, { data, savedAt: Date.now() });
        if (profiles.size > 100) profiles.delete(profiles.keys().next().value);
        return data;
      })
      .finally(() => pendingProfiles.delete(name));
    pendingProfiles.set(name, pending);
  }
  const result = await pending;
  // 입력이 바뀐 행에서는 이전 결과를 사용하지 않음
  throwIfAborted(signal);
  return result;
};

export const formatCombatPower = value => {
  if (value == null || value === "") return "—";
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0) return "—";
  const hundredMillion = Math.floor(amount / 100000000);
  const tenThousand = Math.floor((amount % 100000000) / 10000);
  if (hundredMillion) return `${hundredMillion}억${tenThousand ? ` ${tenThousand}만` : ""}`;
  return amount >= 10000 ? `${tenThousand}만` : amount.toLocaleString("ko-KR");
};
