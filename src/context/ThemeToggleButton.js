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
        src={theme === "dark" ? light_theme_icon : dark_theme_icon}
        alt="theme-icon"
        onClick={toggleTheme}
      />
      <Menu />
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: transparent;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ThemeToggleButton;
