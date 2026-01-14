import React, { useState } from "react";
import styled from "styled-components";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

export const PropensityInformation = ({ propensityData, blur = false }) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const MAX_PROPENSITY = 100;

  const data = [
    {
      subject: "카리스마",
      real: propensityData.charisma_level,
      visual: Math.max(propensityData.charisma_level / MAX_PROPENSITY, 0.1),
    },
    {
      subject: "매력",
      real: propensityData.charm_level,
      visual: Math.max(propensityData.charm_level / MAX_PROPENSITY, 0.1),
    },
    {
      subject: "손재주",
      real: propensityData.handicraft_level,
      visual: Math.max(propensityData.handicraft_level / MAX_PROPENSITY, 0.1),
    },
    {
      subject: "통찰력",
      real: propensityData.insight_level,
      visual: Math.max(propensityData.insight_level / MAX_PROPENSITY, 0.1),
    },
    {
      subject: "감성",
      real: propensityData.sensibility_level,
      visual: Math.max(propensityData.sensibility_level / MAX_PROPENSITY, 0.1),
    },
    {
      subject: "의지",
      real: propensityData.willingness_level,
      visual: Math.max(propensityData.willingness_level / MAX_PROPENSITY, 0.1),
    },
  ];

  const PropensityItem = ({ label, level }) => (
    <PropensityName style={{ flexDirection: "row" }}>
      <PropensityItemWrapper>
        <PropenLabel>{label}</PropenLabel>
        <PropenLevel>
          Lv.<RevealValue $blurred={blur}>{level}</RevealValue>
        </PropenLevel>
      </PropensityItemWrapper>
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
          <PropensityItem
            label="카리스마"
            level={propensityData.charisma_level}
          />
          <PropensityItem
            label="감성"
            level={propensityData.sensibility_level}
          />
          <PropensityItem label="통찰력" level={propensityData.insight_level} />
        </TextWrap>
        <TextWrap>
          <PropensityItem
            label="의지"
            level={propensityData.willingness_level}
          />
          <PropensityItem
            label="손재주"
            level={propensityData.handicraft_level}
          />
          <PropensityItem label="매력" level={propensityData.charm_level} />
        </TextWrap>
      </PropensityTextWrap>
      <ChartWrap $blurred={blur}>
        <RadarChart
          cx={152}
          cy={115}
          outerRadius={100}
          width={320}
          height={250}
          data={data}
          onClick={handleChartClick}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={false} axisLine={false} />
          <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
          <Tooltip
            formatter={(_, name, props) => {
              const realValue = props.payload.real;
              return [`${realValue}`, name];
            }}
            active={tooltipVisible}
          />
          <Radar
            name="레벨"
            dataKey="visual"
            stroke="#3498db"
            fill="#3498db"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fill: "#161616",
              stroke: "#ffffff",
            }}
          />
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
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  width: 100%;
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);
  padding: 5px;
  color: black;

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

const PropensityItemWrapper = styled.p`
  width: 120px;

  @media screen and (max-width: 576px) {
    width: 105px;
  }

  @media screen and (max-width: 376px) {
    width: 95px;
  }
`;

const PropensityHeader = styled.h2`
  width: 100%;
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const PropensityTextWrap = styled.div`
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 2px;
`;

const TextWrap = styled.span`
  display: flex;
  flex-direction: row;
  p {
    display: flex;
    margin: 2px;
    justify-content: space-between;
  }
`;

const SubjectItems = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    padding: 6px;
    background-color: rgb(106, 214, 241);
    color: white;
    font-weight: 700;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
`;
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
  :nth-child(1) {
    gap: 80px;
  }
  :nth-child(2) {
    gap: 220px;
  }
  :nth-child(3) {
    gap: 80px;
    align-items: flex-start;
  }
`;
const ChartWrap = styled.div`
  position: relative;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 320px;
  z-index: 99;
  filter: ${({ $blurred }) => ($blurred ? "blur(12px)" : "blur(0)")};
  transition: filter 0.45s ease;
`;
const PropensityName = styled.div`
  font-size: 13px;
  p {
    padding: 5px;
    background-color: rgb(106, 214, 241);
    color: white;
    font-weight: 700;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }

  @media screen and (max-width: 376px) {
    font-size: 12px;
  }
`;

const PropenLabel = styled.span`
  flex: 1;
`;

const PropenLevel = styled.span`
  flex: 1;
  text-align: right;
`;

const RevealValue = styled.span`
  filter: ${({ $blurred }) => ($blurred ? "blur(12px)" : "blur(0)")};
  transition: filter 0.45s ease;
`;
