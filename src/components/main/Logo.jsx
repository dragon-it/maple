import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; 
import logo from '../../assets/Logo.png'


export const Logo = ({ error }) => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/`);
  };

  const UserRoute = location.pathname.startsWith('/user/');

  return (
    <Container 
    onClick={handleClick} 
    UserRoute={UserRoute}>
      <img src={logo} alt="Logo" />
      <LogoText UserRoute={UserRoute} error={error}>메짱</LogoText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  font-size: ${(props) => (props.UserRoute ? '25px' : '30px')};
  z-index: 1;
  img {
    width: 40px;
    height: 40px;
    margin-right: 3px;
  }

`;

const LogoText = styled.div`
  font-family: MaplestoryOTFLight;
  color: ${({ theme, UserRoute, error }) => error ? 'black' : (UserRoute ? theme.logoColor : 'black')};

  @media screen and (max-width:1024px) {
    color: black;
  }

  @media screen and (max-width:576px) {
    font-size: 25px;

  }
`;
