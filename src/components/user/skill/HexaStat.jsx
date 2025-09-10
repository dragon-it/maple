import React from "react";
import styled from "styled-components";
import hexaStatData from "./HexaStatData";
import { ContainerBox } from "../../common/searchCharacter/ContainerBox";
import hexa_stat_icon1 from "../../../assets/icons/skillIcons/hexa_stat_icon1.png";
import hexa_stat_icon2 from "../../../assets/icons/skillIcons/hexa_stat_icon2.png";
import hexa_stat_icon3 from "../../../assets/icons/skillIcons/hexa_stat_icon3.png";

const StatInfo = ({ level, name, value }) => {
  return (
    <StatInfoContainer>
      <StatLevel>Lv.{level}</StatLevel>
      <StatName>
        {name} +{value}
      </StatName>
    </StatInfoContainer>
  );
};

const findStatData = (name, level, type = "main", characterClass) => {
  const statData = hexaStatData.find(
    (statData) =>
      statData[`${type}_stat_name`] === name &&
      statData[`${type}_stat_level`] === level
  );

  if (!statData) {
    return {
      [`${type}_stat_level`]: level,
      [`${type}_stat_name`]: name,
      value: "0",
    };
  }

  if (characterClass === "제논" && statData?.xenon_value) {
    return { ...statData, value: statData.xenon_value };
  }

  if (characterClass === "데몬어벤져" && statData?.demon_avenger_value) {
    return {
      ...statData,
      value: statData.demon_avenger_value,
      [`${type}_stat_name`]:
        name === "주력 스탯 증가" ? "주력 스탯 증가(Max Hp)" : name,
    };
  }

  return statData;
};

const processHexaStatInfo = (hexaStatInfo, characterClass) => {
  if (!hexaStatInfo) return null;

  return {
    grade: hexaStatInfo.stat_grade,
    main: findStatData(
      hexaStatInfo.main_stat_name,
      hexaStatInfo.main_stat_level,
      "main",
      characterClass
    ),
    sub1: findStatData(
      hexaStatInfo.sub_stat_name_1,
      hexaStatInfo.sub_stat_level_1,
      "sub",
      characterClass
    ),
    sub2: findStatData(
      hexaStatInfo.sub_stat_name_2,
      hexaStatInfo.sub_stat_level_2,
      "sub",
      characterClass
    ),
  };
};

const StatSlot = ({ statInfo, icon }) =>
  statInfo && (
    <StatWrap>
      <SlotBody>
        <LeftCol>
          <SlotIcon src={icon} alt="slot icon" />
          <GradeChip>Lv.{statInfo.grade ?? "-"}</GradeChip>
        </LeftCol>

        <StatInfoWrap>
          <MainStat>
            <StatInfo
              level={statInfo.main.main_stat_level}
              name={statInfo.main.main_stat_name}
              value={statInfo.main.value}
            />
          </MainStat>
          <StatInfo
            level={statInfo.sub1.sub_stat_level}
            name={statInfo.sub1.sub_stat_name}
            value={statInfo.sub1.value}
          />
          <StatInfo
            level={statInfo.sub2.sub_stat_level}
            name={statInfo.sub2.sub_stat_name}
            value={statInfo.sub2.value}
          />
        </StatInfoWrap>
      </SlotBody>
    </StatWrap>
  );

export const HexaStat = ({ Data }) => {
  const hasData = [
    Data.character_hexa_stat_core,
    Data.character_hexa_stat_core_2,
    Data.character_hexa_stat_core_3,
  ].some((core) => core?.length > 0);

  if (!hasData) {
    return (
      <ContainerBox>
        <Header>HEXA 스탯</Header>
        <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
      </ContainerBox>
    );
  }

  const characterClass = Data.character_class;
  const statInfos = [
    processHexaStatInfo(Data.character_hexa_stat_core?.[0], characterClass),
    processHexaStatInfo(Data.character_hexa_stat_core_2?.[0], characterClass),
    processHexaStatInfo(Data.character_hexa_stat_core_3?.[0], characterClass),
  ];

  return (
    <ContainerBox>
      <Header>HEXA 스탯</Header>
      <StatContainer>
        <StatSlot
          title="첫 번째 슬롯"
          statInfo={statInfos[0]}
          icon={hexa_stat_icon1}
        />
        <StatSlot
          title="두 번째 슬롯"
          statInfo={statInfos[1]}
          icon={hexa_stat_icon2}
        />
        <StatSlot
          title="세 번째 슬롯"
          statInfo={statInfos[2]}
          icon={hexa_stat_icon3}
        />
      </StatContainer>
    </ContainerBox>
  );
};

const Header = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const StatWrap = styled.div``;

const MainStat = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const StatInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const StatLevel = styled.span``;
const StatName = styled.span``;
const SkillNoDataText = styled.p``;

const StatContainer = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SlotBody = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: center;
  font-size: 13px;
  padding: 6px 8px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(115, 121, 122, 0.7);
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const SlotIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const GradeChip = styled.div`
  min-width: 36px;
  padding: 2px;
  border-radius: 5px;
  font-size: 13px;
  text-align: center;
  color: #fff;
  background: linear-gradient(180deg, #7c5cff, #5a35e8);
  box-shadow: 0 2px 6px rgba(90, 53, 232, 0.35);
`;

const StatInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  gap: 2px;
`;
