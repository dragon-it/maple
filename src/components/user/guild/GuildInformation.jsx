import React from "react";
import styled from "styled-components";

export const GuildInformation = ({ result }) => {
  // 구조 분해 할당 & 기본값 설정
  const {
    guildBasicInformation: {
      guild_master_name = "Unknown",
      guild_fame = 0,
      guild_point = 0,
      guild_member_count = 0,
      guild_name = "Unknown",
    } = {},
    guildRankInformation: {
      FameRanking: { ranking: fameRanking = [{ ranking: 0 }] } = {},
      FlagRanking: { ranking: flagRanking = [{ ranking: 0 }] } = {},
      SuroRanking: { ranking: suroRanking = [{ ranking: 0 }] } = {},
    } = {},
  } = result || {};

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
          <Value>{guild_master_name}</Value>
        </ValueColumn>
      </BasicInfoSection>
      <RankingSection>
        <GuildRankHeader>길드 랭킹</GuildRankHeader>
        <ItemWrap>
          <RankingItem>
            <RankingHeader>주간 명성 랭킹</RankingHeader>
            <RankingValue>
              {fameRanking[0].ranking === 0
                ? "순위 없음"
                : `${fameRanking[0].ranking}위`}
            </RankingValue>
          </RankingItem>
          <RankingItem>
            <RankingHeader>플래그 랭킹</RankingHeader>
            <RankingValue>
              {flagRanking[0].ranking === 0
                ? "순위 없음"
                : `${flagRanking[0].ranking}위`}
            </RankingValue>
          </RankingItem>
          <RankingItem>
            <RankingHeader>수로 랭킹</RankingHeader>
            <RankingValue>
              {suroRanking[0].ranking === 0
                ? "순위 없음"
                : `${suroRanking[0].ranking}위`}
            </RankingValue>
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
  padding: 5px;
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
  gap: 20px;
  padding: 5px;
  background-color: rgb(25, 25, 25);
  border: 1px solid rgba(255, 255, 255, 0.575);
  border-radius: 5px;
`;
