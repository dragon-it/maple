import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBasicInformation, getOcidApi } from "../../../api/api";

export const GuildMember = ({ result }) => {
  const { guild_member } = result.guildBasicInformation;
  const [currentPage, setCurrentPage] = useState(1);
  const [membersData, setMembersData] = useState([]);
  const membersPerPage = 50;
  const totalPages = Math.ceil(guild_member.length / membersPerPage);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = guild_member.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  useEffect(() => {
    const fetchMembersData = async () => {
      const data = await Promise.all(
        currentMembers.map(async (member) => {
          const ocidResult = await getOcidApi(member);
          if (ocidResult) {
            const basicInfoResult = await getBasicInformation(ocidResult.ocId);
            return { ...basicInfoResult };
          }
          return { name: member, image: null };
        })
      );
      setMembersData(data);
    };

    fetchMembersData();
  }, [currentPage, currentMembers]);

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
            <img src={member.image} alt={`${member.name}'s avatar`} />
            <div>{member.name}</div>
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
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
`;

const Member = styled.div`
  background-color: #978989;
  min-height: 30px;
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
