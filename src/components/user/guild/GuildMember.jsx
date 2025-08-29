import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sort_icon from "../../../assets/pages/user/guild/member/Sort_member_icon2.svg";

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
            <ToggleBtn>텍스트로 보기</ToggleBtn>
          ) : (
            <ToggleBtn>이미지로 보기</ToggleBtn>
          )}
        </Toggle>
        <SortingWrap>
          <SortingItems onClick={() => handleSort("character_name")}>
            닉네임
            <SortIcon src={sort_icon} alt={"sort_icon"} />
          </SortingItems>
          <SortingItems onClick={() => handleSort("character_class")}>
            직업
            <SortIcon src={sort_icon} alt={"sort_icon"} />
          </SortingItems>
          <SortingItems onClick={() => handleSort("character_level")}>
            레벨
            <SortIcon src={sort_icon} alt={"sort_icon"} />
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
                  <ImageWrap>
                    <DetailImage
                      src={member.character_image || ""}
                      alt={"character_name"}
                    />
                  </ImageWrap>
                  <DetailName>{member.character_name}</DetailName>
                  <DetailLevel>{member.character_class}</DetailLevel>
                  <DetailLevel>
                    <span>Lv. </span>
                    <span>{member.character_level}</span>
                  </DetailLevel>
                </DetailMember>
              ))}
              {/* <!-- 이미지 보기 미접속 캐릭터 명단 --> */}
              {emptyMembers.map((member, index) => (
                <DetailMember key={index}>
                  <EmptyImage>미접속 캐릭터</EmptyImage>
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
                  <SimpleItems>
                    <span>Lv. </span>
                    <span>{member.character_level}</span>
                  </SimpleItems>
                </SimpleMember>
              ))}
              {/* <!-- 텍스트 보기 미접속 캐릭터 명단 --> */}
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
  width: 100%;
  gap: 3px;
  padding: 5px;
  background-color: rgb(66, 66, 66);
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DetailMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 3px 5px 3px;
  background-color: rgb(153, 153, 153);
  color: #020202;
  border-radius: 5px;
  min-height: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgb(136, 136, 136);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  margin: 2px auto;
  border: 1px solid rgba(61, 61, 61, 0.18);
  background-color: rgb(117, 117, 117);
  border-bottom: 2px solid rgb(62, 73, 81);
  border-left: 1px solid rgb(62, 73, 81);
  border-right: 1px solid rgb(62, 73, 81);
  box-shadow: rgb(133, 145, 145) 0px 1px 0px;
  border-radius: 3px;
  overflow: hidden;
`;

const DetailImage = styled.img`
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -53%) scaleX(-1);
  image-rendering: pixelated;
  object-fit: cover;
`;

const EmptyImage = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(91, 91, 91, 0.5);
  background-color: rgb(117, 117, 117);
  border-radius: 5px;
  text-align: center;
`;

const DetailName = styled.h5``;

const DetailLevel = styled.span`
  font-size: 12px;
  span:first-child {
    color: rgba(44, 44, 44, 0.7);
  }
`;

const SimpleItems = styled.span`
  font-size: 13px;
  line-height: 1.5rem;
  color: rgb(247, 247, 247);
  text-align: left;
  width: 20%;
  padding: 2px 0;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 25%;
    &:nth-child(3) {
      width: 17%;
    }
  }
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
  background-color: rgb(58, 58, 58);
`;

const SortingItems = styled.div`
  display: flex;
  align-items: center;
  line-height: 11px;
  text-align: left;
  font-weight: bold;
  color: rgb(248, 248, 248);
  width: 18%;
  cursor: pointer;
`;

const SortIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const Toggle = styled.div`
  position: relative;
`;

const ToggleBtn = styled.div`
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: -31px;
  font-family: maple-light;
  border: 1px solid rgb(0, 0, 0);
  background-color: rgb(85, 85, 85);
  border-radius: 5px;
  padding: 3px 4px;
  &:hover {
    background-color: rgb(19, 130, 149);
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
  border-bottom: 1px solid rgba(195, 195, 195, 0.2);
  min-height: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(91, 91, 91);
  }
`;
