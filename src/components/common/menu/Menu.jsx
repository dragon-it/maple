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
        <MenusHeader>MENU</MenusHeader>
        <Menus>캐릭터 검색</Menus>
        <Menus>캐릭터 캡처</Menus>
        <Menus>길드 검색</Menus>
        <Menus>썬데이 메이플(공홈)</Menus>
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
  position: absolute;
  width: 120px;
  height: auto;
  visibility: ${({ isClicked }) => (isClicked ? "visible" : "hidden")};
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0)};
  max-height: ${({ isClicked }) => (isClicked ? "200px" : "0")};
  top: 50px;
  right: 30px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #24272b;
  outline: 1px solid #2e3035;
  border: 1px solid #3d454e;
  border-radius: 7px;
  transition: opacity 0.5s ease, max-height 1s ease;
  z-index: 9999999;
  box-shadow: ${({ isClicked }) =>
    isClicked ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "none"};
  overflow: hidden;
  text-align: center;
`;

const MenusHeader = styled.div`
  font-size: 12px;
  color: #a9bac1;
`;

const Menus = styled.div`
  color: rgb(254, 254, 254);
  font-size: 12px;
  padding: 7px 0px;
`;
