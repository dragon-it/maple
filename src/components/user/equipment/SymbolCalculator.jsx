import React from "react";
import symbolData from "./SymbolData.js";
import styled from "styled-components";

export const SymbolCalculator = ({ symbolData }) => {
  const symbols = symbolData.symbol || [];
  console.log(symbols);

  return (
    <Container>
      {symbols.map(
        ({ symbol_name, symbol_icon, symbol_level, symbol_force }, index) => (
          <SymbolCard key={index}>
            <Icon src={symbol_icon} alt={symbol_name} />
            <Name>
              {symbol_name.replace(
                /(어센틱심볼 : |아케인심볼 : |그랜드 )/g,
                ""
              )}
            </Name>
            <Level>레벨: {symbol_level}</Level>
            <Force>포스: {symbol_force}</Force>
          </SymbolCard>
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
  background-color: #111;
`;

const SymbolCard = styled.div`
  background-color: #222;
  border-radius: 8px;
  padding: 16px;
  width: 180px;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Level = styled.div`
  font-size: 14px;
`;

const Force = styled.div`
  font-size: 14px;
`;
