import React from "react";
import { Search } from "../components/main/Search";
import styled from "styled-components";
import { Footer } from "../components/common/Footer";
import { Favorite } from "../components/user/favorite/Favorite";
import { SundayMaple } from "../components/main/SundayMaple";

export const Main = () => {
  return (
    <Container>
      <SearchWrap>
        <Search />
        <FavoriteWrap>
          <Favorite />
        </FavoriteWrap>
      </SearchWrap>
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
  height: 100px;
  z-index: 999;
`;

const FavoriteWrap = styled.div`
  position: absolute;
  top: 110px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.53);
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    top: 130px;
  }
`;
