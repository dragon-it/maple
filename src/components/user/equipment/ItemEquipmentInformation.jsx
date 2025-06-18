import React, { useEffect, useState } from "react";
import styled from "styled-components";
import equipmentUi from "../../../assets/pages/user/equipment/equipmentUi/equipUi2.png";
import cashEquipUi from "../../../assets/pages/user/equipment/equipmentUi/cashEquipUi.png";
import petEquipUi from "../../../assets/pages/user/equipment/equipmentUi/petEquipUi.png";
import androidEquipUi from "../../../assets/pages/user/equipment/equipmentUi/androidEquipUi.png";
import { ItemDetail } from "./ItemDetail";
import gradeColors from "./ItemGradeColors";
import { ItemSetEffect } from "./ItemSetEffect";
import { CashItemDetail } from "./CashItemDetail";
import { PetItemDetail } from "./PetItemDetail";
import { AndroidItemDetail } from "./AndroidItemDetail";
import { SymbolUi } from "./SymbolUi";

const positions = {
  모자: { top: "39px", right: "60px" },
  얼굴장식: { top: "39px", left: "60px" },
  눈장식: { top: "84px", left: "60px" },
  귀고리: { top: "129px", left: "60px" },
  상의: { top: "84px", right: "60px" },
  하의: { top: "129px", right: "60px" },
  신발: { top: "129px", right: "15px" },
  장갑: { top: "84px", right: "15px" },
  망토: { top: "39px", right: "15px" },
  무기: { top: "219px", left: "105px" },
  보조무기: { top: "219px", left: "150px" },
  엠블렘: { top: "219px", left: "195px" },
  반지1: { top: "174px", left: "15px" },
  반지2: { top: "129px", left: "15px" },
  반지3: { top: "84px", left: "15px" },
  반지4: { top: "39px", left: "15px" },
  펜던트: { top: "219px", left: "60px" },
  펜던트2: { top: "174px", left: "60px" },
  훈장: { top: "174px", right: "15px" },
  벨트: { top: "219px", left: "15px" },
  어깨장식: { top: "174px", right: "60px" },
  "포켓 아이템": { top: "264px", left: "15px" },
  "기계 심장": { top: "219px", right: "15px" },
  뱃지: { top: "264px", right: "15px" },
};

const cashPositions = {
  모자: { top: "6px", left: "108px" },
  얼굴장식: { top: "55px", left: "108px" },
  눈장식: { top: "104px", left: "108px" },
  귀고리: { top: "104px", left: "157px" },
  상의: { top: "154px", left: "108px" },
  하의: { top: "203px", left: "108px" },
  신발: { top: "252px", left: "108px" },
  장갑: { top: "203px", left: "157px" },
  망토: { top: "203px", left: "206px" },
  보조무기: { top: "154px", left: "206px" },
  무기: { top: "154px", left: "59px" },
  반지1: { top: "6px", left: "10px" },
  반지2: { top: "55px", left: "10px" },
  반지3: { top: "104px", left: "10px" },
  반지4: { top: "154px", left: "10px" },
};

const ADPositions = {
  모자: { top: "6px", left: "108px" },
  얼굴장식: { top: "55px", left: "108px" },
  눈장식: { top: "104px", left: "108px" },
  귀고리: { top: "104px", left: "157px" },
  상의: { top: "154px", left: "108px" },
  하의: { top: "203px", left: "108px" },
  신발: { top: "252px", left: "108px" },
  장갑: { top: "203px", left: "57px" },
  망토: { top: "203px", left: "156px" },
  보조무기: { top: "154px", left: "206px" },
  무기: { top: "154px", left: "59px" },
};

const PresetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $isSelected }) => ($isSelected === "장비" ? "20px" : "auto")};
  height: ${({ $isSelected }) => ($isSelected === "장비" ? "20px" : "auto")};
  color: white;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  background: ${({ $isSelected }) =>
    $isSelected ? "#4f5358" : "rgb(161, 161, 161)"};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#141414" : "rgb(119, 119, 119)")};
