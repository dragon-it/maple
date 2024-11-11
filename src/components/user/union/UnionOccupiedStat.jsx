import React from "react";
import styled from "styled-components";

export const UnionOccupiedStat = ({ Data }) => {
  const sortedData = [...Data.union_raider_stat].sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <Container>
      <UnionRaiderStat>
        <Header>공격대원 효과</Header>
        <ul>
          {sortedData.map((item, index) => (
            <UnionOccupiedItem key={index}>{item}</UnionOccupiedItem>
          ))}
        </ul>
      </UnionRaiderStat>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  background-color: rgb(51, 51, 51);
  border-radius: 5px;
  border: 1px solid rgb(34, 34, 34);
  outline: 1px solid rgb(102, 102, 102);
  padding: 3px;
  font-size: 13px;

  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 786px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 15px;
  margin-bottom: 3px;
  text-align: center;
`;

const UnionRaiderStat = styled.div`
  position: relative;
`;

const UnionOccupiedItem = styled.li`
  color: rgb(179, 179, 179);
  &:hover {
    background-color: rgb(209, 209, 209);
    color: rgb(78, 77, 77);
  }
`;
