import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { SearchGuildDetail } from "./SearchGuildDetail";
import WorldIcons from "../common/worldIcon/WorldIcons";

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

  const sortedResult = result
    ? [...result].sort(
        (a, b) =>
          (b.basic_info?.guild_level || 0) - (a.basic_info?.guild_level || 0)
      )
    : [];

  return (
    <Container>
      <Helmet>
        <title>{`길드 ${guildName} - 메짱`}</title>
        <meta name="description" content="길드의 정보를 불러오는 기능입니다." />
      </Helmet>
      {isGuildDetail ? (
        <SearchGuildDetail
          selectedGuild={selectedGuild}
          isGuildDetail={isGuildDetail}
        />
      ) : (
        <>
          <Notice>
            <Icon>❗</Icon>길드 레벨 순으로 정렬됩니다.
          </Notice>
          <ItemContainer>
            {sortedResult && sortedResult.length > 0 ? (
              sortedResult.map(({ oguild_id, world_name, basic_info }) => {
                const { guild_level, guild_master_name, guild_member_count } =
                  basic_info || {};

                const worldIcon = WorldIcons[world_name];

                return (
                  <GuildItem
                    key={oguild_id}
                    onClick={() => handleClick(oguild_id, world_name)}
                  >
                    <World>
                      <WorldIcon src={worldIcon} alt={world_name} />
                      {world_name}
                    </World>
                    <GuildHeader>
                      <Name>{guildName}</Name>
                      <Level>
                        Lv. <Value>{guild_level}</Value>
                      </Level>
                    </GuildHeader>
                    <Master>
                      마스터 <Value>{guild_master_name}</Value>
                    </Master>
                    <Members>
                      인원수
                      <Value> {guild_member_count}명</Value>
                    </Members>
                  </GuildItem>
                );
              })
            ) : (
              <></>
            )}
          </ItemContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 650px;

  @media screen and (max-width: 1024px) {
    min-width: 550px;
  }

  @media screen and (max-width: 768px) {
    min-width: 0px;
  }
`;

const ItemContainer = styled.div`
  display: grid;
  gap: 7px;
  color: rgb(255, 255, 255);
  max-width: 900px;
  margin-top: 7px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1079px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 809px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 539px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GuildItem = styled.div`
  padding: 10px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 5px;
  cursor: pointer;
  background: rgb(51, 51, 51);

  &:hover {
    background: rgb(37, 37, 37);
  }
`;

const WorldIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 3px;
`;

const GuildHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  margin-bottom: 10px;
`;

const World = styled.p`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const Level = styled.p`
  word-spacing: -3px;
`;

const Master = styled.p`
  color: rgb(192, 192, 192);
`;

const Members = styled.p`
  color: rgb(192, 192, 192);
`;

const Value = styled.span`
  color: rgb(255, 255, 255);
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 2px;
  font-size: 13px;
  margin-top: 10px;
  color: rgb(192, 192, 192);
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  width: 15px;
  height: 16px;
  text-align: center;
  border: 1px solid black;
  background: rgb(214, 214, 214);
  padding: 4px 5px 5px 5px;
  border-radius: 4px;
  font-size: 10px;
`;
