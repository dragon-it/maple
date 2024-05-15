import React, { useState } from 'react';
import styled from 'styled-components';


export const AbilityInformation = ({ AbilityInfo }) => {
  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPreset = AbilityInfo[`ability_preset_${selectedPreset}`];


  const getGradeColor = (grade) => {
    switch (grade) {
      case '에픽':
        return 'rgb(127,102,211)';
      case '레어':
        return 'rgb(54,184,208)';
      case '유니크':
        return 'rgb(232,156,9)';
      case '레전드리':
        return 'rgb(164,199,0)';
      default:
        return 'white'; 
    }
  };

  const backgroundColors = currentPreset.ability_info.map(info => getGradeColor(info.ability_grade));
  const formattedRemainFame = AbilityInfo.remain_fame.toLocaleString();

  return (
    <Container>
      <PresetWrap>
        <AbilityHeader>ABILITY</AbilityHeader>
        <AbilityGradeHeader>어빌리티 등급 : {currentPreset.ability_preset_grade}</AbilityGradeHeader>
        <AbilityDetail>
          {backgroundColors.map((color, index) => (
            <p key={index} style={{ backgroundColor: color }}>
              {currentPreset.ability_info[index].ability_value}
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
                isSelected={selectedPreset === presetNumber}>
                {presetNumber} 
              </PresetButton>
            ))}   
          </ButtonWrap>    
          <RemainFame><div>명성치 :</div> {formattedRemainFame}</RemainFame>
        </ButtonContainer>
      </PresetWrap>
    </Container>
  );
};


const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 5px 0;
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  color: white;
  img{
    width: 100%;
    height: 100%;
    transition: 1s;
  }
`;

const PresetWrap = styled.div`
  line-height: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  p{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100%;
    height: 24px;
    padding-left: 1px;
    padding-right: 1px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 6px;
  }
`;

const AbilityHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 5px;
`
const AbilityDetail = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
  padding: 3px;
  margin-bottom: 10px;
  border-radius: 5px;
`


const AbilityGradeHeader = styled.div`
  font-family: maple-light;
  margin-bottom: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  padding: 0 3px;
  background-color: #aaa9a9;
  border-radius: 5px;
  font-family: maple-light;
`;

const RemainFame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 50%;
  padding: 0 3px;
  font-size: 12px;
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
`

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 2px;
`
const PresetHeader = styled.div`
  font-size: 13px;
  text-shadow: none;
  color: black;
`

const PresetButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.isSelected? `filter: brightness(0.5);`: ''}
`;

export default AbilityInformation;