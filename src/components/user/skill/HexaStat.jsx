import React from 'react';
import styled from 'styled-components';
import hexaStatData from './HexaStatData';



export const HexaStat = ({ Data }) => {
  const hexaStatInfo = Data.character_hexa_stat_core[0];

  // hexaStatData에서 동일한 이름과 레벨을 가진 정보를 찾아옴
  const statLevelData = hexaStatData.find((statData) =>
  statData.main_stat_name === hexaStatInfo.main_stat_name &&
  statData.level === hexaStatInfo.main_stat_level
);

    console.log(statLevelData)

  return (
    <Container>
      헥사스텟
      <div>Lv.{statLevelData.level}{hexaStatInfo.main_stat_name} : {statLevelData.main_stat_level}</div>
    </Container>
  );
};

const Container = styled.div`
  // 스타일 정의
`;
