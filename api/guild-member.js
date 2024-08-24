import { callMapleStoryAPI } from "../src/utils/apiEndPoint.js";

// 지연 함수
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 길드 멤버 정보
export default async function handler(req, res) {
  // GET 요청인지 확인
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 쿼리 파라미터 출력
    console.log("Query parameters:", req.query);

    // URL 쿼리에서 guildMembers를 배열로 변환
    let guildMembers = req.query.guildMembers;
    console.log("guildMembers raw:", guildMembers); // 추가된 로그

    // guildMembers가 문자열이면 JSON으로 파싱
    if (typeof guildMembers === "string") {
      try {
        guildMembers = JSON.parse(guildMembers);
      } catch (error) {
        return res
          .status(400)
          .json({ error: "Invalid JSON format for guildMembers" });
      }
    }

    // guildMembers가 배열인지 확인
    if (!Array.isArray(guildMembers)) {
      return res.status(400).json({ error: "guildMembers should be an array" });
    }

    console.log("Parsed members:", guildMembers); // 추가된 로그

    if (guildMembers.length === 0) {
      return res.status(400).json({ error: "No guild members provided" });
    }

    const batchSize = 40; // 한 번에 처리할 멤버 수
    const delayMs = 100; // 각 배치 사이 지연 시간
    const membersData = [];

    // 모든 배치에 대해 병렬 처리
    const batchPromises = [];

    for (let i = 0; i < guildMembers.length; i += batchSize) {
      const batch = guildMembers.slice(i, i + batchSize);

      const batchPromise = Promise.all(
        batch.map(async (member) => {
          try {
            const ocidData = await callMapleStoryAPI("id", {
              character_name: member,
            });

            if (ocidData && ocidData.ocid) {
              const basicInfoData = await callMapleStoryAPI("character/basic", {
                ocid: ocidData.ocid,
              });
              return {
                character_name: basicInfoData.character_name || member,
                character_level: basicInfoData.character_level || null,
                character_image: basicInfoData.character_image || null,
                character_class: basicInfoData.character_class || null,
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

      batchPromises.push(batchPromise);

      // 배치 사이의 지연 시간을 추가하지만 병렬성을 유지하기 위해 promise를 사용
      await delay(delayMs);
    }

    // 모든 배치 완료를 기다림
    const allBatchData = await Promise.all(batchPromises);

    // 모든 배치 데이터를 합침
    allBatchData.forEach((batchData) => {
      membersData.push(...batchData);
    });

    res.json(membersData);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
