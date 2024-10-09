import React, { useState } from "react";
import styled from "styled-components";

export const SearchGuildInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <WorldButton onClick={toggleDropdown}>월드 선택</WorldButton>
      {isOpen && (
        <Dropdown>
          <GuildItem>리부트</GuildItem>
          <GuildItem>스카니아</GuildItem>
          <GuildItem>루나</GuildItem>
          <GuildItem>엘리시움</GuildItem>
          <GuildItem>크로아</GuildItem>
          <GuildItem>오로라</GuildItem>
          <GuildItem>베라</GuildItem>
          <GuildItem>유니온</GuildItem>
          <GuildItem>제니스</GuildItem>
          <GuildItem>아케인</GuildItem>
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
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
