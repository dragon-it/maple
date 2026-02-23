// 스킬 이름에 따른 줄임말 매핑
const nobleSkillNameMapping = {
  "보스 킬링 머신": "보공",
  "방어력은 숫자일 뿐": "방무",
  "길드의 이름으로": "뎀증",
  "크게 한방": "크뎀",
};

// 스킬 이름에 따른 순서 정의
const skillOrder = [
  { name: "함께하는 모험", maxLevel: 1 },
  { name: "잔돈이 눈에 띄네", maxLevel: 1 },
  { name: "길드의 노하우Ⅰ", maxLevel: 1 },
  { name: "길드의 노하우Ⅱ", maxLevel: 1 },
  { name: "길드의 노하우Ⅲ", maxLevel: 1 },
  { name: "길드의 노하우Ⅳ", maxLevel: 1 },
  { name: "길드의 노하우Ⅴ", maxLevel: 1 },
  { name: "길드의 노하우Ⅵ", maxLevel: 1 },
  { name: "특별한 힘", maxLevel: 1 },
  { name: "너에게 갈게", maxLevel: 1 },
  { name: "장사꾼", maxLevel: 1 },
  { name: "샤레니안의 악마 라이딩", maxLevel: 1 },
  { name: "죽음이 두렵지 않은", maxLevel: 1 },
  { name: "주문서 강화의 장인", maxLevel: 1 },
  { name: "주문서 강화의 달인", maxLevel: 1 },
];

// 스킬 그리드 위치
const skillGrid = [
  ["Lv 1", "Lv 5", "Lv 10", "Lv 15", "Lv 20", "Lv 25", "Lv 30"],
  [
    "길드의 노하우Ⅰ",
    "길드의 노하우Ⅱ",
    "길드의 노하우Ⅲ",
    "길드의 노하우Ⅳ",
    "길드의 노하우Ⅴ",
    "길드의 노하우Ⅵ",
    "샤레니안의 악마 라이딩",
  ],
  [
    "함께하는 모험",
    "특별한 힘",
    "장사꾼",
    "주문서 강화의 달인",
    "죽음이 두렵지 않은",
    "주문서 강화의 장인",
  ],
  ["잔돈이 눈에 띄네", "너에게 갈게"],
];

const nobleSkills = {
  nobleSkillNameMapping,
  skillOrder,
  skillGrid,
};

export default nobleSkills;
