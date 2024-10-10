import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const SearchGuildRendering = ({ result }) => {
  const { guildName } = useParams();
  return (
    <Container>
      {result && result.length > 0 ? (
        result.map(({ world_name, oguild_id }) => (
          <GuildItem key={oguild_id}>
            <p>{world_name} </p>
            <div>{guildName}</div>
          </GuildItem>
        ))
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GuildItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
