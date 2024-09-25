import React from "react";
import { Search } from "../components/main/Search";
import styled from "styled-components";
import { Favorite } from "../components/user/favorite/Favorite";
import { SundayMaple } from "../components/main/SundayMaple";

export const Main = () => {
  return (
    <Container>
      <SearchWrap>
        <Search />
      </SearchWrap>
      <FavoriteWrap>
        <Favorite />
      </FavoriteWrap>
      <SundayMaple />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 80px;
`;

const FavoriteWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  z-index: 50;
`;
