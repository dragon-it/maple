import React from "react";
import symbolCost from "./SymbolData.js";
import styled from "styled-components";
import { ContainerCss } from "../../common/searchCharacter/ContainerBox.jsx";
import arrow_icon from "../../../assets/icons/etc/arrow_icon.svg";
import meso_icon from "../../../assets/icons/etc/meso_icon.png";
import arcane_icon from "../../../assets/icons/etc/arcane_icon2.png";
import authentic_icon from "../../../assets/icons/etc/authentic_icon2.png";
import colors from "../../common/color/colors.js";

export const SymbolCalculator = ({ symbolData }) => {
  const symbols = symbolData.symbol || [];
  const group1 = symbols.slice(0, 6); // 아케인 심볼
  const group2 = symbols.slice(6); // 어센틱 심볼
  const group3 = symbols.slice(12); // 그랜드 어센틱 심볼

  const {
    arcaneSymbolsCost,
    authenticSymbolsCost,
    grandAuthenticSymbolsCost,
    totalSymbolCost,
  } = symbolCost;

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
    .slice(6)
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

  // 총 소비 메소 계산
  const totalCost = totalArcaneCost + totalAuthenticCost + totalGrandCost;

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
            Lv {symbol_level}/{group === group1 ? "20" : "11"}
          </Level>
          <Force>
            {group === group1 ? (
              <>
                <ForceIcon src={arcane_icon} alt="force_icon" />
                {symbol_force}
              </>
            ) : (
              <>
                <AuthenticForceIcon src={authentic_icon} alt="authentic_icon" />
                {symbol_force}
              </>
            )}
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
                <Icon src={step.symbol_icon} alt="symbol_name" />
                <Name>{getSymbolShortName(step.symbol_name)}</Name>
                <Level>
                  {step.from} → {step.to}
                </Level>
                <Force>
                  <MesoIcon src={meso_icon} alt="meso_icon" />
                  {toEokMan(step.cost)}
                </Force>
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
        <HeaderName>SYMBOL CALCULATOR</HeaderName>
        {/* 소비 메소 warp */}
        <ArcaneGroupWrap>
          <p>
            소비 <MesoIcon src={meso_icon} alt="meso_icon" />
          </p>
          <p> 아케인 심볼 소비 메소</p>
          <p>소비 메소 : {toEokMan(totalArcaneCost)} 메소</p>
          <p> 어센틱 심볼 소비 메소</p>
          <p>소비 메소 : {toEokMan(totalAuthenticCost)} 메소</p>
          {/* <p> 그랜드 어센틱 심볼 소비 메소</p>
          <p>소비 메소 : {toEokMan(totalGrandCost)} 메소</p> */}
          <p> 총 소비 메소</p>
          <p>소비 메소 : {toEokMan(totalCost)}메소</p>
          <p>백분율 도달율 그래프</p>
        </ArcaneGroupWrap>

        {group1.length > 0 && (
          <ArcaneGroupWrap>
            <ResultWrap>
              <SectionTitle>아케인 심볼</SectionTitle>
              <span>
                <ArcaneForceIcon src={arcane_icon} alt="arcane_icon" />{" "}
                <ForceValue>{arcaneForce} / 1320</ForceValue>
                <MaxLevel>(MAX)</MaxLevel> → {(1320 - arcaneForce) / 10}번 강화
                필요
              </span>
              <p>
                풀강까지 남은 메소 :{" "}
                {toEokMan(totalSymbolCost.아케인 - totalArcaneCost)} 메소
              </p>
            </ResultWrap>
            <SymbolIconWrap>{renderGroup(group1)}</SymbolIconWrap>
            {renderUpgradeSteps("아케인 심볼 강화 순서", sortedArcaneSteps)}
          </ArcaneGroupWrap>
        )}
        {group2.length > 0 && (
          <AuthenticGroupWrap>
            <ResultWrap>
              <SectionTitle>어센틱 심볼</SectionTitle>
              <span>
                <AuthenticForceHeaderIcon
                  src={authentic_icon}
                  alt="authentic_icon"
                />{" "}
                <ForceValue>{authenticForce} / 770</ForceValue>
                <MaxLevel>(MAX)</MaxLevel> → {(770 - authenticForce) / 10}번
                강화 필요
              </span>
              <p>
                풀강까지 남은 메소 :{" "}
                {toEokMan(totalSymbolCost.어센틱 - totalAuthenticCost)} 메소
              </p>
            </ResultWrap>
            <SymbolIconWrap>{renderGroup(group2)}</SymbolIconWrap>
            {renderUpgradeSteps("어센틱 심볼 강화 순서", sortedAuthenticSteps)}
          </AuthenticGroupWrap>
        )}
        {/* {group3.length > 0 && (
          <GroupWrap>
            <ResultWrap>
              <SectionTitle>그랜드 어센틱 심볼</SectionTitle>
              <p>어센틱 포스 : {grandAuthenticForce}</p>
              <p>
                풀강까지 남은 메소 : {toEokMan(totalArcaneCost)}{" "}
                <MesoIcon src={meso_icon} alt="meso_icon" />
              </p>
            </ResultWrap>
            <SymbolIconWrap>{renderGroup(group3)}</SymbolIconWrap>
            {renderUpgradeSteps(
              "그랜드 어센틱 심볼 강화 순서",
              sortedGrandSteps
            )}
          </GroupWrap>
        )} */}
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
  color: #fff;
`;

const HeaderName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const ArcaneGroupWrap = styled.div`
  background: linear-gradient(180deg, #434575 0%, #3d4172 100%);
  border-radius: 12px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 2px solid #4f606b;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
`;

const AuthenticGroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(180deg, #375b88 0%, #45699c 100%);
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
  font-weight: bold;
  line-height: 1.4;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 20px;

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
  flex: 1 110px;

  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const Name = styled.div`
  margin-bottom: 1px;
`;

const Level = styled.div``;

const Force = styled.p`
  font-size: 12px;
`;

const CardWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const ForceIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 2px;
`;

const ArcaneForceIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: top;
`;

const AuthenticForceIcon = styled.img`
  width: 16px;
  height: 18px;
  vertical-align: text-top;
  margin-right: 2px;
`;

const AuthenticForceHeaderIcon = styled.img`
  width: 18px;
  height: 20px;
  vertical-align: top;
`;

const MesoIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 2px;
`;

const MaxLevel = styled.span`
  text-shadow: 0 0 2px ${colors.main.dark0};
  color: ${colors.subColor.yellow2};
  font-size: 13px;
  font-weight: bold;
`;

const ForceValue = styled.span`
  word-spacing: -4px;
`;
