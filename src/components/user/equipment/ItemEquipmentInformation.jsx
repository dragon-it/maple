import React, { useState } from 'react';
import styled from 'styled-components';
import equipmentUi from '../../../assets/ui/equipmentUi/equipUi.png'
import cashEquipUi from '../../../assets/ui/equipmentUi/cashEquipUi.png'
import petEquipUi from '../../../assets/ui/equipmentUi/petEquipUi.png'
import androidEquipUi from '../../../assets/ui/equipmentUi/androidEquipUi.png'
import { ItemDetail } from './ItemDetail';
import gradeColors from './ItemGradeColors'
import { ItemSetEffect } from './ItemSetEffect';
import { ItemSymbol } from './ItemSymbol';
import { CashItemDetail } from './CashItemDetail';
import { PetDetail } from './PetDetail';
import { PetItemDetail } from './PetItemDetail';


export const ItemEquipmentInformation = ({ EquipData }) => {
  const matchingPresetKey = `item_equipment_preset_${EquipData.preset_no}`;
  const matchingCashPresetKey = `cash_item_equipment_preset_${EquipData.getCashItemEquipment.preset_no}`;

  const [selectedPreset, setSelectedPreset] = useState(matchingPresetKey || 'item_equipment_preset_1');
  const [selectedCashPreset, setSelectedCashPreset] = useState(matchingCashPresetKey || 'cash_item_equipment_preset_1');

  // select item 설정
  const [selectedItem, setSelectedItem] = useState(null);
  // 클릭 설정
  const [clicked, setClicked] = useState(false);
  // 초기 탭 설정
  const [currentTab, setCurrentTab] = useState('장비'); 
  
  // 탭 변경시 select item, click 유무 초기화 함수
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSelectedItem(null);
    setClicked(false);
  };
  
  // 마우스 hover 함수
  const handleItemHover = (item) => {
    if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem(item);
    }
  };

  // 마우스 클릭 함수
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setClicked(!clicked); // 클릭 시 clicked 상태 반전
  };

  // 장비 아이템 프리셋 선택
  const handlePresetChange = (preset) => {
    setSelectedPreset(`item_equipment_${preset}`);
  };
  
  // 캐시 아이템 프리셋
  const handleCashPresetChange = (preset) => {
    setSelectedCashPreset(`cash_item_equipment_${preset}`)
  }

  // 캐시 아이템 베이스
  const handleCashItemBase = () => {
    setSelectedCashPreset(`cash_item_equipment_base`)
  }
  
  console.log(selectedItem)
  


  function petInformationData(index) {
    const petEquipment = EquipData.getPetEquipment;
  
    const petInformation = {
      petAppearance: petEquipment[`pet_${index}_appearance`] || '정보 없음',
      petDateExpire: petEquipment[`pet_${index}_date_expire`] || '정보 없음',
      petIcon: petEquipment[`pet_${index}_appearance_icon`] || '정보 없음',
      petSkill: petEquipment[`pet_${index}_skill`] || '정보 없음',
      petNickname: petEquipment[`pet_${index}_nickname`] || '정보 없음',
      petName: petEquipment[`pet_${index}_name`] || '정보 없음',
      petType: petEquipment[`pet_${index}_pet_type`] || '정보 없음',
      petEquipment: petEquipment[`pet_${index}_equipment`] || '정보 없음',
      petAutoSkill: petEquipment[`pet_${index}_auto_skill`] || '정보 없음',
      petDescription: petEquipment[`pet_${index}_description`] || '정보 없음'
    };
    return petInformation;
  }


  // PetAppearanceIcon 컴포넌트에서 사용할 정보 처리 함수 (장착 펫 데이터)
  function handlePetAppearanceInfo(index) {
    const petInfo = petInformationData(index);

    if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동

    setSelectedItem({
      appearance: petInfo?.petAppearance,
      icon:petInfo?.petIcon,
      expire: petInfo?.petDateExpire,
      description: petInfo?.petDescription,
      name: petInfo?.petName,
      nickname: petInfo?.petNickname,
      type: petInfo?.petType,
      skill: petInfo?.petSkill
    });
  }
}


  // PetEquipShapeIcon 컴포넌트에서 사용할 정보 처리 함수 (펫 장비 데이터)
  function handlePetEquipInfo(index) {
    const petInfo = petInformationData(index);
    if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동

    setSelectedItem({
      equipment: petInfo?.petEquipment,
    });
  }
  }

  function handlePetFirstSkillInfo(index) {
    const petInfo = petInformationData(index);
    if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동

    setSelectedItem({
      autoSkillName: petInfo?.petAutoSkill.skill_1,
      autoSkillIcon: petInfo?.petAutoSkill.skill_1_icon,
    });
  }
}

