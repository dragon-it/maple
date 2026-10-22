import { useEffect, useState } from "react";
import { isRequestCanceled } from "../api/requestCancellation";

const initialState = (key) => ({
  key,
  result: null,
  error: null,
  loading: !!key,
});

// loader는 모듈 함수 또는 useCallback으로 참조를 고정해서 전달
export const useLatestQuery = (key, loader) => {
  const [state, setState] = useState(() => initialState(key));

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setState(initialState(key));
    if (key) {
      const load = async () => {
        try {
          const result = await loader(key, { signal });
          if (!signal.aborted) {
            setState({ key, result, error: null, loading: false });
          }
        } catch (error) {
          if (!signal.aborted && !isRequestCanceled(error)) {
            setState({
              key,
              result: null,
              error: error.message,
              loading: false,
            });
          }
        }
      };
      load();
    }
    return () => controller.abort();
  }, [key, loader]);

  // effect 실행 전 렌더에서도 새 URL에 이전 검색 결과를 표시하지 않음
  return state.key === key ? state : initialState(key);
};
