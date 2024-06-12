import React from "react";
import styled from "styled-components";

export const GuildInformation = ({ result }) => {
  const {
    guild_master_name,
    guild_fame,
    guild_level,
    guild_point,
    guild_member_count,
  } = result.guildBasicInformation;

  return (
    <Container>
      <Master>길드 마스터 : {guild_master_name}</Master>
      <Fame>길드 명성치 : {guild_fame.toLocaleString()}</Fame>
      <Level>길드 레벨 : {guild_level}</Level>
      <Point>길드 포인트 : {guild_point.toLocaleString()}</Point>
      <MemberCount>
        멤버수 : {guild_member_count.toLocaleString()}명
      </MemberCount>
    </Container>
  );
};

const Container = styled.div``;

const Master = styled.div``;

const Fame = styled.div``;

const Level = styled.div``;

const Point = styled.div``;

const MemberCount = styled.div``;
