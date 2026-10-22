import { getAllOguildId } from "./api";
import { throwIfAborted } from "./requestCancellation";

const SearchGuildFetch = async (guildName, { signal } = {}) => {
  const response = await getAllOguildId(guildName, { signal });
  throwIfAborted(signal);
  if (!response) throw new Error("길드를 찾을 수 없습니다.");
  return response;
};

export default SearchGuildFetch;
