import React from "react";
import styled from "styled-components";
import unionChampionImages from "./unionChampionimages";

console.log(unionChampionImages);

const { card_Backgrnd, rank, insignia, icon } = unionChampionImages;
const { empty, disabled } = card_Backgrnd;

export const UnionChampion = ({ Data }) => {
  console.log("Data.union_champion:", Data.union_champion);

  return (
    <GridContainer>
      {/* Array.from으로 길이 6인 배열을 만들어 map으로 6개 슬롯 렌더링 */}
      {Array.from({ length: 6 }).map((_, index) => (
        <GridItem
          key={index}
          $background={
            Data.union_champion.some(
              (champion) => champion.champion_slot === index + 1 // 슬롯이 1부터 시작하므로 index + 1
            ) // some은 조건에 맞는 챔피언이 있으면 true 반환
              ? empty
              : disabled
          }
        />
      ))}
    </GridContainer>
  );
};
const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridItem = styled.div`
  width: 182px;
  height: 338px;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.$background})`};

  @media screen and (max-width: 768px) {
    width: 182px;
    height: 338px;
  }
`;
