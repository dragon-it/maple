import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; 
import logo from '../../assets/Logo.png'


export const Logo = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigate(`/`);
  };

  const UserRoute = location.pathname.startsWith('/user/');
  console.log(UserRoute)
  return (
    <Container 
    onClick={handleClick} UserRoute={UserRoute}>
      <img src={logo} alt="Logo" />
      <LogoText UserRoute={UserRoute}>메짱</LogoText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  font-size: ${(props) => (props.UserRoute ? '25px' : '30px')};
  img {
    width: ${(props) => (props.UserRoute ? '40px' : '50px')};
    height: ${(props) => (props.UserRoute ? '40px' : '50px')};
  }
`;

const LogoText = styled.div`
  font-family: maple-light;
  color: ${({ theme, UserRoute }) => UserRoute ?  theme.logoColor: 'black'};

  @media screen and (max-width:767px) {
    color: black;
  }
`;
