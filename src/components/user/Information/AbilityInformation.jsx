import React, { useState } from 'react';
import styled from 'styled-components';
import rare from '../../../assets/ui/abilityUi/ability_preset_grade_rare.png'
import epic from '../../../assets/ui/abilityUi/ability_preset_grade_epic.png'
import unique from '../../../assets/ui/abilityUi/ability_preset_grade_unique.png'
import legendary from '../../../assets/ui/abilityUi/ability_preset_grade_legendary.png'
import rareBackgnd from '../../../assets/ui/abilityUi/abilityRareBackgnd.png'
import epicBackgnd from '../../../assets/ui/abilityUi/abilityEpicBackgnd.png'
import uniqueBackgnd from '../../../assets/ui/abilityUi/abilityUniqueBackgnd.png'
import legendaryBackgnd from '../../../assets/ui/abilityUi/abilityLegendaryBackgnd.png'
import backgroundImage from '../../../assets/ui/abilityUi/abilityBackgnd2.png'
import presetBtn1 from '../../../assets/ui/abilityUi/presetBtn1.png'
import presetBtn2 from '../../../assets/ui/abilityUi/presetBtn2.png'
import presetBtn3 from '../../../assets/ui/abilityUi/presetBtn3.png'

export const AbilityInformation = ({ AbilityInfo }) => {
  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPreset = AbilityInfo[`ability_preset_${selectedPreset}`];

  // 이미지 경로를 설정하는 함수
  const getImagePath = (grade) => {
    switch (grade) {
      case '에픽':
        return epic;
      case '레어':
        return rare;
      case '유니크':
        return unique;
      case '레전드리':
        return legendary;
      default:
        return '';
    }
  };

  // 등급에 따른 이미지를 가져오는 함수
  const getGradeImage = (grade) => {
    switch (grade) {
      case '에픽':
        return epicBackgnd;
      case '레어':
        return rareBackgnd;
      case '유니크':
        return uniqueBackgnd;
      case '레전드리':
        return legendaryBackgnd;
      default:
        return backgroundImage;
    }
  };

  const imagePath = getImagePath(currentPreset.ability_preset_grade);
  const backgroundImagePath0 = getGradeImage(currentPreset.ability_info[0].ability_grade);
  const backgroundImagePath1 = getGradeImage(currentPreset.ability_info[1].ability_grade);
  const backgroundImagePath2 = getGradeImage(currentPreset.ability_info[2].ability_grade);
  const formattedRemainFame = AbilityInfo.remain_fame.toLocaleString(); 
  const buttonImages = [presetBtn1, presetBtn2, presetBtn3];
  
  return (
    <Container>
      <PresetWrap>
          <img src={imagePath} alt={currentPreset.ability_preset_grade} />
        <p style={{ backgroundImage: `url(${backgroundImagePath0})` }}>
          {currentPreset.ability_info[0].ability_value}
        </p>
        <p style={{ backgroundImage: `url(${backgroundImagePath1})` }}>
          {currentPreset.ability_info[1].ability_value}
        </p>
        <p style={{ backgroundImage: `url(${backgroundImagePath2})` }}>
          {currentPreset.ability_info[2].ability_value}
        </p>
        <span>{formattedRemainFame}</span>
      </PresetWrap>
      <ButtonContainer>
        {[1, 2, 3].map((presetNumber, index) => (
          <PresetButton
            key={presetNumber}
            onClick={() => handlePresetChange(presetNumber)}
            isSelected={selectedPreset === presetNumber}
            buttonImage={buttonImages[index]}>
          </PresetButton>
        ))}
      </ButtonContainer>
    </Container>
  );
};


const Container = styled.div`
  position: relative;
  display: block;
  width: 246px;
  height: 191px;
  margin-right: 50px;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  object-fit: cover;
  font-size: 12px;
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
  align-items: center;
  justify-content: center;
  margin-top: 9px;
  :first-child{
    margin-bottom: 2px;
    height: 26px;
    width: 220px;
    margin-top: 5px;
  }
  p{
    font-size: 11px;
    width: 220px;
    height: 21px;
    padding-left: 1px;
    padding-right: 1px;
    margin-bottom: 2px;
    color: white;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 6px;
  }
  span{
    margin-top: 32px;
    padding-left: 115px;
    width: 100%;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 80px;
  bottom: 44px;
`;

const PresetButton = styled.button`
  margin-right: 5px;
  background-image: url(${(props) => props.buttonImage});
  background-size: cover;
  border: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.isSelected? `filter: brightness(1.3);`: ''}
`;

export default AbilityInformation;