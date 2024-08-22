import React from "react";
import dark_to_top_icon from "../assets/sundayMaple/dark_to_top.svg";
import light_to_top_icon from "../assets/sundayMaple/light_to_top.svg";
import { useTheme } from "./ThemeProvider";
import styled from "styled-components";

function ThemeToTopButton() {
  const { theme } = useTheme();
  // 화면 최상단 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <ScrollTopButton onClick={scrollToTop}>
        <Icon
          onClick={scrollToTop}
          src={theme === "dark" ? dark_to_top_icon : light_to_top_icon}
          alt="to-top-icon"
        />
      </ScrollTopButton>
    </div>
  );
}

const ScrollTopButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 24px;
  right: 24px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.toggleBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  color: ${({ theme }) => theme.toggleColor};
  border-radius: 20px;
  cursor: pointer;
  z-index: 9999999999999;

  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

export default ThemeToTopButton;
