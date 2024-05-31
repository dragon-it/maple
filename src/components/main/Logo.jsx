import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import logo from '../../assets/Logo.png'

export const Logo = ({ error, isUserRoute }) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <StyledContainer 
      onClick={handleClick} 
      isUserRoute={isUserRoute}>
      <img src={logo} alt="Logo" />
      <StyledLogoText isUserRoute={isUserRoute} error={error}>메짱</StyledLogoText>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  height: 100%;
  

  img {
    width: 40px;
    height: 40px;
    margin-right: 3px;
  }
`;

const StyledLogoText = styled.span`
  font-family: maple-light;
  color: ${({ theme, isUserRoute, error }) => error ? 'black' : (isUserRoute ? theme.logoColor : 'black')};
  font-size: ${(props) => (props.isUserRoute ? '25px' : '30px')};

  @media screen and (max-width:1024px) {
    color: black;
  }

  @media screen and (max-width:576px) {
    font-size: 25px;
  }
`;

