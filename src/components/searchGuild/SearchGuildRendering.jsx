import { React, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SearchGuildDetail } from "./SearchGuildDetail";

export const SearchGuildRendering = ({ result }) => {
  const { guildName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGuild, setSelectedGuild] = useState({
    oguild_id: null,
    world_name: "",
  });

  const handleClick = (oguild_id, world_name) => {
    setSelectedGuild({ oguild_id, world_name });
    navigate(`/guild-search/${guildName}/${world_name}`);
  };

  // 현재 URL과 선택된 world_name을 비교
  const isGuildDetail = location.pathname.startsWith(
    `/guild-search/${encodeURIComponent(guildName)}/${encodeURIComponent(
      selectedGuild.world_name
    )}`
  );

  return (
    <Container>
      {isGuildDetail ? (
        <SearchGuildDetail selectedGuild={selectedGuild} />
      ) : result && result.length > 0 ? (
        result.map(({ oguild_id, world_name }) => (
          <GuildItem
            key={oguild_id}
            onClick={() => handleClick(oguild_id, world_name)}
          >
            <p>{world_name}</p>
            <div>{guildName}</div>
          </GuildItem>
        ))
      ) : (
        <div>검색 결과가 없습니다.</div>
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
`;
