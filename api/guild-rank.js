import { callMapleStoryAPI } from "../src/utils/apiEndPoint.js";

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

  // 병렬로 랭킹 데이터 가져오기
  const [resultFameRanking, resultFlagRanking, resultSuroRanking] =
    await Promise.all([
      callMapleStoryAPI("ranking/guild", {
        date,
        ranking_type: 0,
        guild_name: guildName,
        world_name: worldName,
      }),
      callMapleStoryAPI("ranking/guild", {
        date,
        ranking_type: 1,
        guild_name: guildName,
        world_name: worldName,
      }),
      callMapleStoryAPI("ranking/guild", {
        date,
        ranking_type: 2,
        guild_name: guildName,
        world_name: worldName,
      }),
    ]);

  return {
    FameRanking: resultFameRanking,
    FlagRanking: resultFlagRanking,
    SuroRanking: resultSuroRanking,
  };
};

// 길드 랭킹 엔드포인트 추가
export default async function handler(req, res) {
  // GET 요청인지 확인
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
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
}
