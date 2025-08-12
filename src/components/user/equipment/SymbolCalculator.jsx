import React, { useState, useEffect } from "react";
import symbolCost from "./SymbolData.js";
import styled from "styled-components";
import { ContainerCss } from "../../common/searchCharacter/ContainerBox.jsx";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/etc/arrow_icon.svg";
import meso_icon from "../../../assets/icons/etc/meso_icon.png";
import arcane_icon from "../../../assets/icons/etc/arcane_icon2.png";
import authentic_icon from "../../../assets/icons/etc/authentic_icon2.png";
import colors from "../../common/color/colors.js";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export const SymbolCalculator = ({ symbolData }) => {
  const symbols = symbolData.symbol || [];
  const group1 = symbols.slice(0, 6); // 아케인 심볼
  const group2 = symbols.slice(6); // 어센틱 심볼

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

  const sortSteps = (steps) =>
    steps.filter((s) => s.cost !== Infinity).sort((a, b) => a.cost - b.cost);

  const sortedArcaneSteps = sortSteps(arcaneSteps);
  const sortedAuthenticSteps = sortSteps(authenticSteps);

  // 강화 비용 렌더링 함수
  const renderUpgradeSteps = (steps) =>
    steps.length > 0 && (
      <SuggesttWrap>
        <CardWrap>
          {steps.slice(0, 12).map((step, i, arr) => (
            <React.Fragment key={`${step.symbol_name}-${step.from}-${i}`}>
              <UpgradeSymbolCard>
                <Icon src={step.symbol_icon} alt="symbol_name" />
                <Name>{getSymbolShortName(step.symbol_name)}</Name>
                <Level>
                  {step.from} → {step.to}
                </Level>
                <Price>{toEokMan(step.cost)}</Price>
              </UpgradeSymbolCard>
              {i < arr.length && <ArrowIcon />}
            </React.Fragment>
          ))}
        </CardWrap>
      </SuggesttWrap>
    );

  // 파이 차트 데이터 생성
  const getPieData = (value, max, label) => [
    { name: label, value },
    { name: "남은 수치", value: max - value },
  ];

  // 심볼별 스타일
  const arcaneColors = ["url(#arcaneGradient)", "#333"];
  const authenticColors = ["url(#authenticGradient)", "#333"];

  // 파이 차트 스타일
  const PieChartWrap = styled.div`
    width: 180px;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 652px) {
      width: 150px;
      height: 140px;
    }
  `;
  const renderPieChart = (title, value, max) => (
    <ReachWrap style={{ textAlign: "center", position: "relative" }}>
      <h3>{title}</h3>
      <PieChartWrap>
        <PieChart width={123} height={123} zIndex={9999}>
          <defs>
            <linearGradient id="arcaneGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#434575" />
              <stop offset="100%" stopColor="#3d4172" />
            </linearGradient>
            <linearGradient id="authenticGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#375b88" />
              <stop offset="100%" stopColor="#45699c" />
            </linearGradient>
          </defs>
          <Pie
            data={getPieData(value, max, "현재 수치")}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
          >
            {getPieData(value, max, "현재 수치").map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  title === "아케인 포스"
                    ? arcaneColors[index % arcaneColors.length]
                    : authenticColors[index % authenticColors.length]
                }
              />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ zIndex: 9999 }} />
        </PieChart>
      </PieChartWrap>
      <ForcePercent>
        <p>
          {value} / {max}
        </p>
        {((value / max) * 100).toFixed(1)} %
      </ForcePercent>
    </ReachWrap>
  );

  return (
    symbols.length > 0 && (
      <Container>
        <HeaderName>SYMBOL CALCULATOR</HeaderName>
        {/* 소비 메소 warp */}
        <MesoForceCalWrap>
          <AnalyzeGroupWrap>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SectionTitle>소비 메소</SectionTitle>
            </span>
            <div>
              <MesoTitle> 아케인 심볼 소비 메소</MesoTitle>
              <MesoUsed>
                <MesoIcon src={meso_icon} alt="meso_icon" />
                <span>{toEokMan(totalArcaneCost)} </span>
              </MesoUsed>
            </div>
            <div>
              <MesoTitle> 어센틱 심볼 소비 메소</MesoTitle>
              <MesoUsed>
                <MesoIcon src={meso_icon} alt="meso_icon" />{" "}
                <span> {toEokMan(totalAuthenticCost)} </span>
              </MesoUsed>
            </div>

            <div>
              <MesoTitle> 총 소비 메소</MesoTitle>
              <MesoUsed>
                <MesoIcon src={meso_icon} alt="meso_icon" />
                <span> {toEokMan(totalCost)} </span>
              </MesoUsed>
            </div>
          </AnalyzeGroupWrap>
          <AnalyzeGroupWrap>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <SectionTitle>포스 도달률</SectionTitle>
              <ChartWrap>
                {renderPieChart("아케인 포스", arcaneForce, 1320)}
                {renderPieChart("어센틱 포스", authenticForce, 770)}
              </ChartWrap>
            </div>
          </AnalyzeGroupWrap>
        </MesoForceCalWrap>

        {group1.length > 0 && (
          <ArcaneGroupWrap>
            <ResultWrap>
              <SectionTitle $type="arcane">아케인 심볼 강화 계산</SectionTitle>
              <span>
                <ArcaneForceIcon src={arcane_icon} alt="arcane_icon" />{" "}
                <ForceValue>{arcaneForce} / 1320</ForceValue>
                <MaxLevel>(MAX)</MaxLevel> →{" "}
                <span
                  style={{
                    fontSize: "16px",
                    backgroundColor: "rgba(255, 246, 122, 0.9)",
                    padding: "0px 2px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {(1320 - arcaneForce) / 10}번
                </span>{" "}
                강화 필요
              </span>
              <p>
                풀강까지 남은 메소 :{" "}
                {toEokMan(totalSymbolCost.아케인 - totalArcaneCost)}
              </p>
              {renderUpgradeSteps(sortedArcaneSteps)}
            </ResultWrap>
          </ArcaneGroupWrap>
        )}
        {group2.length > 0 && (
          <AuthenticGroupWrap>
            <ResultWrap>
              <SectionTitle $type="authentic">
                어센틱 심볼 강화 계산
              </SectionTitle>
              <span>
                <AuthenticForceHeaderIcon
                  src={authentic_icon}
                  alt="authentic_icon"
                />{" "}
                <ForceValue>{authenticForce} / 770</ForceValue>
                <MaxLevel>(MAX)</MaxLevel> →{" "}
                <span
                  style={{
                    fontSize: "17px",
                    backgroundColor: "rgba(255, 246, 122, 0.9)",
                    padding: "0px 2px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {(770 - authenticForce) / 10}번
                </span>{" "}
                강화 필요
              </span>
              <p>
                풀강까지 남은 메소 :{" "}
                {toEokMan(totalSymbolCost.어센틱 - totalAuthenticCost)}
              </p>
              {renderUpgradeSteps(sortedAuthenticSteps)}
            </ResultWrap>
          </AuthenticGroupWrap>
        )}
      </Container>
    )
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  ${ContainerCss};
  padding: 10px;
  color: #fff;
  max-width: 634px;

  @media screen and (max-width: 652px) {
    max-width: 364px;
  }
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
  border: 1px solid #4f606b;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
`;

const AuthenticGroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(180deg, #375b88 0%, #45699c 100%);
`;

const ReachWrap = styled(ArcaneGroupWrap)`
  background: #384049;
`;

const MesoForceCalWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;

  @media screen and (max-width: 652px) {
    flex-direction: column;
  }
`;

const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(21 23 30 / 50%);
  border-radius: 8px;
  padding: 12px 16px;
  line-height: 1.4;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
`;

const SuggesttWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(21 23 30 / 50%);
  border-radius: 8px;
  padding: 4px 4px;
  line-height: 1.4;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 6px;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: fit-content;
  padding: 2px 12px;

  /* 아케인 심볼*/
  ${(props) =>
    props.children === "아케인 심볼 강화 계산" &&
    `
      border-left: 3px solid rgb(122, 59, 223);
      background: linear-gradient(
    90deg,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
    `}

  /* 어센틱 심볼*/
  ${(props) =>
    props.children === "어센틱 심볼 강화 계산" &&
    `
      border-left: 3px solid rgb(53, 87, 236);
      background: linear-gradient(
    90deg,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
    `}
`;

const SymbolInfoCard = styled.div`
  background: linear-gradient(180deg, #2b313a 0%, #1e222a 100%);
  border-radius: 8px;
  padding: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const UpgradeSymbolCard = styled(SymbolInfoCard)`
  width: 78px;
  height: 100px;
  border: 1px solid rgba(211, 211, 211, 0.5);
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const Name = styled.div`
  margin-bottom: 1px;
  font-weight: 700;
`;

const Level = styled.div`
  background-color: #525252;
  border-radius: 4px;
  padding: 0px 2px;
`;

const Price = styled.p`
  font-size: 12px;
`;

const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;

  @media screen and (max-width: 652px) {
    gap: 7px;
  }
`;

const ArcaneForceIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: bottom;
`;

const AuthenticForceHeaderIcon = styled.img`
  width: 18px;
  height: 20px;
  vertical-align: bottom;
`;

const MesoIcon = styled.img`
  width: auto;
  height: 100%;
  padding: 2px;
  background-color: rgb(122, 121, 117);
  border-radius: 9px 0px 0px 9px;
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

const ForcePercent = styled.p`
  position: absolute;
  width: 100%;
  top: 49%;
  left: 0%;
  font-weight: 700;
  word-spacing: -4px;
`;

const AnalyzeGroupWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
  background-color: rgb(77, 87, 99);
  border: 1px solid #4f606b;
  border-radius: 7px;
  outline: 1px solid #242b33;
`;

const ChartWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const MesoUsed = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 10px;
  height: 35px;
  font-size: 15px;
  border-radius: 10px;
  background-color: rgba(59, 66, 75, 0.9);
  border: 1px solid rgb(38, 43, 49);
  box-shadow: 0px 1px 0px rgb(133, 145, 145);
  color: white;
`;

const MesoTitle = styled.p`
  font-weight: 700;
  color: #ffffff;
`;
