import React, { useState } from "react";
import symbolCost from "./SymbolData.js";
import styled from "styled-components";
import { ContainerCss } from "../../common/searchCharacter/ContainerBox.jsx";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/etc/arrow_icon.svg";
import meso_icon from "../../../assets/icons/etc/meso_icon.png";
import arcane_icon from "../../../assets/icons/etc/arcane_icon2.png";
import authentic_icon from "../../../assets/icons/etc/authentic_icon2.png";
import good_taxpayer_arcane_icon from "../../../assets/pages/user/equipment/symbolIcon/Good_Taxpayer_Arcane.png";
import good_taxpayer_authentic_icon from "../../../assets/pages/user/equipment/symbolIcon/Good_Taxpayer_Authentic.png";
import colors from "../../common/color/colors.js";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export const SymbolCalculator = ({ symbolData }) => {
  const [excludeGrandAuthentic, setExcludeGrandAuthentic] = useState(false);
  const symbols = symbolData.symbol || [];
  const group1 = symbols.slice(0, 6); // 아케인 심볼
  const group2 = symbols.slice(6); // 어센틱 심볼

  const {
    arcaneSymbolsCost,
    authenticSymbolsCost,
    totalSymbolCost,
    ARCANE_MAX,
    AUTHENTIC_MAX,
    CLEAN_RE,
    CLEAN_RE2,
    GRAND_AUTHENTIC_SYMBOLS,
    GRAND_AUTHENTIC_FORCE,
  } = symbolCost;

  // 아케인 심볼 포스 합계 계산
  const arcaneForce = group1.reduce(
    (sum, s) => sum + Number(s.symbol_force),
    0
  );

  // 어센틱 심볼 포스 합계 계산
  const authenticForce = group2
    .filter((s) =>
      excludeGrandAuthentic
        ? !GRAND_AUTHENTIC_SYMBOLS.includes(
            s.symbol_name.replace(CLEAN_RE2, "").trim()
          )
        : true
    )
    .reduce((sum, s) => sum + Number(s.symbol_force), 0);

  // 심볼 비용 계산 함수
  const getSymbolCost = (name, level, costTable) => {
    const region = name.replace(CLEAN_RE2, "");
    const costList = costTable[region];
    if (!costList) return 0;
    return costList.slice(0, level).reduce((acc, v) => acc + v, 0);
  };

  // 아케인 심볼 총 비용 계산
  const totalArcaneCost = symbols
    .slice(0, 6)
    .reduce(
      (sum, s) =>
        sum + getSymbolCost(s.symbol_name, s.symbol_level, arcaneSymbolsCost),
      0
    );

  // 어센틱 심볼 총 비용 계산
  const totalAuthenticCost = symbols
    .slice(6)
    .filter((s) =>
      excludeGrandAuthentic
        ? !GRAND_AUTHENTIC_SYMBOLS.includes(
            s.symbol_name.replace(CLEAN_RE2, "").trim()
          )
        : true
    )
    .reduce(
      (sum, s) =>
        sum +
        getSymbolCost(s.symbol_name, s.symbol_level, authenticSymbolsCost),
      0
    );

  // 총 비용 계산
  const totalCost = totalArcaneCost + totalAuthenticCost;

  // 심볼 이름에서 불필요한 부분 제거
  const getSymbolShortName = (name) => name.replace(CLEAN_RE, "").trim();

  // 문자열을 숫자로 변환하는 함수
  const toNum = (v, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);

  // 메소 단위로 변환
  const toEokMan = (v) => {
    const n = toNum(v, 0);
    const eok = Math.floor(n / 1e8);
    const man = Math.floor((n % 1e8) / 1e4);
    return eok ? `${eok}억 ${man}만` : `${man}만`;
  };

  // 심볼 업그레이드 단계 계산
  const getUpgradeSteps = (
    name,
    level,
    costTable,
    symbol_icon,
    maxUpgrade = 10
  ) => {
    const base = Number(level) || 0;
    const region = name.replace(CLEAN_RE2, "");
    const costList = costTable[region];
    if (!costList) return [];
    const steps = [];
    for (let i = 1; i <= maxUpgrade; i++) {
      const from = base + i - 1;
      const to = base + i;
      if (to >= costList.length + 1) break;
      steps.push({
        symbol_name: name,
        from,
        to,
        cost: costList[from],
        symbol_icon,
      });
    }
    return steps;
  };

  // 그룹별 업그레이드 단계 계산
  const getStepsForGroup = (group, costTable) =>
    group.flatMap((s) =>
      getUpgradeSteps(s.symbol_name, s.symbol_level, costTable, s.symbol_icon)
    );

  // 아케인 심볼 업그레이드 단계 정렬
  const sortedArcaneSteps = () =>
    getStepsForGroup(group1, arcaneSymbolsCost)
      .filter((s) => s.cost !== Infinity)
      .sort((a, b) => a.cost - b.cost);

  // 어센틱 심볼 업그레이드 단계 정렬
  const sortedAuthenticSteps = () =>
    getStepsForGroup(
      group2.filter((s) =>
        excludeGrandAuthentic
          ? !GRAND_AUTHENTIC_SYMBOLS.includes(
              s.symbol_name.replace(CLEAN_RE2, "").trim()
            )
          : true
      ),
      authenticSymbolsCost
    )
      .filter((s) => s.cost !== Infinity)
      .sort((a, b) => a.cost - b.cost);

  // 어센틱 포스 최대값 (그랜드 제외 옵션 적용)
  const authenticMax = excludeGrandAuthentic
    ? AUTHENTIC_MAX - GRAND_AUTHENTIC_FORCE
    : AUTHENTIC_MAX;

  // 풀강까지 남은 메소 (그랜드 제외 옵션 적용)
  const authenticRemainCost = excludeGrandAuthentic
    ? totalSymbolCost.어센틱 - totalAuthenticCost - totalSymbolCost.그랜드어센틱
    : totalSymbolCost.어센틱 - totalAuthenticCost;

  const renderUpgradeSteps = (steps, type) =>
    steps.length > 0 ? (
      <SuggesttWrap>
        <CardWrap>
          {steps.slice(0, 12).map((step, i, arr) => (
            <React.Fragment key={`${step.symbol_name}-${step.from}-${i}`}>
              <UpgradeSymbolCard>
                <Icon
                  src={step.symbol_icon}
                  alt={getSymbolShortName(step.symbol_name)}
                />
                <Name>{getSymbolShortName(step.symbol_name)}</Name>
                <Level>
                  {step.from} → {step.to}
                </Level>
                <Price>{toEokMan(step.cost)}</Price>
              </UpgradeSymbolCard>
              {i < arr.length - 1 && <ArrowIcon />}
            </React.Fragment>
          ))}
        </CardWrap>
      </SuggesttWrap>
    ) : (
      <SuggesttWrap>
        <GoodTaxpayer
          src={
            type === "arcane"
              ? good_taxpayer_arcane_icon
              : good_taxpayer_authentic_icon
          }
          alt="good_taxpayer"
        />
      </SuggesttWrap>
    );

  const renderPieChart = (title, value, max) => {
    const data = [
      { name: "현재 포스", value },
      { name: "남은 포스", value: Math.max(0, max - value) },
    ];
    return (
      <ReachWrap style={{ textAlign: "center", position: "relative" }}>
        <h3>{title}</h3>
        <PieChartWrap>
          <PieChart width={180} height={125}>
            <defs>
              <linearGradient id="arcaneGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5a5e9c" />
                <stop offset="100%" stopColor="#3d4172" />
              </linearGradient>
              <linearGradient
                id="authenticGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#5c8ac2" />
                <stop offset="100%" stopColor="#45699c" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(224, 83, 83)" />
                <stop offset="100%" stopColor="rgb(169, 68, 68)" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              animationDuration={700}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? title === "아케인 포스"
                        ? "url(#arcaneGradient)"
                        : "url(#authenticGradient)"
                      : "url(#redGradient)"
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
  };

  if (!symbols.length) return null;

  return (
    <Container>
      <HeaderName>SYMBOL CALCULATOR</HeaderName>

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
              <span>{toEokMan(totalArcaneCost)}</span>
            </MesoUsed>
          </div>

          <div>
            <MesoTitle> 어센틱 심볼 소비 메소</MesoTitle>
            <MesoUsed>
              <MesoIcon src={meso_icon} alt="meso_icon" />
              <span>{toEokMan(totalAuthenticCost)}</span>
            </MesoUsed>
          </div>

          <div>
            <MesoTitle> 총 소비 메소</MesoTitle>
            <MesoUsed>
              <MesoIcon src={meso_icon} alt="meso_icon" />
              <span>{toEokMan(totalCost)}</span>
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
              {renderPieChart("아케인 포스", arcaneForce, ARCANE_MAX)}
              {renderPieChart(
                "어센틱 포스",
                authenticForce,
                excludeGrandAuthentic
                  ? AUTHENTIC_MAX - GRAND_AUTHENTIC_FORCE
                  : AUTHENTIC_MAX
              )}
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
              <ForceValue>
                {arcaneForce} / {ARCANE_MAX}
              </ForceValue>
              <MaxLevel>(MAX)</MaxLevel> →{" "}
              <span
                style={{
                  fontSize: "16px",
                  backgroundColor: "rgba(255, 246, 122, 0.9)",
                  padding: "0px 2px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                }}
              >
                {(ARCANE_MAX - arcaneForce) / 10}번
              </span>{" "}
              강화 필요
            </span>
            <p>
              풀강까지 남은 메소 :{" "}
              {toEokMan(totalSymbolCost.아케인 - totalArcaneCost)}
            </p>
            {renderUpgradeSteps(sortedArcaneSteps(), "arcane")}
          </ResultWrap>
        </ArcaneGroupWrap>
      )}

      {group2.length > 0 && (
        <AuthenticGroupWrap>
          <ResultWrap>
            <HeaderWrap>
              <SectionTitle $type="authentic">
                어센틱 심볼 강화 계산
              </SectionTitle>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={excludeGrandAuthentic}
                  onChange={(e) => setExcludeGrandAuthentic(e.target.checked)}
                  style={{
                    marginRight: "4px",
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                  }}
                />
                그랜드 어센틱 심볼 제외
              </label>
            </HeaderWrap>
            <span>
              <AuthenticForceHeaderIcon
                src={authentic_icon}
                alt="authentic_icon"
              />{" "}
              <ForceValue>
                {authenticForce} / {authenticMax}
              </ForceValue>
              <MaxLevel>(MAX)</MaxLevel> →{" "}
              <span
                style={{
                  fontSize: "17px",
                  backgroundColor: "rgba(255, 246, 122, 0.9)",
                  padding: "0px 2px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                }}
              >
                {(authenticMax - authenticForce) / 10}번
              </span>{" "}
              강화 필요
            </span>
            <p>풀강까지 남은 메소 : {toEokMan(authenticRemainCost)}</p>
            {renderUpgradeSteps(sortedAuthenticSteps(), "authentic")}
          </ResultWrap>
        </AuthenticGroupWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${ContainerCss};
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  padding: 10px;
  color: ${colors.main.white0};
  max-width: 634px;

  @media screen and (max-width: 652px) {
    max-width: 364px;
  }
`;

const HeaderName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.subColor.darkYellow0};
  text-shadow: 1px 1px ${colors.main.dark0Alpha25};
`;

const ArcaneGroupWrap = styled.div`
  background: linear-gradient(
    180deg,
    rgb(67, 69, 117) 0%,
    rgb(61, 65, 114) 100%
  );
  border-radius: 12px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgb(79, 96, 107);
  box-shadow: 0 4px 4px ${colors.main.dark0Alpha50};
`;

const AuthenticGroupWrap = styled(ArcaneGroupWrap)`
  background: linear-gradient(
    180deg,
    rgb(55, 91, 136) 0%,
    rgb(69, 105, 156) 100%
  );
`;

const ReachWrap = styled(ArcaneGroupWrap)`
  background: rgb(56, 64, 73);
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
  margin-top: 2px;
  line-height: 1.4;
  box-shadow: 0 2px 1px ${colors.main.dark0Alpha30};
`;

const SuggesttWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(21 23 30 / 50%);
  border-radius: 8px;
  padding: 4px 4px;
  margin-top: 8px;
  line-height: 1.4;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 652px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: fit-content;
  padding: 2px 12px;

  ${(props) =>
    props.$type === "arcane" &&
    `
      border-left: 3px solid rgb(122, 59, 223);
      background: linear-gradient(90deg, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
    `}

  ${(props) =>
    props.$type === "authentic" &&
    `
      border-left: 3px solid rgb(53, 87, 236);
      background: linear-gradient(90deg, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
    `}
`;

const UpgradeSymbolCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 100px;
  border: 1px solid rgba(211, 211, 211, 0.5);
  background: linear-gradient(180deg, rgb(43, 49, 58) 0%, rgb(30, 34, 42) 100%);
  border-radius: 8px;
  padding: 2px;
  box-shadow: 0 2px 6px ${colors.main.dark0Alpha50};
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
  background-color: rgb(82, 82, 82);
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
  background-color: ${colors.greyScale.grey5Alpha85};
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
  border: 1px solid rgb(79, 96, 107);
  border-radius: 7px;
  outline: 1px solid ${colors.commonInfo.wrapOutline};
`;

const ChartWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;

  @media screen and (max-width: 652px) {
    flex-direction: column;
  }
`;

const MesoUsed = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding-right: 5px;
  margin-bottom: 10px;
  height: 35px;
  font-size: 15px;
  border-radius: 10px;
  background-color: rgba(59, 66, 75, 0.9);
  border: 1px solid rgb(38, 43, 49);
  box-shadow: 0px 1px 0px rgb(133, 145, 145);
`;

const MesoTitle = styled.p`
  font-weight: 700;
  margin-bottom: 2px;
`;

const GoodTaxpayer = styled.img`
  width: 150px;
  margin: 0 auto;
`;

const PieChartWrap = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
