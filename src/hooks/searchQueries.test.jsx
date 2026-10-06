import React, { act, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useLatestQuery } from "./useLatestQuery";
import { useCharacterQuery } from "./useCharacterQuery";
import UserApi, { loadGuildData } from "../api/userApi";

jest.mock("../api/userApi", () => ({
  __esModule: true, default: jest.fn(), loadGuildData: jest.fn(),
}));

const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
const character = (name, guild = name + "Guild") => ({
  ocid: name,
  result: { getCombinedData: { getBasicInformation: {
    character_name: name, character_guild_name: guild, world_name: "Scania",
  } } },
});

let root, container, current;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.resetAllMocks();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
function Query({ name, loader }) {
  current = useLatestQuery(name, loader);
  return <div>{JSON.stringify(current)}</div>;
}
function Character({ name }) {
  current = useCharacterQuery(name);
  return <div>{JSON.stringify(current)}</div>;
}
const render = async (element) => act(async () => root.render(element));
const finish = async (request, value, fail = false) => act(async () => {
  if (fail) request.reject(value); else request.resolve(value);
});

test("a late A response cannot overwrite B even when the loader ignores abort", async () => {
  const a = deferred(), b = deferred();
  const loader = jest.fn((name) => name === "A" ? a.promise : b.promise);
  await render(<Query name="A" loader={loader} />);
  const signal = loader.mock.calls[0][1].signal;
  await render(<Query name="B" loader={loader} />);
  expect(signal.aborted).toBe(true);
  await finish(b, "B result");
  await finish(a, "A result");
  expect(current).toMatchObject({ result: "B result", error: null, loading: false });
});

test("an old error cannot stop the current loading state or replace its error", async () => {
  const a = deferred(), b = deferred();
  const loader = name => name === "A" ? a.promise : b.promise;
  await render(<Query name="A" loader={loader} />);
  await render(<Query name="B" loader={loader} />);
  await finish(a, new Error("A failed"), true);
  expect(current).toMatchObject({ result: null, error: null, loading: true });
  await finish(b, new Error("B failed"), true);
  expect(current).toMatchObject({ result: null, error: "B failed", loading: false });
});

test("A to B to A uses the newest request, not just the same search name", async () => {
  const oldA = deferred(), b = deferred(), newA = deferred();
  const loader = jest.fn().mockReturnValueOnce(oldA.promise)
    .mockReturnValueOnce(b.promise).mockReturnValueOnce(newA.promise);
  await render(<Query name="A" loader={loader} />);
  await render(<Query name="B" loader={loader} />);
  await render(<Query name="A" loader={loader} />);
  await finish(newA, "new A");
  await finish(oldA, "old A");
  await finish(b, "B");
  expect(current.result).toBe("new A");
});

test("clearing the route cancels the request and leaves an idle empty state", async () => {
  const request = deferred();
  const loader = jest.fn(() => request.promise);
  await render(<Query name="A" loader={loader} />);
  await render(<Query name={undefined} loader={loader} />);
  await finish(request, "old result");
  expect(current).toMatchObject({ result: null, error: null, loading: false });
  expect(loader).toHaveBeenCalledTimes(1);
});

test("StrictMode cleanup and unmount abort the corresponding requests", async () => {
  const requests = [];
  const loader = jest.fn(() => { const d = deferred(); requests.push(d); return d.promise; });
  await render(<StrictMode><Query name="A" loader={loader} /></StrictMode>);
  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[0][1].signal.aborted).toBe(true);
  await finish(requests[1], "current");
  await finish(requests[0], "obsolete");
  expect(current.result).toBe("current");
  await render(null);
  expect(loader.mock.calls[1][1].signal.aborted).toBe(true);
});

test.each([false, true])("late guild A success/failure (%s) cannot change B or its guild loading", async (fail) => {
  const guildA = deferred(), guildB = deferred();
  UserApi.mockImplementation(async name => character(name));
  loadGuildData.mockImplementation(name => name === "AGuild" ? guildA.promise : guildB.promise);
  await render(<Character name="A" />);
  await render(<Character name="B" />);
  expect(loadGuildData.mock.calls[0][2].signal.aborted).toBe(true);
  await finish(guildA, fail ? new Error("old guild failed") : { guildBasicInformation: { guild_name: "AGuild" } }, fail);
  expect(current.ocid).toBe("B");
  expect(current.guildLoading).toBe(true);
  expect(current.result.guildBasicInformation).toBeUndefined();
  await finish(guildB, { guildBasicInformation: { guild_name: "BGuild" } });
  expect(current.result.guildBasicInformation.guild_name).toBe("BGuild");
  expect(current.guildLoading).toBe(false);
});

test("a late character response cannot start an obsolete guild lookup", async () => {
  const a = deferred(), b = deferred();
  UserApi.mockImplementation(name => name === "A" ? a.promise : b.promise);
  await render(<Character name="A" />);
  await render(<Character name="B" />);
  await finish(b, character("B", ""));
  await finish(a, character("A"));
  expect(current.ocid).toBe("B");
  expect(current.guildLoading).toBe(false);
  expect(loadGuildData).not.toHaveBeenCalled();
});

test("current guild failure preserves character data and ends guild loading", async () => {
  UserApi.mockResolvedValue(character("A"));
  loadGuildData.mockRejectedValue(new Error("guild unavailable"));
  await render(<Character name="A" />);
  expect(current).toMatchObject({ ocid: "A", error: null, loading: false, guildLoading: false });
  expect(current.result.getCombinedData.getBasicInformation.character_name).toBe("A");
});
