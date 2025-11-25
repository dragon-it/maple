import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import hamburger_bar_light from "../../../assets/menu/hamburger_light.svg";
import hamburger_bar_dark from "../../../assets/menu/hamburger_dark.svg";
import { useTheme } from "../../../context/ThemeProvider";
import { Search } from "../../main/Search";

export const Menu = () => {
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);
  const [sundayMapleUrl, setSundayMapleUrl] = useState(
    localStorage.getItem("sundayMaple") ||
      "https://maplestory.nexon.com/News/Event"
  );

  useEffect(() => {
    const url = localStorage.getItem("sundayMaple");
    if (url) setSundayMapleUrl(url);
  }, []);

  const routes = {
    home: "/",
    characterCapture: "/character-capture",
    searchGuild: "/guild-search",
    randomClass: "/random-class",
    expSimulator: "/exp-simulator",
    slidingPuzzle: "/sliding-puzzle",
  };

  const handleClicked = (event) => {
    event.stopPropagation();
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <HeaderUtility>
        <Container>
          <HamburgerImg
            onClick={handleClicked}
            src={theme === "dark" ? hamburger_bar_light : hamburger_bar_dark}
            alt="hamburger_bar"
          />
        </Container>
      </HeaderUtility>
      <MenuContainer ref={menuRef} $isClicked={isClicked}>
        <MenusHeader>MENU</MenusHeader>
        <Menus to={routes.home} onClick={() => setIsClicked(false)}>
          캐릭터 검색
        </Menus>
        <Menus to={routes.characterCapture} onClick={() => setIsClicked(false)}>
          캐릭터 캡처
        </Menus>
        <Menus to={routes.searchGuild} onClick={() => setIsClicked(false)}>
          길드 검색
        </Menus>
        <Menus to={routes.randomClass} onClick={() => setIsClicked(false)}>
          랜덤 직업 뽑기
        </Menus>
        <Menus to={routes.expSimulator} onClick={() => setIsClicked(false)}>
          Exp 시뮬레이터
        </Menus>
        <Menus to={routes.slidingPuzzle} onClick={() => setIsClicked(false)}>
          슬라이딩 퍼즐
        </Menus>
        <MenuLink
          href={sundayMapleUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsClicked(false)}
        >
          썬데이 메이플
        </MenuLink>
      </MenuContainer>
    </>
  );
};

const Container = styled.div`
  display: none;
  position: relative;

  @media screen and (max-width: 768px) {
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

  @media (hover: none) {
    &:active {
      background-color: ${({ theme }) => theme.headerIconHoverColor};
      transform: scale(0.9);
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 120px;
  height: auto;
  visibility: ${({ $isClicked }) => ($isClicked ? "visible" : "hidden")};
  opacity: ${({ $isClicked }) => ($isClicked ? 1 : 0)};
  top: 50px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: rgb(36, 39, 43);
  outline: 1px solid rgb(46, 48, 53);
  border: 1px solid rgb(61, 69, 78);
  border-radius: 7px;
  transition: opacity 0.7s ease, max-height 0.8s ease;
  z-index: 9999999;
  box-shadow: ${({ $isClicked }) =>
    $isClicked ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "none"};
  text-align: center;
`;

const MenusHeader = styled.div`
  font-size: 12px;
  color: rgb(169, 186, 193);
  border-bottom: 1px solid rgba(91, 91, 91, 0.5);
  padding-bottom: 5px;
`;

const Menus = styled(Link)`
  color: rgb(255, 255, 255);
  font-size: 12px;
  padding: 7px 0px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgb(199, 222, 90);
    transform: scale(1.1);
  }

  @media (hover: none) {
    &:active {
      color: rgb(199, 222, 90);
      transform: scale(0.9);
    }
  }
`;

const MenuLink = styled.a`
  color: rgb(255, 255, 255);
  font-size: 12px;
  padding: 7px 0px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgb(199, 222, 90);
    transform: scale(1.1);
  }

  @media (hover: none) {
    &:active {
      color: rgb(199, 222, 90);
      transform: scale(0.9);
    }
  }
`;

const HeaderUtility = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
