// 파티 목록에서는 장비·스킬 전체 대신 기본 정보와 전투력만 조회함
const createPartyProfileHandler = callApi => async (req, res) => {
  const { ocid } = req.query;
  if (typeof ocid !== "string" || !ocid.trim()) {
    return res.status(400).json({ error: "캐릭터 식별자가 필요합니다." });
  }

  try {
    const [basic, stat] = await Promise.all([
      callApi("character/basic", { ocid }),
      callApi("character/stat", { ocid }),
    ]);
    if (!basic?.character_name || !Array.isArray(stat?.final_stat)) {
      return res.status(502).json({ error: "캐릭터 정보를 불러오지 못했습니다. 다시 조회해주세요." });
    }
    // 배열 위치가 바뀌어도 전투력을 정확히 찾도록 항목 이름으로 검색함
    const combatPower = stat.final_stat.find(value => value.stat_name === "전투력")?.stat_value;
    return res.json({
      nickname: basic.character_name,
      characterImage: basic.character_image || null,
      level: basic.character_level,
      job: basic.character_class,
      combatPower: combatPower ?? null,
    });
  } catch {
    return res.status(502).json({ error: "캐릭터 정보를 불러오지 못했습니다. 다시 조회해주세요." });
  }
};

module.exports = { createPartyProfileHandler };
