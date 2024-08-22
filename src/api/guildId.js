import { callMapleStoryAPI } from "../utils/apiEndPoint";

// 길드 oguildId 취득
export default async function handler(req, res) {
  const { guild_name: guildName, world_name: worldName } = req.body;
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
}
