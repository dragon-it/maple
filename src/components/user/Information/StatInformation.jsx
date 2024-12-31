import React from "react";
import styled from "styled-components";

export const StatInformation = ({ statInfo }) => {
  const formatNumber = (value) => {
    if (value === null || value === undefined) {
      return <span>데이터 없음</span>;
    }
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
    if (value === null || value === undefined) {
      return "데이터 없음";
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getStatValue = (index) => {
    if (!statInfo.final_stat || !statInfo.final_stat[index]) {
      return "데이터 없음";
    }
    return statInfo.final_stat[index].stat_value ?? "데이터 없음";
  };

  const getStatName = (index) => {
    return statInfo.final_stat && statInfo.final_stat[index]
      ? statInfo.final_stat[index].stat_name
      : "데이터 없음";
  };

  return (
    <Container>
      <AllStatWrap>
        <CombatpowerWrap>
          <CombatpowerHeader>
            {statInfo.final_stat[42]
              ? statInfo.final_stat[42].stat_name
              : "데이터 없음"}
          </CombatpowerHeader>
          <p>{formatNumber(getStatValue(42))}</p>
        </CombatpowerWrap>
        <StatWrap>
          <StatLeftWrap>
            <div>
              <StatHeader>{getStatName(20)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(20))}</StatValue>
            </div>
            <div>
              <StatHeader>{getStatName(16)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(16))}</StatValue>
            </div>
            <div>
              <StatHeader>{getStatName(18)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(18))}</StatValue>
            </div>
          </StatLeftWrap>
          <StatRightWrap>
            <div>
              <StatHeader>{getStatName(21)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(21))}</StatValue>
            </div>
            <div>
              <StatHeader>{getStatName(17)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(17))}</StatValue>
            </div>
            <div>
              <StatHeader>{getStatName(19)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(19))}</StatValue>
            </div>
          </StatRightWrap>
        </StatWrap>
        <AttackFontWrap>
          <TextLeft>
            <p>
              <StatHeader>스탯 공격력</StatHeader>
              <StatValue>{formatNumber(getStatValue(1))}</StatValue>
            </p>
            <p>
              <StatHeader>{getStatName(4)}</StatHeader>
              <StatValue>{getStatValue(4)}%</StatValue>
            </p>
            <p>
              <StatHeader>{getStatName(5)}</StatHeader>
              <StatValue>{getStatValue(5)}%</StatValue>
            </p>
            <p>
              <StatHeader>{getStatName(40)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(40))}</StatValue>
            </p>
            <p>
              <StatHeader>{getStatName(41)}</StatHeader>
              <StatValue>{formatNumberWithCommas(getStatValue(41))}</StatValue>
            </p>
            <p>
              <StatHeader>재사용 대기시간 감소</StatHeader>
              <StatValue>
                {getStatValue(33)}초 / {getStatValue(34)}%
              </StatValue>
            </p>
            <p>
              <StatHeader>{getStatName(35)}</StatHeader>
              <StatValue>{getStatValue(35)}%</StatValue>
            </p>
            <p>
              <StatHeader>{getStatName(37)}</StatHeader>
              <StatValue>{getStatValue(37)}%</StatValue>
            </p>
          </TextLeft>
          <TextRight>
            {statInfo.final_stat[2] && (
              <p>
                <StatHeader>{getStatName(2)}</StatHeader>
                <StatValue>{getStatValue(2)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[3] && (
              <p>
                <StatHeader>{getStatName(3)}</StatHeader>
                <StatValue>{getStatValue(3)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[32] && (
              <p>
                <StatHeader>{getStatName(32)}</StatHeader>
                <StatValue>{getStatValue(32)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[6] && (
              <p>
                <StatHeader>{getStatName(6)}</StatHeader>
                <StatValue>{getStatValue(6)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[7] && (
              <p>
                <StatHeader>{getStatName(7)}</StatHeader>
                <StatValue>{getStatValue(7)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[30] && (
              <p>
                <StatHeader>{getStatName(30)}</StatHeader>
                <StatValue>{getStatValue(30)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[36] && (
              <p>
                <StatHeader>{getStatName(36)}</StatHeader>
                <StatValue>{getStatValue(36)}%</StatValue>
              </p>
            )}
            {statInfo.final_stat[43] && (
              <p>
                <StatHeader>{getStatName(43)}</StatHeader>
                <StatValue>{getStatValue(43)}%</StatValue>
              </p>
            )}
          </TextRight>
        </AttackFontWrap>
        <EtcStatWrap>
          <EtcTextWrap>
            <StatLeftWrap>
              {[29, 28, 39].map(
                (index) =>
                  statInfo.final_stat &&
                  statInfo.final_stat[index] && (
                    <div key={index}>
                      <StatHeader>{getStatName(index)}</StatHeader>
                      <StatValue>{getStatValue(index)}%</StatValue>
                    </div>
                  )
              )}
            </StatLeftWrap>
            <StatRightWrap>
              {statInfo.final_stat &&
                statInfo.final_stat.slice(13, 16).map(
                  (stat, index) =>
                    stat && (
                      <div key={index}>
                        <StatHeader>{stat.stat_name}</StatHeader>
                        <StatValue>{stat.stat_value}</StatValue>
                      </div>
                    )
                )}
            </StatRightWrap>
          </EtcTextWrap>
        </EtcStatWrap>
      </AllStatWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);
`;

const AllStatWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`;

const CombatpowerWrap = styled.div`
  color: rgb(255, 250, 210);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(62, 96, 118);
  border: 1px solid rgb(71, 119, 149);
  box-shadow: 0px 2px 0px rgb(0, 0, 0);
  border-radius: 5px;
`;

const CombatpowerHeader = styled.span``;

const StatWrap = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(134, 148, 158, 0.8);
  padding: 8px;
  gap: 10px;
  border-radius: 5px;
`;

const StatLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 54%;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (max-width: 1024px) {
    width: 50%;
  }
`;

const StatRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StatHeader = styled.span`
  align-items: flex-start;
  font-size: 14px;
  color: rgb(210, 221, 225);
`;

const StatValue = styled.span`
  align-items: flex-end;
  font-size: 14px;
  color: white;
`;

const AttackFontWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  gap: 10px;
  background-color: rgb(103 113 125);
  border-radius: 5px;
  white-space: nowrap;
  p {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
  }

  @media screen and (max-width: 1024px) {
    justify-content: center;
  }

  @media screen and (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const TextRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const TextLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const EtcStatWrap = styled.div`
  display: flex;
  flex-direction: row;
  top: 75px;
  background-color: rgba(134, 148, 158, 0.8);
  padding: 8px;
  gap: 10px;
  border-radius: 5px;
`;

const EtcTextWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export default StatInformation;
