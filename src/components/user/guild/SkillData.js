// 스킬 이름에 따른 줄임말 매핑
const nobleSkillNameMapping = {
  "보스 킬링 머신": "보공",
  "방어력은 숫자일 뿐": "방무",
  "길드의 이름으로": "뎀증",
  "크게 한방": "크뎀",
};

// 스킬 이름에 따른 순서 정의
const skillOrder = [
  { name: "잔돈이 눈에 띄네", maxLevel: 3 },
  { name: "장사꾼", maxLevel: 3 },
  { name: "길드 정기 지원Ⅰ", maxLevel: 4 },
  { name: "길드 정기 지원Ⅱ", maxLevel: 1 },
  { name: "길드 정기 지원Ⅲ", maxLevel: 1 },
  { name: "아케인포스가 함께하기를", maxLevel: 4 },
  { name: "함께라서 덜 아파", maxLevel: 3 },
  { name: "길드의 매운 맛Ⅰ", maxLevel: 5 },
  { name: "길드의 매운 맛Ⅱ", maxLevel: 5 },
  { name: "길드의 매운 맛Ⅲ", maxLevel: 5 },
  { name: "내 안에 별 있다", maxLevel: 5 },
  { name: "졸개들은 물렀거라", maxLevel: 4 },
  { name: "일어나라 용사여", maxLevel: 3 },
  { name: "팔방미인", maxLevel: 3 },
  { name: "샤레니안의 악마 라이딩", maxLevel: 1 },
  { name: "길드의 노하우", maxLevel: 1 },
  { name: "너에게 갈게", maxLevel: 3 },
  { name: "나에게 오라", maxLevel: 3 },
  { name: "죽음이 두렵지 않은", maxLevel: 3 },
];

// 스킬 그리드 위치
const skillGrid = [
  ["Lv 1", "Lv 5", "Lv 10", "Lv 15", "Lv 20", "Lv 25"],
  ["잔돈이 눈에 띄네", "→", "장사꾼", "", "", ""],
  [
    "길드 정기 지원Ⅰ",
    "→",
    "길드 정기 지원Ⅱ",
    "→",
    "길드 정기 지원Ⅲ",
    "아케인포스가 함께하기를",
    "",
  ],
  [
    "함께라서 덜 아파",
    "길드의 매운 맛Ⅰ",
    "→",
    "길드의 매운 맛Ⅱ",
    "→",
    "길드의 매운 맛Ⅲ",
  ],
  [
    "",
    "내 안에 별 있다",
    "졸개들은 물렀거라",
    "일어나라 용사여",
    "팔방미인",
    "샤레니안의 악마 라이딩",
  ],
  [
    "길드의 노하우",
    "너에게 갈게",
    "→",
    "나에게 오라",
    "죽음이 두렵지 않은",
    "",
  ],
];

const nobleSkills = {
  nobleSkillNameMapping,
  skillOrder,
  skillGrid,
};

export default nobleSkills;
