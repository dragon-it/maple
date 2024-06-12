import React from "react";
import styled from "styled-components";

export const GuildInformation = ({ result }) => {
  const { guild_master_name, guild_fame, guild_point, guild_member_count } =
    result.guildBasicInformation;

  return (
    <Container>
      <Master>길드 마스터 : {guild_master_name}</Master>
      <Fame>길드 명성치 : {guild_fame.toLocaleString()}</Fame>
      <Point>길드 포인트 : {guild_point.toLocaleString()}</Point>
      <MemberCount>
        길드 인원수 : {guild_member_count.toLocaleString()}명
      </MemberCount>
    </Container>
  );
};

const Container = styled.div``;

const Master = styled.div``;

const Fame = styled.div``;

const Point = styled.div``;

const MemberCount = styled.div``;
