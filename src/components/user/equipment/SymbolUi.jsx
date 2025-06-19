import React from "react";
import styled, { css } from "styled-components";
import arcBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arc_EquipBackgrnd.png";
import autBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/aut_EquipBackgrnd.png";
import grandBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandaut_EquipBackgrnd.png";
import arcSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arc_EquipSymbol.png";
import arcSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arc_EquipSymbolDisabled.png";
import autSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/aut_EquipSymbol.png";
import autSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/aut_EquipSymbolDisabled.png";
import grandSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandaut_EquipSymbol.png";
import grandSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandaut_EquipSymbolDisabled.png";
import colors from "../../common/color/colors";

export const SymbolUi = ({ symbolData }) => {
  const list = symbolData?.symbol || [];

  const arcane = list.filter((s) => s.symbol_name.includes("아케인"));
  const authentic = list.filter(
    (s) => s.symbol_name.includes("어센틱") && !s.symbol_name.includes("그랜드")
  );
  const grand = list.filter((s) => s.symbol_name.includes("그랜드"));

  const getTotalForce = (symbols) =>
    symbols.reduce((acc, item) => acc + parseInt(item.symbol_force, 10), 0);

  // ARC force 계산
  const totalArcaneForce = getTotalForce(arcane);
  // AUT force 계산
  const totalAuthenticForce = getTotalForce(authentic);
  // Grand AUT force 계산
  const totalGrandAuthenticForce = getTotalForce(grand);

  // ARC, AUT 스탯 합산 함수
  const getStatObject = (symbols) => {
    const statsObj = {};
    symbols.forEach((item) => {
      const stats = [
        { value: item.symbol_hp, name: "HP" },
        { value: item.symbol_str, name: "STR" },
        { value: item.symbol_dex, name: "DEX" },
        { value: item.symbol_luk, name: "LUK" },
        { value: item.symbol_int, name: "INT" },
        { value: item.symbol_exp_rate, name: "EXP" },
        { value: item.symbol_meso_rate, name: "MESO" },
        { value: item.symbol_drop_rate, name: "DROP" },
      ];
      stats.forEach((stat) => {
        const statValue = parseInt(stat.value, 10) || 0;
        if (statValue > 0) {
          statsObj[stat.name] = (statsObj[stat.name] || 0) + statValue;
        }
      });
    });
    return statsObj;
  };
  const formatNumber = (num) => num?.toLocaleString("ko-KR");

  const arcStatsObject = getStatObject(arcane);
  const autStatsObject = getStatObject(authentic);
  const grandStatsObject = getStatObject(grand);
  const getIcon = (arr, idx) => arr[idx]?.symbol_icon || null;

  const TextArray = {
    display: "flex",
    justifyContent: "space-between",
    width: "90px",
  };

  const TextArrayDisabled = {
    display: "flex",
    justifyContent: "space-between",
    width: "70px",
    marginTop: "30px",
  };

  return (
    <Wrap>
      {/* 아케인 심볼 섹션: arcane이 있을 때만 렌더링 */}
      <Section $bg={arcBack}>
        {arcane.length <= 0 && (
          <ConditionText>
            <p style={{ fontSize: "13px" }}>{`<개방 조건>`}</p>
            <span style={{ color: "rgb(197, 236, 0)" }}>[LV.200] </span>또
            하나의 힘, 아케인포스
          </ConditionText>
        )}
        <StatBox>
          <ForceText>
            <div style={arcane.length <= 0 ? TextArrayDisabled : TextArray}>
              <span>ARC</span>
              <span>+{totalArcaneForce}</span>
            </div>
          </ForceText>
          <StatText>
            {Object.entries(arcStatsObject).map(([key, value]) => (
              <div key={key} style={TextArray}>
                <span>{key}</span>
                <span>+{key === "HP" ? formatNumber(value) : value}</span>
              </div>
            ))}
          </StatText>
        </StatBox>
        <ArcGrid>
          {Array.from({ length: 6 }).map((_, idx) => {
            const icon = getIcon(arcane, idx);
            return (
              <Slot key={idx}>
                <ARCSlotImg
                  src={icon ? arcSymbol : arcSymbolDisabled}
                  alt="slot"
                />
                <SymbolWrap>
                  {icon && <SymbolImg src={icon} alt="symbol" />}
                </SymbolWrap>
                <ARCSymbolInfo>
                  {arcane[idx]?.symbol_level && (
                    <p>Lv.{arcane[idx].symbol_level}</p>
                  )}
                  <MaxLevel>
                    {arcane[idx]?.symbol_level === 20 && <p>MAX</p>}
                  </MaxLevel>
                </ARCSymbolInfo>
              </Slot>
            );
          })}
        </ArcGrid>
      </Section>

      {/* 어센틱 심볼 섹션: authentic이 있을 때만 렌더링 */}
      <Section $bg={autBack}>
        {authentic.length <= 0 && (
          <ConditionText>
            <p style={{ fontSize: "13px" }}>{`<개방 조건>`}</p>
            <span style={{ color: "rgb(197, 236, 0)" }}>[Lv.260] </span>또
            하나의 힘, 어센틱포스
          </ConditionText>
        )}

        <StatBox>
          <ForceText>
            <div style={authentic.length <= 0 ? TextArrayDisabled : TextArray}>
              <span>AUT</span>
              <span>+{totalAuthenticForce}</span>
            </div>
          </ForceText>
          <StatText>
            {Object.entries(autStatsObject).map(([key, value]) => (
              <div key={key} style={TextArray}>
                <span>{key}</span>
                <span>+{key === "HP" ? formatNumber(value) : value}</span>
              </div>
            ))}
          </StatText>
        </StatBox>

        <AutGrid>
          {Array.from({ length: 6 }).map((_, idx) => {
            const icon = getIcon(authentic, idx);
            return (
              <Slot key={idx}>
                <AUTSlotImg
                  src={icon ? autSymbol : autSymbolDisabled}
                  alt="slot"
                />
                <AUTSymbolWrap>
                  {icon && <SymbolImg src={icon} alt="symbol" />}
                </AUTSymbolWrap>
                <AUTSymbolInfo>
                  {authentic[idx]?.symbol_level && (
                    <p>Lv.{authentic[idx].symbol_level}</p>
                  )}
                  <MaxLevel>
                    {authentic[idx]?.symbol_level === 11 && <p>MAX</p>}
                  </MaxLevel>
                </AUTSymbolInfo>
              </Slot>
            );
          })}
        </AutGrid>
      </Section>

      {/* 그랜드 어센틱 심볼 섹션: grand가 있을 때만 렌더링 */}
      <Section $bg={grandBack}>
        {grand.length <= 0 && (
          <ConditionText>
            <p style={{ fontSize: "13px" }}>{`<개방 조건>`}</p>
            <span style={{ color: "rgb(197, 236, 0)" }}>[Lv.290] </span>
            [탈라하트] 새로운 움직임
          </ConditionText>
        )}

        <StatBox>
          <ForceText>
            <div style={grand.length <= 0 ? TextArrayDisabled : TextArray}>
              <span>AUT</span>
              <span>+{totalGrandAuthenticForce}</span>
            </div>
          </ForceText>

          <StatText>
            {Object.entries(grandStatsObject).map(([key, value]) => (
              <div key={key} style={TextArray}>
                <span>{key}</span>
                <span>+{key === "AUT" ? `${value}` : `${value}%`}</span>
              </div>
            ))}
          </StatText>
        </StatBox>

        <GrandGrid>
          {Array.from({ length: 3 }).map((_, idx) => {
            const icon = getIcon(grand, idx);
            return (
              <Slot key={idx}>
                <GrandSlotImg
                  src={icon ? grandSymbol : grandSymbolDisabled}
                  alt="slot"
                />
                <GrandSymbolWrap>
                  {icon && <SymbolImg src={icon} alt="symbol" />}
                </GrandSymbolWrap>
                <GrandSymbolInfo>
                  {grand[idx]?.symbol_level && (
                    <p>Lv.{grand[idx].symbol_level}</p>
                  )}
                  <MaxLevel>
                    {grand[idx]?.symbol_level === 11 && <p>MAX</p>}
                  </MaxLevel>
                </GrandSymbolInfo>
              </Slot>
            );
          })}
        </GrandGrid>
      </Section>
    </Wrap>
  );
};

