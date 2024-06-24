import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo2.png";

export const Logo = ({ error, isUserRoute }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <StyledContainer onClick={handleClick} isUserRoute={isUserRoute}>
      <img src={logo} alt="Logo" />
      <StyledLogoText isUserRoute={isUserRoute} error={error}>
        메짱
      </StyledLogoText>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: maple-light;
  cursor: pointer;
  height: 100%;
  width: 55px;

  img {
    width: 40px;
    height: 25px;
  }
`;

const StyledLogoText = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, isUserRoute, error }) =>
    error ? "black" : isUserRoute ? theme.logoColor : "black"};
  font-size: 25px;

  @media screen and (max-width: 1024px) {
    color: black;
  }
`;
