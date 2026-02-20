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
  const [canHover, setCanHover] = useState(false);
  const [sundayMapleUrl, setSundayMapleUrl] = useState(
    localStorage.getItem("sundayMaple") ||
      "https://maplestory.nexon.com/News/Event",
  );
  const miniRef = useRef(null);

  const routes = {
    home: "/",
    characterCapture: "/character-capture",
    searchGuild: "/guild-search",
    randomClass: "/random-class",
    expSimulator: "/exp-simulator",
    slidingPuzzle: "/sliding-puzzle",
  };

  useEffect(() => {
    const readUrl = () => {
      const url = localStorage.getItem("sundayMaple");
      setSundayMapleUrl(url || "https://maplestory.nexon.com/News/Event");
    };
    const handleStorage = (event) => {
      if (event.key === "sundayMaple") readUrl();
    };

    readUrl();
    window.addEventListener("sundayMapleUpdated", readUrl);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("sundayMapleUpdated", readUrl);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  /** Hover 가능 환경 감지 — 단 1회만 등록 */
  useEffect(() => {
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHover = () => setCanHover(hoverMedia.matches);
    updateHover();

    hoverMedia.addEventListener("change", updateHover);
    return () => hoverMedia.removeEventListener("change", updateHover);
  }, []);

  /** 모바일일 때만 outside click detector */
  useEffect(() => {
    if (canHover) return;

    const handleClickOutside = (e) => {
      if (miniRef.current && !miniRef.current.contains(e.target)) {
        setIsMiniOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [canHover]);

  /** ESC 키로 닫기 */
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") setIsMiniOpen(false);
    };
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, []);

  /** 디바이스 hover 능력 바뀔 때 메뉴 닫기 */
  useEffect(() => {
    setIsMiniOpen(false);
  }, [canHover]);

  const handleMiniEnter = () => {
    if (canHover) setIsMiniOpen(true);
  };

  const handleMiniLeave = () => {
    if (canHover) setIsMiniOpen(false);
  };

  const handleMiniClick = (event) => {
    if (canHover) return;
    event.preventDefault();
    event.stopPropagation();
    setIsMiniOpen((prev) => !prev);
  };

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

      <ItemList>
        <Item>
          <ItemLink to={routes.home}>캐릭터 검색</ItemLink>
        </Item>
        <Item>
          <ItemLink to={routes.characterCapture}>캐릭터 캡처</ItemLink>
        </Item>
        <Item>
          <ItemLink to={routes.searchGuild}>길드 검색</ItemLink>
        </Item>

        <MiniGameWrapper
          ref={miniRef}
          onMouseEnter={handleMiniEnter}
          onMouseLeave={handleMiniLeave}
        >
          <MiniGameTrigger href="#" onClick={handleMiniClick}>
            <span>미니게임</span>
          </MiniGameTrigger>

          <MiniDropdown $isClicked={isMiniOpen}>
            <DropdownMenuItem to={routes.randomClass}>
              랜덤 직업 뽑기
            </DropdownMenuItem>
            <DropdownMenuItem to={routes.slidingPuzzle}>
              슬라이딩 퍼즐
            </DropdownMenuItem>
          </MiniDropdown>
        </MiniGameWrapper>

        <Item>
          <ItemLink to={routes.expSimulator}>EXP 시뮬레이터</ItemLink>
        </Item>

        <Item>
          <ItemExternal
            href={sundayMapleUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            썬데이메이플
          </ItemExternal>
        </Item>
      </ItemList>

      <ThemeToggleWrap>
        {!isHomePage && (
          <HeaderSearchWrap $compact={!isHomePage}>
            <Search variant="header" compact={!isHomePage} />
          </HeaderSearchWrap>
        )}
        <ThemeToggleButton />
      </ThemeToggleWrap>
    </PcHeaderContainer>
  );
};

const itemStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  transition: 0.15s ease;
  padding: 0 8px;
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
  padding: 0 10px;
  width: 100%;
  gap: 10px;
  max-height: 50px;
  background: rgba(38, 38, 38, 0.85);
`;

const LogoWrap = styled.div`
  display: flex;
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

const ItemList = styled.ul`
  display: flex;
  flex: 1;
  align-items: stretch;
  gap: 10px;
  margin-left: 40px;
  font-size: 0.9rem;
  height: 50px;
  list-style: none;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    gap: 0;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const ItemLink = styled(Link)`
  ${itemStyles}
`;

const ItemExternal = styled.a`
  ${itemStyles}
`;

const ThemeToggleWrap = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  @media screen and (max-width: 1024px) {
    flex: 0.5;
    min-width: 0;
    justify-content: flex-end;
  }

  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;

const HeaderSearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-width: 220px;
  max-width: 360px;

  ${({ $compact }) =>
    $compact &&
    css`
      flex: 0 1 auto;
      width: clamp(120px, 20vw, 230px);
      min-width: 120px;
      max-width: 230px;
    `}

  @media screen and (max-width: 1024px) {
    min-width: 0;
    max-width: 230px;
    width: 100%;
  }
`;

const MiniGameWrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

const MiniGameTrigger = styled.a`
  ${itemStyles}
  display: flex;
  align-items: center;
`;

const MiniDropdown = styled(DropdownContainer)`
  top: 50px;
  left: 0;
  width: 140px;
  opacity: ${({ $isClicked }) => ($isClicked ? 1 : 0)};
  visibility: ${({ $isClicked }) => ($isClicked ? "visible" : "hidden")};
  pointer-events: ${({ $isClicked }) => ($isClicked ? "auto" : "none")};
  transform: translateY(${({ $isClicked }) => ($isClicked ? "0" : "-5px")});
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`;

const DropdownMenuItem = styled(DropdownLink)`
  font-size: 14px;
`;
