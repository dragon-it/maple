const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = "https://open.api.nexon.com";

app.use(express.json());
app.use(cors());

// 빌드된 정적 파일을 서빙하는 미들웨어 설정
app.use(express.static(path.join(__dirname, "build")));

// 모든 요청을 빌드된 index.html로 리다이렉트
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * MapleStory API를 호출하는 함수
 * @param {string} endpoint - API의 엔드포인트
 * @param {object} params - API 호출 시 전달할 파라미터
 * @returns {object|boolean} - API 응답 데이터 또는 실패 시 false 반환
 */

const callMapleStoryAPI = async (endpoint, params) => {
  const url = `${BASE_URL}/maplestory/v1/${endpoint}`;
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
      },
      headers: {
        "x-nxopen-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`API call failed for ${endpoint}: ${error.message}`);
    return false;
  }
};

// 선데이메이플
app.get("/notice-event", async (req, res) => {
  try {
    // callMapleStoryAPI 함수 호출 시 파라미터 없이 호출
    const data = await callMapleStoryAPI("notice-event", {});

    if (!data) {
      return res.status(500).json({ error: "Failed to fetch notice data" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 선데이메이플 디테일
app.get("/notice-event/detail", async (req, res) => {
  const { notice_id } = req.query;

  if (!notice_id) {
    return res.status(400).json({ error: "notice_id is required" });
  }

  try {
    const data = await callMapleStoryAPI("notice-event/detail", {
      notice_id,
    });
    if (!data) {
      return res
        .status(500)
        .json({ error: "Failed to fetch data or notice_id is missing" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 캐릭터 OCID API
app.get("/api/ocid", async (req, res) => {
  const { character_name } = req.query;

  if (!character_name) {
    return res.status(400).json({ error: "character_name is required" });
  }

  try {
    const data = await callMapleStoryAPI("id", { character_name });

    if (!data || !data.ocid) {
      return res
        .status(500)
        .json({ error: "Failed to fetch data or ocid is missing" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 길드 oguildId 취득
app.get("/api/guild/id", async (req, res) => {
  const { guild_name: guildName, world_name: worldName } = req.query;
  if (!guildName || !worldName) {
    return res
      .status(400)
      .json({ error: "guild_name and world_name are required" });
  }
  try {
    const data = await callMapleStoryAPI("guild/id", {
      guild_name: guildName,
      world_name: worldName,
    });
    if (!data) {
      return res.status(500).json({ error: "Failed to guild/id data" });
    }
    res.json(data);
  } catch (error) {
    console.log(`Error during API call: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 길드 정보
app.get("/api/guild/basic", async (req, res) => {
  const { oguild_id } = req.query;

  if (!oguild_id) {
    return res.status(400).json({ error: "oguild is required" });
  }

  try {
    const data = await callMapleStoryAPI("guild/basic", {
      oguild_id,
    });
    if (!data) {
      return res.status(500).json({ error: "Failed to guild/basic data" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getYesterDayFormatted = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
};

const getTodayFormatted = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getFormattedDate = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (hour < 8 || (hour === 8 && minutes < 30)) {
    return getYesterDayFormatted();
  } else {
    return getTodayFormatted();
  }
};

// 길드 랭킹 함수
const getGuildRanking = async (guildName, worldName) => {
  const date = getFormattedDate();

  // 주간 명성치 랭킹
  const resultFameRanking = await callMapleStoryAPI("ranking/guild", {
    date,
    ranking_type: 0,
    guild_name: guildName,
    world_name: worldName,
  });

  // 플래그 랭킹
  const resultFlagRanking = await callMapleStoryAPI("ranking/guild", {
    date,
    ranking_type: 1,
    guild_name: guildName,
    world_name: worldName,
  });

  // 수로 랭킹
  const resultSuroRanking = await callMapleStoryAPI("ranking/guild", {
    date,
    ranking_type: 2,
    guild_name: guildName,
    world_name: worldName,
  });

  return {
    FameRanking: resultFameRanking,
    FlagRanking: resultFlagRanking,
    SuroRanking: resultSuroRanking,
  };
};

// 길드 랭킹 엔드포인트 추가
app.get("/api/ranking/guild", async (req, res) => {
  const { guild_name: guildName, world_name: worldName } = req.query;

  if (!guildName || !worldName) {
    return res
      .status(400)
      .json({ error: "guild_name and world_name are required" });
  }

  try {
    const data = await getGuildRanking(guildName, worldName);

    if (!data) {
      return res.status(500).json({ error: "Failed to fetch guild rankings" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 딜레이를 위한 sleep 함수
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/api/guild/members", async (req, res) => {
  try {
    const { guildMembers } = req.query;

    if (!Array.isArray(guildMembers)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const batchSize = 40; // 한 번에 처리할 멤버 수
    const membersData = [];

    for (let i = 0; i < guildMembers.length; i += batchSize) {
      const batch = guildMembers.slice(i, i + batchSize);

      const batchData = await Promise.all(
        batch.map(async (member, index) => {
          try {
            // API 요청 전에 지연 추가 (예: 10ms 딜레이)
            await sleep(10 * index);

            const ocidData = await callMapleStoryAPI("id", {
              character_name: member,
            });

            if (ocidData && ocidData.ocid) {
              const basicInfoData = await callMapleStoryAPI("character/basic", {
                ocid: ocidData.ocid,
              });
              return {
                character_name: basicInfoData.character_name,
                character_level: basicInfoData.character_level,
                character_image: basicInfoData.character_image,
                character_class: basicInfoData.character_class,
              };
            } else {
              return {
                character_name: member,
                character_level: null,
                character_image: null,
                character_class: null,
              };
            }
          } catch (error) {
            console.error(
              `Error fetching data for member ${member}: ${error.message}`
            );
            return {
              character_name: member,
              character_level: null,
              character_image: null,
              character_class: null,
            };
          }
        })
      );

      membersData.push(...batchData);
    }

    res.json(membersData);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Combined 엔드포인트
app.get("/api/character/information", async (req, res) => {
  const { ocid } = req.query;

  if (!ocid) {
    return res.status(400).json({ error: "ocid is required" });
  }

  try {
    const [
      basicData,
      stat,
      popularity,
      hyperStat,
      propensity,
      ability,
      itemEquipment,
      cashItemEquipment,
      symbolEquipment,
      setEffect,
      beautyEquipment,
      androidEquipment,
      petEquipment,
      skillGrade5,
      skillGrade6,
      linkSkill,
      hexaMatrix,
      hexaMatrixStat,
      union,
      unionArtifact,
      unionRaider,
      dojang,
    ] = await Promise.all([
      callMapleStoryAPI("character/basic", { ocid }),
      callMapleStoryAPI("character/stat", { ocid }),
      callMapleStoryAPI("character/popularity", { ocid }),
      callMapleStoryAPI("character/hyper-stat", { ocid }),
      callMapleStoryAPI("character/propensity", { ocid }),
      callMapleStoryAPI("character/ability", { ocid }),
      callMapleStoryAPI("character/item-equipment", { ocid }),
      callMapleStoryAPI("character/cashitem-equipment", { ocid }),
      callMapleStoryAPI("character/symbol-equipment", { ocid }),
      callMapleStoryAPI("character/set-effect", { ocid }),
      callMapleStoryAPI("character/beauty-equipment", { ocid }),
      callMapleStoryAPI("character/android-equipment", { ocid }),
      callMapleStoryAPI("character/pet-equipment", { ocid }),
      callMapleStoryAPI("character/skill", { ocid, character_skill_grade: 5 }),
      callMapleStoryAPI("character/skill", { ocid, character_skill_grade: 6 }),
      callMapleStoryAPI("character/link-skill", { ocid }),
      callMapleStoryAPI("character/hexamatrix", { ocid }),
      callMapleStoryAPI("character/hexamatrix-stat", { ocid }),
      callMapleStoryAPI("user/union", { ocid }),
      callMapleStoryAPI("user/union-artifact", { ocid }),
      callMapleStoryAPI("user/union-raider", { ocid }),
      callMapleStoryAPI("character/dojang", { ocid }),
    ]);

    res.json({
      getBasicInformation: basicData,
      getCharacterStat: stat,
      getCharacterPopularity: popularity,
      getHyperStat: hyperStat,
      getPropensity: propensity,
      getAbility: ability,
      getItemEquipment: itemEquipment,
      getCashItemEquipment: cashItemEquipment,
      getSymbolEquipment: symbolEquipment,
      getSetEffect: setEffect,
      beautyEquipment: beautyEquipment,
      getAndroidEquipment: androidEquipment,
      getPetEquipment: petEquipment,
      getSkill: {
        grade5: skillGrade5,
        grade6: skillGrade6,
      },
      getLinkSkill: linkSkill,
      getHexaMatrix: hexaMatrix,
      getHexaMatrixStat: hexaMatrixStat,
      getUnion: union,
      getUnionArtiFact: unionArtifact,
      getUnionRaider: unionRaider,
      getDojang: dojang,
    });
  } catch (error) {
    console.error("Combined API error:", error.message);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
});
