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
        return 'white'; // 기본 배경색은 white로 설정
    }
  };
  const backgroundColor0 = getGradeColor(currentPreset.ability_info[0].ability_grade);
  const backgroundColor1 = getGradeColor(currentPreset.ability_info[1].ability_grade);
  const backgroundColor2 = getGradeColor(currentPreset.ability_info[2].ability_grade);
  const formattedRemainFame = AbilityInfo.remain_fame.toLocaleString(); 

  
  return (
    <Container>
      <PresetWrap>
        <AbilityHeader>ABILITY</AbilityHeader>
        <AbilityGradeHeader>어빌리티 등급 : {currentPreset.ability_preset_grade}</AbilityGradeHeader>
        <AbilityDetail>
          <p style={{ backgroundColor: backgroundColor0 }}>
            {currentPreset.ability_info[0].ability_value}
          </p>
          <p style={{ backgroundColor: backgroundColor1 }}>
            {currentPreset.ability_info[1].ability_value}
          </p>
          <p style={{ backgroundColor: backgroundColor2 }}>
            {currentPreset.ability_info[2].ability_value}
          </p>
        </AbilityDetail>
        <ButtonContainer>
          <ButtonWrap>
            <PresetHeader>PRESET</PresetHeader>
              {[1, 2, 3].map((presetNumber, index) => (
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
  display: block;
  width: 280px;
  padding: 5px 0;
  margin-right: 50px;
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
  font-size: 14px;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
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
  padding-top: 21px;
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

  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`


const AbilityGradeHeader = styled.div`
  font-family: maple-light;
  color: white;
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
  color: white;
`

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 2px;
`
const PresetHeader = styled.div`
  font-size: 13px;
`

const PresetButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.isSelected? `filter: brightness(0.5);`: ''}
`;

export default AbilityInformation;