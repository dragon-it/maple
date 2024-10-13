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
  gap: 5px;
  flex-direction: row;
`;

const GuildNameInput = styled.input`
  position: relative;
  max-width: 200px;
  padding: 2px 30px 2px 5px;

  border-radius: 5px;
  background: rgb(197, 195, 194);
  color: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

  &:focus {
    background: linear-gradient(
      0deg,
      rgb(209, 205, 199) 25%,
      rgb(216, 210, 203) 100%
    );
    box-shadow: 0 0 10px rgba(131, 129, 128, 0.5);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
    font-size: 13px;
  }
`;

const SearchBtn = styled.button`
  line-height: 0px;
  width: 70px;
  height: 28px;
  background: rgb(170, 187, 51);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  text-shadow: 1px 1px rgba(58, 58, 58, 0.5);
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background: rgb(197, 212, 98);
  }
`;
