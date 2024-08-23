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
    // URL 쿼리에서 guildMembers를 배열로 변환
    const { guildMembers } = req.query;
    const members = Array.isArray(guildMembers) ? guildMembers : [guildMembers];

    if (!members.length) {
      return res.status(400).json({ error: "No guild members provided" });
    }

    const batchSize = 40; // 한 번에 처리할 멤버 수
    const delayMs = 100; // 각 배치 사이 지연 시간
    const membersData = [];

    for (let i = 0; i < members.length; i += batchSize) {
      const batch = members.slice(i, i + batchSize);

      const batchData = await Promise.all(
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

      if (i + batchSize < members.length) {
        await delay(delayMs); // 배치 사이의 지연 시간 추가
      }
    }

    res.json(membersData);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
