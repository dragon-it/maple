import React from "react";
import { useTheme } from "./ThemeProvider";
import styled from "styled-components";
import dark_theme_icon from "../assets/themeIcons/dark_mode_icon.png";
import light_theme_icon from "../assets/themeIcons/light_mode_icon3.png";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleWrapper onClick={toggleTheme}>
      <Icon
        src={theme === "dark" ? light_theme_icon : dark_theme_icon}
        alt="theme-icon"
      />
      <Text>{theme === "dark" ? "light" : "dark"}</Text>
    </ToggleWrapper>
  );
}

export default ThemeToggleButton;

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 3%;
  background-color: ${({ theme }) => theme.toggleBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  color: ${({ theme }) => theme.toggleColor};
  font-size: 20px;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    width: 60px;
    height: 32px;
    font-size: 15px;
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 32px;
    height: 32px;
    left: 0;
    background-color: transparent;
    border: none;
  }
`;

const Text = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Icon = styled.img`
  display: none;
  width: 32px;
  height: 32px;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
