import React from "react";
import symbolCost from "./SymbolData.js";
import styled from "styled-components";

export const SymbolCalculator = ({ symbolData }) => {
  const symbols = symbolData.symbol || [];
  const group1 = symbols.slice(0, 6);
  const group2 = symbols.slice(6, 12);
  const group3 = symbols.slice(12);

  const { arcaneSymbolsCost, authenticSymbolsCost, grandAuthenticSymbolsCost } =
    symbolCost;
  console.log("아케인 심볼 비용:", arcaneSymbolsCost);
  console.log("어센틱 심볼 비용:", authenticSymbolsCost);
  console.log("그랜드 어센틱 심볼 비용:", grandAuthenticSymbolsCost);

  // 아케인 심볼, 어센틱 심볼 포스 합계 계산
  const arcaneForce = symbols
    .slice(0, 6)
    .reduce((sum, s) => sum + Number(s.symbol_force), 0);
  console.log("아케인 포스:", arcaneForce);

  const authenticForce = symbols
    .slice(6)
    .reduce((sum, s) => sum + Number(s.symbol_force), 0);
  console.log("어센틱 포스:", authenticForce);

  const getSymbolCost = (name, level, arcaneSymbolsCost) => {
    const region = name.replace(/(어센틱심볼 : |아케인심볼 : |그랜드 )/g, "");
    console.log("region:", region, "level:", level);
    const costList = arcaneSymbolsCost[region];
    console.log(costList);

    if (!costList) return 0;
    return costList.slice(0, level).reduce((acc, v) => acc + v, 0);
  };

  const totalArcaneCost = symbols.slice(0, 6).reduce((sum, s) => {
    return (
      sum + getSymbolCost(s.symbol_name, s.symbol_level, arcaneSymbolsCost)
    );
  }, 0);
  console.log("총 소비 메소:", totalArcaneCost.toLocaleString());

  const renderGroup = (group) =>
    group.map(
      ({ symbol_name, symbol_icon, symbol_level, symbol_force }, index) => (
        <SymbolCard key={symbol_name + index}>
          <Icon src={symbol_icon} alt={symbol_name} />
          <Name>
            {symbol_name.replace(/(어센틱심볼 : |아케인심볼 : |그랜드 )/g, "")}
          </Name>
          <Level>레벨: {symbol_level}</Level>
          <Force>포스: {symbol_force}</Force>
        </SymbolCard>
      )
    );

  return (
    <Container>
      <HeaderName>심볼 계산기</HeaderName>
      {group1.length > 0 && (
        <GroupWrap>
          <SectionTitle>아케인 심볼</SectionTitle>
          <>{renderGroup(group1)}</>
        </GroupWrap>
      )}
      {group2.length > 0 && (
        <GroupWrap>
          <SectionTitle>어센틱 심볼</SectionTitle>
          <>{renderGroup(group2)}</>
        </GroupWrap>
      )}
      {group3.length > 0 && (
        <GroupWrap>
          <SectionTitle>그랜드 어센틱 심볼</SectionTitle>
          <>{renderGroup(group3)}</>
        </GroupWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 12px;
`;

const HeaderName = styled.h2``;

const GroupWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  margin-left: 20px;
  color: #ccc;
  font-size: 18px;
`;

const SymbolCard = styled.div`
  background-color: #222;
  border-radius: 8px;
  padding: 2px;
  width: 90px;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Level = styled.div`
  font-size: 14px;
`;

const Force = styled.div`
  font-size: 14px;
`;
