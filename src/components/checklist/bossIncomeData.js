import BaldrixIcon from "../../assets/pages/checklist/Baldrix_icon.png";
import BlackMageIcon from "../../assets/pages/checklist/Black_Mage_icon.png";
import BloodyQueenIcon from "../../assets/pages/checklist/Bloody_Queen_icon.png";
import ChosenSerenIcon from "../../assets/pages/checklist/Chosen_Seren_icon.png";
import CygnusIcon from "../../assets/pages/checklist/Cygnus_icon.png";
import DamienIcon from "../../assets/pages/checklist/Damien_icon.png";
import DunkelIcon from "../../assets/pages/checklist/Dunkel_icon.png";
import DuskIcon from "../../assets/pages/checklist/Dusk_icon.png";
import FirstAdversaryIcon from "../../assets/pages/checklist/First_Adversary_icon.png";
import GuardianAngelSlimeIcon from "../../assets/pages/checklist/Guardian_Angel_Slime_icon.png";
import HillaIcon from "../../assets/pages/checklist/Hilla_icon.png";
import JupiterIcon from "../../assets/pages/checklist/Jupiter_icon.png";
import KalingIcon from "../../assets/pages/checklist/Kaling_icon.png";
import KalosGuardianIcon from "../../assets/pages/checklist/Kalos_the_Guardian_icon.png";
import LimboIcon from "../../assets/pages/checklist/Limbo_icon.png";
import LotusIcon from "../../assets/pages/checklist/Lotus_icon.png";
import LucidIcon from "../../assets/pages/checklist/Lucid_icon.png";
import MagnusIcon from "../../assets/pages/checklist/Magnus_icon.png";
import PapulatusIcon from "../../assets/pages/checklist/Papulatus_icon.png";
import PierreIcon from "../../assets/pages/checklist/Pierre_icon.png";
import PinkBeanIcon from "../../assets/pages/checklist/Pink_Bean_icon.png";
import RadiantMaleficIcon from "../../assets/pages/checklist/Radiant_Malefic_icon.png";
import VellumIcon from "../../assets/pages/checklist/Vellum_icon.png";
import VerusHillaIcon from "../../assets/pages/checklist/Verus_Hilla_icon.png";
import VonBonIcon from "../../assets/pages/checklist/Von_Bon_icon.png";
import WillIcon from "../../assets/pages/checklist/Will_icon.png";
import ZakumIcon from "../../assets/pages/checklist/Zakum_icon.png";

const difficultyLabelMap = {
  easy: "이지",
  normal: "노말",
  hard: "하드",
  chaos: "카오스",
  extreme: "익스트림",
};

const customDifficulty = ({
  id,
  reward = null,
  maxPartySize,
  label = difficultyLabelMap[id] ?? id,
}) => ({
  id,
  label,
  reward,
  ...(maxPartySize ? { maxPartySize } : {}),
});

const boss = ({
  id,
  bossName,
  icon,
  levelRequirement = null,
  difficulties,
  maxPartySize = 6,
}) => ({
  id,
  bossName,
  icon,
  levelRequirement,
  difficulties,
  maxPartySize,
});

const easy = (reward = null, maxPartySize) =>
  customDifficulty({ id: "easy", reward, maxPartySize });
const normal = (reward = null, maxPartySize) =>
  customDifficulty({ id: "normal", reward, maxPartySize });
const hard = (reward = null, maxPartySize) =>
  customDifficulty({ id: "hard", reward, maxPartySize });
const chaos = (reward = null, maxPartySize) =>
  customDifficulty({ id: "chaos", reward, maxPartySize });
const extreme = (reward = null, maxPartySize) =>
  customDifficulty({ id: "extreme", reward, maxPartySize });

