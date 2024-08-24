import React from "react";
import { useTheme } from "./ThemeProvider.js";
import styled from "styled-components";
import dark_theme_icon from "../assets/themeIcons/dark_mode_icon.svg";
import light_theme_icon from "../assets/themeIcons/light_mode_icon.svg";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <ToggleWrapper onClick={toggleTheme}>
        <Icon
          src={theme === "dark" ? light_theme_icon : dark_theme_icon}
          alt="theme-icon"
        />
        <Text>{theme === "dark" ? "light" : "dark"}</Text>
      </ToggleWrapper>
    </>
  );
}

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 99999999 !important;
  bottom: 24px;
  right: 24px;
  background-color: ${({ theme }) => theme.toggleBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  color: ${({ theme }) => theme.toggleColor};
  font-size: 20px;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  cursor: pointer;

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

export default ThemeToggleButton;
