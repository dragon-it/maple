// 화면에 항상 보여줄 유니온 공격대 스텟 16개를 정의
export const UNION_RAIDER_STATS = [
  // 일반 주스텟은 1포인트당 5씩 오르고 최대 15포인트까지 투자 가능
  { key: "str", label: "STR", maxPoint: 15, valuePerPoint: 5, unit: "" },
  // DEX도 STR과 같은 규칙을 사용
  { key: "dex", label: "DEX", maxPoint: 15, valuePerPoint: 5, unit: "" },
  // INT도 STR과 같은 규칙을 사용
  { key: "int", label: "INT", maxPoint: 15, valuePerPoint: 5, unit: "" },
  // LUK도 STR과 같은 규칙을 사용
  { key: "luk", label: "LUK", maxPoint: 15, valuePerPoint: 5, unit: "" },
  // 공격력은 1포인트당 1씩 오르고 최대 15포인트까지 투자 가능
  {
    key: "attackPower",
    label: "공격력",
    maxPoint: 15,
    valuePerPoint: 1,
    unit: "",
  },
  // 마력은 1포인트당 1씩 오르고 최대 15포인트까지 투자 가능
  {
    key: "magicPower",
    label: "마력",
    maxPoint: 15,
    valuePerPoint: 1,
    unit: "",
  },
  // 최대 HP는 1포인트당 250씩 오르고 최대 15포인트까지 투자 가능
  {
    key: "maxHp",
    label: "최대 HP",
    maxPoint: 15,
    valuePerPoint: 250,
    unit: "",
  },
  // 최대 MP는 1포인트당 250씩 오르고 최대 15포인트까지 투자 가능
  {
    key: "maxMp",
    label: "최대 MP",
    maxPoint: 15,
    valuePerPoint: 250,
    unit: "",
  },
  // 크리티컬 데미지는 1포인트당 0.5%씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "criticalDamage",
    label: "크리티컬 데미지",
    maxPoint: 40,
    valuePerPoint: 0.5,
    unit: "%",
    decimal: 2,
  },
  // 보스 데미지는 1포인트당 1%씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "bossDamage",
    label: "보스 데미지",
    maxPoint: 40,
    valuePerPoint: 1,
    unit: "%",
  },
  // 방어율 무시는 1포인트당 1%씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "ignoreDefense",
    label: "방어율 무시",
    maxPoint: 40,
    valuePerPoint: 1,
    unit: "%",
  },
  // 크리티컬 확률은 1포인트당 1%씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "criticalRate",
    label: "크리티컬 확률",
    maxPoint: 40,
    valuePerPoint: 1,
    unit: "%",
  },
  // 버프 지속 시간은 1포인트당 1%씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "buffDuration",
    label: "버프 지속 시간",
    maxPoint: 40,
    valuePerPoint: 1,
    unit: "%",
  },
  // 일반몹 데미지는 API 문구의 "일반 몬스터 공격 시 데미지"를 짧게 보여주는 이름
  {
    key: "normalMonsterDamage",
    label: "일반몹 데미지",
    maxPoint: 40,
    valuePerPoint: 1,
    unit: "%",
  },
  // 획득 경험치는 1포인트당 0.25%씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "exp",
    label: "획득 경험치",
    maxPoint: 40,
    valuePerPoint: 0.25,
    unit: "%",
    decimal: 1,
  },
  // 상태 이상 내성은 1포인트당 1씩 오르고 최대 40포인트까지 투자 가능
  {
    key: "abnormalStatusResistance",
    label: "상태 이상 내성",
    maxPoint: 40,
    valuePerPoint: 1,
    unit: "",
  },
];

