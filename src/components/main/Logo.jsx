import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo_dark from "../../assets/Logo_dark2.svg";
import Logo_light from "../../assets/Logo_light2.svg";
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
            ? windowWidth > 1024 && theme === "dark" && !error
              ? Logo_light
              : logo_dark
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
