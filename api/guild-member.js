import { callMapleStoryAPI } from "../src/utils/apiEndPoint.js";

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

    // 모든 멤버에 대해 병렬 처리
    const membersData = await Promise.all(
      guildMembers.map(async (member) => {
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

    res.json(membersData);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
