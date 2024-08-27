import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import loadingImg from "../../assets/loading2.gif";
import { GuildInformation } from "./guild/GuildInformation";
import { GuildMember } from "./guild/GuildMember";
import { GuildSkill } from "./guild/GuildSkill";
import { GuildStatistics } from "./guild/GuildStatistics";
import {
  getGuildBasicInformation,
  getGuildMembers,
  getGuildRanking,
  getOguildId,
} from "../../api/api";

/**
 * React 컴포넌트 - 길드 관련 정보와 탭 인터페이스를 제공
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.result - 결과 데이터 객체
 */
export const Guild = ({ result }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [guildData, setGuildData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (result && result.getCombinedData) {
      const { getBasicInformation } = result.getCombinedData;
      if (getBasicInformation) {
        fetchGuildData(
          getBasicInformation.character_guild_name,
          getBasicInformation.world_name
        );
      }
    }
  }, [result]);

  const fetchGuildData = async (guildName, worldName) => {
    setLoading(true);
    try {
      const oguildIdResponse = await getOguildId(guildName, worldName);
      const oguildId = oguildIdResponse.oguild_id;
      if (!oguildId) throw new Error("길드 ID를 가져올 수 없습니다.");

      // 길드 기본 정보와 랭킹 정보 병렬 호출
      const [guildBasicInformation, guildRankInformation] = await Promise.all([
        getGuildBasicInformation(oguildId),
        getGuildRanking(guildName, worldName),
      ]);

      let guildMembersData = [];
      if (guildBasicInformation) {
        const { guild_member } = guildBasicInformation;
        try {
          // 멤버 데이터 병렬 호출
          const membersData = await getGuildMembers(guild_member);
          guildMembersData = guild_member.map((member, index) => {
            const memberData = membersData[index] || {};
            return {
              character_name: member,
              character_level: memberData.character_level || null,
              character_image: memberData.character_image || null,
              character_class: memberData.character_class || null,
            };
          });
        } catch (error) {
          console.error("Failed to fetch members data", error);
          guildMembersData = guild_member.map((member) => ({
            character_name: member,
            character_class: null,
            character_level: null,
            character_image: null,
          }));
        }
      }

      setGuildData({
        guildBasicInformation,
        guildRankInformation,
        guildMembersData,
      });
    } catch (error) {
      console.error(`fetchGuildData error: ${error.message}`);
      setError(`길드 데이터 검색 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // 데이터가 없거나 로딩 중일 때 처리
  if (loading) {
    return (
      <Container>
        <LoadingWrap>
          <img src={loadingImg} alt="로딩 중" />
        </LoadingWrap>
      </Container>
    );
  }

  if (!guildData) {
    return (
      <Container>
        <NoDataWrap>
          <NoDataHeader>GUILD</NoDataHeader>
          <NoDataText>데이터가 없습니다.</NoDataText>
        </NoDataWrap>
      </Container>
    );
  }

  return (
    <Container>
      <InfoWrap>
        <TabWrap>
          <GuildHeader>GUILD</GuildHeader>
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
          {activeTab === 1 && <GuildInformation result={guildData} />}
          {activeTab === 2 && <GuildMember result={guildData} />}
          {activeTab === 3 && <GuildSkill result={guildData} />}
          {activeTab === 4 && <GuildStatistics result={guildData} />}
        </TabHeaderWrap>
      </InfoWrap>
    </Container>
  );
};

const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 0px 10px 10px 10px;
  color: rgb(220, 220, 220);
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100px;
    height: auto;
    animation: ${slide} 1s linear infinite;
  }
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
