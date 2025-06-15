import React from "react";
import styled from "styled-components";

import arcBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arcEquipBackgrnd.png";
import autBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/autEquipBackgrnd.png";
import grandBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandautEquipBackgrnd.png";
import arcSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arcEquipSymbol.png";
import arcSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arcEquipSymbolDisabled.png";
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

  const getIcon = (arr, idx) => arr[idx]?.symbol_icon || null;

  return (
    <Wrap>
      <Section $bg={arcBack}>
        <ArcGrid>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Slot key={idx}>
              <SlotImg src={arcSymbol} alt="slot" />
              <SymbolImg
                src={getIcon(arcane, idx) || arcSymbolDisabled}
                alt="arcane"
              />
            </Slot>
          ))}
        </ArcGrid>
      </Section>
      <Section $bg={autBack}>
        <AutGrid>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Slot key={idx}>
              <SlotImg src={autSymbol} alt="slot" />
              <SymbolImg
                src={getIcon(authentic, idx) || autSymbolDisabled}
                alt="authentic"
              />
            </Slot>
          ))}
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
            </Slot>
          ))}
        </GrandGrid>
      </Section>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  image-rendering: pixelated;
`;

const Section = styled.div`
  position: relative;
  width: 184px;
  height: 272px;
  background-image: url(${(props) => props.$bg});
  background-repeat: no-repeat;
  background-size: contain;
`;

const ArcGrid = styled.div`
  position: absolute;
  bottom: 15px;
  left: 18px;
  right: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4px;
  row-gap: 5px;
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
  width: 42px;
  height: 42px;
`;

const SlotImg = styled.img`
  width: 44px;
  height: 89px;
`;

const SymbolImg = styled.img`
  position: absolute;
  top: 9px;
  left: 5px;
  width: 33px;
  height: 33px;
  object-fit: contain;
`;
