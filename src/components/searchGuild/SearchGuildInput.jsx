import React, { useState } from "react";
import styled from "styled-components";

export const SearchGuildInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectWorld, setSelectWorld] = useState("");
  console.log(selectWorld);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectWorld = (world) => {
    setSelectWorld(world);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <Container>
      <WorldButton onClick={toggleDropdown}>
        {selectWorld || "월드 선택"}
      </WorldButton>
      {isOpen && (
        <Dropdown>
          <GuildItem onClick={() => handleSelectWorld("스카니아")}>
            스카니아
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("베라")}>베라</GuildItem>
          <GuildItem onClick={() => handleSelectWorld("루나")}>루나</GuildItem>
          <GuildItem onClick={() => handleSelectWorld("제니스")}>
            제니스
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("유니온")}>
            유니온
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("엘리시움")}>
            엘리시움
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("이노시스")}>
            이노시스
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("레드")}>레드</GuildItem>
          <GuildItem onClick={() => handleSelectWorld("오로라")}>
            오로라
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("아케인")}>
            아케인
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("노바")}>노바</GuildItem>
          <GuildItem onClick={() => handleSelectWorld("리부트")}>
            리부트
          </GuildItem>
          <GuildItem onClick={() => handleSelectWorld("리부트2")}>
            리부트2
          </GuildItem>
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const WorldButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  flex-wrap: wrap;
`;

const GuildItem = styled.div`
  padding: 10px 20px;
  width: 100px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
