// src/api/ApiFuntion.js
import {
  getCombinedData,
  getGuildBasicInformation,
  getGuildRanking,
  getOcidApi,
  getOguildId,
  getGuildMembers,
} from "./api";

const apiFunctions = [
  { name: "getCombinedData", function: getCombinedData },
  { name: "getGuildBasicInformation", function: getGuildBasicInformation },
  { name: "getGuildRanking", function: getGuildRanking },
  { name: "getOcidApi", function: getOcidApi },
  { name: "getOguildId", function: getOguildId },
  { name: "getGuildMembers", function: getGuildMembers },
];

export default apiFunctions;
