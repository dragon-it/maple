import React from "react";
import styled from "styled-components";

import arcBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arcEquipBackgrnd.png";
import autBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/autEquipBackgrnd.png";
import grandBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandautEquipBackgrnd.png";
import arcSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arcEquipSymbol.png";
import SymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arcEquipSymbolDisabled.png";
import autSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/autEquipSymbol.png";
import autSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/autEquipSymbolDisabled.png";
import grandSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandautEquipSymbol.png";
import grandSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandautEquipSymbolDisabled.png";

export const SymbolUi = ({ symbolData }) => {
  const list = symbolData?.symbol || [];

  const arcane = list.filter((s) => s.symbol_name.includes("아케인"));
  const authentic = list.filter(
    (s) => s.symbol_name.includes("어센틱") && !s.symbol_name.includes("그랜드")
  );
  const grand = list.filter((s) => s.symbol_name.includes("그랜드"));

  // ARC, AUT force 계산
  const totalArcaneForce = arcane.reduce(
    (acc, item) => acc + parseInt(item.symbol_force, 10),
    0
  );
  const totalAuthenticForce = authentic.reduce(
    (acc, item) => acc + parseInt(item.symbol_force, 10),
    0
  );

  // ARC, AUT 스탯 합산 함수
  const getStatObject = (symbols) => {
    const statsObj = {};
    symbols.forEach((item) => {
      const stats = [
        { value: item.symbol_luk, name: "LUK" },
        { value: item.symbol_str, name: "STR" },
        { value: item.symbol_int, name: "INT" },
        { value: item.symbol_dex, name: "DEX" },
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

  const arcStatsObject = getStatObject(arcane);
  const autStatsObject = getStatObject(authentic);

  const ArcStatDisplay = Object.entries(arcStatsObject)
    .map(([key, value]) => `${key} +${value}`)
    .join("\n");
  const AutStatDisplay = Object.entries(autStatsObject)
    .map(([key, value]) => `${key} +${value}`)
    .join("\n");

  const getIcon = (arr, idx) => arr[idx]?.symbol_icon || null;

  return (
    <Wrap>
      <Section $bg={arcBack}>
        <StatBox>
          <ForceText>ARC +{totalArcaneForce}</ForceText>
          <StatText>
            {ArcStatDisplay.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </StatText>
        </StatBox>
        <ArcGrid>
          {Array.from({ length: 6 }).map((_, idx) => {
            const icon = getIcon(arcane, idx);

            return (
              <Slot key={idx}>
                <SlotImg src={icon ? arcSymbol : SymbolDisabled} alt="slot" />
                <SymbolWrap>
                  {icon && <SlotImg src={arcSymbol} alt="slot" />}
                </SymbolWrap>
                <SymbolInfo>
                  {arcane[idx]?.symbol_level && (
                    <p>Lv.{arcane[idx].symbol_level}</p>
                  )}
                  <MaxLevel>
                    {arcane[idx]?.symbol_level === 20 && <p>MAX</p>}
                  </MaxLevel>
                </SymbolInfo>
              </Slot>
            );
          })}
        </ArcGrid>
      </Section>
      <Section $bg={autBack}>
        <StatBox>
          <ForceText>AUT +{totalAuthenticForce}</ForceText>
          <StatText>
            {AutStatDisplay.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </StatText>
        </StatBox>
        <AutGrid>
          {Array.from({ length: 6 }).map((_, idx) => {
            const icon = getIcon(authentic, idx);

            return (
              <Slot key={idx}>
                <SlotImg src={icon ? autSymbol : SymbolDisabled} alt="slot" />
                <SymbolWrap>
                  {icon && <SlotImg src={autSymbol} alt="slot" />}
                </SymbolWrap>
                <SymbolInfo>
                  {authentic[idx]?.symbol_level && (
                    <p>Lv.{authentic[idx].symbol_level}</p>
                  )}
                  <MaxLevel>
                    {authentic[idx]?.symbol_level === 20 && <p>MAX</p>}
                  </MaxLevel>
                </SymbolInfo>
              </Slot>
            );
          })}
        </AutGrid>
      </Section>
      <Section $bg={grandBack}>
        <GrandGrid>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Slot key={idx}>
              <SlotImg src={grandSymbol} alt="slot" />
              <SymbolImg
                src={getIcon(grand, idx) || grandSymbolDisabled}
                alt="grand authentic"
              />
              <SymbolInfo>
                {grand[idx]?.symbol_level && (
                  <p>Lv.{grand[idx].symbol_level}</p>
                )}
                <MaxLevel>
                  {grand[idx]?.symbol_level === 11 && <p>MAX</p>}
                </MaxLevel>
              </SymbolInfo>
            </Slot>
          ))}
        </GrandGrid>
      </Section>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;

  gap: 5px;
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

const ForceText = styled.div`
  color: #fff;
  text-shadow: 1px 1px 2px #222;
`;

const StatText = styled.div`
  color: #fff;
  text-align: center;
  white-space: pre-line;
  text-shadow: 1px 1px 2px #222;
`;

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

const AutGrid = styled.div`
  position: absolute;
  bottom: 12px;
  left: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 6px;
  row-gap: 3px;
`;

const GrandGrid = styled.div`
  position: absolute;
  bottom: 35px;
  left: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 6px;
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

const SlotImg = styled.img`
  width: 52px;
`;

const SymbolImg = styled.img`
  position: absolute;
  width: 38px;
  height: 38px;
  object-fit: contain;
  display: block;
  image-rendering: pixelated;
`;

const SymbolInfo = styled.div`
  position: absolute;
  color: #fff;
  text-shadow: 0 0 2px #5b569f;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 45px;
  left: 13px;
  line-height: 1;
`;

const MaxLevel = styled.span`
  color: #fff;
  text-shadow: 0 0 2px #000000;
  font-size: 13px;
  font-weight: bold;
`;

const SymbolWrap = styled.div`
  position: absolute;
  width: 34px;
  height: 34px;
  top: 10px;
  left: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
