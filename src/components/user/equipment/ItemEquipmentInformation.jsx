import React, { useState } from 'react';
import styled from 'styled-components';
import equipmentUi from '../../../assets/ui/equipmentUi/equipUi.png'
import _ from 'lodash';
import { ItemDetail } from './ItemDetail';


export const ItemEquipmentInformation = ({ EquipData }) => {
const presetKeys = Object.keys(EquipData)
  .filter(key => key !== 'item_equipment' && key.startsWith('item_equipment_preset'));

const matchingPresetKey = presetKeys.find(key => {
  const presetData = EquipData[key];
  const sortedPresetData = _.sortBy(presetData, 'item_equipment_part');
  const sortedItemEquipment = _.sortBy(EquipData.item_equipment, 'item_equipment_part');
  
  const isEqual = _.isEqual(sortedPresetData, sortedItemEquipment);
  
  return isEqual;
});

const [selectedPreset, setSelectedPreset] = useState(matchingPresetKey || 'item_equipment');
const [selectedItem, setSelectedItem] = useState(null);
const [clicked, setClicked] = useState(false); // 클릭 이벤트를 관리하는 state 추가

const handleItemHover = (item) => {
  if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동하도록
    setSelectedItem(item);
  }
};

const handleItemClick = (item) => {
  setSelectedItem(item);
  setClicked(!clicked); // 클릭 시 clicked 상태를 반전
};

console.log(selectedItem);

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


  const PresetButton = styled.button`
    position: relative;
    border: 2px solid gray;
    border-radius: 5px;
    background-color: white;
    ${({ isSelected }) => isSelected && `
      border: 2px solid blue;
      background-color: lightblue;
    `}
    span{
      display: flex;
      justify-content: center;
      align-items: center;
      position:absolute;
      top: -10px;
      left: 50px;
    }
`;

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
  setSelectedPreset(`item_equipment_${preset}`);
};

return (
  <Container>
    <InfoWrap>
        <UiBackgrnd>
          <img src={equipmentUi} alt="ui" />
          <PresetButtons>
            {matchingPresetKey === selectedPreset && <span>현재 적용중인 프리셋이에요!</span>}
            <PresetButton 
              onClick={() => handlePresetChange('preset_1')}
              isSelected={selectedPreset === 'item_equipment_preset_1'}
            >
              <div>프리셋1</div>
            </PresetButton>
            <PresetButton 
              onClick={() => handlePresetChange('preset_2')}
              isSelected={selectedPreset === 'item_equipment_preset_2'}
            >
              <div>프리셋2</div>
            </PresetButton>
            <PresetButton 
              onClick={() => handlePresetChange('preset_3')}
              isSelected={selectedPreset === 'item_equipment_preset_3'}
            >
              <div>프리셋3</div>
            </PresetButton>
          </PresetButtons>
        </UiBackgrnd>
        <EquipItems>
        {EquipData[selectedPreset]?.map((item, index) => (
          <ItemIcon 
            key={index} 
            style={positions[item.item_equipment_slot]} 
            grade={item.potential_option_grade}
            gradeColors={gradeColors}
            onClick={() => handleItemClick(item)} // 클릭 시 handleItemClick 함수 호출
            onMouseOver={() => handleItemHover(item)} // 마우스 오버 시 handleItemHover 함수 호출
          >
        <img src={item.item_icon} alt={`icon-${index}`} />
          </ItemIcon>
        ))}
        </EquipItems> 
      </InfoWrap>
      <DetailWrap>
        <ItemDetail item={selectedItem} clicked={clicked}></ItemDetail>
      </DetailWrap>
    </Container>
  );
};

const Container = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: row;
`;

const InfoWrap = styled.div`
    width: 300px;
    height: 368px;
    display: flex;
    justify-content: center;
    align-items: center;
`

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
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span{
    position: absolute;
    bottom: 30px;
  }
`

const DetailWrap = styled.div`
  
`