// API 응답 문구와 화면에서 사용할 스텟 key를 연결
export const STAT_MATCHERS = [
  // STR 문구는 "STR 75 증가"처럼 들어옴
  { key: "str", includes: ["STR"] },
  // DEX 문구는 "DEX 75 증가"처럼 들어옴
  { key: "dex", includes: ["DEX"] },
  // INT 문구는 "INT 75 증가"처럼 들어옴
  { key: "int", includes: ["INT"] },
  // LUK 문구는 "LUK 75 증가"처럼 들어옴
  { key: "luk", includes: ["LUK"] },
  // 보스 데미지는 API에서 긴 문구로 내려오기 때문에 그 문구를 먼저 매칭
  { key: "bossDamage", includes: ["보스 몬스터 공격 시 데미지"] },
  // 일반몹 데미지도 API에서 긴 문구로 내려옴
  { key: "normalMonsterDamage", includes: ["일반 몬스터 공격 시 데미지"] },
  // 크리티컬 데미지와 크리티컬 확률은 앞 단어가 같아서 더 구체적인 문구로 구분
  { key: "criticalDamage", includes: ["크리티컬 데미지"] },
  // 크리티컬 확률도 별도 key로 연결
  { key: "criticalRate", includes: ["크리티컬 확률"] },
  // 방어율 무시는 문구 그대로 매칭
  { key: "ignoreDefense", includes: ["방어율 무시"] },
  // API 문구에는 "버프 지속시간"처럼 공백이 없을 수 있어 두 형태를 모두 허용
  { key: "buffDuration", includes: ["버프 지속시간", "버프 지속 시간"] },
  // 획득 경험치는 문구 그대로 매칭
  { key: "exp", includes: ["획득 경험치"] },
  // 상태 이상 내성은 문구 그대로 매칭
  { key: "abnormalStatusResistance", includes: ["상태 이상 내성"] },
  // 최대 HP는 공격력보다 뒤에 있어도 충돌하지 않지만 명확하게 별도로 둠
  { key: "maxHp", includes: ["최대 HP"] },
  // 최대 MP도 별도 key로 연결
  { key: "maxMp", includes: ["최대 MP"] },
  // 공격력은 "보스 몬스터 공격 시 데미지"에도 "공격"이 들어가므로 정확한 "공격력"만 봄
  { key: "attackPower", includes: ["공격력"] },
  // 마력은 문구 그대로 매칭
  { key: "magicPower", includes: ["마력"] },
];

export const getSafePresetNo = (presetNo) => {
  const num = Number(presetNo);
  return isNaN(num) || num === 0 ? 1 : num;
};

export const findSelectedPreset = (presets, selectedPresetNo) => {
  if (!Array.isArray(presets)) return null;
  const targetNo = getSafePresetNo(selectedPresetNo);
  return presets.find((p) => Number(p.preset_no) === targetNo) || null;
};

export const buildStatRows = (selectedUnionStateStat) => {
  return UNION_RAIDER_STATS.map((statDef) => {
    const matcher = STAT_MATCHERS.find((m) => m.key === statDef.key);
    let value = 0;

    if (matcher && Array.isArray(selectedUnionStateStat)) {
      const matchingString = selectedUnionStateStat.find((statStr) => {
        if (typeof statStr !== "string") return false;
        return matcher.includes.some((inc) => statStr.includes(inc));
      });

      if (matchingString) {
        const match = matchingString.match(/(\d+(?:\.\d+)?)/);
        if (match) {
          value = parseFloat(match[1]);
        }
      }
    }

    const point = statDef.valuePerPoint ? Math.round(value / statDef.valuePerPoint) : 0;
    
    let displayValue = "";
    if (value === 0) {
      displayValue = statDef.unit ? `0${statDef.unit}` : "0";
    } else {
      const formattedVal = statDef.decimal !== undefined ? value.toFixed(statDef.decimal) : value;
      displayValue = `+${formattedVal}${statDef.unit}`;
    }

    return {
      key: statDef.key,
      label: statDef.label,
      maxPoint: statDef.maxPoint,
      point: Math.min(point, statDef.maxPoint),
      displayValue,
    };
  });
};

