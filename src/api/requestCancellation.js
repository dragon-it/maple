import axios from "axios";

export const isRequestCanceled = (error) =>
  axios.isCancel(error) || error?.name === "AbortError";

export const throwIfAborted = (signal) => {
  if (signal?.aborted) throw new axios.CanceledError("Search superseded");
};
