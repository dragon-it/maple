import { callMapleStoryAPI } from "../utils/apiEndPoint";

// 캐릭터 OCID API
export default async function handler(req, res) {
  // GET 요청인지 확인
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { character_name } = req.query;

  if (!character_name) {
    return res.status(400).json({ error: "character_name is required" });
  }

  try {
    const data = await callMapleStoryAPI("id", { character_name });

    if (!data || !data.ocid) {
      return res
        .status(500)
        .json({ error: "Failed to fetch data or ocid is missing" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
