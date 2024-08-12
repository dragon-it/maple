import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const GuildMember = ({ result }) => {
  const [isDetail, setIsDetail] = useState(true);
  const [sortType, setSortType] = useState("character_name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };
  const handleSort = (type) => {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  };

  const handleMemberPortal = (characterName) => {
    navigate(`/user/${encodeURIComponent(characterName)}`);
  };

  const sortedMembers = [...result.guildMembersData].sort((a, b) => {
    if (!a || !b) return 0;

    const valueA = a[sortType] || "";
    const valueB = b[sortType] || "";

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const populatedMembers = sortedMembers.filter(
    (member) => member && member.character_image
  );

  const emptyMembers = sortedMembers.filter(
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
          <SortingItems onClick={() => handleSort("character_name")}>
            닉네임
          </SortingItems>
          <SortingItems onClick={() => handleSort("character_class")}>
            직업
          </SortingItems>
          <SortingItems onClick={() => handleSort("character_level")}>
            레벨
          </SortingItems>
        </SortingWrap>

        {isDetail ? (
          <>
            <DetailChracterWrap>
              {populatedMembers.map((member, index) => (
                <DetailMember
                  key={index}
                  onClick={() => handleMemberPortal(member.character_name)}
                >
                  <DetailImage
                    src={member.character_image || ""}
                    alt={"character_name"}
                  />
                  <DetailName>{member.character_name}</DetailName>
                  <DetailLevel>Lv. {member.character_level}</DetailLevel>
                </DetailMember>
              ))}
              {emptyMembers.map((member, index) => (
                <DetailMember key={index}>
                  <EmptyImage></EmptyImage>
                  <DetailName>{member.character_name}</DetailName>
                </DetailMember>
              ))}
            </DetailChracterWrap>
          </>
        ) : (
          <>
            <SimpleChracterWrap>
              {populatedMembers.map((member, index) => (
                <SimpleMember
                  key={index}
                  onClick={() => handleMemberPortal(member.character_name)}
                >
                  <SimpleItems>{member.character_name}</SimpleItems>
                  <SimpleItems>{member.character_class}</SimpleItems>
                  <SimpleItems>Lv. {member.character_level}</SimpleItems>
                </SimpleMember>
              ))}
              {emptyMembers.map((member, index) => (
                <SimpleMember key={index}>
                  <SimpleItems>{member.character_name}</SimpleItems>
                  <SimpleItems>미접속 캐릭터</SimpleItems>
                  <SimpleItems></SimpleItems>
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
  cursor: pointer;
  &:hover {
    background-color: rgb(131, 131, 131);
  }
`;

const DetailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  transform: scaleX(-1);
  border-radius: 5px;
`;

const EmptyImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #636363ea;
  border-radius: 5px;
`;

const DetailName = styled.div`
  font-size: 14px;
`;

const DetailLevel = styled.div`
  font-size: 12px;
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
  font-weight: bold;
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
  font-family: maple-light;
  border: 1px solid rgb(0, 0, 0);
  background-color: rgb(94, 94, 93);
  border-radius: 5px;
  padding: 2px;
  &:hover {
    background-color: rgb(137, 198, 255);
  }
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
  cursor: pointer;
  &:hover {
    background-color: rgb(78, 78, 78);
  }
`;
