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
  gap: 10px;
`;

const Icon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 7px;
  background-color: #24272b;
  outline: 1px solid #b0b0b0;
  border: 1px solid #3d454e;
  cursor: pointer;

  &:hover {
    background-color: #34383e;
  }
`;

export default ThemeToggleButton;
