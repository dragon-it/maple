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
    .slice(6, 12)
    .reduce((sum, s) => sum + Number(s.symbol_force), 0);
  console.log("어센틱 포스:", authenticForce);

  const grandAuthenticForce = symbols
    .slice(12)
    .reduce((sum, s) => sum + Number(s.symbol_force), 0);
  console.log("어센틱 포스:", authenticForce);

  const getSymbolCost = (name, level, arcaneSymbolsCost) => {
    const region = name.replace(/(어센틱심볼 : |아케인심볼 : |그랜드 )/g, "");
    const costList = arcaneSymbolsCost[region];

    if (!costList) return 0;
    return costList.slice(0, level).reduce((acc, v) => acc + v, 0);
  };

  const totalArcaneCost = symbols
    .slice(0, 6)
    .reduce(
      (sum, s) =>
        sum + getSymbolCost(s.symbol_name, s.symbol_level, arcaneSymbolsCost),
      0
    );

  const totalAuthenticCost = symbols
    .slice(6, 12)
    .reduce(
      (sum, s) =>
        sum +
        getSymbolCost(s.symbol_name, s.symbol_level, authenticSymbolsCost),
      0
    );

  const totalGrandCost = symbols
    .slice(12)
    .reduce(
      (sum, s) =>
        sum +
        getSymbolCost(s.symbol_name, s.symbol_level, grandAuthenticSymbolsCost),
      0
    );

  const toEokMan = (v) =>
    v >= 100000000
      ? `${Math.floor(v / 100000000)}억 ${Math.floor(
          (v % 100000000) / 10000
        )}만`
      : `${Math.floor(v / 10000)}만`;

  const renderGroup = (group) =>
    group.map(
      ({ symbol_name, symbol_icon, symbol_level, symbol_force }, index) => (
        <SymbolCard key={symbol_name + index}>
          <Icon src={symbol_icon} alt={symbol_name} />
          <Name>
            {symbol_name.replace(
              /(어센틱심볼 : |아케인심볼 : |그랜드 |아일랜드 )/g,
              ""
            )}
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
        <ArcaneGroupWrap>
          <ResultWrap>
            <SectionTitle>아케인 심볼</SectionTitle>
            <p>아케인 포스 : {arcaneForce}</p>
            <p>소비 메소 : {toEokMan(totalArcaneCost)} 메소</p>
          </ResultWrap>
          <SymbolIconWrap>{renderGroup(group1)}</SymbolIconWrap>
        </ArcaneGroupWrap>
      )}
      {group2.length > 0 && (
        <AuthenticGroupWrap>
          <ResultWrap>
            <SectionTitle>어센틱 심볼</SectionTitle>
            <p>어센틱 포스 : {authenticForce}</p>
            <p>소비 메소 : {toEokMan(totalAuthenticCost)} 메소</p>
          </ResultWrap>
          <SymbolIconWrap>{renderGroup(group2)}</SymbolIconWrap>
        </AuthenticGroupWrap>
      )}
      {group3.length > 0 && (
        <GroupWrap>
          <ResultWrap>
            <SectionTitle>그랜드 어센틱 심볼</SectionTitle>
            <p>어센틱 포스 : {grandAuthenticForce}</p>
            <p>소비 메소 : {toEokMan(totalGrandCost)} 메소</p>
          </ResultWrap>
          <SymbolIconWrap>{renderGroup(group3)}</SymbolIconWrap>
        </GroupWrap>
      )}
      <>
        총 소비 메소 :{" "}
        {toEokMan(totalArcaneCost + totalAuthenticCost + totalGrandCost)} 메소
      </>
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

const ArcaneGroupWrap = styled.div`
  background: linear-gradient(180deg, #2a2c4b 0%, #3d4172 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
`;

const AuthenticGroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(180deg, #2e4d72 0%, #45699c 100%);
`;

const GroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(180deg, #4a3c58 0%, #6a5174 100%);
`;

const ResultWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-weight: bold;
  line-height: 1.4;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const SymbolIconWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SymbolCard = styled.div`
  background-color: #222;
  border-radius: 8px;
  padding: 2px;
  width: 85px;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
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
