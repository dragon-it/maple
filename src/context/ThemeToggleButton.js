import React from 'react';
import { useTheme } from './ThemeProvider';
import styled from 'styled-components';


function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleWrapper onClick={toggleTheme}>
      {theme === 'dark' ? 'light' : 'dark'}
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
`;