`;

const ItemIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  overflow: hidden;
  cursor: pointer;
  border: ${({ $grade, $gradeColors }) =>
    `2px solid ${
      $gradeColors && $gradeColors[$grade] ? $gradeColors[$grade] : "none"
    }`};
  img {
    image-rendering: pixelated;
  }
`;

export const ItemEquipmentInformation = ({ EquipData }) => {
  const matchingPresetKey = `item_equipment_preset_${EquipData.preset_no}`;
  const matchingCashPresetKey = `cash_item_equipment_preset_${EquipData.getCashItemEquipment.preset_no}`;
  const [selectedPreset, setSelectedPreset] = useState(
    matchingPresetKey || "item_equipment_preset_1"
  );
  const [selectedCashPreset, setSelectedCashPreset] = useState(
    matchingCashPresetKey || "cash_item_equipment_preset_1"
  );

  // select item 설정
  const [selectedItem, setSelectedItem] = useState(null);

  // 클릭 설정
  const [clicked, setClicked] = useState(false);

  // 초기 탭 설정
  const [currentTab, setCurrentTab] = useState("장비");
  console.log(currentTab);
  const [isCloseClick, setIsCloseClick] = useState(false);

  const handleMouseLeave = () => {
    // 마우스가 Container를 벗어나면 선택된 스킬 초기화
    const isWideScreen = window.innerWidth <= 1024;

    if (!isWideScreen) {
      setSelectedItem(null);
    }
  };

  // 탭 변경시 select item, click 유무 초기화 함수
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSelectedItem(null);
    setClicked(false);
  };

  // 마우스 hover 함수
  const handleItemHover = (item) => {
    if (!clicked) {
      // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem(item);
    }
  };

  // 마우스 클릭 함수
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setClicked(!clicked); // 클릭 시 clicked 상태 반전
  };

  const handleCloseClick = () => {
    setClicked(false);
    setSelectedItem(null);
    setIsCloseClick(true);
  };

  // 장비 아이템 프리셋 선택
  const handlePresetChange = (preset) => {
    setSelectedPreset(`item_equipment_${preset}`);
  };

  // 캐시 아이템 프리셋
  const handleCashPresetChange = (preset) => {
    setSelectedCashPreset(`cash_item_equipment_${preset}`);
  };

  // 캐시 아이템 베이스
  const handleCashItemBase = () => {
    setSelectedCashPreset(`cash_item_equipment_base`);
  };

  const petInformationData = (index) => {
    const petEquipment = EquipData.getPetEquipment;

    const petInformation = {
      petAppearance: petEquipment[`pet_${index}_appearance`] || null,
      petDateExpire: petEquipment[`pet_${index}_date_expire`] || null,
      petIcon: petEquipment[`pet_${index}_appearance_icon`] || null,
      petSkill: petEquipment[`pet_${index}_skill`] || null,
      petNickname: petEquipment[`pet_${index}_nickname`] || null,
      petName: petEquipment[`pet_${index}_name`] || null,
      petType: petEquipment[`pet_${index}_pet_type`] || null,
      petEquipment: petEquipment[`pet_${index}_equipment`] || null,
      petAutoSkill: petEquipment[`pet_${index}_auto_skill`] || null,
      petDescription: petEquipment[`pet_${index}_description`] || null,
    };
    return petInformation;
  };

  // PetAppearanceIcon 컴포넌트에서 사용할 정보 처리 함수 (장착 펫 데이터)
  const handlePetAppearanceInfo = (index) => {
    const petInfo = petInformationData(index);
    if (!clicked) {
      // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem({
        appearance: petInfo?.petAppearance,
        icon: petInfo?.petIcon,
        expire: petInfo?.petDateExpire,
        description: petInfo?.petDescription,
        name: petInfo?.petName,
        nickname: petInfo?.petNickname,
        type: petInfo?.petType,
        skill: petInfo?.petSkill,
      });
    }
  };

  // PetEquipShapeIcon 컴포넌트에서 사용할 정보 처리 함수 (펫 장비 데이터)
  const handlePetEquipInfo = (index) => {
    const petInfo = petInformationData(index);
    if (!clicked) {
      // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem({
        equipment: petInfo?.petEquipment,
      });
    }
  };

  // 펫 첫 번째 스킬 정보 처리 함수
  const handlePetFirstSkillInfo = (index) => {
    const petInfo = petInformationData(index);
    if (!clicked) {
      // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem({
        autoSkillName: petInfo?.petAutoSkill.skill_1,
        autoSkillIcon: petInfo?.petAutoSkill.skill_1_icon,
      });
    }
  };

  // 펫 두 번째 스킬 정보 처리 함수
  const handlePetSecondSkillInfo = (index) => {
    const petInfo = petInformationData(index);
    if (!clicked) {
      // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem({
        autoSkillName: petInfo?.petAutoSkill.skill_2,
        autoSkillIcon: petInfo?.petAutoSkill.skill_2_icon,
      });
    }
  };

  // 탭 변경시 프리셋 초기화
  useEffect(() => {
    let newPresetKey;
    switch (currentTab) {
      case "캐시":
        newPresetKey = matchingCashPresetKey;
        break;
      case "장비":
        newPresetKey = matchingPresetKey;
        break;
      default:
        break;
    }

    setSelectedCashPreset(newPresetKey);
  }, [currentTab, matchingCashPresetKey, matchingPresetKey]);

  return (
    <Container>
      <ItemInfoDetailWrap>
        <InfoWrap $currentTab={currentTab}>
          <Header>EQUIPMENT</Header>
          <TabMenu>
            <TabButton
              $isSelected={currentTab === "장비"}
              onClick={() => handleTabChange("장비")}
            >
              장비
            </TabButton>
            <TabButton
              $isSelected={currentTab === "캐시"}
              onClick={() => handleTabChange("캐시")}
            >
              캐시
            </TabButton>
            <TabButton
              $isSelected={currentTab === "펫"}
              onClick={() => handleTabChange("펫")}
            >
              펫
            </TabButton>
            <TabButton
              $isSelected={currentTab === "AD"}
              onClick={() => handleTabChange("AD")}
            >
              AD
            </TabButton>
          </TabMenu>
          <UiBackgrnd>
            {/* 장비탭 처리 */}
            {currentTab === "장비" && (
              <EquipWrap>
                <BackgroundImageWrap $isSelected={currentTab} />
                <EquipItems>
                  <BackgroundImage
                    src={equipmentUi}
                    $isSelected={currentTab}
                    alt="ui"
                  />
                  {/* 프리셋 데이터가 없으면 item_equipment 출력 */}
                  {(EquipData[selectedPreset] &&
                  EquipData[selectedPreset].length > 0
                    ? EquipData[selectedPreset]
                    : EquipData.item_equipment
                  )?.map((item, index) => (
                    <ItemIcon
                      key={item.item_equipment_slot}
                      style={positions[item.item_equipment_slot]}
                      $grade={item.potential_option_grade}
                      $gradeColors={gradeColors}
                      onClick={() => handleItemClick(item)}
                      onMouseOver={() => handleItemHover(item)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img src={item.item_icon} alt={`icon-${index}`} />
                    </ItemIcon>
                  ))}
                  {EquipData.getAndroidEquipment.android_preset_1
                    ?.android_icon ? (
                    <ADIcon>
                      <img
                        src={
                          EquipData.getAndroidEquipment.android_preset_1
                            ?.android_icon
                        }
                        alt="ADicon"
                        onMouseOver={() =>
                          handleItemHover(
                            EquipData.getAndroidEquipment.android_preset_1
                          )
                        }
                        onClick={() =>
                          handleItemClick(
                            EquipData.getAndroidEquipment.android_preset_1
                          )
                        }
                      />
                    </ADIcon>
                  ) : (
                    <div style={{ width: "42px", height: "42px" }} />
                  )}
                </EquipItems>
                <PresetButtonWrap $isSelected={currentTab}>
                  <PresetButtons>
                    <PresetButton
                      onClick={() => handlePresetChange("preset_1")}
                      $isSelected={selectedPreset === "item_equipment_preset_1"}
                    >
                      <span>1</span>
                    </PresetButton>
                    <PresetButton
                      onClick={() => handlePresetChange("preset_2")}
                      $isSelected={selectedPreset === "item_equipment_preset_2"}
                    >
                      <span>2</span>
                    </PresetButton>
                    <PresetButton
                      onClick={() => handlePresetChange("preset_3")}
                      $isSelected={selectedPreset === "item_equipment_preset_3"}
                    >
                      <span>3</span>
                    </PresetButton>
                  </PresetButtons>
                  {matchingPresetKey === selectedPreset && (
                    <ApplyingPreset $isSelected={currentTab}>
                      현재 적용중인 프리셋이에요!
                    </ApplyingPreset>
                  )}
                </PresetButtonWrap>
              </EquipWrap>
            )}

            {/* 캐시탭 처리 */}
            {currentTab === "캐시" && (
              <EquipWrap>
                <BackgroundImageWrap />
                <EquipItems>
                  <BackgroundImage src={cashEquipUi} alt="ui" />
                  {EquipData.getCashItemEquipment[selectedCashPreset]?.map(
                    (item, index) => (
                      <ItemIcon
                        key={item.cash_item_equipment_slot}
                        style={cashPositions[item.cash_item_equipment_slot]}
                        onClick={() => handleItemClick(item)} // 클릭 시 handleItemClick 함수 호출
                        onMouseOver={() => handleItemHover(item)} // 마우스 오버 시 handleItemHover 함수 호출
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src={item.cash_item_icon} alt={`icon-${index}`} />
                      </ItemIcon>
                    )
                  )}
                </EquipItems>
                <PresetButtonWrap>
                  <BaseButton
                    onClick={() => handleCashItemBase()}
                    $isSelected={
                      selectedCashPreset === "cash_item_equipment_base"
                    }
                  >
                    <span>BASE</span>
                  </BaseButton>
                  <PresetButtons>
                    <PresetButton
                      onClick={() => handleCashPresetChange("preset_1")}
                      $isSelected={
                        selectedCashPreset === "cash_item_equipment_preset_1"
                      }
                    >
                      <span>프리셋1</span>
                    </PresetButton>
                    <PresetButton
                      onClick={() => handleCashPresetChange("preset_2")}
                      $isSelected={
                        selectedCashPreset === "cash_item_equipment_preset_2"
                      }
                    >
                      <span>프리셋2</span>
                    </PresetButton>
                    <PresetButton
                      onClick={() => handleCashPresetChange("preset_3")}
                      $isSelected={
                        selectedCashPreset === "cash_item_equipment_preset_3"
                      }
                    >
                      <span>프리셋3</span>
                    </PresetButton>
                  </PresetButtons>
                  {matchingCashPresetKey === selectedCashPreset && (
                    <ApplyingPreset>현재 적용중인 프리셋이에요!</ApplyingPreset>
                  )}
                </PresetButtonWrap>
              </EquipWrap>
            )}

            {/* 펫탭 처리 */}
            {currentTab === "펫" && (
              <PetEquipWrap>
                <PetBackgroundImageWrap />
                <EquipItems>
                  <PetBackgroundImage src={petEquipUi} alt="ui" />
                  <PetIconsWrap>
                    {EquipData.getPetEquipment.pet_1_appearance_icon && (
                      <PetIcons>
                        <PetAppearanceIcon>
                          {EquipData.getPetEquipment.pet_1_appearance_icon ? (
                            <img
                              src={
                                EquipData.getPetEquipment.pet_1_appearance_icon
                              }
                              alt="Icon"
                              onMouseOver={() => handlePetAppearanceInfo(1)}
                              onClick={() => handlePetAppearanceInfo(1)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ) : (
                            <div style={{ width: "42px", height: "42px" }} />
                          )}
                        </PetAppearanceIcon>
                        <PetEquipShapeIcon>
                          {EquipData.getPetEquipment.pet_1_equipment
                            .item_shape_icon ? (
                            <img
                              src={
                                EquipData.getPetEquipment.pet_1_equipment
                                  .item_shape_icon
                              }
                              alt="petEqipIcon"
                              onMouseOver={() => handlePetEquipInfo(1)}
                              onClick={() => handlePetEquipInfo(1)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ) : (
                            <div style={{ width: "42px", height: "42px" }} />
                          )}
                        </PetEquipShapeIcon>
                        <PetAutoSkillWrap>
                          <PetAutoSkillIcon>
                            {EquipData.getPetEquipment?.pet_1_auto_skill
                              ?.skill_1_icon ? (
                              <img
                                src={
                                  EquipData.getPetEquipment.pet_1_auto_skill
                                    .skill_1_icon
                                }
                                alt="petAutoSkill1"
                                onMouseOver={() => handlePetFirstSkillInfo(1)}
                                onClick={() => handlePetFirstSkillInfo(1)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ) : (
                              <div style={{ width: "42px", height: "42px" }} />
                            )}
                          </PetAutoSkillIcon>
                          <PetAutoSkillIcon>
                            {EquipData.getPetEquipment?.pet_1_auto_skill
                              ?.skill_2_icon ? (
                              <img
                                src={
                                  EquipData.getPetEquipment.pet_1_auto_skill
                                    .skill_2_icon
                                }
                                alt="petAutoSkill2"
                                onMouseOver={() => handlePetSecondSkillInfo(1)}
                                onClick={() => handlePetSecondSkillInfo(1)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ) : (
                              <div style={{ width: "42px", height: "42px" }} />
                            )}
                          </PetAutoSkillIcon>
                        </PetAutoSkillWrap>
                      </PetIcons>
                    )}
                    {EquipData.getPetEquipment.pet_2_appearance_icon && (
                      <PetIcons>
                        <PetAppearanceIcon>
                          {EquipData.getPetEquipment.pet_2_appearance_icon ? (
                            <img
                              src={
                                EquipData.getPetEquipment.pet_2_appearance_icon
                              }
                              alt="Icon"
                              onMouseOver={() => handlePetAppearanceInfo(2)}
                              onClick={() => handlePetAppearanceInfo(2)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ) : (
                            <div style={{ width: "42px", height: "42px" }} />
                          )}
                        </PetAppearanceIcon>
                        <PetEquipShapeIcon>
                          {EquipData.getPetEquipment.pet_2_equipment
                            .item_shape_icon ? (
                            <img
                              src={
                                EquipData.getPetEquipment.pet_2_equipment
                                  .item_shape_icon
                              }
                              alt="petEqipIcon"
                              onMouseOver={() => handlePetEquipInfo(2)}
                              onClick={() => handlePetEquipInfo(2)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ) : (
                            <div style={{ width: "42px", height: "42px" }} />
                          )}
                        </PetEquipShapeIcon>
                        <PetAutoSkillWrap>
                          <PetAutoSkillIcon>
                            {EquipData.getPetEquipment?.pet_2_auto_skill
                              ?.skill_1_icon ? (
                              <img
                                src={
                                  EquipData.getPetEquipment.pet_2_auto_skill
                                    .skill_1_icon
                                }
                                alt="petAutoSkill1"
                                onMouseOver={() => handlePetFirstSkillInfo(2)}
                                onClick={() => handlePetFirstSkillInfo(2)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ) : (
                              <div style={{ width: "42px", height: "42px" }} />
                            )}
                          </PetAutoSkillIcon>
                          <PetAutoSkillIcon>
                            {EquipData.getPetEquipment?.pet_2_auto_skill
                              ?.skill_2_icon ? (
                              <img
                                src={
                                  EquipData.getPetEquipment.pet_2_auto_skill
                                    .skill_2_icon
                                }
                                alt="petAutoSkill2"
                                onMouseOver={() => handlePetSecondSkillInfo(2)}
                                onClick={() => handlePetSecondSkillInfo(2)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ) : (
                              <div style={{ width: "42px", height: "42px" }} />
                            )}
                          </PetAutoSkillIcon>
                        </PetAutoSkillWrap>
                      </PetIcons>
                    )}
                    {EquipData.getPetEquipment.pet_3_appearance_icon && (
                      <PetIcons>
                        <PetAppearanceIcon>
                          {EquipData.getPetEquipment.pet_3_appearance_icon ? (
                            <img
                              src={
                                EquipData.getPetEquipment.pet_3_appearance_icon
                              }
                              alt="Icon"
                              onMouseOver={() => handlePetAppearanceInfo(3)}
                              onClick={() => handlePetAppearanceInfo(3)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ) : (
                            <div style={{ width: "42px", height: "42px" }} />
                          )}
                        </PetAppearanceIcon>
                        <PetEquipShapeIcon>
                          {EquipData.getPetEquipment.pet_3_equipment
                            .item_shape_icon ? (
                            <img
                              src={
                                EquipData.getPetEquipment.pet_3_equipment
                                  .item_shape_icon
                              }
                              alt="petEqipIcon"
                              onMouseOver={() => handlePetEquipInfo(3)}
                              onClick={() => handlePetEquipInfo(3)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ) : (
                            <div style={{ width: "42px", height: "42px" }} />
                          )}
                        </PetEquipShapeIcon>
                        <PetAutoSkillWrap>
                          <PetAutoSkillIcon>
                            {EquipData.getPetEquipment?.pet_3_auto_skill
                              ?.skill_1_icon ? (
                              <img
                                src={
                                  EquipData.getPetEquipment.pet_3_auto_skill
                                    .skill_1_icon
                                }
                                alt="petAutoSkill1"
                                onMouseOver={() => handlePetFirstSkillInfo(3)}
                                onClick={() => handlePetFirstSkillInfo(3)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ) : (
                              <div style={{ width: "42px", height: "42px" }} />
                            )}
                          </PetAutoSkillIcon>
                          <PetAutoSkillIcon>
                            {EquipData.getPetEquipment?.pet_3_auto_skill
                              ?.skill_2_icon ? (
                              <img
                                src={
                                  EquipData.getPetEquipment.pet_3_auto_skill
                                    .skill_2_icon
                                }
                                alt="petAutoSkill2"
                                onMouseOver={() => handlePetSecondSkillInfo(3)}
                                onClick={() => handlePetSecondSkillInfo(3)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ) : (
                              <div style={{ width: "42px", height: "42px" }} />
                            )}
                          </PetAutoSkillIcon>
                        </PetAutoSkillWrap>
                      </PetIcons>
                    )}
                  </PetIconsWrap>
                </EquipItems>
              </PetEquipWrap>
            )}

            {/* 안드로이드탭 처리 */}
            {currentTab === "AD" && (
              <EquipWrap>
                <BackgroundImageWrap />
                <EquipItems>
                  <BackgroundImage src={androidEquipUi} alt="ui" />
                  {EquipData.getAndroidEquipment.android_cash_item_equipment?.map(
                    (item, index) => (
                      <ItemIcon
                        key={item.cash_item_equipment_slot}
                        style={ADPositions[item.cash_item_equipment_slot]}
                        onClick={() => handleItemClick(item)}
                        onMouseOver={() => handleItemHover(item)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src={item.cash_item_icon} alt={`icon-${index}`} />
                      </ItemIcon>
                    )
                  )}
                </EquipItems>
              </EquipWrap>
            )}
          </UiBackgrnd>
        </InfoWrap>

        <DetailWrap>
          {currentTab === "캐시" ? (
            <CashItemDetail item={selectedItem} clicked={clicked} />
          ) : currentTab === "장비" ? (
            <ItemDetail
              item={selectedItem}
              clicked={clicked}
              $gradeColors={gradeColors}
              closeClick={isCloseClick}
              onClose={handleCloseClick}
            />
          ) : currentTab === "펫" ? (
            <PetItemDetail
              item={selectedItem}
              clicked={clicked}
              onClose={handleCloseClick}
              closeClick={isCloseClick}
            />
          ) : (
            <AndroidItemDetail item={selectedItem} clicked={clicked} />
          )}
        </DetailWrap>
      </ItemInfoDetailWrap>
      <ItemSetEffect setinfo={EquipData.getSetEffect} />
      <SymbolUi symbolData={EquipData.getSymbol} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  gap: 5px;
  border-radius: 5px;
  padding: 5px;
  width: 100%;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Header = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`;

const EquipWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;

  height: ${(props) => {
    switch (props.$currentTab) {
      case "장비":
        return "auto";
      case "캐시":
        return "470px";
      case "펫":
        return "285px";
      case "AD":
        return "400px";
      default:
        return "450px";
    }
  }};
`;

const ItemInfoDetailWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const TabMenu = styled.div`
  display: flex;
  gap: 2px;
`;

const TabButton = styled.button`
  height: 27px;
  flex: 1;
  text-shadow: 0px 0px 3px rgb(30, 38, 47);
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: ${({ $isSelected }) =>
    $isSelected
      ? "linear-gradient(180deg,rgba(54, 184, 208, 1) 0%, rgba(54, 184, 208, 1) 50%, rgba(34, 149, 184, 1) 100%);"
      : "rgb(153, 153, 153)"};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#6ED8EB" : "rgb(119, 119, 119)")};
  border-bottom: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

const BaseButton = styled.button`
  position: relative;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-family: maple-light;
  background: ${({ $isSelected }) =>
    $isSelected ? "#4f5358" : "rgb(161, 161, 161)"};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#141414" : "rgb(119, 119, 119)")};
`;

const UiBackgrnd = styled.div`
  position: relative;
  border-top: 1px solid black;
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

const BackgroundImageWrap = styled.div`
  width: ${({ $isSelected }) => ($isSelected === "장비" ? "342px" : "262px")};
  height: ${({ $isSelected }) => ($isSelected === "장비" ? "349px" : "312px")};
`;

const BackgroundImage = styled.img`
  width: ${({ $isSelected }) => ($isSelected === "장비" ? "342px" : "262px")};
  height: ${({ $isSelected }) => ($isSelected === "장비" ? "349px" : "312px")};
  opacity: 0.8;
`;

const ADIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  cursor: pointer;
  top: 219px;
  right: 60px;
  img {
    image-rendering: pixelated;
  }
`;

const PetEquipWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PetBackgroundImage = styled.img`
  width: 262px;
  margin-top: 5px;
`;

const PetBackgroundImageWrap = styled.div`
  width: 272px;
  height: 205px;
`;

const PetIconsWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 19px;
  gap: 19px;
  width: 100%;
`;

const PetIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 23px;
  img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    cursor: pointer;
  }
`;

const PetAutoSkillWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-left: 11px;
`;

const PetAppearanceIcon = styled.div``;

const PetEquipShapeIcon = styled.div``;

const PetAutoSkillIcon = styled.div``;

const EquipItems = styled.div`
  position: absolute;
  top: 0;
`;

const ApplyingPreset = styled.div`
  position: absolute;
  top: ${({ $isSelected }) => ($isSelected === "장비" ? "-36px" : "67px")};
  right: ${({ $isSelected }) => ($isSelected === "장비" ? "-5px" : "14px")};
  color: ${({ $isSelected }) => ($isSelected === "장비" ? "#000" : "#fff")};
  font-family: maple-light;
  font-size: 15px;
`;

const PresetButtonWrap = styled.div`
  position: ${({ $isSelected }) =>
    $isSelected === "장비" ? "absolute" : "relative"};
  bottom: ${({ $isSelected }) => ($isSelected === "장비" ? "12px" : "7px")};
  right: ${({ $isSelected }) => ($isSelected === "장비" ? "94px" : "2px")};
`;

const PresetButtons = styled.div`
  display: flex;
  gap: 7px;
  margin-top: ${({ $isSelected }) => ($isSelected === "장비" ? "0px" : " 5px")};
`;

const DetailWrap = styled.div`
  position: absolute;
  right: -282px;

  @media screen and (max-width: 1024px) {
    position: relative;
    display: flex;
    justify-content: center;
    right: 0;
  }

  img {
    image-rendering: pixelated;
  }
`;
