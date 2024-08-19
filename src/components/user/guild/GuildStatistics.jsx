import React, { useMemo } from "react";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const GuildStatistics = ({ result }) => {
  const classDistribution = useMemo(() => {
    const distribution = {};

    result.guildMembersData.forEach((member) => {
      const characterClass = member.character_class;
      if (distribution[characterClass]) {
        distribution[characterClass]++;
      } else {
        distribution[characterClass] = 1;
      }
    });

    // 클래스 분포를 내림차순으로 정렬하고 상위 10개 추출
    return Object.keys(distribution)
      .map((key) => ({
        class: key,
        count: distribution[key],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [result.guildMembersData]);

  // 상위 3개의 클래스 추출
  const top3Classes = useMemo(() => {
    return [...classDistribution].slice(0, 3);
  }, [classDistribution]);

  return (
    <StatisticsContainer>
      <BarChart
        width={600}
        height={400}
        data={classDistribution}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="class"
          interval={0}
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 12 }}
          stroke="#ffffff"
          height={80}
        />
        <YAxis stroke="#ffffff" />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      <TopClassesContainer>
        <h3>Top 3</h3>
        {top3Classes.map((item, index) => (
          <ClassItem key={index}>
            <ClassName>{item.class}</ClassName>
            <ClassCount>{item.count} 명</ClassCount>
          </ClassItem>
        ))}
      </TopClassesContainer>
    </StatisticsContainer>
  );
};

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2e2e2e;
  border-radius: 10px;
  width: 100%;
  color: rgb(255, 25, 25);
`;

const TopClassesContainer = styled.div`
  flex: 1;
  color: #fff;
  padding: 20px;
  background-color: #424242;
  border-radius: 10px;
  margin-left: 20px;
  h3 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 18px;
  }
`;

const ClassItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #555;
`;

const ClassName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const ClassCount = styled.span`
  font-size: 16px;
`;
