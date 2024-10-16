import React, { useState } from "react";
import styled from "styled-components";
import hamburger_bar_dark from "../../../assets/menu/hamburger_dark.svg";
import hamburger_bar_light from "../../../assets/menu/hamburger_light.svg";
import { useTheme } from "../../../context/ThemeProvider";

export const Menu = () => {
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);
  console.log(isClicked);

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
        <Menus>Menu</Menus>
      </MenuContainer>
    </>
  );
};

const Container = styled.div`
  display: none;
  position: relative;
  @media screen and (max-width: 1024px) {
    display: block;
  }
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
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: rgba(56, 56, 56, 0.25);
  }
`;

const MenuContainer = styled.div`
  display: ${({ isClicked }) => (isClicked ? "block" : "none")};
  position: absolute;
  top: 50px;
  right: 30px;
  width: 40px;
  height: 200px;
  font-size: 10px;
  background-color: #373b41;
  outline: 1px solid #2e3035;
  border: 1px solid #3d454e;
  border-radius: 7px;
  transition: right 0.3s ease;
  z-index: 1000;
  box-shadow: ${({ isClicked }) =>
    isClicked ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "none"};
  z-index: 9999999;
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
`;
