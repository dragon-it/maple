import React, { useState } from "react";
import styled from "styled-components";
import Extreme_Elixir from "../../assets/pages/expSimulator/Elixir/Extreme_Elixir.png";
import Union_Elixir from "../../assets/pages/expSimulator/Elixir/Union_Elixir.png";
import Growth_Elixir1 from "../../assets/pages/expSimulator/Elixir/Growth_Elixir1.png";
import Growth_Elixir2 from "../../assets/pages/expSimulator/Elixir/Growth_Elixir2.png";
import Growth_Elixir3 from "../../assets/pages/expSimulator/Elixir/Growth_Elixir3.png";
import Transcendent_Elixir from "../../assets/pages/expSimulator/Elixir/Transcendent_Elixir.png";
import Typhoon_Elixir from "../../assets/pages/expSimulator/Elixir/Typhoon_Elixir.png";
import limit_Elixir from "../../assets/pages/expSimulator/Elixir/limit_Elixir.png";
import leap_Elixir from "../../assets/pages/expSimulator/Elixir/leap_Elixir.png";
import legendary_Elixir from "../../assets/pages/expSimulator/Elixir/legendary_Elixir.png";

import Advanced_EXP_Coupon from "../../assets/pages/expSimulator/EXP/Advanced_EXP_icon.png";
import EXP_Coupon from "../../assets/pages/expSimulator/EXP/EXP_icon.png";
import ExpData, { ELIXIR_FIXED_EXP } from "./ExpData";
import iconBackground from "../../assets/pages/user/equipment/optionIcon/Item.ItemIcon.base.png";

