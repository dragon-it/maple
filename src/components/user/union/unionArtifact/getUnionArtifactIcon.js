import UnionArtifactIcon from "./UnionArtifactIcon";

const artifactNameKeyMap = {
  "크리스탈 : 주황버섯": "orange_Mushroom",
  "크리스탈 : 슬라임": "slime",
  "크리스탈 : 뿔버섯": "horny_Mushroom",
  "크리스탈 : 스텀프": "stump",
  "크리스탈 : 스톤골렘": "stone_Golem",
  "크리스탈 : 발록": "balrog",
  "크리스탈 : 자쿰": "zaqqum",
  "크리스탈 : 핑크빈": "pink_Bean",
  "크리스탈 : 파풀라투스": "papulatus",
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
