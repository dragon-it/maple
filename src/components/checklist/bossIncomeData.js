import BaldrixIcon from "../../assets/pages/checklist/Baldrix_icon.png";
import BellonaIcon from "../../assets/pages/checklist/Bellona_icon.png";
import BlackMageIcon from "../../assets/pages/checklist/Black_Mage_icon.png";
import BloodyQueenIcon from "../../assets/pages/checklist/Bloody_Queen_icon.png";
import ChosenSerenIcon from "../../assets/pages/checklist/Chosen_Seren_icon.png";
import DamienIcon from "../../assets/pages/checklist/Damien_icon.png";
import DunkelIcon from "../../assets/pages/checklist/Dunkel_icon.png";
import DuskIcon from "../../assets/pages/checklist/Dusk_icon.png";
import FirstAdversaryIcon from "../../assets/pages/checklist/First_Adversary_icon.png";
import GuardianAngelSlimeIcon from "../../assets/pages/checklist/Guardian_Angel_Slime_icon.png";
import JupiterIcon from "../../assets/pages/checklist/Jupiter_icon.png";
import KalingIcon from "../../assets/pages/checklist/Kaling_icon.png";
import KalosGuardianIcon from "../../assets/pages/checklist/Kalos_the_Guardian_icon.png";
import LimboIcon from "../../assets/pages/checklist/Limbo_icon.png";
import LotusIcon from "../../assets/pages/checklist/Lotus_icon.png";
import LucidIcon from "../../assets/pages/checklist/Lucid_icon.png";
import MagnusIcon from "../../assets/pages/checklist/Magnus_icon.png";
import PapulatusIcon from "../../assets/pages/checklist/Papulatus_icon.png";
import PierreIcon from "../../assets/pages/checklist/Pierre_icon.png";
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
  isSeasonBoss = false,
}) => ({
  id,
  bossName,
  icon,
  levelRequirement,
  difficulties,
  maxPartySize,
  isSeasonBoss,
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
        difficulties: [chaos(4040000)],
      }),
      boss({
        id: "magnus_hard",
        bossName: "매그너스",
        icon: MagnusIcon,
        difficulties: [hard(4280000)],
      }),
      boss({
        id: "papulatus_chaos",
        bossName: "파풀라투스",
        icon: PapulatusIcon,
        difficulties: [chaos(6550000)],
      }),
      boss({
        id: "pierre_chaos",
        bossName: "피에르",
        icon: PierreIcon,
        difficulties: [chaos(4080000)],
      }),
      boss({
        id: "von_bon_chaos",
        bossName: "반반",
        icon: VonBonIcon,
        difficulties: [chaos(4070000)],
      }),
      boss({
        id: "bloody_queen_chaos",
        bossName: "블러디퀸",
        icon: BloodyQueenIcon,
        difficulties: [chaos(4070000)],
      }),
      boss({
        id: "vellum_chaos",
        bossName: "벨룸",
        icon: VellumIcon,
        difficulties: [chaos(4640000)],
      }),
      boss({
        id: "lotus",
        bossName: "스우",
        icon: LotusIcon,
        difficulties: [normal(8350000), hard(48900000), extreme(545000000, 2)],
      }),
      boss({
        id: "damien",
        bossName: "데미안",
        icon: DamienIcon,
        difficulties: [normal(8750000), hard(46400000)],
      }),
      boss({
        id: "guardian_angel_slime",
        bossName: "가디언 엔젤 슬라임",
        icon: GuardianAngelSlimeIcon,
        difficulties: [normal(12700000), chaos(71300000)],
      }),
      boss({
        id: "lucid",
        bossName: "루시드",
        icon: LucidIcon,
        difficulties: [easy(14900000), normal(17800000), hard(59700000)],
      }),
      boss({
        id: "will",
        bossName: "윌",
        icon: WillIcon,
        difficulties: [easy(16100000), normal(20500000), hard(73200000)],
      }),
      boss({
        id: "dusk",
        bossName: "더스크",
        icon: DuskIcon,
        difficulties: [normal(22000000), chaos(66300000)],
      }),
      boss({
        id: "verus_hilla",
        bossName: "진 힐라",
        icon: VerusHillaIcon,
        difficulties: [normal(67600000), hard(100000000)],
      }),
      boss({
        id: "dunkel",
        bossName: "듄켈",
        icon: DunkelIcon,
        difficulties: [normal(23700000), hard(89600000)],
      }),
      boss({
        id: "chosen_seren",
        bossName: "선택받은 세렌",
        icon: ChosenSerenIcon,
        difficulties: [normal(167000000), hard(302000000), extreme(1840000000)],
      }),
      boss({
        id: "kalos_the_guardian",
        bossName: "감시자 칼로스",
        icon: KalosGuardianIcon,
        difficulties: [
          easy(238000000),
          normal(479000000),
          chaos(1230000000),
          extreme(4104000000),
        ],
      }),
      boss({
        id: "first_adversary",
        bossName: "최초의 대적자",
        icon: FirstAdversaryIcon,
        difficulties: [
          easy(261000000),
          normal(532000000),
          hard(1390000000),
          extreme(4712000000),
        ],
        maxPartySize: 3,
      }),
      boss({
        id: "kaling",
        bossName: "카링",
        icon: KalingIcon,
        difficulties: [
          easy(320000000),
          normal(576000000),
          hard(1560000000),
          extreme(5387000000),
        ],
      }),
      boss({
        id: "radiant_malefic",
        bossName: "찬란한 흉성",
        icon: RadiantMaleficIcon,
        difficulties: [normal(593000000), hard(2678000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "Bellona",
        bossName: "벨로나",
        icon: BellonaIcon,
        difficulties: [easy(396000000), normal(824000000), hard(2950000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "limbo",
        bossName: "림보",
        icon: LimboIcon,
        difficulties: [normal(995000000), hard(2385000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "baldrix",
        bossName: "발드릭스",
        icon: BaldrixIcon,
        difficulties: [normal(1320000000), hard(3078000000)],
        maxPartySize: 3,
      }),
      boss({
        id: "jupiter",
        bossName: "유피테르",
        icon: JupiterIcon,
        difficulties: [normal(1560000000), hard(4845000000)],
        maxPartySize: 3,
      }),
    ],
  },
  {
    key: "monthly",
    label: "월간",
    weeklyMultiplier: 0,
    monthlyMultiplier: 1,
    bosses: [
      boss({
        id: "black_mage",
        bossName: "검은 마법사",
        icon: BlackMageIcon,
        difficulties: [hard(465000000), extreme(5680000000)],
      }),
    ],
  },
];

export const periodGroups = allPeriodGroups;