export const ExpInput = () => {
  const [level, setLevel] = useState(200);
  const [currentExp, setCurrentExp] = useState(0);
  const [itemCounts, setItemCounts] = useState({
    "익스트림 성장의 비약": 0,
    "궁극의 유니온 성장의 비약": 0,
    "성장의 비약 (200~209)": 0,
    "성장의 비약 (200~219)": 0,
    "성장의 비약 (200~229)": 0,
    "태풍 성장의 비약 (200~239)": 0,
    "극한 성장의 비약 (200~249)": 0,
    "도약 성장의 비약 (200~259)": 0,
    "초월 성장의 비약 (200~269)": 0,
    "전설 성장의 비약 (200~279)": 0,
    "EXP 교환권 (200~260)": 0,
    "상급 EXP 교환권 (260~)": 0,
  });

  // 리셋 함수
  const handleReset = () => {
    setLevel(200);
    setCurrentExp(0);
    setItemCounts({
      "익스트림 성장의 비약": 0,
      "궁극의 유니온 성장의 비약": 0,
      "성장의 비약 (200~209)": 0,
      "성장의 비약 (200~219)": 0,
      "성장의 비약 (200~229)": 0,
      "태풍 성장의 비약 (200~239)": 0,
      "극한 성장의 비약 (200~249)": 0,
      "도약 성장의 비약 (200~259)": 0,
      "초월 성장의 비약 (200~269)": 0,
      "전설 성장의 비약 (200~279)": 0,
      "EXP 교환권 (200~260)": 0,
      "상급 EXP 교환권 (260~)": 0,
    });
  };

  const calculateFinalExp = () => {
    let finalLevel = level;
    let currentExpValue = Number(currentExp);
    let totalExp = 0;
    let accumulatedExp = 0;

    // 경험치 데이터 정리 (쉼표 제거 후 숫자로 변환)
    const expIncreaseData = ExpData.reduce((acc, data) => {
      acc[data.level] = {
        ...data,
        requiredExp: Number(data.requiredExp.replace(/,/g, "")), // 쉼표 제거 후 숫자로 변환
      };
      return acc;
    }, {});

    // 현재 레벨의 총 경험치 계산
    if (expIncreaseData[finalLevel]) {
      totalExp = expIncreaseData[finalLevel].requiredExp;
      accumulatedExp = (totalExp * currentExpValue) / 100;
    }

    // 아이템 사용
    Object.keys(itemCounts).forEach((item) => {
      let count = itemCounts[item];

      for (let i = 0; i < count; i++) {
        if (!expIncreaseData[finalLevel] || finalLevel >= 300) break; // 최대 레벨 300 제한

        let expIncreaseAmount = 0;

        if (item === "EXP 교환권 (200~260)" && finalLevel < 200) continue;
        if (item === "상급 EXP 교환권 (260~)" && finalLevel < 260) continue;

        if (item === "궁극의 유니온 성장의 비약") {
          expIncreaseAmount = 11462335230;
        } else if (
          item === "EXP 교환권 (200~260)" ||
          item === "상급 EXP 교환권 (260~)"
        ) {
          const fixedExp = expIncreaseData[finalLevel]?.[item]
            ? Number(expIncreaseData[finalLevel][item].replace(/,/g, ""))
            : 0;
          expIncreaseAmount = fixedExp;
        } else if (ELIXIR_FIXED_EXP[item]) {
          const config = ELIXIR_FIXED_EXP[item];

          if (item === "익스트림 성장의 비약") {
            expIncreaseAmount = config;
          } else {
            if (finalLevel <= config.maxLevel) {
              // 현재 레벨에서 남은 경험치 계산
              const remainExp = totalExp - accumulatedExp;

              // 1레벨업 강제
              finalLevel++;

              // 다음 레벨 totalExp 갱신
              if (!expIncreaseData[finalLevel]) break;
              totalExp = expIncreaseData[finalLevel].requiredExp;

              // 남은 경험치를 다음 레벨에 이월
              accumulatedExp = remainExp;

              continue;
            } else {
              expIncreaseAmount = config.exp;
            }
          }
        } else {
          // 혹시 모를 fallback (안 써도 됨)
          expIncreaseAmount = 0;
        }

        // 261레벨이 되어도 경험치 계속 반영
        accumulatedExp += expIncreaseAmount;

        // 레벨업 처리(모든 경험치를 소모할 때까지 반복)
        while (accumulatedExp >= totalExp) {
          accumulatedExp -= totalExp;
          finalLevel++;

          // 최대 레벨 300 초과 방지
          if (finalLevel >= 300) {
            finalLevel = 300;
            accumulatedExp = 0;
            break;
          }

          // 새로운 레벨의 필요 경험치 업데이트
          if (expIncreaseData[finalLevel]) {
            totalExp = expIncreaseData[finalLevel].requiredExp;
          } else {
            break;
          }
        }
      }
    });

    // 최종 경험치 백분율 계산
    let finalExpPercent = 0;
    if (finalLevel < 300 && expIncreaseData[finalLevel]) {
      finalExpPercent = ((accumulatedExp / totalExp) * 100).toFixed(3);
    }

    return {
      finalLevel,
      expPercent: finalLevel === 300 ? 0 : finalExpPercent,
      finalExpValue: accumulatedExp,
    };
  };

  const { finalLevel, expPercent, finalExpValue } = calculateFinalExp();

  const itemImages = {
    "익스트림 성장의 비약": Extreme_Elixir,
    "궁극의 유니온 성장의 비약": Union_Elixir,
    "성장의 비약 (200~209)": Growth_Elixir1,
    "성장의 비약 (200~219)": Growth_Elixir2,
    "성장의 비약 (200~229)": Growth_Elixir3,
    "태풍 성장의 비약 (200~239)": Typhoon_Elixir,
    "극한 성장의 비약 (200~249)": limit_Elixir,
    "도약 성장의 비약 (200~259)": leap_Elixir,
    "초월 성장의 비약 (200~269)": Transcendent_Elixir,
    "전설 성장의 비약 (200~279)": legendary_Elixir,
    "EXP 교환권 (200~260)": EXP_Coupon,
    "상급 EXP 교환권 (260~)": Advanced_EXP_Coupon,
  };

  return (
    <Container>
      <ItemTitle>레벨</ItemTitle>
      <ValueInput
        maxLength="3"
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
      <ItemTitle>경험치 (%)</ItemTitle>

      <ValueInput
        maxLength="6"
        value={currentExp}
        onChange={(e) => {
          let value = e.target.value;
          // 숫자와 소수점만 허용하는 정규식 적용
          if (!/^\d*\.?\d*$/.test(value)) return;
          setCurrentExp(value);
        }}
        onBlur={() => {
          let value = parseFloat(currentExp);
          if (isNaN(value) || value < 0 || value > 100) {
            alert("경험치는 0에서 100 사이여야 합니다.");
            setCurrentExp(0);
          } else {
            setCurrentExp(value.toFixed(3)); // 소수점 3자리까지 고정
          }
        }}
      />

      <Reset onClick={handleReset}>초기화</Reset>
      <ResultActions>
        <ResultText>결과</ResultText>
      </ResultActions>

      <Result>
        {finalLevel}레벨 {expPercent}% ({Number(finalExpValue).toLocaleString()}
        )
      </Result>

      <ItemWrap>
        {Object.keys(itemCounts).map((item) => (
          <ItemControl key={item}>
            <Item>
              <IconWrap>
                <Icon src={itemImages[item]} alt="item_Icon" />
              </IconWrap>
              <span>
                {item} × <Quantity>{itemCounts[item]}</Quantity>
              </span>
            </Item>
            <ExpValueInput
              maxLength="5"
              value={itemCounts[item]}
              onChange={(e) => {
                let value = e.target.value;
                if (!/^\d*$/.test(value)) return; // 숫자만 허용
                value = Number(value);
                if (value < 0) value = 0; // 음수 방지

                setItemCounts((prev) => ({
                  ...prev,
                  [item]: value,
                }));
              }}
            />
          </ItemControl>
        ))}
      </ItemWrap>
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

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const ValueInput = styled.input`
  border-radius: 5px;
  height: 35px;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  background: rgb(70, 77, 83);
  color: rgb(255, 255, 255);
  margin-top: 2px;
`;

const ExpValueInput = styled.input`
  border-radius: 5px;
  height: 35px;
  width: 30%;
  text-align: right;
  background: rgb(70, 77, 83);
  color: rgb(255, 255, 255);
`;

const ItemWrap = styled.div`
  margin: 10px 0;
`;

const ItemControl = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgb(46, 55, 66);
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

const Result = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  border-radius: 5px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 0px rgb(88, 88, 88);
  background: rgb(90, 96, 102);
  border: 1px solid rgb(197, 220, 242);
  padding: 5px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 100%;
    background: linear-gradient(
      315deg,
      rgb(255 255 255 / 0%) 52%,
      rgb(255 255 255 / 60%) 59%,
      rgb(255 255 255 / 0%) 66%
    );
    animation: holo-move 3s infinite linear;
  }

  @keyframes holo-move {
    0% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(50%);
    }
  }
`;

const IconWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 40px;
  border-radius: 5px;
  background-image: url(${iconBackground});
  background-size: 50px 50px;
  background-position: center;
  object-fit: contain;
  margin-right: 5px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
    background: linear-gradient(
      130deg,
      rgba(255, 255, 255, 0.6) 44%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
    border-radius: 5px;
  }
`;

const Icon = styled.img`
  margin: auto;
  image-rendering: pixelated;
`;

const ResultActions = styled.div`
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
  margin: 15px 0px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;
