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
          <SortingItems>닉네임</SortingItems>
          <SortingItems>직업</SortingItems>
          <SortingItems>레벨</SortingItems>
        </SortingWrap>

        {isDetail ? (
          <>
            <DetailChracterWrap>
              {populatedMembers.map((member, index) => (
                <DetailMember key={index}>
                  <DetailImage
                    src={member.character_image || ""}
                    alt={"character_name"}
                  />
                  <DetailName>{member.character_name}</DetailName>
                  <DetailLevel>Lv. {member.character_level}</DetailLevel>
                </DetailMember>
              ))}
              {emptyMembers.map((member, index) => (
                <Member key={index}>
                  <DetailName>{member.character_name}</DetailName>
                </Member>
              ))}
            </DetailChracterWrap>
          </>
        ) : (
          <>
            <SimpleChracterWrap>
              {populatedMembers.map((member, index) => (
                <SimpleMember key={index}>
                  <SimpleItems>{member.character_name}</SimpleItems>
                  <SimpleItems>{member.character_class}</SimpleItems>
                  <SimpleItems>Lv. {member.character_level}</SimpleItems>
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
  padding: 5px;
  overflow-y: scroll;
  background-color: #424242;
  border-radius: 5px;
`;

const Member = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 3px 5px 3px;
  min-height: 30px;
  border-radius: 3px;
`;

const DetailMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 3px 5px 3px;
  background-color: #a0a0a0ea;
  color: #020202;
  border-radius: 5px;
  min-height: 30px;
  font-family: maple-light;
`;

const DetailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  transform: scaleX(-1);
  border-radius: 5px;
`;

const DetailName = styled.div`
  font-size: 14px;
`;

const DetailLevel = styled.div`
  font-size: 12px;
`;

const Name = styled.div`
  font-size: 13px;
  color: rgb(248, 248, 248);
  text-align: left;
  width: 20%;
`;

const SimpleItems = styled.div`
  font-size: 13px;
  line-height: 1.5rem;
  color: rgb(248, 248, 248);
  text-align: left;
  width: 20%;
  padding: 2px 0;
`;

const SortingWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 2px solid rgb(121, 121, 121);
  border-radius: 5px;
  background-color: rgb(59, 59, 59);
`;

const SortingItems = styled.div`
  font-size: 14px;
  line-height: 11px;
  text-align: left;
  color: rgb(248, 248, 248);
  width: 18%;
  cursor: pointer;
`;

const Toggle = styled.div`
  position: relative;
`;

const ToggleBtn = styled.div`
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: -27px;
`;

const SimpleChracterWrap = styled.div`
  gap: 5px;
  max-height: 580px;
  padding: 0px 5px 10px 10px;
  overflow-y: scroll;
`;

const SimpleMember = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid rgba(195, 196, 194, 0.2);
  min-height: 20px;
`;
