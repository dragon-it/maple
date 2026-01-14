import React, { useState } from "react";
import styled from "styled-components";

export const AbilityInformation = ({ AbilityInfo, blur = false }) => {
  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPreset = AbilityInfo[`ability_preset_${selectedPreset}`];

  const getGradeColor = (grade) => {
    switch (grade) {
      case "에픽":
        return "rgb(127,102,211)";
      case "레어":
        return "rgb(54,184,208)";
      case "유니크":
        return "rgb(232,156,9)";
      case "레전드리":
        return "rgb(164,199,0)";
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

  const backgroundColors = currentPreset.ability_info.map((info) =>
    getGradeColor(info.ability_grade)
  );
  const formattedRemainFame = AbilityInfo.remain_fame.toLocaleString();

  return (
    <Container>
      <PresetWrap>
        <AbilityHeader>ABILITY</AbilityHeader>
        <AbilityGradeHeader>
          어빌리티 등급 :{" "}
          <RevealValue $blurred={blur}>
            {currentPreset.ability_preset_grade}
          </RevealValue>
        </AbilityGradeHeader>
        <AbilityDetail>
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
  padding: 3px;
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

const AbilityGradeHeader = styled.p`
  font-family: maple-light;
  margin-bottom: 5px;
`;

const AbilityNoData = styled.p`
  font-family: maple-light;
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
  filter: ${({ $blurred }) => ($blurred ? "blur(12px)" : "blur(0)")};
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
