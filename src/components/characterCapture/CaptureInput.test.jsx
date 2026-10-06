import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Simulate } from "react-dom/test-utils";
import { CaptureInput } from "./CaptureInput";
import characterCaptureFetch from "../../api/characterCaptureFetch";

let mockPath = "/character-capture";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: mockPath }),
}));
jest.mock("../../api/characterCaptureFetch", () => ({ __esModule: true, default: jest.fn() }));

const deferred = () => {
  let resolve;
  const promise = new Promise(yes => { resolve = yes; });
  return { promise, resolve };
};
const main = name => ({ getCombinedData: { getUnionRanking: { ranking: [{ character_name: name }] } } });
let root, container;
beforeEach(async () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.resetAllMocks();
  mockPath = "/character-capture";
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root.render(<CaptureInput />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
const submit = async name => {
  await act(async () => Simulate.change(container.querySelector('input[type="text"]'), { target: { value: name } }));
  await act(async () => Simulate.submit(container.querySelector("form")));
};
const checkMain = async () => act(async () => Simulate.change(container.querySelector('input[type="checkbox"]')));

test("normal search only navigates; the page owns the result request", async () => {
  await submit("AB");
  expect(mockNavigate).toHaveBeenCalledWith("/character-capture/AB");
  expect(characterCaptureFetch).not.toHaveBeenCalled();
});

test("late main-character search cannot redirect away from the latest search", async () => {
  const a = deferred(), b = deferred();
  characterCaptureFetch.mockReturnValueOnce(a.promise).mockReturnValueOnce(b.promise);
  await checkMain();
  await submit("A");
  await submit("B");
  expect(characterCaptureFetch.mock.calls[0][1].signal.aborted).toBe(true);
  await act(async () => b.resolve(main("MainB")));
  await act(async () => a.resolve(main("MainA")));
  expect(mockNavigate.mock.calls).toEqual([["/character-capture/MainB"]]);
});

test("changing route aborts pending main-character navigation", async () => {
  const request = deferred();
  characterCaptureFetch.mockReturnValue(request.promise);
  await checkMain();
  await submit("A");
  mockPath = "/character-capture/B";
  await act(async () => root.render(<CaptureInput />));
  expect(characterCaptureFetch.mock.calls[0][1].signal.aborted).toBe(true);
  await act(async () => request.resolve(main("MainA")));
  expect(mockNavigate).not.toHaveBeenCalled();
});

test("missing union data keeps the existing fallback to the searched character", async () => {
  characterCaptureFetch.mockResolvedValue({ getCombinedData: {} });
  await checkMain();
  await submit("A");
  expect(container.querySelector('[role="alert"]').textContent).toContain("본캐를 찾지 못했습니다");
  expect(mockNavigate).toHaveBeenCalledWith("/character-capture/A");
});
