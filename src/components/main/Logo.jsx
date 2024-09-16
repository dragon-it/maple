import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo_dark from "../../assets/Component 39.svg";
import logo_light from "../../assets/Component 39.svg";
import { useTheme } from "../../context/ThemeProvider";

export const Logo = ({ error, isUserRoute }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();



  // 로고 클릭 시 홈페이지 이동
  const handleClick = () => {
    navigate(`/`);
  };

  // 로고 이미지 선택 로직
  const logoSrc = (() => {

    if (theme === "dark") {
      return isUserRoute && !error ? logo_light : logo_dark;
    }
    return logo_dark;
  })();

  return (
    <StyledContainer onClick={handleClick} isUserRoute={isUserRoute}>
      <img src={logoSrc} alt="Logo" />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;

  img {
    width: 62px;
    height: 57px;
  }
`;
