import React from "react";
import styled from "styled-components";

export const GuildInformation = ({ result }) => {
  console.log(result.guildBasicInformation);
  return (
    <Container>
      <GuildMaster>
        길드 마스터 : {result.guildBasicInformation.guild_master_name}
      </GuildMaster>
      <GuildFame>
        길드 명성치 : {result.guildBasicInformation.guild_fame}
      </GuildFame>
      <GuildLevel>
        길드 레벨 : {result.guildBasicInformation.guild_level}
      </GuildLevel>
      <GuildMemberCount>
        멤버수 : {result.guildBasicInformation.guild_member_count}명
      </GuildMemberCount>
    </Container>
  );
};

const Container = styled.div``;

const GuildMaster = styled.div``;

const GuildFame = styled.div``;

const GuildLevel = styled.div``;

const GuildMemberCount = styled.div``;
