import React from 'react'
import styled from 'styled-components'
import UnionIcons from './UnionIcon';


const selectIcon = (level) => {
  let baseLevel, rankCategory;
  if (level <= 2999) {
    baseLevel = 0;
    rankCategory = 'novice';
  } else if (level <= 5499) {
    baseLevel = 3000;
    rankCategory = 'veteran';
  } else if (level <= 7999) {
    baseLevel = 5500;
    rankCategory = 'master';
  } else if (level <= 10499) {
    baseLevel = 8000;
    rankCategory = 'grand_master';
  } else {
    baseLevel = 10500;
    rankCategory = 'supreme';
  }

  // 유니온 레벨에 따른 baseLevel과 Category를 지정받고,
  // (유니온 레벨-baseLevel) / 500을 하여  UnionIcons의 배열에서 rank를 추출함
  const rank = (Math.floor((level - baseLevel) / 500), UnionIcons[rankCategory].length - 1);
  //  UnionIcons의 카테고리와 랭크를 계산하여 icon 렌더링
  return UnionIcons[rankCategory][rank];
};

export const UnionInfo = ({ Data }) => {
  const icon = selectIcon(Data.union_level);

  const toRoman = (gradeString) => {
    // 로마 숫자 배열
    const roman = ['I', 'II', 'III', 'IV', 'V'];
    // gradeString에서 숫자 추출
    const num = parseInt(gradeString.match(/\d+/)[0], 10);
    // 추출된 숫자를 로마 숫자로 변환
    const romanNumeral = roman[num - 1]; // 배열은 0부터 시작하므로 num - 1을 사용
    // 원래 문자열에서 숫자를 로마 숫자로 대체
    return gradeString.replace(num, romanNumeral);
  };

  // Data.union_grade에서 숫자를 로마 숫자로 변환
  const romanGrade = toRoman(Data.union_grade);

  return (
    <Container>
      <UnionWrap>
        <UnionGrade>{romanGrade}</UnionGrade>
        <InfoWrap>
          <UnionIcon style={{ backgroundImage: `url(${icon})` }}></UnionIcon>
          <LevelWrap>
            <UnionLevel>TOTAL LEVEL {Data.union_level}</UnionLevel>
            <UnionArtifact>ARTIFACT LEVEL{Data.union_artifact_level}</UnionArtifact>
          </LevelWrap>
        </InfoWrap>
      </UnionWrap>
    </Container>
  )
}

const Container = styled.div`

`

const UnionWrap = styled.div`

`

const UnionGrade = styled.div`

`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
`

const LevelWrap = styled.div`
  
`

const UnionLevel = styled.div`

`

const UnionIcon = styled.div`
  width: 80px; 
  height: 80px; 
  background-size: cover;
`

const UnionArtifact = styled.div`
  
`