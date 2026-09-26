import styled from "styled-components";
import EasyDifficultyIcon from "../../assets/pages/checklist/icons/Easy_icon.png";
import NormalDifficultyIcon from "../../assets/pages/checklist/icons/Normal__icon.png";
import HardDifficultyIcon from "../../assets/pages/checklist/icons/Hard__icon.png";
import ChaosDifficultyIcon from "../../assets/pages/checklist/icons/Chaos_icon.png";
import ExtremeDifficultyIcon from "../../assets/pages/checklist/icons/Extreme_icon.png";

const difficultyIconMap = {
  easy: EasyDifficultyIcon,
  normal: NormalDifficultyIcon,
  hard: HardDifficultyIcon,
  chaos: ChaosDifficultyIcon,
  extreme: ExtremeDifficultyIcon,
};

export const getDifficultyIcon = (difficultyId) =>
  difficultyIconMap[difficultyId] ?? NormalDifficultyIcon;

export const BossIconWrap = styled.div`
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(79, 86, 93, 0.8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
  background: linear-gradient(180deg, #6c747a 0%, #4a4f54 100%);
`;

export const BossIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const DifficultyIcon = styled.img`
  height: 18px;
  display: block;
  object-fit: contain;
`;
