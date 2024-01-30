import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../icons/SearchIcon';
import { Logo } from './Logo';
import { getOcidApi, getBasicInformation } from '../../api/api';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSearch = async () => {
    if (searchValue.trim() !== '') {
      try {
        const ocidData = await getOcidApi(searchValue);
        if (ocidData) {
          console.log('OCID Data:', ocidData);

          const basicInfo = await getBasicInformation(ocidData.ocid);
          if (basicInfo) {
            console.log('Character Basic Information:', basicInfo);
            
            // 이동
            navigate(`/user/${encodeURIComponent(searchValue)}`);
          } else {
            console.error('Error fetching character basic information.');
          }
        } else {
          console.error('Error fetching OCID.');
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <InputContainer>
        <Logo />
        <input
          type="text"
          placeholder="캐릭터 닉네임을 입력해주세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={handleSearch}>
          <IconSearch />
        </button>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const InputContainer = styled.div`
  position: absolute;
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
