import axios from "axios";
import { getOcidApi } from "./api";
import { isRequestCanceled, throwIfAborted } from "./requestCancellation";
import {
  getCharacterNameCandidates,
  validateCharacterName,
} from "../utils/characterName";

// 이름별로 현재 진행 중인 조회를 보관함
// 완료 결과는 캐시하지 않으므로 나중에 다시 검색하면 새 요청을 보냄
const pending = new Map();

const lookup = async (name, signal) => {
  // 후보 하나의 결과를 OCID 문자열 / null / 예외로 구분함
  // null은 다음 후보를 시도한다는 내부 약속이며 넥슨 응답값이 아님
  const attempt = async candidate => {
    throwIfAborted(signal);

    try {
      const data = await getOcidApi(candidate, { signal });
      throwIfAborted(signal);

      if (!data?.ocid || typeof data.ocid !== "string") {
        throw new Error("캐릭터 식별자 응답이 올바르지 않습니다.");
      }

      return data.ocid;
    } catch (error) {
      throwIfAborted(signal);
      if (isRequestCanceled(error)) {
        throw error;
      }

      const status = error.response?.status;
      const errorName = error.response?.data?.error?.name;

      // 모든 400을 재시도하면 키 오류나 점검 중에도 후보 요청이 반복됨
      // 이름만 전달하는 id 조회에서 식별자/파라미터 오류일 때만 후보를 시도함
      // 캐릭터 부재를 확정하는 뜻은 아니며 후보 시도 여부는 앱 정책임
      const canTryAnotherName =
        status === 400 &&
        ["OPENAPI00003", "OPENAPI00004"].includes(errorName);

      if (canTryAnotherName) {
        return null;
      }

      // OCID 형식 검사처럼 코드 내부에서 발생한 오류는 기존 설명을 유지함
      if (!error.response && !error.isAxiosError) {
        throw error;
      }

      // 서버 장애, 인증 실패, 호출 제한은 후보 검색으로 재시도하지 않음
      throw new Error(
        error.response?.data?.error?.message ||
          "캐릭터 조회에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  // 원문 조회가 성공하면 후보를 생성하지 않음
  const direct = await attempt(name);
  if (direct) {
    return direct;
  }

  for (const candidate of getCharacterNameCandidates(name)) {
    // 목록에 포함된 원문은 이미 조회했으므로 건너뜀
    if (candidate === name) {
      continue;
    }
    const ocid = await attempt(candidate);
    if (ocid) {
      return ocid;
    }
  }

  return null;
};

export const resolveCharacterOcid = async (value, { signal } = {}) => {
  throwIfAborted(signal);
  const name = validateCharacterName(value);

  // 정리된 이름이 정확히 같은 호출만 공유함. 대소문자가 다르면 별도 조회함
  let entry = pending.get(name);

  if (!entry) {
    const controller = new AbortController();

    entry = {
      // 실제 공유 HTTP 요청을 취소하는 컨트롤러
      controller,

      // 결과를 기다리는 호출자 수
      consumers: 0,

      // 공유 조회의 성공/실패가 확정됐는지 표시함
      settled: false,
    };
    pending.set(name, entry);

    // 호출자 등록을 끝낸 뒤 조회를 시작하도록 다음 마이크로태스크로 넘김
    entry.promise = Promise.resolve()
      .then(() => lookup(name, controller.signal))
      .finally(() => {
        entry.settled = true;

        // 옛 요청이 같은 이름의 새 요청까지 지우지 않도록 객체를 비교함
        if (pending.get(name) === entry) {
          pending.delete(name);
        }
      });
  }
  entry.consumers += 1;

  // 호출자마다 별도 Promise를 반환함. A 취소 시에도 B는 결과를 계속 기다림
  return new Promise((resolve, reject) => {
    let finished = false;

    const finish = (callback, result) => {
      // 취소와 응답이 겹쳐도 호출자 수를 두 번 줄이지 않도록 막음
      if (finished) {
        return;
      }
      finished = true;
      signal?.removeEventListener("abort", cancel);
      entry.consumers -= 1;

      // 아직 조회 중인데 기다리는 사람이 없어지면 실제 요청도 중단함
      if (!entry.settled && entry.consumers === 0) {
        if (pending.get(name) === entry) {
          pending.delete(name);
        }
        entry.controller.abort();
      }

      // resolve이면 성공, reject이면 실패/취소로 해당 호출을 종료함
      callback(result);
    };
    const cancel = () => {
      finish(reject, new axios.CanceledError("Search superseded"));
    };

    // 외부 signal은 개별 호출자용이며 내부 controller는 전체 공유 요청용임
    signal?.addEventListener("abort", cancel, { once: true });

    entry.promise.then(
      value => finish(resolve, value),
      error => finish(reject, error),
    );

    // 이벤트 등록 전에 이미 취소된 경우도 처리함
    if (signal?.aborted) {
      cancel();
    }
  });
};
