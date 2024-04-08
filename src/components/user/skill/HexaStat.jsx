import React from 'react';
import styled from 'styled-components';
import hexaStatData from './HexaStatData';

const StatInfo = ({ level, name, value }) => {
  return (
    <div>Lv.{level}{name} : {value}</div>
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
    return ;
  }

  const hexaStatInfo = Data.character_hexa_stat_core[0];
  const characterClass = Data.character_class;

  const mainStatLevelData = findStatData(hexaStatInfo.main_stat_name, hexaStatInfo.main_stat_level, 'main', characterClass);
  const subFirstStatLevelData = findStatData(hexaStatInfo.sub_stat_name_1, hexaStatInfo.sub_stat_level_1, 'sub', characterClass);
  const subSecondStatLevelData = findStatData(hexaStatInfo.sub_stat_name_2, hexaStatInfo.sub_stat_level_2, 'sub', characterClass);

  return (
    <Container>
      Hexa Stat
      <div>Main Stat</div>
      <StatInfo 
        level={mainStatLevelData.main_stat_level} 
        name={mainStatLevelData.main_stat_name} 
        value={mainStatLevelData.value} 
      />

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
    </Container>
  );
};

const Container = styled.div`

`;
