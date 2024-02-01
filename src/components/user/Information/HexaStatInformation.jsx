import React from 'react';
import styled from 'styled-components';

const hexaStatData = [
  { level: 1, main_stat_name: '공격력 증가', main_stat_level: 5 },
  { level: 2, main_stat_name: '공격력 증가', main_stat_level: 10 },
  { level: 3, main_stat_name: '공격력 증가', main_stat_level: 15 },
  { level: 4, main_stat_name: '공격력 증가', main_stat_level: 20 },
  { level: 5, main_stat_name: '공격력 증가', main_stat_level: 30 },
  { level: 6, main_stat_name: '공격력 증가', main_stat_level: 40 },
  { level: 7, main_stat_name: '공격력 증가', main_stat_level: 50 },
  { level: 8, main_stat_name: '공격력 증가', main_stat_level: 65 },
  { level: 9, main_stat_name: '공격력 증가', main_stat_level: 80 },
  { level: 10, main_stat_name: '공격력 증가', main_stat_level: 100 },
];

// 다른 데이터 추가 필요
const renderHexaStat = (hexaStat) => (
  <div key={hexaStat.level}>
    <div>Lv.{hexaStat.level} {hexaStat.main_stat_name}: {hexaStat.main_stat_level}</div>
  </div>
);

export const HexaStatInformation = ({ HexaStatInfo }) => {
  const hexaStatInfo = HexaStatInfo.character_hexa_stat_core[0];

  const statLevelData = hexaStatData.find(stat => stat.level === hexaStatInfo.main_stat_level);

  return (
    <Container>
      <div>메인 헥사스텟: {hexaStatInfo.main_stat_name}{renderHexaStat(statLevelData)}</div>


    </Container>
  );
};

const Container = styled.div`
  // 스타일 정의
`;