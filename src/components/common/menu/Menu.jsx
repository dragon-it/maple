import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import hamburger_bar_light from "../../../assets/menu/hamburger_light.svg";
import hamburger_bar_dark from "../../../assets/menu/hamburger_dark.svg";
import { useTheme } from "../../../context/ThemeProvider";

export const Menu = () => {
  const { theme } = useTheme();
  const routes = {
    home: "/",
    characterCapture: "/character-capture",
    searchGuild: "/guild-search",
    randomClass: "/random-class",
  };

  const sundayMapleUrl =
    localStorage.getItem("sundayMaple") ||
    "https://maplestory.nexon.com/News/Event";

  const [isClicked, setIsClicked] = useState(false);

  const handleClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Container>
        <HamburgerImg
          onClick={handleClicked}
          src={theme === "dark" ? hamburger_bar_light : hamburger_bar_dark}
          alt="hamburger_bar"
        />
      </Container>
      <MenuContainer isClicked={isClicked}>
        <MenusHeader>MENU</MenusHeader>
        <Menus to={routes.home}>캐릭터 검색</Menus>
        <Menus to={routes.characterCapture}>캐릭터 캡처</Menus>
        <Menus to={routes.searchGuild}>길드 검색</Menus>
        <Menus to={routes.randomClass}>랜덤 직업 뽑기</Menus>
        <Menus href={sundayMapleUrl} target="_blank" rel="noopener noreferrer">
          썬데이 메이플(공홈)
        </Menus>
      </MenuContainer>
    </>
  );
};

const Container = styled.div`
  display: none;
  position: relative;

  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const HamburgerImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.headerBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.headerIconHoverColor};
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 120px;
  height: auto;
  visibility: ${({ isClicked }) => (isClicked ? "visible" : "hidden")};
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0)};
  max-height: ${({ isClicked }) => (isClicked ? "200px" : "0")};
  top: 50px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #24272b;
  outline: 1px solid #2e3035;
  border: 1px solid #3d454e;
  border-radius: 7px;
  transition: opacity 0.5s ease, max-height 1s ease;
  text-decoration: none;
  z-index: 9999999;
  box-shadow: ${({ isClicked }) =>
    isClicked ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "none"};
  overflow: hidden;
  text-align: center;
`;

const MenusHeader = styled.div`
  font-size: 12px;
  color: #a9bac1;
  border-bottom: 1px solid rgba(91, 91, 91, 0.498);
  padding-bottom: 5px;
`;

const Menus = styled(Link)`
  color: rgb(254, 254, 254);
  font-size: 12px;
  padding: 7px 0px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgb(199, 222, 90);
    scale: 1.1;
  }
`;
