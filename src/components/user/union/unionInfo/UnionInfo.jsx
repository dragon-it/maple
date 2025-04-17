import React from "react";
import styled from "styled-components";
import UnionIcons from "../unionInfo/UnionIcon";
import { UnionArtifactEffect } from "../unionArtifact/UnionArtifactEffect";

const selectIcon = (level) => {
  let baseLevel, rankCategory;
  if (level <= 2999) {
    baseLevel = 0;
    rankCategory = "novice";
  } else if (level <= 5499) {
    baseLevel = 3000;
    rankCategory = "veteran";
  } else if (level <= 7999) {
    baseLevel = 5500;
    rankCategory = "master";
  } else if (level <= 10499) {
    baseLevel = 8000;
    rankCategory = "grand_master";
  } else {
    baseLevel = 10500;
    rankCategory = "supreme";
  }

  // Math.floor() 숫자 내림하여 가장 가까운 정수 반환
  // Math.min() 주어진 숫자들 중 가장 작은 값 반환
  // (Math.floor((level - baseLevel) / 500) 와 UnionIcons[rankCategory].length - 1 중 작은 값,
  // 유니온 레벨에 따른 baseLevel과 Category를 지정받고,
  // (유니온 레벨-baseLevel) / 500을 하여  UnionIcons의 배열에서 rank를 추출함
  const rank = Math.min(
    Math.floor((level - baseLevel) / 500),
    UnionIcons[rankCategory].length - 1
  );
  //  UnionIcons의 카테고리와 랭크를 계산하여 icon 렌더링
  return UnionIcons[rankCategory][rank];
};

export const UnionInfo = ({ Data, $activeTab }) => {
  const icon = selectIcon(Data.union.union_level);

  const toRoman = (gradeString) => {
    // 로마 숫자 배열
    const roman = ["I", "II", "III", "IV", "V"];
    // gradeString에서 숫자 추출
    const num = parseInt(gradeString.match(/\d+/)[0], 10);
    // 추출된 숫자를 로마 숫자로 변환
    const romanNumeral = roman[num - 1]; // 배열은 0부터 시작하므로 num - 1을 사용
    // 원래 문자열에서 숫자를 로마 숫자로 대체
    return gradeString.replace(num, romanNumeral);
  };

  // Data.union_grade에서 숫자를 로마 숫자로 변환
  const romanGrade = toRoman(Data.union.union_grade);

  return (
    <Container>
      <UnionWrap>
        <UnionGrade>{romanGrade}</UnionGrade>
        <InfoWrap>
          <UnionIcon style={{ backgroundImage: `url(${icon})` }}></UnionIcon>
          <LevelWrap>
            <Items>
              <Title>TOTAL LEVEL</Title>
              <Level>{Data.union.union_level}</Level>
            </Items>
            <Items>
              <Title>ARTIFACT LEVEL</Title>
              <Level>{Data.union.union_artifact_level}</Level>
            </Items>
          </LevelWrap>
        </InfoWrap>
      </UnionWrap>
      <UnionArtifactEffect Data={Data} activeTab={$activeTab} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  background-color: rgb(56, 60, 69);
  border-radius: 5px;
  border: 1px solid rgb(69, 89, 100);
  outline: 1px solid rgb(56, 70, 81);
  height: 100%;
  min-width: 300px;
`;

const UnionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: rgb(48, 54, 63);
  border-radius: 5px;
  border: 1px solid rgb(69, 89, 100);
  outline: 1px solid rgb(56, 70, 81);
  color: white;
  padding: 10px;
`;

const UnionGrade = styled.div`
  color: rgb(255, 255, 0);
  text-shadow: 0px 0px 3px rgb(219, 250, 46);
  font-size: 20px;
  font-family: maple-light;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const LevelWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
  gap: 10px;
`;

const UnionIcon = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
`;

const Items = styled.div`
  line-height: 17px;
`;

const Title = styled.p``;

const Level = styled.p`
  font-size: 19px;
`;
