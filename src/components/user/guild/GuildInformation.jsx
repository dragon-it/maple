import React from "react";
import styled from "styled-components";

export const GuildInformation = ({ result }) => {
  const {
    guild_master_name,
    guild_fame,
    guild_point,
    guild_member_count,
    guild_name,
  } = result.guildBasicInformation;

  return (
    <Container>
      <HeaderWrap>
        <InfoHeader>길드명</InfoHeader>
        <InfoHeader>명성치</InfoHeader>
        <InfoHeader>길드 포인트</InfoHeader>
        <InfoHeader>길드 인원수</InfoHeader>
        <InfoHeader>길드 마스터</InfoHeader>
      </HeaderWrap>
      <ValueWrap>
        <Value>{guild_name}</Value>
        <Value>{guild_fame.toLocaleString()}</Value>
        <Value>{guild_point.toLocaleString()}</Value>
        <Value>{guild_member_count.toLocaleString()}</Value>
        <Value>{guild_master_name}</Value>
      </ValueWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  font-family: maple-light;
  font-size: 15px;
`;

const Value = styled.div``;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const ValueWrap = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const InfoHeader = styled.div``;
