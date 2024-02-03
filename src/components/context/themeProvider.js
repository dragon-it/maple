// ThemeProvider.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import { lightTheme, darkTheme } from '../theme/Theme';
import { ThemeProvider as StyledProvider } from 'styled-components';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const LocalTheme = window.localStorage.getItem('theme') || 'light';
  const [themeMode, setThemeMode] = useState(LocalTheme);
  console.log(themeMode);

  const toggleTheme = useCallback(() => {
    if (themeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode("light");
      window.localStorage.setItem('theme', 'light');
    }
  }, [themeMode]);

  const themeObject = themeMode === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledProvider theme={themeObject}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, toggleTheme } = context;

  return [themeMode, toggleTheme];
}

export { ThemeProvider, useTheme };
