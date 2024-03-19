import React, { useState } from 'react';
import styled from 'styled-components';
import equipmentUi from '../../../assets/ui/equipmentUi/equipUi.png'
import _ from 'lodash';
import { ItemDetail } from './ItemDetail';
import gradeColors from './ItemGradeColors'
import { ItemSetEffect } from './ItemSetEffect';
import { ItemSymbol } from './ItemSymbol';

export const ItemEquipmentInformation = ({ EquipData }) => {
  console.log(EquipData)
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
    '모자': {top: '6px', left: '108px'},
    '얼굴장식': {top: '55px', left: '108px'},
    '눈장식': {top: '104px', left: '108px'},
    '귀고리': {top: '104px', left: '157px'},
    '상의': {top: '154px', left: '108px'},
    '하의': {top: '203px', left: '108px'},
    '신발': {top: '252px', left: '108px'},
    '장갑': {top: '203px', left: '157px'},
    '망토': {top: '203px', left: '206px'},
    '보조무기': {top: '154px', left: '206px'},
    '무기': {top: '154px', left: '59px'},
    '반지1': {top: '6px', left: '10px'},
    '반지2': {top: '55px', left: '10px'},
    '반지3': {top: '104px', left: '10px'},
    '반지4': {top: '154px', left: '10px'},
    '펜던트': {top: '55px', left: '59px'},
    '훈장': {top: '104px', left: '206px'},
    '벨트': {top: '203px', left: '59px'},
    '어깨장식': {top: '154px', left: '157px'},
    '포켓 아이템': {top: '203px', left: '10px'},
    '기계 심장': {top: '252px', left: '206px'},
    '뱃지': {top: '55px', left: '206px'},
    '엠블렘': {top: '6px', left: '206px'},
    '펜던트2': {top: '104px', left: '59px'}
    };

  const PresetButton = styled.button`
    position: relative;
    border: 2px solid gray;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
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
          <BackgroundImageWrap/>
          <EquipItems>
          <BackgroundImage src={equipmentUi} alt="ui" />
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
      </InfoWrap>
      <DetailWrap>
        <ItemDetail item={selectedItem} clicked={clicked} gradeColors={gradeColors} > </ItemDetail>
      </DetailWrap>
      <ItemSetEffect setinfo={EquipData.getSetEffect}/>
      <ItemSymbol symbolData={EquipData.getSymbol}></ItemSymbol>
    </Container>
  );
};

const Container = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  gap: 5px;
  background-color: rgb(242,247,255);
`;

const InfoWrap = styled.div`
    width: 300px;
    height: 368px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const UiBackgrnd = styled.div`
  position: relative;
  border-radius: 5px;
  border: 2px solid rgba(99, 94, 94, 0.952);
  outline: 1px solid black;
  

`;

const BackgroundImageWrap = styled.div`
  width: 262px;
  height: 312px;
`

const BackgroundImage = styled.img`
  width: 262px;
  height: 312px;
  opacity: 0.8;
`;

const EquipItems = styled.div`
  position: absolute;
  top: 0;
`;


const PresetButtons = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  span{
    position: absolute;
    bottom: 30px;
    font-family: maple-light;
    
  }
`

const DetailWrap = styled.div`
  
`