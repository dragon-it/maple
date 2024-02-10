import React from 'react';
import styled from 'styled-components';

import detailBackgrndImg from '../../../assets/ui/basicUi/StatDetailBackgrnd.png';
import backgrndImg from '../../../assets/ui/basicUi/combatPowerUi.png';
import attackFont from '../../../assets/ui/basicUi/attackFont.png';
import mainFont from '../../../assets/ui/basicUi/mainStatFont.png';
import mainStatUi from '../../../assets/ui/basicUi/mainStat.png';
import utilityUi from '../../../assets/ui/basicUi/utilityUi.png';
import utilityFont from '../../../assets/ui/basicUi/utilityFont.png';

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
  const formatNumberWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container>
      <Combatpower>
        <img src={backgrndImg} alt="backgrndImg" />
        <p>{formatNumber(statInfo.final_stat[42].stat_value)}</p>
      </Combatpower>

      <StatWrap>
        <img src={mainStatUi} alt="mainStatUi" />
        <TextWrap>
        <TextLeft>
          <p>{formatNumberWithCommas(statInfo.final_stat[20].stat_value)}</p>
          <p>{formatNumberWithCommas(statInfo.final_stat[16].stat_value)}</p>
          <p>{formatNumberWithCommas(statInfo.final_stat[18].stat_value)}</p>
        </TextLeft>
        <TextRight>
          <p>{formatNumberWithCommas(statInfo.final_stat[21].stat_value)}</p>
          <p>{formatNumberWithCommas(statInfo.final_stat[17].stat_value)}</p>
          <p>{formatNumberWithCommas(statInfo.final_stat[19].stat_value)}</p>
        </TextRight>
        </TextWrap>
        <StatUi>
          <img src={mainFont} alt="mainFont" />
        </StatUi>
      </StatWrap>
      <AttackFontWrap>
        <TextLeft>
          <p>{formatNumber(statInfo.final_stat[1].stat_value)} </p>
          <p>{statInfo.final_stat[4].stat_value} %</p>
          <p>{statInfo.final_stat[5].stat_value} %</p>
          <p>{formatNumberWithCommas(statInfo.final_stat[40].stat_value)}</p>
          <p>{formatNumberWithCommas(statInfo.final_stat[41].stat_value)}</p>
          <p>{statInfo.final_stat[33].stat_value}초 / {statInfo.final_stat[34].stat_value}%</p>
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
      <EtcStatWrap>
        <img src={utilityUi} alt="utilityUi" />
        <EtcTextWrap>
          <TextLeft>
            <p>{statInfo.final_stat[29].stat_value}%</p>
            <p>{statInfo.final_stat[28].stat_value}%</p>
            <p>{statInfo.final_stat[39].stat_value}%</p>
          </TextLeft>
          <TextRight>
            <p>{statInfo.final_stat[13].stat_value}</p>
            <p>{formatNumberWithCommas(statInfo.final_stat[14].stat_value)}</p>
            <p>{formatNumberWithCommas(statInfo.final_stat[15].stat_value)}</p>
          </TextRight>
        </EtcTextWrap>
        <EtcUi>
          <img src={utilityFont} alt="utilityFont" />
        </EtcUi>
      </EtcStatWrap>
    </Container>
  );
};

const commonTextStyle = `
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  color: white;
  gap: 8px;
`;

const Container = styled.div`
  width: 472px;
  height: 479px;
  position: relative;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-image: url(${detailBackgrndImg});
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const Combatpower = styled.div`
  color: rgb(255, 250, 210);
  display: flex;
  justify-content: center;
  position: absolute;
  top: 37px;
  width: 100%;
  font-size: 20px;
  p {
    position: absolute;
    width: 100%;
    height: 33px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
`;

const StatWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: 448px;
  height: 81px;
  top: 75px;
  gap: 170px;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
`;

const StatUi = styled.div`
  img {
    width: 242px;
    height: 53px;
    position: absolute;
    left: 13px;
    top: 13px;
  }
`;

const AttackFontWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 170px;
  position: absolute;
  bottom: 131px;
  left: 12px;
  width: 448px;
  height: 190px;
  padding: 10px 0;
`;

const TextWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 190px;
  padding-bottom: 13px;
  padding-top: 12px;
`;

const TextRight = styled.div`
  ${commonTextStyle}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
`;

const TextLeft = styled.div`
  ${commonTextStyle}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 10px;
`;

const FontUi = styled.div`
  position: absolute;
  left: 13px;
`;

const EtcStatWrap = styled.div`
  position: absolute;
  display: flex;
  width: 448px;
  height: 92px;
  bottom: 35px;
  gap: 30px;
`;

const EtcTextWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  gap: 198px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const EtcUi = styled.div`
  img {
    position: absolute;
    left: 14px;
    top: 13px;
  }
`;

export default StatInformation;