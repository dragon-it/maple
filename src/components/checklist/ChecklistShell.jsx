import React, { useState } from "react";
import styled from "styled-components";
import { ContainerCss } from "../common/searchCharacter/ContainerBox";
import { BossIncomeTab } from "./BossIncomeTab";
import { ExpirationCheckTab } from "./ExpirationCheckTab";

const tabs = [
  { id: "boss-income", label: "보스 수익" },
  // { id: "expiration", label: "기간 만료 체크" }, 추후 추가 예정
];

export const ChecklistShell = () => {
  const [activeTab, setActiveTab] = useState("boss-income");

  return (
    <Wrap>
      <TitleRow>
        <Title>{"체크리스트"}</Title>
        <Description>{"보스 수익 계산을 도와주는 페이지입니다."}</Description>
      </TitleRow>

      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            type="button"
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabBar>

      <Body>
        {activeTab === "boss-income" ? (
          <BossIncomeTab />
        ) : (
          <ExpirationCheckTab />
        )}
      </Body>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: min(1100px, 100%);
  ${ContainerCss};
  padding: 16px;
  color: white;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(26px, 3vw, 34px);
  color: rgb(220, 252, 2);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.5;
`;

const TabBar = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 14px;
  margin-bottom: 14px;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

const TabButton = styled.button`
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.12)"};
  background: ${({ $active, theme }) =>
    $active ? theme.tabActiveColor : "rgba(255, 255, 255, 0.08)"};
  color: ${({ $active, theme }) =>
    $active ? theme.tabActiveTextColor : "rgba(255, 255, 255, 0.82)"};
  font-size: 14px;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
