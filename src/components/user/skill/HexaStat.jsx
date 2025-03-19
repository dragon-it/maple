import React from "react";
import styled from "styled-components";
import hexaStatData from "./HexaStatData";
import { ContainerBox } from "../../common/searchCharacter/ContainerBox";

const StatInfo = ({ level, name, value }) => {
  return (
    <StatInfoContainer>
      <StatLevel>Lv.{level}</StatLevel>
      <StatName>{name}</StatName>
      <StatValue>+{value}</StatValue>
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
    return {
      ...statData,
      value: statData.xenon_value,
    };
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

const StatSlot = ({ title, statInfo }) =>
  statInfo && (
    <StatWrap>
      <SlotHeader>{title}</SlotHeader>
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
        <Header>HEXA STAT</Header>
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
      <Header>HEXA STAT</Header>
      <StatContainer>
        <StatSlot title="첫 번째 슬롯" statInfo={statInfos[0]} />
        <StatSlot title="두 번째 슬롯" statInfo={statInfos[1]} />
        <StatSlot title="세 번째 슬롯" statInfo={statInfos[2]} />
      </StatContainer>
    </ContainerBox>
  );
};

const Header = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const StatWrap = styled.ul`
  font-size: 13px;
`;

const MainStat = styled.li`
  font-weight: bold;
  font-size: 15px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const StatInfoContainer = styled.li`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin-bottom: 3px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const StatLevel = styled.span``;

const StatName = styled.span``;

const StatValue = styled.span``;

const SkillNoDataText = styled.p``;

const StatContainer = styled.div`
  display: flex;
  gap: 50px;

  @media screen and (max-width: 1024px) {
    justify-content: center;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const SlotHeader = styled.li`
  font-family: maple-light;
  color: #ffffff;
  font-size: 15px;
  border-radius: 10px;
  background-color: rgb(182, 101, 243);
  text-align: center;
  margin-bottom: 3px;
`;
