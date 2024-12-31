import React, { useState } from "react";
import styled from "styled-components";
import Extreme_Elixir from "../../assets/expSimulator/Elixir/Extreme_Elixir.png";
import Growth_Elixir1 from "../../assets/expSimulator/Elixir/Growth_Elixir1.png";
import Growth_Elixir2 from "../../assets/expSimulator/Elixir/Growth_Elixir2.png";
import Growth_Elixir3 from "../../assets/expSimulator/Elixir/Growth_Elixir3.png";
import Transcendent_Elixir from "../../assets/expSimulator/Elixir/Transcendent_Elixir.png";
import Typhoon_Elixir from "../../assets/expSimulator/Elixir/Typhoon_Elixir.png";
import limit_Elixir from "../../assets/expSimulator/Elixir/limit_Elixir.png";
import ExpData from "./ExpData";

export const ExpInput = () => {
  const [level, setLevel] = useState(200);
  const [currentExp, setCurrentExp] = useState(0);
  const [elixirCounts, setElixirCounts] = useState({
    "익스트림 성장의 비약": 0,
    "성장의 비약 (200~209)": 0,
    "성장의 비약 (200~219)": 0,
    "성장의 비약 (200~229)": 0,
    "태풍 성장의 비약 (200~239)": 0,
    "극한 성장의 비약 (200~249)": 0,
    "초월 성장의 비약 (200~269)": 0,
  });

  const handleElixirChange = (elixir, delta) => {
    setElixirCounts((prev) => ({
      ...prev,
      [elixir]: Math.max(prev[elixir] + delta, 0),
    }));
  };

  const handleReset = () => {
    setLevel(200);
    setCurrentExp(0);
    setElixirCounts({
      "익스트림 성장의 비약": 0,
      "성장의 비약 (200~209)": 0,
      "성장의 비약 (200~219)": 0,
      "성장의 비약 (200~229)": 0,
      "태풍 성장의 비약 (200~239)": 0,
      "극한 성장의 비약 (200~249)": 0,
      "초월 성장의 비약 (200~269)": 0,
    });
  };

  const calculateFinalExp = () => {
    // 초기 변수 설정
    let finalLevel = level;
    let currentExpValue = Number(currentExp);
    let totalExp = 0;
    let accumulatedExp = 0;

    // ExpData 배열을 객체로 변환
    const expIncreaseData = ExpData.reduce((acc, data) => {
      acc[data.level] = {
        ...data,
        requiredExp: Number(data.requiredExp.replace(/,/g, "")), // 문자열 -> 숫자 변환
      };
      return acc;
    }, {});

    // 현재 레벨 경험치 데이터 확인
    if (expIncreaseData[finalLevel]) {
      totalExp = expIncreaseData[finalLevel].requiredExp;
      accumulatedExp = (totalExp * currentExpValue) / 100;
    }

    // 비약 데이터 처리
    Object.keys(elixirCounts).forEach((elixir) => {
      const count = elixirCounts[elixir];

      for (let i = 0; i < count; i++) {
        if (!expIncreaseData[finalLevel]) break;

        const expPercentIncrease = Number(expIncreaseData[finalLevel][elixir]);
        const expIncreaseAmount = (totalExp * expPercentIncrease) / 100;
        accumulatedExp += expIncreaseAmount;

        // 레벨업 처리
        while (accumulatedExp >= totalExp) {
          accumulatedExp -= totalExp;
          finalLevel++;

          // 다음 레벨 경험치 데이터 가져오기
          if (expIncreaseData[finalLevel]) {
            totalExp = expIncreaseData[finalLevel].requiredExp;
          } else {
            break;
          }
        }
      }
    });

    // 최종 경험치 비율을 계산 (현재 누적 경험치를 기준으로 계산)
    let finalExpPercent = 0;
    if (expIncreaseData[finalLevel]) {
      finalExpPercent = ((accumulatedExp / totalExp) * 100).toFixed(3); // 소수점 3자리까지 계산
    }

    // 최종 레벨과 경험치 비율을 객체로 반환
    return { finalLevel, expPercent: finalExpPercent };
  };

  const { finalLevel, expPercent } = calculateFinalExp();

  const elixirImages = {
    "익스트림 성장의 비약": Extreme_Elixir,
    "성장의 비약 (200~209)": Growth_Elixir1,
    "성장의 비약 (200~219)": Growth_Elixir2,
    "성장의 비약 (200~229)": Growth_Elixir3,
    "태풍 성장의 비약 (200~239)": Typhoon_Elixir,
    "극한 성장의 비약 (200~249)": limit_Elixir,
    "초월 성장의 비약 (200~269)": Transcendent_Elixir,
  };

  return (
    <Container>
      <ItemTitle>현재 레벨: {level}</ItemTitle>
      <ValueInput
        type="number"
        value={level}
        onChange={(e) => {
          const newLevel = e.target.value === "" ? "" : Number(e.target.value);

          setLevel(newLevel);
        }}
        onBlur={() => {
          if (level === "" || level < 200 || level > 299) {
            alert("레벨은 200에서 299 사이여야 합니다.");
            setLevel(200); // 범위 벗어나면 초기값으로 설정
          }
        }}
      />
      <ItemTitle>현재 경험치: {currentExp}%</ItemTitle>
      <ValueInput
        type="number"
        value={currentExp}
        onChange={(e) => setCurrentExp(Number(e.target.value))}
        onBlur={() => {
          if (currentExp < 0 || currentExp > 100) {
            alert("경험치는 0에서 100사이여야 합니다.");
            setCurrentExp(0);
          }
        }}
      />
      <ElixirWrap>
        {Object.keys(elixirCounts).map((elixir) => (
          <ElixirControl key={elixir}>
            <Elixir>
              <IconWrap>
                <Icon src={elixirImages[elixir]} alt="elixir_Icon" />
              </IconWrap>
              <span>
                {elixir} × <Quantity>{elixirCounts[elixir]}</Quantity>
              </span>
            </Elixir>

            <ButtonWrap>
              <QuantityButton onClick={() => handleElixirChange(elixir, -1)}>
                -
              </QuantityButton>
              <QuantityButton onClick={() => handleElixirChange(elixir, 1)}>
                +
              </QuantityButton>
            </ButtonWrap>
          </ElixirControl>
        ))}
        <Reset onClick={handleReset}>초기화</Reset>
      </ElixirWrap>
      <ResultActions>
        <ResultText>결과</ResultText>
      </ResultActions>

      <Result>
        {finalLevel}레벨 {expPercent}%
      </Result>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: rgb(255, 255, 255);
`;

const ItemTitle = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;

const Elixir = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const ValueInput = styled.input`
  border-radius: 5px;
  height: 25px;
  width: 100%;
  box-sizing: border-box;
  background: rgb(70, 77, 83);
  color: rgb(255, 255, 255);
  margin-top: 2px;
`;

const ElixirWrap = styled.div`
  margin: 15px 0;
`;

const ElixirControl = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  background: rgb(33, 40, 48);
  border: 1px solid rgb(54, 82, 100);
  outline: 1px solid rgb(67, 121, 128);
  border-radius: 5px;
  padding: 3px;
  margin: 7px 0px;
  align-items: center;
  color: rgb(216, 216, 216);

  &:hover {
    filter: brightness(1.1);
  }
`;

const Quantity = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 3px;
`;

const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  font-size: 20px;
  background: rgb(141, 199, 209);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.3);
  }
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 0px rgb(88, 88, 88);
  background: rgb(90, 96, 102);
  border: 1px solid rgb(197, 220, 242);
  padding: 5px;
`;

const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  margin-right: 5px;
  background-color: rgb(216, 216, 214);
`;

const Icon = styled.img`
  margin: auto;
  image-rendering: pixelated;
`;

const ResultActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ResultText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: rgb(200, 175, 137);
  text-shadow: 1px 1px 1px rgb(173, 92, 92);
`;

const Reset = styled.button`
  width: 100%;
  background: rgb(255, 255, 255);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;
