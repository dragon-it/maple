import React, { useState } from "react";
import styled from "styled-components";
const getGradeClass = (grade) => {
  switch (grade) {
    case "노멀":
    case "Normal":
    case "normal":
      return "normal";
    case "레어":
    case "Rare":
    case "rare":
      return "rare";
    case "유니크":
    case "Unique":
    case "unique":
      return "unique";
    case "에픽":
    case "Epic":
    case "epic":
      return "epic";
    case "레전드리":
    case "Legendary":
    case "legendary":
      return "legendary";
    default:
      return "normal";
  }
};

export const AbilityInformation = ({ AbilityInfo, blur = false }) => {
  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPreset = AbilityInfo[`ability_preset_${selectedPreset}`];

  const getGradeColor = (grade) => {
    switch (grade) {
      case "에픽":
      case "Epic":
      case "epic":
        return "rgb(127,102,211)";
      case "레어":
      case "Rare":
      case "rare":
        return "rgb(54,184,208)";
      case "유니크":
      case "Unique":
      case "unique":
        return "rgb(232,156,9)";
      case "레전드리":
      case "Legendary":
      case "legendary":
        return "rgb(164,199,0)";
      case "노멀":
      case "Normal":
      case "normal":
        return "rgb(120,120,120)";
      default:
        return "white";
    }
  };

  if (!currentPreset) {
    return (
      <Container>
        <NoDataWrap>
          <AbilityHeader>ABILITY</AbilityHeader>
          <AbilityNoData>데이터가 없습니다.</AbilityNoData>
        </NoDataWrap>
      </Container>
    );
  }

  const grade = currentPreset.ability_preset_grade || AbilityInfo.ability_grade;
  const gradeClass = getGradeClass(grade);

  const backgroundColors = currentPreset.ability_info.map((info) =>
    getGradeColor(info.ability_grade)
  );
  const formattedRemainFame = AbilityInfo.remain_fame.toLocaleString();

  return (
    <Container>
      <PresetWrap>
        <AbilityHeader>ABILITY</AbilityHeader>
        <AbilityDetail>
          <AbilityGradeHeader>
            <div className={`ability-title ${gradeClass}`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 22L12 14L5 22V2H19V22Z" />
              </svg>
              <span>{grade || "어빌리티 등급"} 어빌리티</span>
            </div>
          </AbilityGradeHeader>
          {backgroundColors.map((color, index) => (
            <p
              key={index}
              style={{
                backgroundColor: color,
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <RevealValue $blurred={blur}>
                {currentPreset.ability_info[index].ability_value}
              </RevealValue>
            </p>
          ))}
        </AbilityDetail>
        <ButtonContainer>
          <ButtonWrap>
            <PresetHeader>PRESET</PresetHeader>
            {[1, 2, 3].map((presetNumber) => (
              <PresetButton
                key={presetNumber}
                onClick={() => handlePresetChange(presetNumber)}
                $isSelected={selectedPreset === presetNumber}
              >
                {presetNumber}
              </PresetButton>
            ))}
          </ButtonWrap>
          <RemainFame>
            <span>
              명성치 <RevealValue $blurred={blur}>{formattedRemainFame}</RevealValue>
            </span>
          </RemainFame>
        </ButtonContainer>
      </PresetWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 5px 0;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);
  font-size: 12px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: rgb(247, 247, 247);
`;

const NoDataWrap = styled.div`
  line-height: 20px;
  flex-direction: column;
  padding: 0 5px;
`;

const PresetWrap = styled.div`
  line-height: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`;

const AbilityHeader = styled.h2`
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 3px;
`;

const AbilityDetail = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px;
  margin-bottom: 10px;
  border-radius: 5px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100%;
    height: 24px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 6px;
  }
`;

const AbilityGradeHeader = styled.div`
  margin-bottom: 1px;

  .ability-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 3px;
    height: 26px;
    padding-left: 5px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
  }

  .ability-title.normal {
    background: linear-gradient(180deg, #4D4D55 0%, #3A3A42 100%);
    border: 1px solid #2E2E36;
    border-top-color: #5A5A62;
    border-bottom: 2px solid rgba(46, 53, 61, 0.3);
    color: #C8C8C8;
  }
  .ability-title.rare {
    background: 
      linear-gradient(180deg, #3AB6D1 0%, #259ABB 100%) padding-box,
      linear-gradient(180deg, #54D7E6 0%, #4CCADB 20%, #2CA4BF 80%, #27A1C0 100%) border-box;
    border: 1px solid transparent;
    border-bottom: 2px solid rgba(46, 53, 61, 0.3);
    color: #FFFFFF;
  }
  .ability-title.unique {
    background: 
      linear-gradient(180deg, #F3B50E 0%, #E89D09 100%) padding-box,
      linear-gradient(180deg, #F8D614 0%, #F0CA16 20%, #E4A70E 80%, #EAA30A 100%) border-box;
    border: 1px solid transparent;
    border-bottom: 2px solid rgba(46, 53, 61, 0.3);
    color: #FFFFFF;
  }
  .ability-title.epic {
    background: 
      linear-gradient(180deg, #7E66D2 0%, #6750B2 100%) padding-box,
      linear-gradient(180deg, #B894E7 0%, #AA89E1 20%, #725BB8 80%, #6E56B7 100%) border-box;
    border: 1px solid transparent;
    border-bottom: 2px solid rgba(46, 53, 61, 0.3);
    color: #FFFFFF;
  }
  .ability-title.legendary {
    background: 
      linear-gradient(180deg, #A5C205 0%, #85A911 100%) padding-box,
      linear-gradient(180deg, #CEDE07 0%, #C0D30C 20%, #92B014 80%, #8CAE12 100%) border-box;
    border: 1px solid transparent;
    border-bottom: 2px solid rgba(46, 53, 61, 0.3);
    color: #FFFFFF;
  }
`;

const AbilityNoData = styled.p`
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  padding: 0 3px;
  background-color: rgb(180, 180, 180);
  border-radius: 5px;
`;

const RemainFame = styled.span`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 10px;
  width: 50%;
  height: 20px;
  font-size: 12px;
  border-radius: 10px;
  background-color: rgba(59, 66, 75, 0.9);
  border-top: 2px solid rgb(38, 43, 49);
  border-left: 1px solid rgb(62, 73, 81);
  border-right: 1px solid rgb(62, 73, 81);
  box-shadow: 0px 1px 0px rgb(133, 145, 145);
  color: white;
`;

const RevealValue = styled.span`
  filter: ${({ $blurred }) => ($blurred ? "blur(12px)" : "none")};
  transition: filter 0.45s ease;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 2px;
`;

const PresetHeader = styled.span`
  font-size: 14px;
  font-weight: 700;
  text-shadow: none;
  color: rgb(39, 39, 39);
`;

const PresetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  color: ${(props) =>
    props.$isSelected ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)"};
  background: ${(props) =>
    props.$isSelected ? "rgb(68, 79, 89)" : "rgb(130, 143, 154)"};
  border: 1px solid
    ${(props) => (props.$isSelected ? "rgb(247, 247, 247)" : "rgb(	69, 77, 87)")};
  &:hover {
    filter: brightness(1.2);
  }
`;

export default AbilityInformation;
