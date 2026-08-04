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
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

const GuildHead = styled.h2`
  width: 100%;
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.05em;
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const GuildNameInput = styled.input`
  position: relative;
  max-width: 220px;
  width: 100%;
  height: 34px;
  padding: 2px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.6);
  color: #ffffff;
  font-size: 13px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(220, 252, 2, 0.6);
    box-shadow: 0 0 10px rgba(220, 252, 2, 0.25);
    background: rgba(15, 23, 42, 0.85);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
`;

const SearchBtn = styled.button`
  height: 34px;
  padding: 0 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 196, 22, 1) 0%,
    rgba(246, 164, 1, 1) 100%
  );
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  border: 1px solid rgba(255, 229, 36, 0.8);
  text-shadow: 1px 1px 0px rgba(189, 109, 5, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
