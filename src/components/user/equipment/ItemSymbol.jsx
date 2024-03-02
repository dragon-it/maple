import React from 'react';
import styled from 'styled-components';

export const ItemSymbol = ({ symbolData }) => {
  // 필터 함수를 사용하여 아케인 심볼과 어센틱 심볼을 분류합니다.
  const symbolList = symbolData?.symbol || [];
  const arcaneSymbols = symbolList.filter(item => item.symbol_name.includes('아케인'));
  const authenticSymbols = symbolList.filter(item => item.symbol_name.includes('어센틱'));
  
  return (
    <Container>
      <CommonSymbolWrap>
      <SymbolHeader>아케인 심볼</SymbolHeader>
          <SymbolWrap>
          {arcaneSymbols.map((item, index) => (
          <Items key={index}>
            {/* '아케인' 단어를 제거합니다. */}
            <SymbolName>{item.symbol_name.replace('아케인심볼 :', '')}</SymbolName>
              <SymbolIcons>
                <img src={item.symbol_icon} alt={item.symbol_name} />
              </SymbolIcons>
              <SymbolInfo>
                {item.symbol_level && <p>Lv.{item.symbol_level}</p>}
              </SymbolInfo>
          </Items>
          ))}
        </SymbolWrap>
        </CommonSymbolWrap>
        <CommonSymbolWrap>
          <SymbolHeader>어센틱 심볼</SymbolHeader>
          <SymbolWrap>
          {authenticSymbols.map((item, index) => (
          <Items key={index}>
            {/* '어센틱' 단어를 제거합니다. */}
              <SymbolName>{item.symbol_name.replace('어센틱심볼 :', '')}</SymbolName>
              <SymbolIcons>
                <img src={item.symbol_icon} alt={item.symbol_name} />
              </SymbolIcons>
              <SymbolInfo>
                {item.symbol_level && <p>Lv.{item.symbol_level}</p>}
              </SymbolInfo>
          </Items>
          ))}
        </SymbolWrap>
        </CommonSymbolWrap>
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 460px;
  background-color: #dfdfdf;
  height: auto;
  gap: 14px;
`


const CommonSymbolWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
    font-family: maple-light;
`

const SymbolHeader = styled.div`
  display: flex;
  justify-content: center;
  font-family: maple-light;
`

const SymbolWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
`
const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 3px;
  padding: 0 10px;
`

const SymbolIcons = styled.div`
  display: flex;
  align-items: center;
  img{
    box-sizing: content-box;
    width: 30px;
    height: 30px;
    border: 2px solid #D4BC6C;
    border-radius: 5px;
  }
`
const SymbolInfo = styled.div`
  
`

const SymbolName = styled.div`
`