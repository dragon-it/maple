import React, { useState } from "react";
import styled from "styled-components";
import hamburger_bar_dark from "../../../assets/menu/hamburger_dark.svg";
import hamburger_bar_light from "../../../assets/menu/hamburger_light.svg";
import close_Btn from "../../../assets/menu/Close_Btn.svg";
import { useTheme } from "../../../context/ThemeProvider";

export const Menu = () => {
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);

  const handleClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Container>
        <HamburgerImg
          onClick={handleClicked}
          src={theme === "light" ? hamburger_bar_dark : hamburger_bar_light}
          alt="hamburger_bar"
        />
      </Container>
      <MenuContainer isClicked={isClicked}>
        <p>Menu</p>
        <MenuCloseBtn
          onClick={handleClicked}
          src={close_Btn}
          alt="close_Button"
        ></MenuCloseBtn>
      </MenuContainer>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
`;

const HamburgerImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:hover {
    background-color: rgba(56, 56, 56, 0.65);
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isClicked }) => (isClicked ? "0" : "-100%")};
  width: 300px;
  height: 100%;
  background-color: #222;
  transition: right 0.3s ease;
  z-index: 1000;
  padding: 20px;
  box-shadow: ${({ isClicked }) =>
    isClicked ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "none"};
`;

const MenuCloseBtn = styled.img`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  padding: 5px;
  right: 24px;
  top: 24px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  background-color: rgba(129, 129, 129, 0.15);
  cursor: pointer;

  &:hover {
    background-color: rgba(201, 201, 201, 0.65);
  }
`;
