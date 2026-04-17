import UnionArtifactIcon from "./UnionArtifactIcon";

const artifactNameKeyMap = {
  "오렌지 버섯": "orange_Mushroom",
  슬라임: "slime",
  뿔버섯: "horny_Mushroom",
  스텀프: "stump",
  스톤골렘: "stone_Golem",
  발록: "balrog",
  자쿰: "zaqqum",
  핑크빈: "pink_Bean",
  파풀라투스: "papulatus",
};

export const normalizeUnionArtifactName = (name = "") =>
  name.replace(/^유니온 아티팩트\s*:\s*/, "").trim();

export const getUnionArtifactIcon = (name, level = 0) => {
  const normalizedName = normalizeUnionArtifactName(name);
  const nameKey = artifactNameKeyMap[normalizedName];

  if (!nameKey) {
    return null;
  }

  return UnionArtifactIcon[nameKey][level >= 5 ? 1 : 0];
};
