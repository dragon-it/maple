import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 사용자 설정 상태
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 상태 변화에 따른 localStorage 업데이트
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
