import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../../../assets/Component 39.svg";
import ThemeToggleButton from "../../../context/ThemeToggleButton";

export const Header = () => {
  const navigate = useNavigate();

  const routes = {
    home: "/",
    characterCapture: "/character-capture",
    searchGuild: "/guild-search",
  };

  const sundayMapleUrl = localStorage.getItem("sundayMaple") || "#";
  return (
    <PcHeaderContainer>
      <HeaderLogo src={logo} alt="로고" onClick={() => navigate(routes.home)} />
      <ItemContainer>
        <Items onClick={() => navigate(routes.home)}>
          <p>캐릭터 검색</p>
        </Items>
        <Items onClick={() => navigate(routes.characterCapture)}>
          <p>캐릭터 캡처</p>
        </Items>
        <Items onClick={() => navigate(routes.searchGuild)}>
          <p>길드 검색</p>
        </Items>
        <ItemsToHome
          href={sundayMapleUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            썬데이 메이플<OfficialHome>(공홈)</OfficialHome>
          </p>
        </ItemsToHome>
      </ItemContainer>
      <SpaceField />
      <ThemeToggleWrap>
        <ThemeToggleButton />
      </ThemeToggleWrap>
    </PcHeaderContainer>
  );
};

const itemStyles = css`
  height: 100%;
  padding: 10px;
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
  padding: 0 30px;
  width: 100%;
  gap: 20px;
  max-height: 50px;
  font-family: maple-light;
  background: ${({ theme }) => theme.headerBgColor};
  white-space: nowrap;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const HeaderLogo = styled.img`
  width: 55px;
  cursor: pointer;
  margin-top: 3px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Items = styled.div`
  ${itemStyles};
`;

const ItemsToHome = styled.a`
  ${itemStyles};
  text-decoration: none;
  color: inherit;
`;

const SpaceField = styled.div`
  flex: 1 1;
  max-width: 1000px;
`;

const OfficialHome = styled.div`
  margin-left: 3px;
  font-size: 12px;
  display: inline-block;
`;

const ThemeToggleWrap = styled.div``;
