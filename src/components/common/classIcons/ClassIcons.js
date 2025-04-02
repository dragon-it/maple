import class_icon_archer from "../../../assets/icons/classIcons/class_archer.png";
import class_icon_fighter from "../../../assets/icons/classIcons/class_fighter.png";
import class_icon_pirate from "../../../assets/icons/classIcons/class_pirate.png";
import class_icon_thief from "../../../assets/icons/classIcons/class_thief.png";
import class_icon_wizard from "../../../assets/icons/classIcons/class_wizard.png";
import class_icon_xenon from "../../../assets/icons/classIcons/class_xenon.png";

const ClassIcons = {
  archer: class_icon_archer,
  fighter: class_icon_fighter,
  pirate: class_icon_pirate,
  thief: class_icon_thief,
  wizard: class_icon_wizard,
  xenon: class_icon_xenon,
};

const ClassMapping = {
  warriorClass: [
    "히어로",
    "팔라딘",
    "다크나이트",
    "소울마스터",
    "미하일",
    "블래스터",
    "데몬슬레이어",
    "데몬어벤져",
    "아란",
    "카이저",
    "아델",
    "제로",
  ],
  mageClass: [
    "아크메이지(불,독)",
    "아크메이지(썬,콜)",
    "비숍",
    "플레임위자드",
    "배틀메이지",
    "에반",
    "루미너스",
    "일리움",
    "라라",
    "키네시스",
  ],
  archerClass: [
    "보우마스터",
    "신궁",
    "패스파인더",
    "윈드브레이커",
    "와일드헌터",
    "메르세데스",
    "카인",
  ],
  thiefClass: [
    "나이트로드",
    "섀도어",
    "듀얼블레이드",
    "나이트워커",
    "팬텀",
    "카데나",
    "칼리",
    "호영",
  ],
  pirateClass: [
    "바이퍼",
    "캡틴",
    "캐논슈터",
    "스트라이커",
    "메카닉",
    "은월",
    "엔젤릭버스터",
    "아크",
  ],
  xenonClass: "제논",
};

const classData = { ClassIcons, ClassMapping };

export default classData;
