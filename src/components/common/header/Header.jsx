import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../assets/Component 39.svg";

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
          src={logo}
          alt="로고"
          onClick={() => navigate(routes.home)}
        />

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
          <Items onClick={() => navigate(routes.sundayMaple)}>
            <p>썬데이 메이플</p>
          </Items>
        </ItemContainer>
        <SpaceField></SpaceField>
      </PcHeaderContainer>
    </>
  );
};

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
  width: 62px;
  height: 57px;
  cursor: pointer;
  margin-top: 3px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

const Items = styled.div`
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.15s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.tabHoverColor};
  }
`;

const SpaceField = styled.div`
  flex: 1 1;
  max-width: 400px;
`;
