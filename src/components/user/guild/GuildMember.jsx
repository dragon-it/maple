import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CACHE_EXPIRY_TIME = 15 * 60 * 1000; // 15분

export const GuildMember = ({ result }) => {
  const guildMembersData = result.guildMembersData;
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembersData = async () => {
      setLoading(true);

      const now = Date.now();

      // 캐시 데이터 유효성 검사 및 유효하지 않은 데이터 삭제
      let cachedData =
        JSON.parse(localStorage.getItem("guildMembersCache")) || {};
      Object.keys(cachedData).forEach((key) => {
        if (now - cachedData[key].timestamp > CACHE_EXPIRY_TIME) {
          delete cachedData[key];
        }
      });
      console.log(cachedData);

      // 캐시된 데이터를 상태에 설정
      const validCachedData = guildMembersData.map(
        (member) => cachedData[member.character_name]
      );

      console.log(validCachedData);

      setMembersData(validCachedData);
      setLoading(false);
    };

    fetchMembersData();
  }, [guildMembersData]);

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
                <MemberName>
                  {guildMembersData[index]?.character_name}
                </MemberName>
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
