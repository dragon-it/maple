import React, { useState } from 'react';
import styled from 'styled-components';
import equipmentUi from '../../../assets/ui/equipmentUi/equipUi.png'

export const ItemEquipmentInformation = ({ EquipData }) => {
  const [selectedPreset, setSelectedPreset] = useState('preset1');
  const positions = {    
    '모자': {top: '62px', left: '158px'},
    '얼굴장식': {top: '112px', left: '158px'},
    '눈장식': {top: '161px', left: '158px'},
    '귀고리': {top: '161px', left: '207px'},
    '상의': {top: '210px', left: '158px'},
    '하의': {top: '260px', left: '158px'},
    '신발': {top: '309px', left: '158px'},
    '장갑': {top: '260px', left: '207px'},
    '망토': {top: '260px', left: '256px'},
    '보조무기': {top: '210px', left: '256px'},
    '무기': {top: '210px', left: '109px'},
    '반지1': {top: '63px', left: '60px'},
    '반지2': {top: '112px', left: '60px'},
    '반지3': {top: '161px', left: '60px'},
    '반지4': {top: '210px', left: '60px'},
    '펜던트': {top: '112px', left: '109px'},
    '훈장': {top: '161px', left: '257px'},
    '벨트': {top: '260px', left: '109px'},
    '어깨장식': {top: '210px', left: '207px'},
    '포켓 아이템': {top: '260px', left: '60px'},
    '기계 심장': {top: '308px', left: '257px'},
    '뱃지': {top: '112px', left: '257px'},
    '엠블렘': {top: '62px', left: '257px'},
    '펜던트2': {top: '161px', left: '109px'}
    };

    const gradeColors = {
      '레어': 'rgb(85, 170, 255)',
      '에픽': 'rgb(204, 102, 255)',
      '유니크': 'rgb(255, 204, 0)',
      '레전드리': 'rgb(0, 255, 0)',
    };

    const ItemIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  width: 46px;
  height: 46px;
  cursor: pointer;
  border: ${({ grade, gradeColors }) => `2px solid ${gradeColors[grade] || 'none'}`};
`;

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
  };

  return (
    <Container>
      <UiBackgrnd>
        <img src={equipmentUi} alt="ui" />
      </UiBackgrnd>
      <EquipItems>
      {EquipData[`item_equipment_${selectedPreset}`].map((item, index) => (
  <ItemIcon 
    key={index} 
    style={positions[item.item_equipment_slot]} 
    grade={item.potential_option_grade}
    gradeColors={gradeColors}
  >
    <img src={item.item_icon} alt={`icon-${index}`} />
  </ItemIcon>
))}
      </EquipItems>
      <PresetButtons>
        <button onClick={() => handlePresetChange('preset1')}>Preset 1</button>
        <button onClick={() => handlePresetChange('preset2')}>Preset 2</button>
        <button onClick={() => handlePresetChange('preset3')}>Preset 3</button>
      </PresetButtons>
    </Container>
  );
};

const Container = styled.div`
  white-space: nowrap;
`;

const UiBackgrnd = styled.div`
  position: relative;
  img{
    width: 262px;
    height: 312px;
    opacity: 0.8;
  }
`;

const EquipItems = styled.div`
  display: flex;
  width: 500px;
  flex-wrap: wrap;
`;


const PresetButtons = styled.div`
  
`