import { useEffect, useState } from "react";
import UserApi, { loadGuildData } from "../api/userApi";
import { isRequestCanceled } from "../api/requestCancellation";

const initialState = (key) => ({
  key,
  ocid: null,
  result: null,
  error: null,
  loading: !!key,
  guildLoading: false,
});

export const useCharacterQuery = (characterName) => {
  const [state, setState] = useState(() => initialState(characterName));

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setState(initialState(characterName));

    const load = async () => {
      try {
        const { ocid, result } = await UserApi(characterName, { signal });
        if (signal.aborted) return;
        const { character_guild_name: guildName, world_name: worldName } =
          result.getCombinedData.getBasicInformation;
        const hasGuild = !!(guildName && worldName);
        setState({
          key: characterName,
          ocid,
          result,
          error: null,
          loading: false,
          guildLoading: hasGuild,
        });
        if (!hasGuild) return;

        try {
          const guild = await loadGuildData(guildName, worldName, { signal });
          if (signal.aborted) return;
          setState((previous) => {
            const basic = previous.result?.getCombinedData?.getBasicInformation;
            if (
              signal.aborted ||
              previous.key !== characterName ||
              previous.ocid !== ocid ||
              basic?.character_guild_name !== guildName ||
              basic?.world_name !== worldName
            )
              return previous;
            return {
              ...previous,
              result: { ...previous.result, ...guild },
              guildLoading: false,
            };
          });
        } catch (error) {
          if (!signal.aborted && !isRequestCanceled(error)) {
            // 길드 실패가 이미 조회된 캐릭터 정보까지 숨기지 않음
            setState((previous) => {
              if (
                signal.aborted ||
                previous.ocid !== ocid ||
                previous.key !== characterName
              )
                return previous;
              return { ...previous, guildLoading: false };
            });
          }
        }
      } catch (error) {
        if (!signal.aborted && !isRequestCanceled(error)) {
          setState({
            ...initialState(characterName),
            loading: false,
            error: `검색 중 오류 발생: ${error.message}`,
          });
        }
      }
    };
    if (characterName) load();
    return () => controller.abort();
  }, [characterName]);

  return state.key === characterName ? state : initialState(characterName);
};
