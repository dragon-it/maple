import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../../../assets/logos/LogoIcon.svg";
import logo_text from "../../../assets/logos/Logo_Text_Only.svg";
import ThemeToggleButton from "../../../context/ThemeToggleButton";

export const Header = () => {
  const navigate = useNavigate();

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
        <Items to={routes.randomClass}>랜덤 직업 뽑기</Items>
        <Items to={routes.expSimulator}>Exp 시뮬레이터</Items>
        <Items to={routes.slidingPuzzle}>슬라이딩 퍼즐</Items>
        <ItemsToHome
          href={sundayMapleUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>썬데이 메이플</p>
        </ItemsToHome>
      </ItemContainer>

      <ThemeToggleWrap>
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

  &:hover {
    border-bottom-color: ${({ theme }) => theme.headerHoverColor};
    transform: scale(1.05);
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
  font-family: maple-light;
  font-size: 0.8rem;
  background: ${({ theme }) => theme.headerBgColor};

  @media screen and (max-width: 768px) {
    padding: 5px;
    gap: 0px;
  }
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
  gap: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    gap: 0px;
  }
`;

const Items = styled(Link)`
  ${itemStyles};
  text-decoration: none;
  color: inherit;
`;

const ItemsToHome = styled.a`
  ${itemStyles};
  text-decoration: none;
  color: inherit;
`;

const ThemeToggleWrap = styled.div``;
