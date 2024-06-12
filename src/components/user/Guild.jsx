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
  const guildInfo = result.guildBasicInformation;

  return (
    <Container>
      <TabWrap>
        <GuildHeader>GUILD</GuildHeader>
        <GuildBasicInformation>
          <Icon>
            {guildInfo.guild_mark ? (
              <img
                src={`data:image/png;base64,${guildInfo.guild_mark}`}
                alt="GuildIcon"
              />
            ) : (
              <img
                src={`data:image/png;base64,${guildInfo.guild_mark_custom}`}
                alt="GuildIcon"
              />
            )}
          </Icon>
          <Name>{guildInfo.guild_name}</Name>
          <Level>Lv.{guildInfo.guild_level}</Level>
        </GuildBasicInformation>
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
      <TabHeaderWrap>
        <TabHeader>
          {activeTab === 1 && "길드 정보"}
          {activeTab === 2 && "길드원"}
          {activeTab === 3 && "길드 스킬"}
        </TabHeader>
        {activeTab === 1 && <GuildInformation result={result} />}
        {activeTab === 2 && <GuildMember result={result} />}
        {activeTab === 3 && <GuildSkill result={result} />}
      </TabHeaderWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px;
  margin: 10px;
  margin-top: 5px;
  gap: 10px;
  background-color: rgb(51, 51, 51);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  outline: 1px solid rgb(141, 141, 141);
`;

const GuildHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const GuildBasicInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: maple-light;
`;

const Icon = styled.div`
  width: auto;
  color: #ffffff;
  img {
    min-width: 40px;
  }
`;

const Name = styled.span``;

const Level = styled.span`
  font-weight: 700;
  color: rgb(200, 175, 137);
`;

const Tab = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.active ? "rgb(17, 119, 136)" : "rgb(85, 85, 85)"};
  cursor: pointer;
  border-radius: 3px;
  min-height: 25px;
  font-size: 15px;
  font-family: maple-light;
  &:hover {
    background-color: rgb(117, 117, 117);
  }
`;

const TabWrap = styled.div`
  min-width: 85px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TabHeaderWrap = styled.div`
  width: 100%;
  padding: 10px;
  background-color: rgb(34, 34, 34);
  border: 1px solid rgb(135, 135, 135);
  outline: 1px solid rgb(68, 68, 68);
  border-radius: 5px;
`;

const TabHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: rgb(200, 175, 137);
`;
