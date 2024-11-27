import React from "react";
import { Search } from "../components/main/Search";
import styled from "styled-components";
import { Favorite } from "../components/user/favorite/Favorite";
import { SundayMaple } from "../components/main/SundayMaple";
import { Helmet } from "react-helmet";

export const Main = () => {
  return (
    <Container>
      <Helmet>
        <title>{`메짱`}</title>
        <meta
          name="description"
          content="메이플스토리 캐릭터 검색사이트 메짱입니다."
        />
      </Helmet>
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
  width: 100%;
  min-height: 85vh;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  z-index: 50;
`;
