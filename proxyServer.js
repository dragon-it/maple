const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const app = express();
const BASE_URL = "https://open.api.nexon.com";
const BUILD_DIR = process.env.BUILD_DIR || "build-blue";
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

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

// 현재 날짜를 기준으로 어제 날짜를 반환하는 함수
const getTodayFormatted = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// 현재 날짜를 기준으로 어제와 오늘 날짜를 반환하는 함수
const getCurrentFormattedDate = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (hour < 8 || (hour === 8 && minutes < 30)) {
    return getYesterDayFormatted();
  } else {
    return getTodayFormatted();
  }
};

// 날짜 형식을 YYYY-MM-DD로 반환하는 함수
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 14일 동안의 날짜 배열을 생성
const getLast14Days = () => {
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(getFormattedDate(date));
  }
  return dates;
};

// 길드 랭킹 함수
const getGuildRanking = async (guildName, worldName) => {
  const date = getCurrentFormattedDate();

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

    const batchSize = 20; // 한 번에 처리할 멤버 수
    const membersData = [];

    for (let i = 0; i < guildMembers.length; i += batchSize) {
      const batch = guildMembers.slice(i, i + batchSize);

      const batchData = await Promise.all(
        batch.map(async (member, index) => {
          try {
            // API 요청 전에 지연 추가 (예: 10ms 딜레이)
            await sleep(5 * index);

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

// 모든 월드의 길드 oguild_id와 guild/basic 조회
app.get("/api/guild/all", async (req, res) => {
  const { guild_name: guildName } = req.query;

  // 월드 리스트
  const worlds = [
    "스카니아",
    "베라",
    "루나",
    "제니스",
    "유니온",
    "엘리시움",
    "이노시스",
    "레드",
    "오로라",
    "아케인",
    "노바",
    "에오스",
    "핼리오스",
    "버닝",
    "버닝1",
    "버닝2",
    "챌린저스",
    "챌린저스2",
    "챌린저스3",
    "챌린저스4",
  ];

  if (!guildName) {
    return res.status(400).json({ error: "guild_name is required" });
  }

  try {
    const results = [];

    // 모든 월드를 순회하며 API 호출
    for (const world of worlds) {
      // guild/id API 호출
      const guildData = await callMapleStoryAPI("guild/id", {
        guild_name: guildName,
        world_name: world,
      });

      // 데이터가 존재할 경우 oguild_id와 guild/basic 정보 조회
      if (guildData && guildData.oguild_id) {
        const oguild_id = guildData.oguild_id;

        // guild/basic API 호출
        const basicData = await callMapleStoryAPI("guild/basic", {
          oguild_id,
        });

        // guild/basic 데이터가 존재할 경우 결과 배열에 추가
        if (basicData) {
          results.push({
            world_name: world,
            oguild_id,
            basic_info: basicData, // guild 기본 정보 추가
          });
        }
      }
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No guild found" });
    }

    // 길드 oguild_id와 기본 정보 목록 반환
    res.json(results);
  } catch (error) {
    console.error(`Error during guild all worlds API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 경험치 히스토리 API
app.get("/api/character/exp-history", async (req, res) => {
  const { ocid } = req.query;

  if (!ocid) {
    return res.status(400).json({ error: "ocid is required" });
  }

  try {
    // 14일 동안의 경험치 히스토리 가져오기
    const dates = getLast14Days();
    const expHistoryPromises = dates.map((date, index) => {
      if (index === 0) {
        return callMapleStoryAPI("character/basic", { ocid });
      } else {
        return callMapleStoryAPI("character/basic", { ocid, date });
      }
    });
    const expHistoryResults = await Promise.all(expHistoryPromises);

    const expHistory = expHistoryResults.map((result, index) => ({
      date: dates[index],
      character_exp: result.character_exp,
      character_exp_rate: result.character_exp_rate,
    }));

    res.json(expHistory); // 경험치 히스토리 반환
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Combined 엔드포인트
app.get("/api/character/information", async (req, res) => {
  const { ocid } = req.query;
  const date = getCurrentFormattedDate();

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
      unionChampion,
      dojang,
      unionLanking,
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
      callMapleStoryAPI("user/union-champion", { ocid }),
      callMapleStoryAPI("character/dojang", { ocid }),
      callMapleStoryAPI("ranking/union", {
        ocid,
        date,
        page: 1,
      }),
    ]);

    // unionChampion에서 챔피언 이름을 가져오는 함수
    const championNames = Object.values(unionChampion.union_champion).map(
      (champ) => champ.champion_name
    );

    const championDetails = await Promise.all(
      championNames.map(async (name) => {
        try {
          // 이름으로 ocid 조회
          const ocidData = await callMapleStoryAPI("id", {
            character_name: name,
          });

          if (!ocidData || !ocidData.ocid) {
            throw new Error(`OCID not found for character: ${name}`);
          }

          const ocid = ocidData.ocid;

          // ocid로 캐릭터 기본 정보 조회
          const characterData = await callMapleStoryAPI("character/basic", {
            ocid,
          });

          return {
            character_name: name,
            character_image: characterData.character_image,
            character_level: characterData.character_level,
          };
        } catch (err) {
          console.error(`Error processing character "${name}":`, err.message);
          return {
            character_name: name,
            error: "Failed to fetch character data",
          };
        }
      })
    );

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
      getUnionRanking: unionLanking,
      getUnionChampion: unionChampion,
      getDojang: dojang,
      getChampionDetails: championDetails,
    });
  } catch (error) {
    console.error("Combined API error:", error.message);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
});

// 캐릭터 캡처
app.get("/api/character-capture", async (req, res) => {
  const { ocid } = req.query;
  const date = getCurrentFormattedDate();

  if (!ocid) {
    return res.status(400).json({ error: "ocid is required" });
  }

  try {
    const [basicData, popularity, union, dojang, unionLanking] =
      await Promise.all([
        callMapleStoryAPI("character/basic", { ocid }),
        callMapleStoryAPI("character/popularity", { ocid }),
        callMapleStoryAPI("user/union", { ocid }),
        callMapleStoryAPI("character/dojang", { ocid }),
        callMapleStoryAPI("ranking/union", {
          ocid,
          date,
          page: 1,
        }),
      ]);

    res.json({
      getBasicInformation: basicData,
      getCharacterPopularity: popularity,
      getUnion: union,
      getUnionRanking: unionLanking,
      getDojang: dojang,
    });
  } catch (error) {
    console.error("Combined API error:", error.message);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
});

// 캐릭터 캡처 이미지
app.get("/api/image-proxy", async (req, res) => {
  const { imageUrl } = req.query;
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    res.set("Content-Type", response.headers["content-type"]);
    res.send(buffer);
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    res.status(500).send("이미지 로드 실패");
  }
});

// 업데이트 목록
app.get("/notice", async (req, res) => {
  try {
    // 병렬로 모든 notice 관련 데이터 요청
    const [notice, noticeUpdate, noticeCashshop] = await Promise.all([
      callMapleStoryAPI("notice", {}),
      callMapleStoryAPI("notice-update", {}),
      callMapleStoryAPI("notice-cashshop", {}),
    ]);

    if (!notice || !noticeUpdate || !noticeCashshop) {
      return res
        .status(500)
        .json({ error: "Failed to fetch one or more notice types" });
    }

    res.json({
      notice,
      noticeUpdate,
      noticeCashshop,
    });
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ads.txt 제공 설정
app.use("/ads.txt", express.static(path.join(__dirname, "ads.txt")));

if (process.env.NODE_ENV === "development") {
  console.log(
    "🔄 Development mode: Proxying to React dev server (localhost:3000)"
  );

  app.use(
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      ws: true, // WebSocket 지원
      logLevel: "debug",
    })
  );
} else {
  console.log(`📦 Production mode: Serving from ${BUILD_DIR}`);

  app.use(express.static(path.join(__dirname, BUILD_DIR)));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, BUILD_DIR, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
