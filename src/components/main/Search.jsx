import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../icons/SearchIcon';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';  

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = () => {
    navigate(`/user/${encodeURIComponent(searchValue)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Logo />
          <input
            type="text"
            placeholder="캐릭터 닉네임을 입력해주세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">
            <IconSearch />
          </button>
        </InputContainer>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  width: 100%;
  height: 50px;
  z-index: 99;
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 40px;
    padding: 2px 10px;
    border: 2px solid rgba(255, 51, 0, 0.9);
    border-radius: 7px;
    outline: none;
    font-size: 16px;
  }
  button {
    width: 35px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-left: -50px;
    background: none;
    cursor: pointer;
  }
  svg {
    cursor: pointer;
    color: red;
  }
`;
