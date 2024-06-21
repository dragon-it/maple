import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBasicInformation, getOcidApi } from "../../../api/api";

export const GuildMember = ({ result }) => {
  const { guild_member } = result.guildBasicInformation;
  const [currentPage, setCurrentPage] = useState(1);
  const [membersData, setMembersData] = useState([]);
  const [cache, setCache] = useState([]);
  const membersPerPage = 20;
  const totalPages = Math.ceil(guild_member.length / membersPerPage);

  useEffect(() => {
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = guild_member.slice(
      indexOfFirstMember,
      indexOfLastMember
    );

    const fetchMembersData = async () => {
      const data = await Promise.all(
        currentMembers.map(async (member) => {
          if (cache[member]) {
            return cache[member];
          }

          const ocidResult = await getOcidApi(member);
          if (ocidResult) {
            const basicInfoResult = await getBasicInformation(ocidResult.ocid);
            const memberData = { ...basicInfoResult };
            setCache((prevCache) => ({ ...prevCache, [member]: memberData }));
            return memberData;
          }

          const memberData = { name: member, image: null };
          setCache((prevCache) => ({ ...prevCache, [member]: memberData }));
          return memberData;
        })
      );

      setMembersData(data);
    };

    fetchMembersData();
  }, [currentPage, guild_member, cache]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Container>
        {membersData.map((member, index) => (
          <Member key={index}>
            <MemberImage
              src={member.character_image || ""}
              alt={member.character_name}
            />
            <MemberName>{member.character_name}</MemberName>
          </Member>
        ))}
      </Container>
      <Pagination>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </Button>
        <PageInfo>
          {currentPage} / {totalPages}
        </PageInfo>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {">"}
        </Button>
      </Pagination>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #eee;
  }
`;

const PageInfo = styled.span`
  margin: 0 10px;
`;
