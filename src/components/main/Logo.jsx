import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'

export const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };



  return (
    <Container onClick={handleClick}>
      <img src={logo} alt="Logo" />
      <LogoText>메짱</LogoText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    opacity: 1;
  }
`;

const LogoText = styled.div`
  font-family: maple-light;
  font-size: 30px;
`;
