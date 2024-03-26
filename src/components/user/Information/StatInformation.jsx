import React from 'react';
import styled from 'styled-components';



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
      <AllStatWrap>
        <CombatpowerWrap>
            <CombatpowerHeader>
              {statInfo.final_stat[42].stat_name}
            </CombatpowerHeader>
            <p>{formatNumber(statInfo.final_stat[42].stat_value)}</p>
        </CombatpowerWrap>
        <StatWrap>
            <StatLeftWrap>
              <div>
                <StatHeader>{statInfo.final_stat[20].stat_name}</StatHeader>
                <StatValue>{formatNumberWithCommas(statInfo.final_stat[20].stat_value)}</StatValue>
              </div>
              <div>
                <StatHeader>{statInfo.final_stat[16].stat_name}</StatHeader>
                <StatValue>{formatNumberWithCommas(statInfo.final_stat[16].stat_value)}</StatValue>
              </div>
              <div>
                <StatHeader>{statInfo.final_stat[18].stat_name}</StatHeader>
                <StatValue>{formatNumberWithCommas(statInfo.final_stat[18].stat_value)}</StatValue>
              </div>
            </StatLeftWrap>
            <StatRightWrap>
              <div>
                <StatHeader>{statInfo.final_stat[21].stat_name}</StatHeader>
                <StatValue>{formatNumberWithCommas(statInfo.final_stat[21].stat_value)}</StatValue>
              </div>
              <div>
                <StatHeader>{statInfo.final_stat[17].stat_name}</StatHeader>
                <StatValue>{formatNumberWithCommas(statInfo.final_stat[17].stat_value)}</StatValue>
              </div>
              <div>
                <StatHeader>{statInfo.final_stat[19].stat_name}</StatHeader>
                <StatValue>{formatNumberWithCommas(statInfo.final_stat[19].stat_value)}</StatValue>
              </div>
            </StatRightWrap>
        </StatWrap>
        <AttackFontWrap>
          <TextLeft>
            <p>
              <StatHeader>스탯 공격력</StatHeader>
              <StatValue>{formatNumber(statInfo.final_stat[1].stat_value)}</StatValue>
            </p>
            <p>
              <StatHeader>{statInfo.final_stat[4].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[4].stat_value}%</StatValue></p>
            <p>
              <StatHeader>{statInfo.final_stat[5].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[5].stat_value}%</StatValue></p>
            <p>
              <StatHeader>{statInfo.final_stat[40].stat_name}</StatHeader>
              <StatValue>{formatNumberWithCommas(statInfo.final_stat[40].stat_value)}</StatValue>
            </p>
            <p>
              <StatHeader>{statInfo.final_stat[41].stat_name}</StatHeader>
              <StatValue>{formatNumberWithCommas(statInfo.final_stat[41].stat_value)}</StatValue>
            </p>
            <p>
              <StatHeader>재사용 대기시간 감소</StatHeader>
              <StatValue>{statInfo.final_stat[33].stat_value}초 / {statInfo.final_stat[34].stat_value}%</StatValue>
            </p>
            <p>
              <StatHeader>{statInfo.final_stat[35].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[35].stat_value}%</StatValue>
            </p>
            <p>
              <StatHeader>{statInfo.final_stat[37].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[37].stat_value}%</StatValue>
            </p>
          </TextLeft>
          <TextRight>
          {statInfo.final_stat[2] && (
            <p>
              <StatHeader>{statInfo.final_stat[2].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[2].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[3] && (
            <p>
              <StatHeader>{statInfo.final_stat[3].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[3].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[32] && (
            <p>
              <StatHeader>{statInfo.final_stat[32].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[32].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[6] && (
            <p>
              <StatHeader>{statInfo.final_stat[6].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[6].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[7] && (
            <p>
              <StatHeader>{statInfo.final_stat[7].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[7].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[30] && (
            <p>
              <StatHeader>{statInfo.final_stat[30].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[30].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[36] && (
            <p>
              <StatHeader>{statInfo.final_stat[36].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[36].stat_value}%</StatValue>
            </p>
          )}
          {statInfo.final_stat[43] && (
            <p>
              <StatHeader>{statInfo.final_stat[43].stat_name}</StatHeader>
              <StatValue>{statInfo.final_stat[43].stat_value}%</StatValue>
            </p>
          )}
          </TextRight>
        </AttackFontWrap>
        <EtcStatWrap>
          <EtcTextWrap>
            <StatLeftWrap>
              {[29, 28, 39].map((index) => (
                statInfo.final_stat[index] && (
                  <div key={index}>
                    <StatHeader>{statInfo.final_stat[index].stat_name}</StatHeader>
                    <StatValue>{statInfo.final_stat[index].stat_value}%</StatValue>
                  </div>
                )
              ))}
            </StatLeftWrap>
            <StatRightWrap>
              {statInfo.final_stat.slice(13, 16).map((stat, index) => (
                stat && (
                  <div key={index}>
                    <StatHeader>{stat.stat_name}</StatHeader>
                    <StatValue>{stat.stat_value}</StatValue>
                  </div>
                )
              ))}
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
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
`;

const AllStatWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`

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
  background-color: rgb(62,96,118);
  border-radius: 5px;
`;

const CombatpowerHeader = styled.div`
  width: 20%;
`

const StatWrap = styled.div`
  display: flex;
  flex-direction: row;
  top: 75px;
  background-color: rgba(134,148,158, 0.8);
  padding: 8px;
  gap: 10px;
  border-radius: 5px;
`;

const StatLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 53%;
  div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 25px;
  }
`

const StatRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
  div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 25px;
  }
`

const StatHeader = styled.div`
  align-items: flex-start;
  font-size: 14px;
  color: white;
`
const StatValue = styled.div`
  align-items: flex-end;
  font-size: 14px;
  color: white;
`

const AttackFontWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 8px;
  gap: 15px;
  background-color: rgb(108,120,134);
  border-radius: 5px;
  white-space: nowrap;
  p{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 25px;
  }
`;


const TextRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  color: white;
  gap: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
`;

const TextLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  color: white;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;



const EtcStatWrap = styled.div`
  display: flex;
  flex-direction: row;
  top: 75px;
  background-color: rgba(134,148,158, 0.8);
  padding: 8px;
  gap: 15px;
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