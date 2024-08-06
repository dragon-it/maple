import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getGuildMembers } from "../../../api/api";

const CACHE_EXPIRY_TIME = 15 * 60 * 1000; // 15분 (밀리초)

export const GuildMember = ({ result }) => {
  const { guild_member } = result.guildBasicInformation;
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembersData = async () => {
      setLoading(true);

      // 로컬 스토리지에서 캐시된 데이터 가져오기
      let cachedData =
        JSON.parse(localStorage.getItem("guildMembersCache")) || {};
      const now = Date.now();

      // 캐시 데이터의 유효성을 검사하고, 유효하지 않은 데이터는 삭제
      Object.keys(cachedData).forEach((key) => {
        if (now - cachedData[key].timestamp > CACHE_EXPIRY_TIME) {
          delete cachedData[key];
        }
      });

      const membersToFetch = guild_member.filter(
        (member) => !cachedData[member]
      );
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

          // 새로운 데이터를 캐시에 저장
          fetchedMembersData.forEach((memberData, index) => {
            cachedData[membersToFetch[index]] = {
              ...memberData,
              timestamp: now,
            };
          });

          // 로컬 스토리지에 캐시 업데이트
          localStorage.setItem("guildMembersCache", JSON.stringify(cachedData));

          // 캐시된 데이터를 상태에 설정
          setMembersData(guild_member.map((member) => cachedData[member]));
        } catch (error) {
          console.error("Failed to fetch members data", error);
        }
      } else {
        // 캐시된 데이터를 상태에 설정
        setMembersData(guild_member.map((member) => cachedData[member]));
      }

      setLoading(false);
    };

    fetchMembersData();
  }, [guild_member]);

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
