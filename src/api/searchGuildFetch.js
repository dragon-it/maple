import { getAllOguildId } from "./api";

const SearchGuildFetch = async (guildName, setResult, setError) => {
  try {
    const response = await getAllOguildId(guildName);

    if (response) {
      setResult(response);
      console.log(response);
    } else {
      setError("길드를 찾을 수 없습니다.");
    }
  } catch (error) {
    setError("API 요청 중 오류가 발생했습니다.");
  }
};

export default SearchGuildFetch;
