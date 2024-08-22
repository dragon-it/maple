import React from "react";
import { useTheme } from "./ThemeProvider";
import styled from "styled-components";
import dark_theme_icon from "../assets/themeIcons/dark_mode_icon.svg";
import light_theme_icon from "../assets/themeIcons/light_mode_icon.svg";
import dark_to_top_icon from "../assets/sundayMaple/dark_to_top.svg";
import light_to_top_icon from "../assets/sundayMaple/light_to_top.svg";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  // 화면 최상단 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <ToggleWrapper onClick={toggleTheme}>
        <Icon
          src={theme === "dark" ? light_theme_icon : dark_theme_icon}
          alt="theme-icon"
        />
        <Text>{theme === "dark" ? "light" : "dark"}</Text>
      </ToggleWrapper>
      <ScrollTopButton onClick={scrollToTop}>
        <ToTopIcon
          onClick={scrollToTop}
          src={theme === "dark" ? dark_to_top_icon : light_to_top_icon}
          alt="to-top-icon"
        />
      </ScrollTopButton>
    </>
  );
}

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
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

const ScrollTopButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 24px;
  right: 125px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.toggleBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  color: ${({ theme }) => theme.toggleColor};
  border-radius: 20px;
  cursor: pointer;
  z-index: 9999999999999;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ToTopIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export default ThemeToggleButton;
