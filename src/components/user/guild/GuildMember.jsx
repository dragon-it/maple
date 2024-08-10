import React, { useState } from "react";
import styled from "styled-components";

export const GuildMember = ({ result }) => {
  const guildMembersData = result.guildMembersData;
  const [isDetail, setIsDetail] = useState(true);

  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

  console.log(result);

  const populatedMembers = guildMembersData.filter(
    (member) => member && member.character_image
  );

  const emptyMembers = guildMembersData.filter(
    (member) => !member || !member.character_image
  );

  return (
    <>
      <Container>
        <Toggle onClick={toggleDetail}>
          {isDetail ? (
            <ToggleBtn>간략하게 보기</ToggleBtn>
          ) : (
            <ToggleBtn>자세히 보기</ToggleBtn>
          )}
        </Toggle>
        <SortingWrap>
          <NameSort>닉네임</NameSort>
          <LevelSort>레벨</LevelSort>
          <JobSort>직업</JobSort>
        </SortingWrap>

        {isDetail ? (
          <>
            <DetailChracterWrap>
              {populatedMembers.map((member, index) => (
                <Member key={index}>
                  <Image
                    src={member.character_image || ""}
                    alt={"character_name"}
                  />
                  <Name>{member.character_name}</Name>
                  <Level>Lv. {member.character_level}</Level>
                </Member>
              ))}
              {emptyMembers.map((member, index) => (
                <Member key={index}>
                  <Name>{member.character_name}</Name>
                </Member>
              ))}
            </DetailChracterWrap>
          </>
        ) : (
          <>
            <SimpleChracterWrap>
              {populatedMembers.map((member, index) => (
                <SimpleMember key={index}>
                  <Name>{member.character_name}</Name>
                  <Class>{member.character_class}</Class>
                  <Level>Lv. {member.character_level}</Level>
                </SimpleMember>
              ))}
              {emptyMembers.map((member, index) => (
                <SimpleMember key={index}>
                  <Name>{member.character_name}</Name>
                </SimpleMember>
              ))}
            </SimpleChracterWrap>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div``;

const DetailChracterWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
  max-height: 580px;
  padding-right: 5px;
  overflow-y: scroll;
`;

const Member = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 3px 5px 3px;
  background-color: #a0a0a0;
  min-height: 30px;
  border-radius: 3px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  transform: scaleX(-1);
`;

const Name = styled.div`
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: rgb(248, 248, 248);
  width: 100%;
`;

const Level = styled.div`
  font-size: 12px;
  line-height: 11px;
  color: rgb(216, 216, 216);
  text-align: center;
  width: 100%;
`;

const Class = styled.div`
  font-size: 12px;
  line-height: 11px;
  color: rgb(216, 216, 216);
  text-align: center;
  width: 100%;
`;

const SortingWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  border: 2px solid rgb(121, 121, 121);
  border-radius: 5px;
  background-color: rgb(59, 59, 59);
`;

const LevelSort = styled.div`
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

const NameSort = styled.div`
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

const JobSort = styled.div`
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

const Toggle = styled.div``;

const ToggleBtn = styled.div`
  border-radius: 5px;
  cursor: pointer;
`;

const SimpleChracterWrap = styled.div`
  max-height: 580px;
  padding-right: 5px;
  overflow-y: scroll;
`;

const SimpleMember = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #da1b1b;
  min-height: 20px;
`;
