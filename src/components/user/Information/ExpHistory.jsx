import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import styled from "styled-components";

export const ExpHistory = ({ historyData }) => {
  const [isFullData, setIsFullData] = useState(window.innerWidth >= 1024);

  // 화면 크기 변경 이벤트 핸들러
  useEffect(() => {
    const handleResize = () => {
      setIsFullData(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 데이터 가공: character_exp를 ,로 단위 표시하고 character_exp_rate를 %로 표시
  const formattedData = historyData.map((data) => ({
    ...data,
    character_exp: data.character_exp?.toLocaleString(),
    character_exp_rate: parseFloat(data.character_exp_rate), // 숫자로 변환
  }));

  // 전체 데이터 혹은 4개로 줄인 데이터를 조건에 따라 선택
  const interval = Math.ceil(formattedData.length / 7);
  const reducedData = isFullData
    ? formattedData
    : formattedData.filter((_, index) => index % interval === 0);

  // 날짜에서 년도를 제거하고 월과 일을 표시하는 함수
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <Container>
      <ExpHistoryHeader>EXP HISTORY</ExpHistoryHeader>
      <ChartWrap>
        <BarChart
          width={350}
          height={200}
          data={reducedData}
          margin={{ top: 25, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatMonth}
            reversed
            stroke="#ffffff"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            stroke="#ffffff"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#000000d1", color: "#ffffff" }}
            formatter={(value) => {
              return [`${value}%`, "경험치"];
            }}
          />
          <Bar dataKey="character_exp_rate" fill="rgb(175, 209, 20)" />
        </BarChart>
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
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);
  padding: 5px;
  color: black;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const ExpHistoryHeader = styled.h3`
  width: 100%;
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const ChartWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(103, 113, 125);
  border-radius: 5px;
`;
