import React from "react";
import styled from "styled-components";
import UnionIcons from "../unionInfo/UnionIcon";
import { UnionArtifactEffect } from "../unionArtifact/UnionArtifactEffect";
import UnionTitleIcons from "./UnionTitleIcon";

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

export const UnionInfo = ({ Data, $activeTab, selectedPresetNo }) => {
  const icon = selectIcon(Data.union.union_level);

  const getTitleImage = (gradeString) => {
    if (!gradeString) return null;

    const prefixMap = {
      "노비스 유니온": "novice",
      "베테랑 유니온": "veteran",
      "마스터 유니온": "master",
      "그랜드 마스터 유니온": "grand_master",
      "슈프림 유니온": "supreme",
    };

    const prefixKey = Object.keys(prefixMap).find((prefix) =>
      gradeString.includes(prefix)
    );
    if (!prefixKey) return null;

    const numMatch = gradeString.match(/\d+/);
    if (!numMatch) return null;
    const suffixIndex = parseInt(numMatch[0], 10) - 1;

    const category = prefixMap[prefixKey];
    return UnionTitleIcons[category]?.[suffixIndex] || null;
  };

  const titleImage = getTitleImage(Data.union.union_grade);
  console.log("Union Grade Input:", Data.union.union_grade);
  console.log("Resolved Title Image URL:", titleImage);

  return (
    <Container $activeTab={$activeTab}>
      <UnionWrap>
        <UnionGrade>
          {titleImage ? (
            <img src={titleImage} alt={Data.union.union_grade} />
          ) : (
            Data.union.union_grade
          )}
        </UnionGrade>
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
      <UnionArtifactEffect Data={Data} activeTab={$activeTab} selectedPresetNo={selectedPresetNo} />
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
  width: 380px;
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
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
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    object-fit: contain;
  }
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
  background-size: contain;
  background-repeat: no-repeat;
`;

const Items = styled.div`
  line-height: 17px;
`;

const Title = styled.p``;

const Level = styled.p`
  font-size: 19px;
`;
