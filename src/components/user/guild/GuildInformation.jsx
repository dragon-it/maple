import React from "react";
import styled from "styled-components";
import flag_icon from "../../../assets/guild/ranking/Flag_ranking_icon.svg";
import fame_icon from "../../../assets/guild/ranking/Fame_ranking_icon.svg";
import suro_icon from "../../../assets/guild/ranking/Suro_ranking_icon.svg";
import { useNavigate } from "react-router-dom";

export const GuildInformation = ({ result }) => {
  // 구조 분해 할당 & 기본값 설정

  const navigate = useNavigate();

  const handleMasterInfoPortal = (characterName) => {
    navigate(`/user/${encodeURIComponent(characterName)}`);
  };

  const {
    guildBasicInformation: {
      guild_master_name = "Unknown",
      guild_fame = 0,
      guild_point = 0,
      guild_member_count = 0,
      guild_name = "Unknown",
    } = {},
    guildRankInformation: {
      FameRanking: { ranking: fameRanking = [] } = {},
      FlagRanking: { ranking: flagRanking = [] } = {},
      SuroRanking: { ranking: suroRanking = [] } = {},
    } = {},
  } = result || {};

  const getRankingText = (rankingArray) => {
    return rankingArray.length > 0 && rankingArray[0].ranking !== undefined
      ? `${rankingArray[0].ranking}위`
      : "순위 없음";
  };

  return (
    <Container>
      <BasicInfoSection>
        <HeaderColumn>
          <Header>ㆍ길드명</Header>
          <Header>ㆍ명성치</Header>
          <Header>ㆍ길드 포인트</Header>
          <Header>ㆍ길드 인원수</Header>
          <Header>ㆍ길드 마스터</Header>
        </HeaderColumn>
        <ValueColumn>
          <Value>{guild_name}</Value>
          <Value>{guild_fame.toLocaleString()}</Value>
          <Value>{guild_point.toLocaleString()}</Value>
          <Value>{guild_member_count.toLocaleString()}</Value>
          <MasterName onclick={handleMasterInfoPortal}>
            {guild_master_name}
          </MasterName>
        </ValueColumn>
      </BasicInfoSection>
      <RankingSection>
        <GuildRankHeader>길드 랭킹</GuildRankHeader>
        <ItemWrap>
          <RankingItem>
            <RankingHeader>
              <RankingIcon src={fame_icon} alt="fame_icon" />
              <div>주간 명성</div>
            </RankingHeader>
            <RankingValue>{getRankingText(fameRanking)}</RankingValue>
          </RankingItem>
          <RankingItem>
            <RankingHeader>
              <RankingIcon src={flag_icon} alt="flag_icon" />
              <div>플래그</div>
            </RankingHeader>
            <RankingValue>{getRankingText(flagRanking)}</RankingValue>
          </RankingItem>
          <RankingItem>
            <RankingHeader>
              <RankingIcon src={suro_icon} alt="suro_icon" />
              <div>지하 수로</div>
            </RankingHeader>
            <RankingValue>{getRankingText(suroRanking)}</RankingValue>
          </RankingItem>
        </ItemWrap>
      </RankingSection>
    </Container>
  );
};

const Container = styled.div`
  font-family: maple-light;
  width: 100%;
`;

const BasicInfoSection = styled.div`
  display: flex;
  gap: 25px;
  font-size: 15px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgb(25, 25, 25);
  border: 1px solid rgba(255, 255, 255, 0.575);
  border-radius: 5px;
`;

const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: rgb(200, 175, 137);
`;

const ValueColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Header = styled.div``;

const Value = styled.div``;

const MasterName = styled.div`
  cursor: pointer;
  &:hover {
    background-color: rgb(78, 78, 78);
  }
`;

const RankingSection = styled.div`
  width: 100%;
`;

const RankingItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
`;

const GuildRankHeader = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  color: rgb(200, 175, 137);
`;

const RankingHeader = styled.div`
  color: rgb(200, 175, 137);
`;

const RankingValue = styled.div``;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
  padding: 10px;
  background-color: rgb(25, 25, 25);
  border: 1px solid rgba(255, 255, 255, 0.575);
  border-radius: 5px;
`;

const RankingIcon = styled.img`
  width: 30px;
  height: 30px;
`;
