import React from "react";
import styled from "styled-components";

export const GuildMember = ({ result }) => {
  const guildMembersData = result.guildMembersData;

  console.log(result);

  const populatedMembers = guildMembersData.filter(
    (member) => member && member.character_image
  );

  console.log(populatedMembers);

  const emptyMembers = guildMembersData.filter(
    (member) => !member || !member.character_image
  );

  console.log(emptyMembers);

  return (
    <div>
      <Container>
        <>
          {populatedMembers.map((member, index) => (
            <Member key={index}>
              <MemberImage
                src={member.character_image || ""}
                alt={"character_name"}
              />
              <MemberName>{member.character_name}</MemberName>
            </Member>
          ))}
          {emptyMembers.map((member, index) => (
            <Member key={index}>
              <MemberName>{member.character_name}</MemberName>
            </Member>
          ))}
        </>
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
  scrollbar-width: thin;
  scrollbar-color: #ffffff rgba(104, 103, 103, 0.5);
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
