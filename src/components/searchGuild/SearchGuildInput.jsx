import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const SearchGuildInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }

    const processedSearchValue = searchValue.replace(/\s+/g, "");
    navigate(`/guild-search/${processedSearchValue}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container>
      <GuildNameInput
        type="text"
        placeholder="길드 이름을 입력해주세요."
        value={searchValue}
        onChange={handleInputChange}
        maxLength={15}
      />
      <SearchBtn onClick={handleSubmit}>검색</SearchBtn>
    </Container>
  );
};

const Container = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const GuildNameInput = styled.input``;

const SearchBtn = styled.button`
  margin: auto;
  line-height: 0px;
  width: 70px;
  height: 28px;
  background: rgb(170, 187, 51);
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px rgba(58, 58, 58, 0.5);
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background: rgb(197, 212, 98);
  }
`;
