import React from 'react';
import styled from 'styled-components';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';

export const PropensityInformation = ({ propensityData }) => {
  const data = [
    { subject: '카리스마', A: propensityData.charisma_level },
    { subject: '매력', A: propensityData.charm_level },
    { subject: '손재주', A: propensityData.handicraft_level },
    { subject: '통찰력', A: propensityData.insight_level },
    { subject: '감성', A: propensityData.sensibility_level },
    { subject: '의지', A: propensityData.willingness_level },
  ];



  return (
    <Container>
      <PropensityTextWrap>
        <TextWrap>
          <p>카리스마 {propensityData.charisma_level}Lv</p>
          <p>매력 {propensityData.charm_level}Lv</p>
          <p>손재주 {propensityData.handicraft_level}Lv</p>
        </TextWrap>
        <TextWrap>
          <p>통찰력 {propensityData.insight_level}Lv</p>
          <p>감성 {propensityData.charisma_level}Lv</p>
          <p>의지 {propensityData.sensibility_level}Lv</p>
        </TextWrap>
      </PropensityTextWrap>
      <ChartWrap>
        <RadarChart cx={152} cy={115} outerRadius={100} width={320} height={250} data={data} polarRadius={500} >
          <PolarGrid />
          <Tooltip formatter={(value) => `레벨: ${value}`} />
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
  align-items: center;
  height: 300px; 
`;

const PropensityTextWrap = styled.div`

`

const TextWrap = styled.div`
`

const SubjectItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    padding: 8px;
    background-color: rgb(153,221,238);
    color: white;
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
  margin-top: 50px;
`