const baseGridStyle = css`
  position: absolute;
  left: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 6px;
`;

const baseSymbolWrapStyle = css`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const baseSymbolInfo = css`
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  text-shadow: 0 0 2px ${colors.main.dark0};
`;

const SymbolWrap = styled.div`
  ${baseSymbolWrapStyle};
  top: 6px;
  left: 8px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  color: ${colors.main.white0};
`;

const Section = styled.div`
  position: relative;
  width: 208px;
  height: 308px;
  background-image: url(${(props) => props.$bg});
  background-repeat: no-repeat;
  background-size: contain;
`;

const StatBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 25px;
  left: 0;
  width: 100%;
  min-height: 70px;
  font-weight: bold;
  line-height: 1.1;
`;

const Slot = styled.div`
  position: relative;
  justify-content: center;
  display: flex;

  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }
`;

const ForceText = styled.div`
  text-shadow: 1px 1px 2px ${colors.main.dark2};
`;

const StatText = styled.div`
  text-align: center;
  white-space: pre-line;
  text-shadow: 1px 1px 2px ${colors.main.dark2};
`;

const MaxLevel = styled.p`
  text-shadow: 0 0 3px ${colors.main.dark0};
  font-size: 14px;
  font-weight: bold;
  backdrop-filter: blur(10px);
  line-height: 0.8;
  margin-top: 2px;
`;

const SymbolImg = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
  image-rendering: pixelated;
`;

const ConditionText = styled.p`
  position: relative;
  color: ${colors.main.white0};
  text-shadow: 0 0 2px ${colors.main.dark0};
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  white-space: pre;
  top: 24px;
  text-align: center;
  z-index: 2;
`;

// 아케인 심볼 섹션
const ArcGrid = styled.div`
  position: absolute;
  bottom: 15px;
  left: 18px;
  right: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4px;
  row-gap: 2px;
`;
const ARCSlotImg = styled.img`
  width: 52px;
`;

const ARCSymbolInfo = styled.div`
  ${baseSymbolInfo};
  text-shadow: 0 0 2px ${colors.characterInfo.symbolColor.arcaneMaxStatShadow};
  top: 55px;
`;

// 어센틱 심볼 섹션
const AUTSlotImg = styled.img`
  width: 49px;
`;
const AutGrid = styled.div`
  ${baseGridStyle};
  bottom: 12px;
  row-gap: 3px;
`;

const AUTSymbolWrap = styled.div`
  ${baseSymbolWrapStyle};
  top: 9px;
  left: 5px;
`;

const AUTSymbolInfo = styled.div`
  ${baseSymbolInfo};
  top: 54px;
`;

// 그랜드 어센틱 심볼 섹션

const GrandSymbolWrap = styled.div`
  ${baseSymbolWrapStyle};
  width: 42px;
  height: 42px;
  top: 9px;
  left: 5px;
`;

const GrandSlotImg = styled.img`
  width: 52px;
`;

const GrandGrid = styled.div`
  ${baseGridStyle};
  bottom: 35px;
`;

const GrandSymbolInfo = styled.div`
  ${baseSymbolInfo};
  top: 55px;
`;
