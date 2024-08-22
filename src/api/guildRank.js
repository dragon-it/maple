import { callMapleStoryAPI } from "../utils/apiEndPoint";

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
export default async function handler(req, res) {
  const { guild_name: guildName, world_name: worldName } = req.body;

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
