import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../../../assets/logos/LogoIcon.svg";
import logo_text from "../../../assets/logos/Logo_Text_Only.svg";
import logoApril from "../../../assets/logos/Logo_April.svg";
import logoTextApril from "../../../assets/logos/Logo_Text_April.svg";
import { useTheme } from "../../../context/ThemeProvider";
import { Search } from "../../main/Search";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  User,
  Camera,
  Users,
  Gamepad2,
  TrendingUp,
  CheckSquare,
  CalendarHeart,
  Sparkles,
  Puzzle,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHomePage = location.pathname === "/";
  const isAprilFoolsDay = (() => {
    const today = new Date();
    return today.getMonth() === 3 && today.getDate() === 1;
  })();
  const currentLogo = isAprilFoolsDay ? logoApril : logo;
  const currentLogoText = isAprilFoolsDay ? logoTextApril : logo_text;

  const [isMiniOpen, setIsMiniOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [sundayMapleUrl, setSundayMapleUrl] = useState(
    localStorage.getItem("sundayMaple") ||
    "https://maplestory.nexon.com/News/Event",
  );
  const miniRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  const routes = {
    home: "/",
    characterCapture: "/character-capture",
    searchGuild: "/guild-search",
    randomClass: "/random-class",
    expSimulator: "/exp-simulator",
    checklist: "/checklist",
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
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setIsMiniOpen(true);
  };

  const handleMiniLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsMiniOpen(false);
    }, 150);
  };

  const handleMiniClick = (event) => {
    if (canHover) return;
    event.preventDefault();
    event.stopPropagation();
    setIsMiniOpen((prev) => !prev);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMiniOpen, setIsMobileMiniOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileMiniOpen(false);
  };

  return (
    <>
      <PcHeaderContainer>
        <LogoWrap>
          <HeaderLogo
            src={currentLogo}
            alt="로고"
            onClick={() => navigate(routes.home)}
          />
          <HeaderLogoText
            src={currentLogoText}
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
            <ItemLink to={routes.checklist}>체크리스트</ItemLink>
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
          <HeaderIconBtn
            onClick={toggleTheme}
            type="button"
            aria-label="테마 전환"
          >
            {theme === "dark" ? (
              <Sun size={20} className="header-action-icon" />
            ) : (
              <Moon size={20} className="header-action-icon" />
            )}
          </HeaderIconBtn>
          <MobileMenuBtn
            type="button"
            onClick={toggleMobileMenu}
            aria-label="메뉴 열기"
          >
            <MenuIcon size={20} className="header-action-icon" />
          </MobileMenuBtn>
        </ThemeToggleWrap>
      </PcHeaderContainer>

      {/* 모바일 햄버거 슬라이드 서이드 드로어 */}
      {isMobileMenuOpen && (
        <MobileDrawerOverlay onClick={closeMobileMenu}>
          <MobileDrawerContent onClick={(e) => e.stopPropagation()}>
            <DrawerHeader>
              <DrawerLogoWrap onClick={() => { navigate(routes.home); closeMobileMenu(); }}>
                <HeaderLogo src={currentLogo} alt="로고" />
                <HeaderLogoText src={currentLogoText} alt="로고 텍스트" />
              </DrawerLogoWrap>
              <DrawerCloseBtn onClick={closeMobileMenu} aria-label="메뉴 닫기">
                <CloseIcon size={18} />
              </DrawerCloseBtn>
            </DrawerHeader>

            <DrawerNav>
              <DrawerNavLink to={routes.home} onClick={closeMobileMenu}>
                <User size={18} className="drawer-icon" />
                <span>캐릭터 검색</span>
              </DrawerNavLink>
              <DrawerNavLink to={routes.characterCapture} onClick={closeMobileMenu}>
                <Camera size={18} className="drawer-icon" />
                <span>캐릭터 캡처</span>
              </DrawerNavLink>
              <DrawerNavLink to={routes.searchGuild} onClick={closeMobileMenu}>
                <Users size={18} className="drawer-icon" />
                <span>길드 검색</span>
              </DrawerNavLink>

              <DrawerAccordionBtn
                onClick={() => setIsMobileMiniOpen((prev) => !prev)}
                type="button"
              >
                <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Gamepad2 size={18} className="drawer-icon" />
                  <span>미니게임</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`chevron-icon ${isMobileMiniOpen ? "open" : ""}`}
                />
              </DrawerAccordionBtn>

              {isMobileMiniOpen && (
                <DrawerSubGroup>
                  <DrawerSubNavLink to={routes.randomClass} onClick={closeMobileMenu}>
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Sparkles size={16} className="drawer-icon" />
                      <span>랜덤 직업 뽑기</span>
                    </span>
                    <ChevronRight size={14} className="sub-arrow" />
                  </DrawerSubNavLink>
                  <DrawerSubNavLink to={routes.slidingPuzzle} onClick={closeMobileMenu}>
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Puzzle size={16} className="drawer-icon" />
                      <span>슬라이딩 퍼즐</span>
                    </span>
                    <ChevronRight size={14} className="sub-arrow" />
                  </DrawerSubNavLink>
                </DrawerSubGroup>
              )}

              <DrawerNavLink to={routes.expSimulator} onClick={closeMobileMenu}>
                <TrendingUp size={18} className="drawer-icon" />
                <span>EXP 시뮬레이터</span>
              </DrawerNavLink>
              <DrawerNavLink to={routes.checklist} onClick={closeMobileMenu}>
                <CheckSquare size={18} className="drawer-icon" />
                <span>체크리스트</span>
              </DrawerNavLink>
              <DrawerExternalLink
                href={sundayMapleUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CalendarHeart size={18} className="drawer-icon" />
                  <span>썬데이메이플</span>
                </span>
                <span>↗</span>
              </DrawerExternalLink>
            </DrawerNav>
          </MobileDrawerContent>
        </MobileDrawerOverlay>
      )}
    </>
  );
};

const itemStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  transition: 0.15s ease;
  padding: 0 4px;
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
  padding: 0 16px;
  width: 100%;
  gap: 10px;
  max-height: 50px;
  background: rgba(15, 23, 42, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 0;
  justify-content: flex-start;
  min-width: 0;
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
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  font-size: 0.9rem;
  height: 50px;
  list-style: none;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 1280px) {
    gap: 4px;
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
  align-items: center;
  flex: 1 1 0;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;
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
  z-index: 99999;
`;

const MiniGameTrigger = styled.a`
  ${itemStyles}
  display: flex;
  align-items: center;
`;

const MiniDropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 155px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ $isClicked }) => ($isClicked ? "0" : "-6px")});
  font-size: 13px;
  padding: 6px;
  background: linear-gradient(
    135deg,
    rgba(20, 28, 44, 0.96),
    rgba(15, 23, 38, 0.96)
  );
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  z-index: 9999999;  
  text-align: center;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);

  opacity: ${({ $isClicked }) => ($isClicked ? 1 : 0)};
  visibility: ${({ $isClicked }) => ($isClicked ? "visible" : "hidden")};
  pointer-events: ${({ $isClicked }) => ($isClicked ? "auto" : "none")};
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0.18s ease;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -15px;
    right: -15px;
    height: 25px;
    background: transparent;
  }
`;

const DropdownMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.88);
  font-size: 13px;
  font-weight: 500;
  padding: 9px 12px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: rgb(220, 252, 2);
    background: rgba(255, 255, 255, 0.12);
  }
`;

const HeaderIconBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileDrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MobileDrawerContent = styled.div`
  width: 80%;
  max-width: 320px;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.96),
    rgba(20, 26, 40, 0.96)
  );
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  animation: slideLeft 0.22s ease-out;

  @keyframes slideLeft {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DrawerLogoWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DrawerCloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
`;

const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex: 1;
`;

const DrawerNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--foreground, rgba(255, 255, 255, 0.9));
  text-decoration: none;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.15s ease;

  .drawer-icon {
    color: var(--primary, oklch(0.72 0.16 285));
    transition: transform 0.15s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;

    .drawer-icon {
      transform: scale(1.1);
    }
  }
`;



const DrawerExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.15s ease;

  .drawer-icon {
    color: var(--primary, oklch(0.72 0.16 285));
    transition: transform 0.15s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;

    .drawer-icon {
      transform: scale(1.1);
    }
  }
`;

const DrawerAccordionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--foreground, rgba(255, 255, 255, 0.9));
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.15s ease;

  .drawer-icon {
    color: var(--primary, oklch(0.72 0.16 285));
    transition: transform 0.15s ease;
  }

  .chevron-icon {
    color: rgba(255, 255, 255, 0.6);
    transition: transform 0.2s ease;

    &.open {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;

    .drawer-icon {
      transform: scale(1.1);
    }

    .chevron-icon {
      color: #ffffff;
    }
  }
`;

const DrawerSubGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: -2px;
  margin-bottom: 4px;
  padding-left: 12px;
  border-left: 2px solid rgba(168, 85, 247, 0.5);
  animation: fadeIn 0.15s ease-out;
`;

const DrawerSubNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.15s ease;

  .drawer-icon {
    color: var(--primary, oklch(0.72 0.16 285));
    transition: transform 0.15s ease;
  }

  .sub-arrow {
    color: rgba(255, 255, 255, 0.35);
    transition: all 0.15s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;

    .drawer-icon {
      transform: scale(1.1);
    }

    .sub-arrow {
      color: rgba(255, 255, 255, 0.85);
      transform: translateX(3px);
    }
  }
`;

