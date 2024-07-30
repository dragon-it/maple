// 모듈 가져오기
const express = require("express");
const axios = require("axios");
// 환경 변수 가져오는 라이브러리
const dotenv = require("dotenv");
const cors = require("cors");

// 환경 변수 세팅
dotenv.config();

// 웹 서버 구축 프레임워크
const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = "https://open.api.nexon.com";

app.use(express.json()); // 미들웨어 등록
app.use(cors()); // CORS 설정

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

// 캐릭터 OCID API
app.post("/api/id", async (req, res) => {
  // post 메서드는  body를 이용하여 http 요청 본문 데이터 전달
  const { character_name } = req.body; // 요청 본문에서 'body'의 값을 가져옴

  if (!character_name) {
    return res.status(400).json({ error: "character_name is required" });
  }

  try {
    // API 호출
    const data = await callMapleStoryAPI("id", { character_name });

    // 데이터 로그
    console.log(`response: ${JSON.stringify(data)}`);

    if (!data || !data.ocid) {
      console.log("No data or ocid is missing");
      return res
        .status(500)
        .json({ error: "Failed to fetch data or ocid is missing" });
    }

    // 성공 응답
    res.json(data);
  } catch (error) {
    // 오류 로그
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/api/character/basic", async (req, res)=>{
//   const
// })

// Combined 엔드포인트
app.post("/api/character", async (req, res) => {
  const { ocid } = req.body;

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

    // 응답 데이터 구조
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

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
