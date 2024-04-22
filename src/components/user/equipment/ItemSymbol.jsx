import React from 'react';
import styled from 'styled-components';

export const ItemSymbol = ({ symbolData }) => {
  // 필터 함수를 사용하여 아케인 심볼과 어센틱 심볼을 분류
  const symbolList = symbolData?.symbol || [];
  const arcaneSymbols = symbolList.filter(item => item.symbol_name.includes('아케인'));
  const authenticSymbols = symbolList.filter(item => item.symbol_name.includes('어센틱'));
  const totalArcaneForce = arcaneSymbols.reduce((acc, item) => acc + parseInt(item.symbol_force, 10), 0);
  const totalAuthenticForce = authenticSymbols.reduce((acc, item) => acc + parseInt(item.symbol_force, 10), 0);

  let arcStatsObject = {};
  let autStatsObject = {};

  arcaneSymbols.forEach(item => {
    const stats = [
      { value: item.symbol_luk, name: 'LUK' },
      { value: item.symbol_str, name: 'STR' },
      { value: item.symbol_int, name: 'INT' },
      { value: item.symbol_dex, name: 'DEX' }
    ];
    stats.forEach(stat => {
      const statValue = parseInt(stat.value, 10) || 0;
      if (statValue > 0) {
        // 해당 스탯의 값을 객체에 저장
        arcStatsObject[stat.name] = (arcStatsObject[stat.name] || 0) + statValue;
      }
    });
  });

  authenticSymbols.forEach(item => {
    const stats = [
      { value: item.symbol_luk, name: 'LUK' },
      { value: item.symbol_str, name: 'STR' },
      { value: item.symbol_int, name: 'INT' },
      { value: item.symbol_dex, name: 'DEX' }
    ];
    stats.forEach(stat => {
      const statValue = parseInt(stat.value, 10) || 0;
      if (statValue > 0) {
        // 해당 스탯의 값을 객체에 저장
        autStatsObject[stat.name] = (autStatsObject[stat.name] || 0) + statValue;
      }
    });
  });

  // 스탯과 값을 기반으로 표시 문자열 생성
  const ArcStatDisplay = Object.entries(arcStatsObject).map(([key, value]) => `${key} +${value}`).join('\n');
  const AutStatDisplay = Object.entries(autStatsObject).map(([key, value]) => `${key} +${value}`).join('\n');


  return (
    <Container>
      <Header>SYMBOL</Header>
      <CommonSymbolWrap>
      <SymbolHeader>아케인 심볼</SymbolHeader>
        <SymbolIncreaseWrap>
          <IncreaseArcaneShameWrap>
            <div>ARC +{totalArcaneForce}</div>
          </IncreaseArcaneShameWrap>
          <IncreaseMainStatWrap>
            {ArcStatDisplay.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </IncreaseMainStatWrap>
        </SymbolIncreaseWrap>
          <SymbolWrap>
          {arcaneSymbols.map((item, index) => (
          <Items key={index}>
            {/* '아케인' 단어 제거 */}
            <SymbolName>{item.symbol_name.replace('아케인심볼 :', '')}</SymbolName>
              <SymbolIcons>
                <img src={item.symbol_icon} alt={item.symbol_name} />
              </SymbolIcons>
              <SymbolInfo>
                {item.symbol_level && <p>Lv.{item.symbol_level}</p>}
                {item.symbol_level === 20 ? <p>MAX</p> : ''}
              </SymbolInfo>
          </Items>
          ))}
        </SymbolWrap>
        </CommonSymbolWrap>
        <CommonSymbolWrap>
          <SymbolHeader>어센틱 심볼</SymbolHeader>
          <SymbolIncreaseWrap>
          <IncreaseArcaneShameWrap>
            AUT +{totalAuthenticForce}
          </IncreaseArcaneShameWrap>
          <IncreaseMainStatWrap>
            {AutStatDisplay.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </IncreaseMainStatWrap>
        </SymbolIncreaseWrap>
          <SymbolWrap>
          {authenticSymbols.map((item, index) => (
          <Items key={index}>
            {/* '어센틱' 단어 제거 */}
            <SymbolName>{item.symbol_name.replace('어센틱심볼 :', '')}</SymbolName>
            <SymbolIcons>
              <img src={item.symbol_icon} alt={item.symbol_name} />
            </SymbolIcons>
            <SymbolInfo>
              {item.symbol_level && <p>Lv.{item.symbol_level}</p>}
              {item.symbol_level === 11 ? <p>MAX</p> : ''}
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
  height: 100%;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
  background-color: rgba(0,0,0, 0.9);
  border: 1px solid white;
  outline: 1px solid black;

  @media screen and (max-width:767px) {
    width: 100%;
  }
`

const Header = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`

const CommonSymbolWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: maple-light;
  border-radius: 5px;
  padding: 5px;
  background-color: #333333;
  border: 1px solid rgb(190, 190, 190);
`

const SymbolHeader = styled.div`
  display: flex;
  justify-content: center;
  font-family: maple-light;
  margin-top: 10px;
  color: white;
  width: 100%;
  font-size: 17px;
  color: rgb(220,252,2);
`

const SymbolIncreaseWrap = styled.div`
    color: white;
    width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`

const IncreaseArcaneShameWrap = styled.div`

`

const IncreaseMainStatWrap = styled.div`
  
`


const SymbolWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  gap: 5px;
  
`
const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 70px;
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 5px 0;
  border-radius: 5px;
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
  text-align: center;
`

const SymbolName = styled.div`
`