import { callMapleStoryAPI } from "../src/utils/apiEndPoint";

// 이벤트 공지
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await callMapleStoryAPI("notice-event", {});

    if (!data) {
      return res.status(500).json({ error: "Failed to fetch notice data" });
    }

    // 캐시 제어 헤더 설정
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.status(200).json(data);
  } catch (error) {
    console.error("Error during API call:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