const allPeriodGroups = [
  {
    key: "weekly",
    label: "주간",
    weeklyMultiplier: 1,
    monthlyMultiplier: 4,
    bosses: [
      boss({
        id: "zakum_chaos",
        bossName: "자쿰",
        icon: ZakumIcon,
        difficulties: [chaos(8080000)],
      }),
      boss({
        id: "magnus_hard",
        bossName: "매그너스",
        icon: MagnusIcon,
        difficulties: [hard(8560000)],
      }),
      boss({
        id: "hilla_hard",
        bossName: "힐라",
        icon: HillaIcon,
        difficulties: [hard(5750000)],
      }),
      boss({
        id: "papulatus_chaos",
        bossName: "파풀라투스",
        icon: PapulatusIcon,
        difficulties: [chaos(13800000)],
      }),
      boss({
        id: "pierre_chaos",
        bossName: "피에르",
        icon: PierreIcon,
        difficulties: [chaos(8170000)],
      }),
      boss({
        id: "von_bon_chaos",
        bossName: "반반",
        icon: VonBonIcon,
        difficulties: [chaos(8150000)],
      }),
      boss({
        id: "bloody_queen_chaos",
        bossName: "블러디퀸",
        icon: BloodyQueenIcon,
        difficulties: [chaos(8140000)],
      }),
      boss({
        id: "vellum_chaos",
        bossName: "벨룸",
        icon: VellumIcon,
        difficulties: [chaos(9280000)],
      }),
      boss({
        id: "pink_bean_chaos",
        bossName: "핑크빈",
        icon: PinkBeanIcon,
        difficulties: [chaos(6580000)],
      }),
      boss({
        id: "cygnus",
        bossName: "시그너스",
        icon: CygnusIcon,
        difficulties: [easy(4555555), normal(7500000)],
      }),
      boss({
        id: "lotus",
        bossName: "스우",
        icon: LotusIcon,
        difficulties: [normal(17600000), hard(54200000), extreme(604000000, 2)],
      }),
      boss({
        id: "damien",
        bossName: "데미안",
        icon: DamienIcon,
        difficulties: [normal(18400000), hard(51500000)],
      }),
      boss({
        id: "guardian_angel_slime",
        bossName: "가디언 엔젤 슬라임",
        icon: GuardianAngelSlimeIcon,
        difficulties: [normal(26800000), chaos(79100000)],
      }),
      boss({
        id: "lucid",
        bossName: "루시드",
        icon: LucidIcon,
        difficulties: [easy(31400000), normal(37500000), hard(66200000)],
      }),
      boss({
        id: "will",
        bossName: "윌",
        icon: WillIcon,
        difficulties: [easy(34000000), normal(43300000), hard(81200000)],
      }),
      boss({
        id: "dusk",
        bossName: "더스크",
        icon: DuskIcon,
        difficulties: [normal(46300000), chaos(73500000)],
      }),
      boss({
        id: "verus_hilla",
        bossName: "진 힐라",
        icon: VerusHillaIcon,
        difficulties: [normal(74900000), hard(112000000)],
      }),
      boss({
        id: "dunkel",
        bossName: "듄켈",
        icon: DunkelIcon,
        difficulties: [normal(50000000), hard(99400000)],
      }),
      boss({
        id: "chosen_seren",
        bossName: "선택받은 세렌",
        icon: ChosenSerenIcon,
        difficulties: [normal(266000000), hard(396000000), extreme(3150000000)],
      }),
      boss({
        id: "kalos_the_guardian",
        bossName: "감시자 칼로스",
        icon: KalosGuardianIcon,
        difficulties: [
          easy(311000000),
          normal(561000000),
          chaos(1340000000),
          extreme(4320000000),
        ],
      }),
      boss({
        id: "first_adversary",
        bossName: "최초의 대적자",
        icon: FirstAdversaryIcon,
        difficulties: [
          easy(324000000),
          normal(589000000),
          hard(1510000000),
          extreme(4960000000),
        ],
        maxPartySize: 3,
      }),
      boss({
        id: "kaling",
        bossName: "카링",
        icon: KalingIcon,
        difficulties: [
          easy(419000000),
          normal(714000000),
          hard(1830000000),
          extreme(5670000000),
        ],
      }),
      boss({
        id: "radiant_malefic",
        bossName: "찬란한 흉성",
        icon: RadiantMaleficIcon,
        difficulties: [normal(658000000), hard(2819000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "limbo",
        bossName: "림보",
        icon: LimboIcon,
        difficulties: [normal(1080000000), hard(2510000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "baldrix",
        bossName: "발드릭스",
        icon: BaldrixIcon,
        difficulties: [normal(1440000000), hard(3240000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "jupiter",
        bossName: "유피테르",
        icon: JupiterIcon,
        difficulties: [normal(1700000000), hard(5100000000)],
        maxPartySize: 3,
      }),
    ],
  },
  {
    key: "monthly",
    label: "월간",
    weeklyMultiplier: 0.25,
    monthlyMultiplier: 1,
    bosses: [
      boss({
        id: "black_mage",
        bossName: "검은 마법사",
        icon: BlackMageIcon,
        difficulties: [hard(700000000), extreme(9200000000)],
      }),
    ],
  },
];

export const periodGroups = allPeriodGroups.filter(
  ({ key }) => key === "weekly",
);
