import React, { useState } from "react";
import styled from "styled-components";
import { ContainerCss } from "../common/searchCharacter/ContainerBox";
import { BossIncomeTab } from "./BossIncomeTab";
import { ExpirationCheckTab } from "./ExpirationCheckTab";

const tabs = [
  { id: "boss-income", label: "보스 수익" },
  { id: "expiration", label: "기간 만료 체크" },
];

export const ChecklistShell = () => {
  const [activeTab, setActiveTab] = useState("boss-income");

  return (
    <Wrap>
      <TitleRow>
        <Title>{"CHECKLIST"}</Title>
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
  height: 100%;
  padding: 8px;
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
  font-size: clamp(26px, 3vw);
  color: rgb(220, 252, 2);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
`;

const TabBar = styled.div`
  display: flex;
  gap: 10px;
  margin: 18px 0 5px;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.22);
    border-radius: 999px;
  }
`;

const TabButton = styled.button`
  cursor: pointer;
  flex: 0 0 auto;
  min-width: 130px;
  height: 40px;
  padding: 0 18px;
  border-radius: 9px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(94, 210, 232, 0.9)" : "rgba(255, 255, 255, 0.16)"};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, rgba(54, 184, 208, 0.95) 0%, rgba(34, 149, 184, 0.95) 100%)"
      : "rgba(255, 255, 255, 0.08)"};
  color: ${({ $active }) =>
    $active ? "#ffffff" : "rgba(255, 255, 255, 0.88)"};
  font-size: 14px;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
