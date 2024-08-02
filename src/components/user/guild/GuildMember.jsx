import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getGuildMembers } from "../../../api/api";

export const GuildMember = ({ result }) => {
  const { guild_member } = result.guildBasicInformation;
  const [membersData, setMembersData] = useState([]);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembersData = async () => {
      setLoading(true);
      const membersToFetch = guild_member.filter((member) => !cache[member]);
      console.log(membersToFetch);

      if (membersToFetch.length > 0) {
        try {
          const fetchedMembersData = await getGuildMembers(membersToFetch);
          console.log(fetchedMembersData);

          if (!Array.isArray(fetchedMembersData)) {
            console.error(
              "Expected an array from getGuildMembers, but got:",
              fetchedMembersData
            );
            return;
          }

          const newCache = { ...cache };
          fetchedMembersData.forEach((memberData, index) => {
            newCache[membersToFetch[index]] = memberData;
          });
          setCache(newCache);
          console.log(newCache);

          setMembersData(
            guild_member.map((member) => newCache[member] || cache[member])
          );
        } catch (error) {
          console.error("Failed to fetch members data", error);
        }
      } else {
        setMembersData(guild_member.map((member) => cache[member]));
      }

      setLoading(false);
    };

    fetchMembersData();
  }, [guild_member, cache]);

  const populatedMembers = membersData.filter(
    (member) => member && member.character_name
  );
  const emptyMembers = membersData.filter(
    (member) => !member || !member.character_name
  );

  return (
    <div>
      <Container>
        {loading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : (
          <>
            {populatedMembers.map((member, index) => (
              <Member key={index}>
                <MemberImage
                  src={member.character_image || ""}
                  alt={member.character_name}
                />
                <MemberName>{member.character_name}</MemberName>
              </Member>
            ))}
            {emptyMembers.map((member, index) => (
              <Member key={index}>
                <MemberName>{guild_member[index]}</MemberName>
              </Member>
            ))}
          </>
        )}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
  max-height: 500px;
  overflow-y: scroll;
`;

const Member = styled.div`
  background-color: #978989;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 5px;
`;

const MemberName = styled.div`
  font-size: 14px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 20px;
  color: #333;
`;
