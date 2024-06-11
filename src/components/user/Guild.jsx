import React, { useState } from "react";
import styled from "styled-components";
import { GuildInformation } from "./guild/GuildInformation";
import { GuildMember } from "./guild/GuildMember";
import { GuildSkill } from "./guild/GuildSkill";

export const Guild = ({ result }) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  console.log(result.guildBasicInformation);

  return (
    <Container>
      <GuildHeader>Guild</GuildHeader>
      <TabWrap>
        <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>
          길드 정보
        </Tab>
        <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>
          길드원
        </Tab>
        <Tab onClick={() => handleTabClick(3)} active={activeTab === 3}>
          길드 스킬
        </Tab>
      </TabWrap>

      {activeTab === 1 && <GuildInformation result={result} />}
      {activeTab === 2 && <GuildMember result={result} />}
      {activeTab === 3 && <GuildSkill result={result} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px;
  padding-top: 5px;
`;

const GuildHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const Tab = styled.div`
  background-color: red;
`;

const TabWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
