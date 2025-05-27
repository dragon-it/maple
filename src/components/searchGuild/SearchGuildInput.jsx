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
      <GuildHead onClick={() => navigate("/guild-search")}>
        GUILD SEARCH
      </GuildHead>
      <InputWrap>
        <GuildNameInput
          type="text"
          placeholder="길드 이름을 입력해주세요."
          value={searchValue}
          onChange={handleInputChange}
          maxLength={15}
        />
        <SearchBtn onClick={handleSubmit}>검색</SearchBtn>
      </InputWrap>
    </Container>
  );
};

const Container = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const GuildHead = styled.div`
  width: 100%;
  margin: 5px 0;
  text-shadow: 0px 0px 4px rgb(180, 180, 180);
  color: rgb(204, 204, 204);
  font-size: 15px;
  font-weight: bold;
  position: relative;
  padding: 0 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const GuildNameInput = styled.input`
  position: relative;
  max-width: 200px;
  width: 100%;
  padding: 2px 30px 2px 5px;
  border-radius: 5px;
  background: rgb(204, 204, 204);
  color: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 2px 2px rgb(148, 148, 148);

  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
    font-size: 13px;
  }
`;

const SearchBtn = styled.button`
  width: 70px;
  height: 28px;
  background: rgb(170, 187, 51);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  text-shadow: 1px 1px rgba(58, 58, 58, 0.5);
  box-shadow: 0px 2px 2px rgb(148, 148, 148);
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background: rgb(187, 202, 88);
  }
`;
