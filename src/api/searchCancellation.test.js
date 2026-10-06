import axios from "axios";
import { getOcidApi, getGuildMembers } from "./api";
import UserApi, { loadGuildData } from "./userApi";
import characterCaptureFetch from "./characterCaptureFetch";

beforeEach(() => {
  jest.spyOn(axios, "get");
  jest.spyOn(axios, "post");
});
afterEach(() => jest.restoreAllMocks());

test("GET and POST pass the search signal through to Axios", async () => {
  const controller = new AbortController();
  axios.get.mockResolvedValue({ status: 200, data: { ocid: "A" } });
  axios.post.mockResolvedValue({ status: 200, data: [] });
  await getOcidApi("A", { signal: controller.signal });
  await getGuildMembers([], { signal: controller.signal });
  expect(axios.get.mock.calls[0][1].signal).toBe(controller.signal);
  expect(axios.post.mock.calls[0][2].signal).toBe(controller.signal);
});

test.each([UserApi, characterCaptureFetch])("cancellation stops nickname retries and downstream requests (%#)", async loader => {
  const controller = new AbortController();
  axios.get.mockImplementation(async () => {
    controller.abort();
    throw new axios.CanceledError("cancelled");
  });
  await expect(loader("abc", { signal: controller.signal })).rejects.toMatchObject({ code: "ERR_CANCELED" });
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("an already cancelled search sends no network requests", async () => {
  const controller = new AbortController();
  controller.abort();
  await expect(UserApi("abc", { signal: controller.signal })).rejects.toMatchObject({ code: "ERR_CANCELED" });
  expect(axios.get).not.toHaveBeenCalled();
});

test("a mismatched guild response is rejected before fetching its members", async () => {
  axios.get.mockImplementation(async url => ({ status: 200, data:
    url === "/api/guild/id" ? { oguild_id: "guild-a" } :
    url === "/api/guild/basic" ? { guild_name: "Other", world_name: "Scania", guild_member: [] } : {}
  }));
  await expect(loadGuildData("Expected", "Scania")).rejects.toThrow("식별자");
  expect(axios.post).not.toHaveBeenCalled();
});
