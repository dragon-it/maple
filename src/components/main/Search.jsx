import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import { useNavigate, useLocation } from 'react-router-dom'; 
import ThemeToggleButton from '../../context/ThemeToggleButton';
import serchIcon_big from '../../assets/SearchIcon_big.png';
import serchIcon_small from '../../assets/SearchIcon_small.png';

export const Search = ({ error }) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }
    const processedSearchValue = searchValue.replace(/\s+/g, '');
    navigate(`/user/${encodeURIComponent(processedSearchValue)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const isUserRoute = location.pathname.startsWith('/user/');

  return (
    <>
        <InputContainer isUserRoute={isUserRoute}  onSubmit={handleSubmit}>
          <Logo 
          error={error}
          isUserRoute={isUserRoute}
          />
          <InputWrap>
            <StyledInput
              type="text"
              placeholder="캐릭터 닉네임을 입력해주세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              isUserRoute={isUserRoute}
            />
            <StyledButton isUserRoute={isUserRoute}>
              <img 
                src={isUserRoute ? serchIcon_small : serchIcon_big} 
                alt="검색" 
                width={isUserRoute ? "18" : "23"} 
                height={isUserRoute ? "18" : "23"}
              />
            </StyledButton>
          </InputWrap>
        </InputContainer>
      <ThemeToggleWrap>
        <ThemeToggleButton /> 
      </ThemeToggleWrap>
    </>
  );
};



const InputContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5px;

  @media screen and (max-width:1024px) {
    flex-direction: column;
  }
`;

const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.input`
  position: relative;
  width: 220px;
  height: 30px;
  padding: 2px 10px;
  border: 2px solid rgba(0, 0, 0, 0.9);
  border-radius: 7px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);

  &:focus {
    border-color: rgba(255, 51, 0, 0.9);
    box-shadow: 0 0 10px rgba(255, 51, 0, 0.5);
  }

  &:focus + button {
    color: rgba(255, 51, 0, 0.9);
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  width: ${({ isUserRoute }) => (isUserRoute ? '30px' : '35px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`;

const ThemeToggleWrap = styled.div`
  display: none;
  margin-left: 10px;

  @media screen and (max-width:1024px) {
    display: block;
    position: absolute;
    right: 10px;
    top: 5px;
  }
`;
