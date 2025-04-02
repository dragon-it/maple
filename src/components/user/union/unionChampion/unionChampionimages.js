import champion_card_Backgrnd_empty from "../../../../assets/pages/user/union/champion/slot/champion_slot_empty.png";
import champion_card_Backgrnd_disabled from "../../../../assets/pages/user/union/champion/slot/champion_slot_disabled.png";

import champion_rank_c from "../../../../assets/pages/user/union/champion/rank/champion_rank_C.png";
import champion_rank_b from "../../../../assets/pages/user/union/champion/rank/champion_rank_B.png";
import champion_rank_a from "../../../../assets/pages/user/union/champion/rank/champion_rank_A.png";
import champion_rank_s from "../../../../assets/pages/user/union/champion/rank/champion_rank_S.png";
import champion_rank_ss from "../../../../assets/pages/user/union/champion/rank/champion_rank_SS.png";
import champion_rank_sss from "../../../../assets/pages/user/union/champion/rank/champion_rank_SSS.png";

import champion_insignia_0_0 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_0_0.png";
import champion_insignia_0_1 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_0_1.png";
import champion_insignia_1_0 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_1_0.png";
import champion_insignia_1_1 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_1_1.png";
import champion_insignia_2_0 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_2_0.png";
import champion_insignia_2_1 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_2_1.png";
import champion_insignia_3_0 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_3_0.png";
import champion_insignia_3_1 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_3_1.png";
import champion_insignia_4_0 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_4_0.png";
import champion_insignia_4_1 from "../../../../assets/pages/user/union/champion/insignia/champion_insignia_4_1.png";

const card_Backgrnd = {
  empty: champion_card_Backgrnd_empty,
  disabled: champion_card_Backgrnd_disabled,
};

const rank = {
  C: champion_rank_c,
  B: champion_rank_b,
  A: champion_rank_a,
  S: champion_rank_s,
  SS: champion_rank_ss,
  SSS: champion_rank_sss,
};

const insignia = {
  first: { 0: champion_insignia_0_0, 1: champion_insignia_0_1 },
  second: { 0: champion_insignia_1_0, 1: champion_insignia_1_1 },
  third: { 0: champion_insignia_2_0, 1: champion_insignia_2_1 },
  fourth: { 0: champion_insignia_3_0, 1: champion_insignia_3_1 },
  fifth: { 0: champion_insignia_4_0, 1: champion_insignia_4_1 },
};

const unionChampionImages = { card_Backgrnd, rank, insignia };

export default unionChampionImages;
