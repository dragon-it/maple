import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const SearchGuildInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectWorld, setSelectWorld] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  console.log(selectWorld);
  console.log(searchValue);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }

    const processedSearchValue = searchValue.replace(/\s+/g, "");
    navigate(`/guild-search/${selectWorld}/${processedSearchValue}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const worlds = [
    "전체",
    "스카니아",
    "베라",
    "루나",
    "제니스",
    "유니온",
    "엘리시움",
    "이노시스",
    "레드",
    "오로라",
    "아케인",
    "노바",
    "리부트",
    "리부트2",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectWorld = (world) => {
    if (world === "전체") {
      setSelectWorld("");
    } else {
      setSelectWorld(world);
    }
    setIsOpen(false);
  };

  return (
    <Container>
      <GuildNameInput
        type="text"
        placeholder="길드 이름을 입력해주세요."
        value={searchValue}
        onChange={handleInputChange}
        MaxLength={15}
      />
      <WorldButton onClick={toggleDropdown}>
        {selectWorld || "전체"}
      </WorldButton>
      {isOpen && (
        <Dropdown>
          {worlds.map((world) => (
            <GuildItem key={world} onClick={() => handleSelectWorld(world)}>
              {world}
            </GuildItem>
          ))}
        </Dropdown>
      )}
      <SearchBtn onClick={handleSubmit}>검색</SearchBtn>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const GuildNameInput = styled.input``;

const WorldButton = styled.button`
  width: 100px;
  height: 35px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  left: -205px;
  top: 42px;
  width: 600px;
  z-index: 1000;
  flex-wrap: wrap;
`;

const GuildItem = styled.div`
  text-align: center;
  padding: 10px 20px;
  width: 100px;
  height: 35px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 1px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SearchBtn = styled.button``;
