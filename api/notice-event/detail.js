import { callMapleStoryAPI } from "../../src/utils/apiEndPoint.js";

export default async function handler(req, res) {
  // GET 요청인지 확인
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { notice_id } = req.query;

  if (!notice_id) {
    return res.status(400).json({ error: "notice_id is required" });
  }

  try {
    const data = await callMapleStoryAPI("notice-event/detail", {
      notice_id,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
