import React from "react";
import styled from "styled-components";

export const GuildInformation = ({ result }) => {
  const { guild_master_name, guild_fame, guild_point, guild_member_count,guild_name } =
    result.guildBasicInformation;

  return (
    <Container>
      <Items>
        <InfoHeader>길드명</InfoHeader>{guild_name}
      </Items>
      <Items>
        <InfoHeader>명성치</InfoHeader>
        {guild_fame.toLocaleString()}
      </Items>
      <Items>
        <InfoHeader>길드 포인트</InfoHeader>
        {guild_point.toLocaleString()}
      </Items>
      <Items>
        <InfoHeader>길드 인원수</InfoHeader>
        {guild_member_count.toLocaleString()}명
      </Items>
      <Items>
        <InfoHeader>길드 마스터</InfoHeader>
        {guild_master_name}
      </Items>
    </Container>
  );
};

const Container = styled.div``;

const Items = styled.div`
  display: flex;
  gap: 10px;
`;

const InfoHeader = styled.div`
  
`