import React from "react";
import { Search } from "../components/main/Search";
import styled from "styled-components";
import { Footer } from "../components/common/footer/Footer";
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
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100px;
`;

const FavoriteWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 110px;
  height: auto;
  z-index: 50;
  @media screen and (max-width: 768px) {
    top: 130px;
  }
`;
