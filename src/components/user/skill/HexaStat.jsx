import React from 'react';
import styled from 'styled-components';
import hexaStatData from './HexaStatData';

const StatInfo = ({ level, name, value }) => {
  return (
    <StatInfoContainer>
      <StatLevel>Lv.{level}</StatLevel>
      <StatName>{name}</StatName>
      <StatValue>+{value}</StatValue>
    </StatInfoContainer>
  );
};

const findStatData = (name, level, type = 'main', characterClass) => {
  const statData = hexaStatData.find(statData =>
    statData[`${type}_stat_name`] === name && statData[`${type}_stat_level`] === level
  );

  if (!statData) {
    return {
      [`${type}_stat_level`]: level,
      [`${type}_stat_name`]: name,
      value: '정보 없음',
    };
  }
  // 캐릭터 직업이 '제논'이고, xenon_value가 존재할 경우
  if (characterClass === '제논' && statData?.xenon_value) {
    return {
      ...statData,
      value: statData.xenon_value,
    };
  }
  // 캐릭터 직업이 '데몬어벤져'이고, demon_avenger_value가 존재할 경우
  if (characterClass === '데몬어벤져' && statData?.demon_avenger_value) {
    return {
      ...statData,
      value: statData.demon_avenger_value,
      // '주력 스탯 증가'인 경우 이름을 'Max hp'로 변경
      [`${type}_stat_name`]: name === '주력 스탯 증가' ? '주력 스탯 증가(Max Hp)' : name,
    };
  }

  return statData;
};

export const HexaStat = ({ Data }) => {
  if(!Data.character_hexa_stat_core || Data.character_hexa_stat_core.length === 0) {
    // 데이터가 없을 때 출력하지 않음
    return (    
    <Container>
      <Header>HEXA STAT</Header>
      <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
    </Container>)

  ;
  }

  const hexaStatInfo = Data.character_hexa_stat_core[0];
  const characterClass = Data.character_class;

  const mainStatLevelData = findStatData(hexaStatInfo.main_stat_name, hexaStatInfo.main_stat_level, 'main', characterClass);
  const subFirstStatLevelData = findStatData(hexaStatInfo.sub_stat_name_1, hexaStatInfo.sub_stat_level_1, 'sub', characterClass);
  const subSecondStatLevelData = findStatData(hexaStatInfo.sub_stat_name_2, hexaStatInfo.sub_stat_level_2, 'sub', characterClass);

  return (
    <Container>
      <Header>HEXA STAT</Header>
      <StatWrap>
        {/* Main Stat */}
        <MainStat>
          <StatInfo 
            level={mainStatLevelData.main_stat_level} 
            name={mainStatLevelData.main_stat_name} 
            value={mainStatLevelData.value} 
          />

        </MainStat>
        {/* Sub Stat */}
        <StatInfo 
          level={subFirstStatLevelData.sub_stat_level} 
          name={subFirstStatLevelData.sub_stat_name} 
          value={subFirstStatLevelData.value} 
        />
        <StatInfo 
          level={subSecondStatLevelData.sub_stat_level} 
          name={subSecondStatLevelData.sub_stat_name} 
          value={subSecondStatLevelData.value} 
        />

      </StatWrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: #000000d3;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  padding: 7px;
  width: 100%;
`;

const Header = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`

const StatWrap = styled.div`
  font-size: 15px;
`

const MainStat = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  font-weight: bold;
`


const StatInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin-bottom: 3px;
`

const StatLevel = styled.div`
  
`

const StatName = styled.div`
  
`

const StatValue = styled.div`
  
`

const SkillNoDataText = styled.div`

`