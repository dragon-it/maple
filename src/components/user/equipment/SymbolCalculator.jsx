import React from "react";
import symbolCost from "./SymbolData.js";
import styled from "styled-components";
import { ContainerCss } from "../../common/searchCharacter/ContainerBox.jsx";
import arrow_icon from "../../../assets/icons/etc/arrow_icon.svg";
import meso_icon from "../../../assets/icons/etc/meso_icon.png";

export const SymbolCalculator = ({ symbolData }) => {
  const symbols = symbolData.symbol || [];
  const group1 = symbols.slice(0, 6); // 아케인 심볼
  const group2 = symbols.slice(6, 12); // 어센틱 심볼
  const group3 = symbols.slice(12); // 그랜드 어센틱 심볼

  const { arcaneSymbolsCost, authenticSymbolsCost, grandAuthenticSymbolsCost } =
    symbolCost;

  // 아케인 심볼, 어센틱 심볼 포스 합계 계산
  const arcaneForce = group1.reduce(
    (sum, s) => sum + Number(s.symbol_force),
    0
  );

  const authenticForce = group2.reduce(
    (sum, s) => sum + Number(s.symbol_force),
    0
  );

  const grandAuthenticForce = group3.reduce(
    (sum, s) => sum + Number(s.symbol_force),
    0
  );

  // 심볼 비용 계산 함수
  const getSymbolCost = (name, level, arcaneSymbolsCost) => {
    const region = name.replace(/(어센틱심볼 : |아케인심볼 : |그랜드 )/g, "");
    const costList = arcaneSymbolsCost[region];

    if (!costList) return 0;
    return costList.slice(0, level).reduce((acc, v) => acc + v, 0);
  };

  // 각 그룹별 심볼 비용 계산
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

  // 심볼 이름에서 불필요한 부분 제거
  const getSymbolShortName = (name) =>
    name
      .replace(/(어센틱심볼 : |아케인심볼 : |그랜드 )/g, "")
      .replace("소멸의 ", "")
      .replace("아일랜드", "")
      .trim();

  // 메소 단위 변환 함수
  const toEokMan = (v) =>
    v >= 100000000
      ? `${Math.floor(v / 100000000)}억 ${Math.floor(
          (v % 100000000) / 10000
        )}만`
      : `${Math.floor(v / 10000)}만`;

  // 그룹별 심볼 출력 함수
  const renderGroup = (group) =>
    group.map(
      ({ symbol_name, symbol_icon, symbol_level, symbol_force }, index) => (
        <SymbolCard key={symbol_name + index}>
          <Icon src={symbol_icon} alt={symbol_name} />
          <Name>{getSymbolShortName(symbol_name)}</Name>
          <Level>
            Lv. {symbol_level === 20 && group1 ? "max" : symbol_level}/
            {group === group1 ? "20" : "11"}
          </Level>
          <Force>
            {group === group1 ? `ARC +${symbol_force}` : `AUT +${symbol_force}`}
          </Force>
        </SymbolCard>
      )
    );

  const getUpgradeSteps = (name, level, symbolCost, maxUpgrade = 10) => {
    const region = name.replace(/(어센틱심볼 : |아케인심볼 : |그랜드 )/g, "");
    const costList = symbolCost[region];
    if (!costList) return [];

    const steps = [];

    for (let i = 1; i <= maxUpgrade; i++) {
      const from = level + i - 1;
      const to = level + i;
      if (to >= costList.length + 1) break;

      steps.push({
        symbol_name: name,
        from,
        to,
        cost: costList[from],
      });
    }

    return steps;
  };

  const getStepsForGroup = (group, symbolCost) =>
    group.flatMap((s) =>
      getUpgradeSteps(s.symbol_name, s.symbol_level, symbolCost).map(
        (step) => ({
          ...step,
          symbol_icon: s.symbol_icon,
        })
      )
    );

  const arcaneSteps = getStepsForGroup(group1, arcaneSymbolsCost);
  const authenticSteps = getStepsForGroup(group2, authenticSymbolsCost);
  const grandSteps = getStepsForGroup(group3, grandAuthenticSymbolsCost);

  const sortSteps = (steps) =>
    steps.filter((s) => s.cost !== Infinity).sort((a, b) => a.cost - b.cost);

  const sortedArcaneSteps = sortSteps(arcaneSteps);
  const sortedAuthenticSteps = sortSteps(authenticSteps);
  const sortedGrandSteps = sortSteps(grandSteps);

  // 강화 비용 렌더링 함수
  const renderUpgradeSteps = (title, steps) =>
    steps.length > 0 && (
      <ResultWrap>
        <SectionTitle>{title}</SectionTitle>
        <CardWrap>
          {steps.slice(0, 10).map((step, i, arr) => (
            <React.Fragment key={`${step.symbol_name}-${step.from}-${i}`}>
              <SymbolCard>
                <Icon src={step.symbol_icon} alt={step.symbol_name} />
                <Name>{getSymbolShortName(step.symbol_name)}</Name>
                <Level>
                  {step.from} → {step.to}
                </Level>
                <Force>{toEokMan(step.cost)} 메소</Force>
              </SymbolCard>
              {i < arr.length - 1 && <img src={arrow_icon} alt="arrow" />}
            </React.Fragment>
          ))}
        </CardWrap>
      </ResultWrap>
    );

  return (
    symbols.length > 0 && (
      <Container>
        <HeaderName>심볼 계산기</HeaderName>
        {/* 소비 메소 warp */}
        <>
          <p>소비 메소</p>
          <p> 아케인 심볼 소비 메소</p>

          <p> 어센틱 심볼 소비 메소</p>

          <p> 그랜드 어센틱 심볼 소비 메소</p>
          <p> 총 소비 메소</p>
          <p>백분율 도달율 그래프</p>
        </>

        {group1.length > 0 && (
          <ArcaneGroupWrap>
            <ResultWrap>
              <SectionTitle>아케인 심볼</SectionTitle>
              <p>
                아케인 포스 : {arcaneForce} / 1320(Max){" "}
                {(1320 - arcaneForce) / 10}번 강화 필요
              </p>
              <p>소비 메소 : {toEokMan(totalArcaneCost)} 메소</p>
              <p>풀강까지 남은 메소 : {toEokMan(totalArcaneCost)} 메소</p>
            </ResultWrap>
            <SymbolIconWrap>{renderGroup(group1)}</SymbolIconWrap>
            {renderUpgradeSteps("아케인 심볼 강화 순서", sortedArcaneSteps)}
          </ArcaneGroupWrap>
        )}
        {group2.length > 0 && (
          <AuthenticGroupWrap>
            <ResultWrap>
              <SectionTitle>어센틱 심볼</SectionTitle>
              <p>
                어센틱 포스 : {authenticForce} / 770(Max){" "}
                {(770 - authenticForce) / 10}번 강화 필요
              </p>
              <p>소비 메소 : {toEokMan(totalAuthenticCost)} 메소</p>
            </ResultWrap>
            <SymbolIconWrap>{renderGroup(group2)}</SymbolIconWrap>
            {renderUpgradeSteps("어센틱 심볼 강화 순서", sortedAuthenticSteps)}
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
            {renderUpgradeSteps(
              "그랜드 어센틱 심볼 강화 순서",
              sortedGrandSteps
            )}
          </GroupWrap>
        )}
        <>
          총 소비 메소 :{" "}
          {toEokMan(totalArcaneCost + totalAuthenticCost + totalGrandCost)} 메소
        </>
      </Container>
    )
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${ContainerCss};
  padding: 10px;
`;

const HeaderName = styled.h2``;

const ArcaneGroupWrap = styled.div`
  background: linear-gradient(180deg, #2a2c4b 0%, #3d4172 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #4f606b;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
`;

const AuthenticGroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(180deg, #2e4d72 0%, #45699c 100%);
`;

const GroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(180deg, #4a3c58 0%, #6a5174 100%);
`;

const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: center;
`;

const SymbolCard = styled.div`
  background-color: #222;
  border-radius: 8px;
  padding: 2px;
  flex: 1;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const Name = styled.div`
  margin-bottom: 1px;
`;

const Level = styled.div`
  font-size: 11px;
`;

const Force = styled.p`
  font-size: 12px;
`;

const CardWrap = styled.div`
  display: flex;
  gap: 5px;
`;
