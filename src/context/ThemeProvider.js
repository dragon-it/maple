import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { dark, light } from '../components/theme/Theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 로컬 스토리지에서 현재 테마 상태를 읽어와서 초기값으로 설정합니다.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // 수정된 부분
  });

  console.log(theme)
  useEffect(() => {
    // 테마 상태가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === 'dark' ? dark : light}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
