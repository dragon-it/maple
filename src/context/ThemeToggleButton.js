import React from "react";
import { useTheme } from "./ThemeProvider.js";
import styled from "styled-components";
import dark_theme_icon from "../assets/themeIcons/dark_mode_icon.svg";
import light_theme_icon from "../assets/themeIcons/light_mode_icon.svg";
import { Menu } from "../components/common/menu/Menu.jsx";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleWrapper>
      <Icon
        src={theme === "dark" ? dark_theme_icon : light_theme_icon}
        alt="theme-icon"
        onClick={toggleTheme}
      />
      <Menu />
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.headerBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.headerIconHoverColor};
  }

  @media (hover: none) {
    &:active {
      background-color: ${({ theme }) => theme.headerIconHoverColor};
      transform: scale(0.9);
    }
  }
`;

export default ThemeToggleButton;
