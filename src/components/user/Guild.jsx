import React, { useState } from "react";
import styled from "styled-components";
import { GuildInformation } from "./guild/GuildInformation";
import { GuildMember } from "./guild/GuildMember";
import { GuildSkill } from "./guild/GuildSkill";
import { GuildStatistics } from "./guild/GuildStatistics";

export const Guild = ({ result }) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // 데이터 존재 여부 확인
  if (!result || !result.guildBasicInformation) {
    return (
      <Container>
        <NoDataWrap>
          <NoDataHeader>GUILD</NoDataHeader>
          <NoDataText>데이터가 없습니다.</NoDataText>
        </NoDataWrap>
      </Container>
    );
  }

  const guildInfo = result.guildBasicInformation;

  return (
    <Container>
      <InfoWrap>
        <TabWrap>
          <GuildHeader>GUILD</GuildHeader>
          <GuildBasicInformation>
            <Icon>
              {guildInfo.guild_mark ? (
                <img
                  src={`data:image/png;base64,${guildInfo.guild_mark}`}
                  alt="GuildIcon"
                />
              ) : guildInfo.guild_mark_custom ? (
                <img
                  src={`data:image/png;base64,${guildInfo.guild_mark_custom}`}
                  alt="GuildIcon"
                />
              ) : (
                // api 수정으로 임시 빈칸
                // <div>아이콘 없음</div>
                <></>
              )}
            </Icon>
            <Name>{guildInfo.guild_name || "이름 없음"}</Name>
            <Level>Lv.{guildInfo.guild_level || "레벨 없음"}</Level>
          </GuildBasicInformation>
          <Wd>
            <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>
              길드 정보
            </Tab>
            <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>
              길드원
            </Tab>
            <Tab onClick={() => handleTabClick(3)} active={activeTab === 3}>
              길드 스킬
            </Tab>
            <Tab onClick={() => handleTabClick(4)} active={activeTab === 4}>
              길드 통계
            </Tab>
          </Wd>
        </TabWrap>
        <TabHeaderWrap>
          <TabHeader>
            {activeTab === 1 && "길드 정보"}
            {activeTab === 2 && "길드원"}
            {activeTab === 3 && "일반 길드 스킬"}
            {activeTab === 4 && "길드 통계"}
          </TabHeader>
          {activeTab === 1 && <GuildInformation result={result} />}
          {activeTab === 2 && <GuildMember result={result} />}
          {activeTab === 3 && <GuildSkill result={result} />}
          {activeTab === 4 && <GuildStatistics result={result} />}
        </TabHeaderWrap>
      </InfoWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 0px 10px 10px 10px;
  color: rgb(220, 220, 220);
`;

const Wd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  padding: 10px;
  gap: 10px;
  background-color: rgb(51, 51, 51);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  outline: 1px solid rgb(141, 141, 141);

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const GuildHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 768px) {
    text-align: left;
  }
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
    props.active ? "rgb(19, 130, 149)" : "rgb(85, 85, 85)"};
  cursor: pointer;
  border-radius: 3px;
  min-height: 25px;
  font-size: 15px;
  font-family: maple-light;
  &:hover {
    background-color: ${(props) =>
      props.active ? "transparents" : "rgb(117, 117, 117)"};
  }

  @media screen and (max-width: 768px) {
    width: 24%;
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
  margin-bottom: 5px;
  font-size: 18px;
  color: rgb(200, 175, 137);
  font-family: maple-light;
`;

const NoDataWrap = styled.div`
  width: 100%;
  position: relative;
  padding: 10px;
  background-color: rgb(51, 51, 51);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  outline: 1px solid rgb(141, 141, 141);
`;

const NoDataHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const NoDataText = styled.div`
  font-family: maple-light;
`;
