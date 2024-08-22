import { callMapleStoryAPI } from "../utils/apiEndPoint";

// 이벤트 공지
export default async function handler(req, res) {
  // GET 요청인지 확인
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = await callMapleStoryAPI("notice-event", {});
    if (!data) {
      return res.status(500).json({ error: "Failed to fetch notice data" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
