import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo_dark from "../../assets/Logo_dark.svg";
import logo_light from "../../assets/Logo_light.svg";
import logo_dark_mobile from "../../assets/Logo_dark_mobile.svg";
import logo_light_mobile from "../../assets/Logo_light_mobile.svg";
import { useTheme } from "../../context/ThemeProvider";

export const Logo = ({ error, isUserRoute }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <StyledContainer onClick={handleClick} isUserRoute={isUserRoute}>
      <img
        src={
          isUserRoute
            ? windowWidth <= 1024
              ? theme === "dark"
                ? logo_dark_mobile
                : logo_dark_mobile
              : windowWidth > 1024 && theme === "dark" && !error
              ? logo_light
              : logo_dark
            : windowWidth <= 1024
            ? theme === "dark"
              ? logo_dark_mobile
              : logo_dark_mobile
            : theme === "dark"
            ? logo_dark
            : logo_dark
        }
        alt="Logo"
      />
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
