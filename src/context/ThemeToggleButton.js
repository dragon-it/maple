import React from 'react';
import { useTheme } from './ThemeProvider';
import styled from 'styled-components';
import dark_theme_icon from '../assets/themeIcons/dark_mode_icon.png'
import light_theme_icon from '../assets/themeIcons/light_mode_icon.png'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleWrapper onClick={toggleTheme}>
      <Icon src={theme === 'dark' ? light_theme_icon : dark_theme_icon} alt="theme-icon" />
      <Text>{theme === 'dark' ? 'light' : 'dark'}</Text>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    position: absolute;
    width: 32px;
    height: 32px;
    background-color: rgb(74,74,74);
    border: none;
    top: 10px;
  }
`;

const Text = styled.span`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Icon = styled.img`
  display: none; 
  width: 24px;
  height: 24px;

  @media screen and (max-width: 767px) {
    display: block; 
  }
`;