function handlePetSecondSkillInfo(index) {
  const petInfo = petInformationData(index);
  if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동

    setSelectedItem({
      autoSkillName: petInfo?.petAutoSkill.skill_2,
      autoSkillIcon: petInfo?.petAutoSkill.skill_2_icon,
    });
  }
}



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
<InfoWrap currentTab={currentTab}>
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
  <PetEquipWrap>
    <PetBackgroundImageWrap/>
    <EquipItems>
    <PetBackgroundImage src={petEquipUi} alt="ui" />
      <PetIconsWrap>
        {EquipData.getPetEquipment.pet_1_appearance_icon && (
          <PetIcons>
            <PetAppearanceIcon>
              {EquipData.getPetEquipment.pet_1_appearance_icon ? (
                <img src={EquipData.getPetEquipment.pet_1_appearance_icon} 
                  alt="petIcon"
                  onMouseOver={() => handlePetAppearanceInfo(1)}
                  onClick={() => handleItemClick(selectedItem)}  />
              )
              :<div style={{ width: '42px', height: '42px' }}/>
              }
            </PetAppearanceIcon>
            <PetEquipShapeIcon>
              {EquipData.getPetEquipment.pet_1_equipment.item_shape_icon ? (
                <img src={EquipData.getPetEquipment.pet_1_equipment.item_shape_icon} 
                  alt="petEqipIcon"
                  onMouseOver={() => handlePetEquipInfo(1)}
                  onClick={() => handleItemClick(selectedItem)}  />
                )
                :<div style={{ width: '42px', height: '42px' }}/>
                }
            </PetEquipShapeIcon>
            <PetAutoSkillWrap>
              <PetAutoSkillIcon>
                {EquipData.getPetEquipment.pet_1_auto_skill.skill_1_icon ? (
                  <img src={EquipData.getPetEquipment.pet_1_auto_skill.skill_1_icon} 
                  alt="petAutoSkill1" 
                  onMouseOver={() => handlePetFirstSkillInfo(1)}
                  onClick={() => handleItemClick(selectedItem)}  />
                  )
                  :<div style={{ width: '42px', height: '42px' }}/>
                  }
              </PetAutoSkillIcon>
              <PetAutoSkillIcon>
                {EquipData.getPetEquipment.pet_1_auto_skill.skill_2_icon ? (
                  <img src={EquipData.getPetEquipment.pet_1_auto_skill.skill_2_icon} 
                  alt="petAutoSkill2" 
                  onMouseOver={() => handlePetSecondSkillInfo(1)}
                  onClick={() => handleItemClick(selectedItem)}  />
                  )
                  :<div style={{ width: '42px', height: '42px' }}/>
                  }
              </PetAutoSkillIcon>
            </PetAutoSkillWrap>
          </PetIcons>
        )}
      {EquipData.getPetEquipment.pet_2_appearance_icon && (
        <PetIcons>
          <PetAppearanceIcon>
              {EquipData.getPetEquipment.pet_2_appearance_icon ? (
              <img src={EquipData.getPetEquipment.pet_2_appearance_icon} 
                alt="petIcon"
                onMouseOver={() => handlePetAppearanceInfo(2)}
                onClick={() => handleItemClick(selectedItem)}  />
              )
              :<div style={{ width: '42px', height: '42px' }}/>
              }
          </PetAppearanceIcon>
          <PetEquipShapeIcon>
            {EquipData.getPetEquipment.pet_2_equipment.item_shape_icon ? (
              <img src={EquipData.getPetEquipment.pet_2_equipment.item_shape_icon} 
              alt="petEqipIcon"
              onMouseOver={() => handlePetEquipInfo(2)}
              onClick={() => handleItemClick(selectedItem)}  />
            )
              :<div style={{ width: '42px', height: '42px' }}/>
              }
          </PetEquipShapeIcon>
          <PetAutoSkillWrap>
            <PetAutoSkillIcon>
              {EquipData.getPetEquipment.pet_2_auto_skill.skill_1_icon ? (
                <img src={EquipData.getPetEquipment.pet_2_auto_skill.skill_1_icon} 
                alt="petAutoSkill1" 
                onMouseOver={() => handlePetFirstSkillInfo(2)}
                onClick={() => handleItemClick(selectedItem)}  />
                )
                :<div style={{ width: '42px', height: '42px' }}/>
                }
            </PetAutoSkillIcon>
            <PetAutoSkillIcon>
              {EquipData.getPetEquipment.pet_2_auto_skill.skill_2_icon ? (
                <img src={EquipData.getPetEquipment.pet_2_auto_skill.skill_2_icon} 
                alt="petAutoSkill2" 
                onMouseOver={() => handlePetSecondSkillInfo(2)}
                onClick={() => handleItemClick(selectedItem)}  />
                )
                :<div style={{ width: '42px', height: '42px' }}/>
                }
            </PetAutoSkillIcon>
          </PetAutoSkillWrap>
        </PetIcons>
      )}
        {EquipData.getPetEquipment.pet_3_appearance_icon && (
          <PetIcons>
            <PetAppearanceIcon>
                {EquipData.getPetEquipment.pet_3_appearance_icon ? (
                <img src={EquipData.getPetEquipment.pet_3_appearance_icon} 
                  alt="petIcon"
                  onMouseOver={() => handlePetAppearanceInfo(3)}
                  onClick={() => handleItemClick(selectedItem)}  />
              )
              :<div style={{ width: '42px', height: '42px' }}/>
              }
            </PetAppearanceIcon>
            <PetEquipShapeIcon>
              {EquipData.getPetEquipment.pet_3_equipment.item_shape_icon ? (
                <img src={EquipData.getPetEquipment.pet_3_equipment.item_shape_icon} 
                alt="petEqipIcon"
                onMouseOver={() => handlePetEquipInfo(3)}
                onClick={() => handleItemClick(selectedItem)}  />
              )
                :<div style={{ width: '42px', height: '42px' }}/>
                }
            </PetEquipShapeIcon>
            <PetAutoSkillWrap>
              <PetAutoSkillIcon>
                {EquipData.getPetEquipment.pet_3_auto_skill.skill_1_icon ? (
                  <img src={EquipData.getPetEquipment.pet_3_auto_skill.skill_1_icon} 
                  alt="petAutoSkill1" 
                  onMouseOver={() => handlePetFirstSkillInfo(3)}
                  onClick={() => handleItemClick(selectedItem)}  />
                  )
                  :<div style={{ width: '42px', height: '42px' }}/>
                  }
              </PetAutoSkillIcon>
              <PetAutoSkillIcon>
                {EquipData.getPetEquipment.pet_3_auto_skill.skill_2_icon ? (
                  <img src={EquipData.getPetEquipment.pet_3_auto_skill.skill_2_icon} 
                  alt="petAutoSkill2" 
                  onMouseOver={() => handlePetSecondSkillInfo(3)}
                  onClick={() => handleItemClick(selectedItem)}  />
                  )
                  :<div style={{ width: '42px', height: '42px' }}/>
                  }
              </PetAutoSkillIcon>
            </PetAutoSkillWrap>
          </PetIcons>
        )}
      </PetIconsWrap>
    </EquipItems> 
  </PetEquipWrap>
)}


        {currentTab === 'AD' && (
          <></>
        )}

        </UiBackgrnd>
      </InfoWrap>
      <DetailWrap>
        {currentTab === '캐시' 
        ? (
          <CashItemDetail item={selectedItem} clicked={clicked}/>
        ) 
        : currentTab === '장비' 
        ? (
          <ItemDetail item={selectedItem} clicked={clicked} gradeColors={gradeColors}/>
        ) 
        : currentTab === '펫' 
        ? (
          <PetItemDetail item={selectedItem} clicked={clicked} />
        )
        : null
        }
      </DetailWrap>

      <ItemSetEffect setinfo={EquipData.getSetEffect}/>
      <ItemSymbol symbolData={EquipData.getSymbol}/>
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  height: ${props => {
    switch (props.currentTab) {
      case '장비':
        return '450px';
      case '캐시':
        return '470px'; 
      case '펫':
        return '320px';
      case 'AD':
        return '300px'; 
      default:
        return '470px'; // 기본값
    }
  }};
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

const PetEquipWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const PetBackgroundImage = styled.img`
  width: 262px;
  margin-top: 25px;
`

const PetBackgroundImageWrap = styled.div`
  width: 262px;
  height: 250px;
`

const PetIconsWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 39px;
  gap: 19px;
  width: 100%;
`

const PetIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 23px;
  img{
    width: 42px;
    height: 42px;
    object-fit: contain;
    cursor: pointer;
  }
`

const PetAutoSkillWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-left: 11px;
`

const PetAppearanceIcon = styled.div`
  
`

const PetEquipShapeIcon = styled.div`
  
`

const PetAutoSkillIcon = styled.div`
  
`



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