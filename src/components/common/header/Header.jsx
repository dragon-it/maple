import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  const navigate = useNavigate();

  const routes = {
    home: "/",
    findCharacter: "/find-main",
    searchGuild: "/guild-search",
    sundayMaple: "/sunday-maple",
  };

  return (
    <>
      <PcHeaderContainer>
        <HeaderLogo
          src={"" || "default-logo.png"}
          alt="로고"
          onClick={() => navigate(routes.home)}
        />

        <ItemContainer>
          <Items onClick={() => navigate(routes.home)}>캐릭터 검색</Items>
          <Items onClick={() => navigate(routes.findCharacter)}>
            본캐 찾기
          </Items>
          <Items onClick={() => navigate(routes.searchGuild)}>길드 검색</Items>
          <Items onClick={() => navigate(routes.sundayMaple)}>
            썬데이 메이플
          </Items>
        </ItemContainer>
      </PcHeaderContainer>
    </>
  );
};

const PcHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  min-height: 40px;
  font-family: maple-light;
  background: ${({ theme }) => theme.headerBgColor};

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const HeaderLogo = styled.img`
  cursor: pointer;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1 1;
  height: 50px;
`;
const Items = styled.div`
  flex: 1 1;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.tabHoverColor};
  }
`;
