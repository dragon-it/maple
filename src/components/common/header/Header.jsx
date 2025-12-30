import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../../../assets/logos/LogoIcon.svg";
import logo_text from "../../../assets/logos/Logo_Text_Only.svg";
import ThemeToggleButton from "../../../context/ThemeToggleButton";
import { Search } from "../../main/Search";
import {
  MenuContainer as DropdownContainer,
  Menus as DropdownLink,
} from "../menu/Menu";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isMiniOpen, setIsMiniOpen] = useState(false);
  const miniRef = useRef(null);

  const routes = {
    home: "/",
    characterCapture: "/character-capture",
    searchGuild: "/guild-search",
    randomClass: "/random-class",
    expSimulator: "/exp-simulator",
    slidingPuzzle: "/sliding-puzzle",
  };

  const sundayMapleUrl =
    localStorage.getItem("sundayMaple") ||
    "https://maplestory.nexon.com/News/Event";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniRef.current && !miniRef.current.contains(event.target)) {
        setIsMiniOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <PcHeaderContainer>
      <LogoWrap>
        <HeaderLogo
          src={logo}
          alt="로고"
          onClick={() => navigate(routes.home)}
        />
        <HeaderLogoText
          src={logo_text}
          alt="로고 텍스트"
          onClick={() => navigate(routes.home)}
        />
      </LogoWrap>
      <ItemContainer>
        <Items to={routes.home}>캐릭터 검색</Items>
        <Items to={routes.characterCapture}>캐릭터 캡처</Items>
        <Items to={routes.searchGuild}>길드 검색</Items>

        <MiniGameWrapper ref={miniRef}>
          <MiniGameTrigger onClick={() => setIsMiniOpen((prev) => !prev)}>
            <span>미니게임</span>
          </MiniGameTrigger>
          <MiniDropdown $isClicked={isMiniOpen}>
            <DropdownMenuItem
              to={routes.randomClass}
              onClick={(event) => {
                event.stopPropagation();
                setIsMiniOpen(false);
              }}
            >
              랜덤 직업 뽑기
            </DropdownMenuItem>
            <DropdownMenuItem
              to={routes.slidingPuzzle}
              onClick={(event) => {
                event.stopPropagation();
                setIsMiniOpen(false);
              }}
            >
              슬라이딩 퍼즐
            </DropdownMenuItem>
          </MiniDropdown>
        </MiniGameWrapper>

        <Items to={routes.expSimulator}>EXP 시뮬레이터</Items>
        <ItemsToHome
          href={sundayMapleUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          썬데이메이플
        </ItemsToHome>
      </ItemContainer>

      <ThemeToggleWrap>
        {!isHomePage && (
          <HeaderSearchWrap>
            <Search variant="header" />
          </HeaderSearchWrap>
        )}
        <ThemeToggleButton />
      </ThemeToggleWrap>
    </PcHeaderContainer>
  );
};

const itemStyles = css`
  height: 100%;
  padding: 8px;
  transition: 0.15s ease;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  color: rgb(205, 205, 205);
  text-decoration: none;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.headerHoverColor};
    color: rgb(255, 255, 255);
  }
`;

const PcHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0%;
  padding: 0 10px;
  width: 100%;
  gap: 10px;
  max-height: 50px;
  font-size: 1rem;
  background: rgba(38, 38, 38, 0.85);
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 50px;
  cursor: pointer;
`;

const HeaderLogoText = styled.img`
  width: 50px;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  gap: 10px;
  margin-left: 40px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    gap: 0px;
  }
`;

const Items = styled(Link)`
  ${itemStyles};
`;

const ItemsToHome = styled.a`
  ${itemStyles};
`;

const ThemeToggleWrap = styled.div`
  display: flex;
`;

const HeaderSearchWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 220px;
  max-width: 360px;
`;

const MiniGameWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MiniGameTrigger = styled.div`
  ${itemStyles};
  display: flex;
  align-items: center;
`;

const MiniDropdown = styled(DropdownContainer)`
  top: 45px;
  left: 0;
  right: auto;
  width: 140px;
  opacity: ${({ $isClicked }) => ($isClicked ? 1 : 0)};
  visibility: ${({ $isClicked }) => ($isClicked ? "visible" : "hidden")};
  pointer-events: ${({ $isClicked }) => ($isClicked ? "auto" : "none")};
  max-height: ${({ $isClicked }) => ($isClicked ? "300px" : "0px")};
  overflow: hidden;
  transition: opacity 0.2s ease, max-height 0.25s ease;
`;

const DropdownMenuItem = styled(DropdownLink)`
  padding: 4px 0px;
  font-size: 14px;
`;
