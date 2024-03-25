import React, { useState } from 'react';
import styled from 'styled-components';
import equipmentUi from '../../../assets/ui/equipmentUi/equipUi.png'
import cashEquipUi from '../../../assets/ui/equipmentUi/cashEquipUi.png'

import { ItemDetail } from './ItemDetail';
import gradeColors from './ItemGradeColors'
import { ItemSetEffect } from './ItemSetEffect';
import { ItemSymbol } from './ItemSymbol';
import { CashItemDetail } from './CashItemDetail';

export const ItemEquipmentInformation = ({ EquipData }) => {
  console.log(EquipData)
  const matchingPresetKey = `item_equipment_preset_${EquipData.preset_no}`;
  const matchingCashPresetKey = `cash_item_equipment_preset_${EquipData.getCashItemEquipment.preset_no}`;

  const [selectedPreset, setSelectedPreset] = useState(matchingPresetKey || 'item_equipment_preset_1');
  const [selectedCashPreset, setSelectedCashPreset] = useState(matchingCashPresetKey || 'cash_item_equipment_preset_1');

  const [selectedItem, setSelectedItem] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleItemHover = (item) => {
    if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem(item);
    }
  };

  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setClicked(!clicked); // 클릭 시 clicked 상태 반전
  };


  const handlePresetChange = (preset) => {
    setSelectedPreset(`item_equipment_${preset}`);
  };
  
  const handleCashPresetChange = (preset) => {
    setSelectedCashPreset(`cash_item_equipment_${preset}`)
  }

  const handleCashItemBase = () => {
    setSelectedCashPreset(`cash_item_equipment_base`)
  }
  
  const [currentTab, setCurrentTab] = useState('장비'); 
  
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSelectedItem(null);
    setClicked(false);
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

    const cashPositions = {
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
`;

  const ItemIcon = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    cursor: pointer;
    border: ${({ grade, gradeColors }) => `2px solid ${gradeColors && gradeColors[grade] ? gradeColors[grade] : 'none'}`};
  `;
  

return (
  <Container>
    <InfoWrap>
    <TabMenu>
      <TabButton isSelected={currentTab === '장비'} onClick={() => handleTabChange('장비')}>장비</TabButton>
      <TabButton isSelected={currentTab === '캐시'} onClick={() => handleTabChange('캐시')}>캐시</TabButton>
      <TabButton isSelected={currentTab === '펫'} onClick={() => handleTabChange('펫')}>펫</TabButton>
      <TabButton isSelected={currentTab === 'AD'} onClick={() => handleTabChange('AD')}>AD</TabButton>
    </TabMenu>
        <UiBackgrnd>
        {currentTab === '장비' && (
          <EquipWrap>
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
            <PresetButtonWrap>
              <PresetButtons>
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
              {matchingPresetKey === selectedPreset && <ApplyingPreset>현재 적용중인 프리셋이에요!</ApplyingPreset>}
            </PresetButtonWrap>
          </EquipWrap>
        )}
        {currentTab === '캐시' && (
          <EquipWrap>
          <BackgroundImageWrap/>
          <EquipItems>
            <BackgroundImage src={cashEquipUi} alt="ui" />
            {EquipData.getCashItemEquipment[selectedCashPreset]?.map((item, index) => (
            <ItemIcon 
              key={index} 
              style={cashPositions[item.cash_item_equipment_slot]} 
              onClick={() => handleItemClick(item)} // 클릭 시 handleItemClick 함수 호출
              onMouseOver={() => handleItemHover(item)} // 마우스 오버 시 handleItemHover 함수 호출
            >
            <img src={item.cash_item_icon} alt={`icon-${index}`} />
            </ItemIcon>
          ))}
          </EquipItems> 
          <PresetButtonWrap>
              <BaseButton
                onClick={() => handleCashItemBase()}
                isSelected={selectedCashPreset === 'cash_item_equipment_base'}
                >
                <div>BASE</div>
              </BaseButton>
              <PresetButtons>
                <PresetButton 
                  onClick={() => handleCashPresetChange('preset_1')}
                  isSelected={selectedCashPreset === 'cash_item_equipment_preset_1'}
                >
                  <div>프리셋1</div>
                </PresetButton>
                <PresetButton 
                  onClick={() => handleCashPresetChange('preset_2')}
                  isSelected={selectedCashPreset === 'cash_item_equipment_preset_2'}
                >
                  <div>프리셋2</div>
                </PresetButton>
                <PresetButton 
                  onClick={() => handleCashPresetChange('preset_3')}
                  isSelected={selectedCashPreset === 'cash_item_equipment_preset_3'}
                >
                  <div>프리셋3</div>
                </PresetButton>
              </PresetButtons>
              {matchingPresetKey === selectedPreset && <ApplyingPreset>현재 적용중인 프리셋이에요!</ApplyingPreset>}
            </PresetButtonWrap>

        </EquipWrap>
        )}
        {currentTab === '펫' && (
          <></>
        )}
        {currentTab === 'AD' && (
          <></>
        )}

        </UiBackgrnd>
      </InfoWrap>
      <DetailWrap>
        {currentTab === '캐시' ? (
          <CashItemDetail item={selectedItem} clicked={clicked}/>
        ) : currentTab === '장비' ? (
          <ItemDetail item={selectedItem} clicked={clicked} gradeColors={gradeColors}/>
        ) : null}
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


const EquipWrap = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InfoWrap = styled.div`
  width: 300px;
  height: 470px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
`
const TabMenu = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TabButton = styled.button`
  flex-grow: 1;
  padding: 10px;
  background: ${({ isSelected }) => (isSelected ? '#f0f0f0' : 'white')};
  border: none;
  border-top: ${({ isSelected }) => (isSelected ? '1px solid blue' : '1px solid #ddd')};
  cursor: pointer;
`;

const BaseButton = styled.button`
  position: relative;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  ${({ isSelected }) => isSelected && `
    border: 2px solid blue;
    background-color: lightblue;
  `}
`;

const UiBackgrnd = styled.div`
  position: relative;
  border-top: 1px solid black;
  background-color: white;
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

const ApplyingPreset = styled.div`
  margin-top: 10px;
  width: 210px;
  font-family: maple-light;
  text-align: center;
  position: absolute;
  color: white;
`

const PresetButtonWrap = styled.div`

`

const PresetButtons = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const DetailWrap = styled.div`
  
`