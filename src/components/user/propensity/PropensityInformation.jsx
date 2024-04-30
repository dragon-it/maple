import React, { useState } from 'react';
import styled from 'styled-components';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';

export const PropensityInformation = ({ propensityData }) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const data = [
    { subject: '카리스마', A: propensityData.charisma_level },
    { subject: '매력', A: propensityData.charm_level },
    { subject: '손재주', A: propensityData.handicraft_level },
    { subject: '통찰력', A: propensityData.insight_level },
    { subject: '감성', A: propensityData.sensibility_level },
    { subject: '의지', A: propensityData.willingness_level },
  ];

  const PropensityItem = ({ label, level }) => (
    <PropensityName style={{ flexDirection: "row" }}>
      <p style={{ backgroundColor: "rgb(31,189,255)", width: "120px"  }}>
        <PropenLabel>{label}</PropenLabel>
        <PropenLevel>Lv.{level}</PropenLevel>
      </p>
    </PropensityName>
  );

  const handleChartClick = () => {
    setTooltipVisible(!tooltipVisible);
  };

  return (
    <Container>
      <PropensityHeader>PROPENSITY</PropensityHeader>
      <PropensityTextWrap>
        <TextWrap>
            <PropensityItem label="카리스마" level={propensityData.charisma_level} />
            <PropensityItem label="매력" level={propensityData.charm_level} />
            <PropensityItem label="손재주" level={propensityData.handicraft_level} />
          </TextWrap>
          <TextWrap>
            <PropensityItem label="통찰력" level={propensityData.insight_level} />
            <PropensityItem label="감성" level={propensityData.sensibility_level} />
            <PropensityItem label="의지" level={propensityData.willingness_level} />
          </TextWrap>
      </PropensityTextWrap>
      <ChartWrap>
      <RadarChart
          cx={152}
          cy={115}
          outerRadius={100}
          width={320}
          height={250}
          data={data}
          onClick={handleChartClick}>
          <PolarGrid />
          <Tooltip formatter={(value) => `레벨: ${value}`}  active={tooltipVisible} />
          <PolarAngleAxis dataKey="subject" display="none" />
          <Radar name="레벨" dataKey="A" stroke="#3498db" fill="#3498db" fillOpacity={0.6} />
        </RadarChart>
        <ItemsWrap>
            <SubjectItems>
              <p>의지</p>
              <p>감성</p>
            </SubjectItems>
            <SubjectItems>
              <p>카리스마</p>
              <p>통찰력</p>
            </SubjectItems>
            <SubjectItems>
              <p>매력</p>
              <p>손재주</p>
            </SubjectItems>
          </ItemsWrap>
        </ChartWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  width: 100%;
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
  padding: 5px;
  color: black;
`;



const PropensityHeader = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`

const PropensityTextWrap = styled.div`
margin-bottom: 10px;
background-color: #ffffff;
border-radius: 5px;
padding: 2px;
`

const TextWrap = styled.div`
  display: flex;
  flex-direction: row;
  p{
    display: flex;
    margin: 2px;
    justify-content: space-between;
  }
`

const SubjectItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    padding: 6px;
    background-color: rgb(106, 214, 241);
    color: white;
    font-weight: 700;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    
  }

`
const ItemsWrap = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 60px;
  top: -10px;
  z-index: -1;
  :nth-child(1){
    gap: 80px;
  }
  :nth-child(2){
    gap: 220px;
  }
  :nth-child(3){
    gap: 80px;
    align-items: flex-start;
  }
`
const ChartWrap = styled.div`
  position: relative;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 320px;
  z-index: 99;
`
const PropensityName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  p{
    padding: 5px;
    background-color: rgb(106, 214, 241);
    color: white;
    font-weight: 700;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    
  }
`

const PropenLabel = styled.div`
  padding-right: 5px;
  font-size: 14px;
`
const PropenLevel = styled.div`
  font-size: 14px;
  width: 40px;
  display: flex;
  justify-content: flex-start;
`