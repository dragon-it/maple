import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../../../assets/Component 39.svg";

export const Header = () => {
  const navigate = useNavigate();

  const routes = {
    home: "/",
    findCharacter: "/find-main",
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
        <Items onClick={() => navigate(routes.findCharacter)}>
          <p>본캐 찾기</p>
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
      <SpaceField></SpaceField>
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
  }
`;

const PcHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 0 20px;
  width: 100%;
  min-height: 40px;
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
  height: 100%;
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
  max-width: 400px;
`;

const OfficialHome = styled.div`
  margin-left: 3px;
  font-size: 12px;
  display: inline-block;
`;
