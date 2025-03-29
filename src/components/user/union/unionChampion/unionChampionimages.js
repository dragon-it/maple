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

import champion_icon_archer from "../../../../assets/pages/user/union/champion/classIcons/champion_archer.png";
import champion_icon_fighter from "../../../../assets/pages/user/union/champion/classIcons/champion_fighter.png";
import champion_icon_pirate from "../../../../assets/pages/user/union/champion/classIcons/champion_pirate.png";
import champion_icon_thief from "../../../../assets/pages/user/union/champion/classIcons/champion_thief.png";
import champion_icon_wizard from "../../../../assets/pages/user/union/champion/classIcons/champion_wizard.png";
import champion_icon_xenon from "../../../../assets/pages/user/union/champion/classIcons/champion_xenon.png";

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
  0: { 0: champion_insignia_0_0, 1: champion_insignia_0_1 },
  1: { 0: champion_insignia_1_0, 1: champion_insignia_1_1 },
  2: { 0: champion_insignia_2_0, 1: champion_insignia_2_1 },
  3: { 0: champion_insignia_3_0, 1: champion_insignia_3_1 },
  4: { 0: champion_insignia_4_0, 1: champion_insignia_4_1 },
};

const icon = {
  archer: champion_icon_archer,
  fighter: champion_icon_fighter,
  pirate: champion_icon_pirate,
  thief: champion_icon_thief,
  wizard: champion_icon_wizard,
  xenon: champion_icon_xenon,
};

export default { card_Backgrnd, rank, insignia, icon };
