import React from 'react';
import styled from 'styled-components';
import backgrndImg from '../../../assets/ui/basicUi/combatPowerUi.png';
import attackFont from '../../../assets/ui/basicUi/attackFont.png';

export const StatInformation = ({ statInfo }) => {
  const formatNumber = (value) => {
    if (value >= 100000000) {
      const 억 = Math.floor(value / 100000000);
      const remainder = value % 100000000;
      const 만 = Math.floor(remainder / 10000);

      return (
        <>
          {억 > 0 && <span>{억}억&nbsp;</span>}
          {만 > 0 && <span>{만}만&nbsp;</span>}
          {remainder % 10000 > 0 && <span>{remainder % 10000}</span>}
        </>
      );
    } else if (value >= 10000) {
      const 만 = Math.floor(value / 10000);
      return (
        <>
          {만 > 0 && <span>{만}만&nbsp;</span>}
          {value % 10000 > 0 && <span>{value % 10000}</span>}
        </>
      );
    } else {
      return <span>{value}</span>;
    }
  };
  

  return (
    <Container>
      <img src={backgrndImg} alt="backgrndImg" />
      <Combatpower>{formatNumber(statInfo.final_stat[42].stat_value)}</Combatpower>
      <AttackFontWrap>
        <TextLeft>
          <p>{formatNumber(statInfo.final_stat[1].stat_value)} </p>
          <p>{statInfo.final_stat[4].stat_value} %</p>
          <p>{statInfo.final_stat[5].stat_value} %</p>
          <p>{statInfo.final_stat[40].stat_value} </p>
          <p>{statInfo.final_stat[41].stat_value} </p>
          <p>{statInfo.final_stat[33].stat_value}초/ {statInfo.final_stat[34].stat_value}%</p>
          <p>{statInfo.final_stat[35].stat_value} %</p>
          <p>{statInfo.final_stat[37].stat_value} %</p>
        </TextLeft>
        <TextRight>
          <p>{statInfo.final_stat[2].stat_value} %</p>
          <p>{statInfo.final_stat[3].stat_value} %</p>
          <p>{statInfo.final_stat[32].stat_value} %</p>
          <p>{statInfo.final_stat[6].stat_value} %</p>
          <p>{statInfo.final_stat[7].stat_value} %</p>
          <p>{statInfo.final_stat[30].stat_value} %</p>
          <p>{statInfo.final_stat[36].stat_value} %</p>
          <p>{statInfo.final_stat[43].stat_value} %</p>
        </TextRight>
        <FontUi>
          <img src={attackFont}alt="attackFont" />
        </FontUi>
      </AttackFontWrap>

    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${backgrndImg});
  background-repeat: no-repeat;
  text-shadow: 1px 1px rgba(0,0,0, 0.25);
`

const Combatpower = styled.div`
  color: rgb(255,250,210);
  display: flex;
  justify-content:center;
  position: absolute;
  top: 7px;
  width: 100%;
  font-size: 20px;

`
const AttackFontWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 170px;
  position: absolute;
  bottom: 0px;
  padding-top: 10px;
  width: 448px;
  height: 190px;
  padding-bottom: 13px;
`

const TextRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  padding-right: 10px;
  color: white;
  gap: 8px;
`

const TextLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  padding-left: 10px;
  color: white;
  gap: 8px;
`

const FontUi = styled.div`
  position: absolute;
  left: 13px;
`