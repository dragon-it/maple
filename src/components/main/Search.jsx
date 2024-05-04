import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../icons/SearchIcon';
import { Logo } from './Logo';
import { useNavigate, useLocation } from 'react-router-dom'; 
import ThemeToggleButton from '../../context/ThemeToggleButton';


export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();

  const handleSearch = () => {
    navigate(`/user/${encodeURIComponent(searchValue)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const UserRoute = location.pathname.startsWith('/user/');

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputContainer UserRoute={UserRoute}>
          <Logo />
          <InputWrap>
            <StyledInput
              type="text"
              placeholder="캐릭터 닉네임을 입력해주세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              UserRoute={UserRoute}
            />
            <StyledButton UserRoute={UserRoute}>
              <IconSearch />
            </StyledButton>
          </InputWrap>
        </InputContainer>
      </form>
      <ThemeToggleWrap>
        <ThemeToggleButton /> 
      </ThemeToggleWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  @media screen and (max-width:767px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width:576px) {
    
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.UserRoute ? 'end' : 'center')};
  align-items: center;
  width: 100%;
  height: 50px;
  z-index: 99;

  

  @media screen and (max-width:767px) {
    justify-content: center;
    flex-direction: column;
    height: 100%;
    
  }


`;


const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledInput = styled.input`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: ${({ UserRoute }) => (UserRoute ? '210px' : '300px')};
  height: ${({ UserRoute }) => (UserRoute ? '25px' : '40px')};
  padding: 2px 10px;
  border: 2px solid rgba(0, 0, 0, 0.9);
  border-radius: 7px;
  outline: none;
  font-size: 13px;
  &:focus {
    border-color: rgba(255, 51, 0, 0.9);
    box-shadow: 0 0 10px rgba(255, 51, 0, 0.5);
  }
  &:focus + button {
    color: rgba(255, 51, 0, 0.9);    
  };

`;

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  width: ${({ UserRoute }) => (UserRoute ? '30px' : '35px')};
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

  @media screen and (max-width:767px) {
    display: block;
    position: absolute;
    right: 10px;
    top: 5px;
  }

`