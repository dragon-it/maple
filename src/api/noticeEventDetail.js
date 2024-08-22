// 선데이메이플 디테일
import { callMapleStoryAPI } from "../utils/apiEndPoint";

export default async function handler(req, res) {
  const { notice_id } = req.query;

  if (!notice_id) {
    return res.status(400).json({ error: "notice_id is required" });
  }

  try {
    const data = await callMapleStoryAPI("notice-event/detail", {
      notice_id,
    });
    if (!data) {
      return res
        .status(500)
        .json({ error: "Failed to fetch data or notice_id is missing" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
