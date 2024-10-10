import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export const SearchGuildRendering = ({ result }) => {
  const { guildName } = useParams();
  const navigate = useNavigate();

  const handleClick = (world_name) => {
    navigate(`/guild-search/${guildName}/${world_name}`);
  };

  return (
    <Container>
      {result && result.length > 0 ? (
        result.map(({ world_name, oguild_id }) => (
          <GuildItem key={oguild_id} onClick={() => handleClick(world_name)}>
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
  cursor: pointer;
  background-color: red;
`;
