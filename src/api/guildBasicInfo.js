import { callMapleStoryAPI } from "../utils/apiEndPoint";

// 길드 정보
export default async function handler(req, res) {
  const { oguild_id } = req.body;

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
}
