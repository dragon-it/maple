import React, { useRef } from "react";
import { Search } from "../components/main/Search";
import styled from "styled-components";
import { Favorite } from "../components/user/favorite/Favorite";
import { SundayMaple } from "../components/main/SundayMaple";
import { Helmet } from "react-helmet";
import { InfoPanel } from "../components/main/InfoPanel";
import dark_to_top_icon from "../assets/icons/sundayMaple/dark_to_top.svg";
import light_to_top_icon from "../assets/icons/sundayMaple/light_to_top.svg";
import { useTheme } from "../context/ThemeProvider";

export const Main = ({ noticeData, eventData, loading, error }) => {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSunday = new Date().getDay() === 0;

  return (
    <Container ref={containerRef}>
      <Helmet>
        <title>{`메짱`}</title>
        <meta
          name="description"
          content="메이플스토리 캐릭터 검색사이트 메짱입니다."
        />
      </Helmet>
      <FunctionalWrap>
        <SearchWrap>
          <Search />
        </SearchWrap>
        <FavoriteWrap>
          <Favorite />
        </FavoriteWrap>
        <InfoPanel
          noticeData={noticeData}
          eventData={eventData}
          error={error}
          loading={loading}
        />
      </FunctionalWrap>

      <SundayMaple eventData={eventData} loading={loading} error={error} />
      {isSunday && (
        <ScrollTopButton onClick={scrollToTop}>
          <ToTopIcon
            onClick={scrollToTop}
            src={theme === "dark" ? dark_to_top_icon : light_to_top_icon}
            alt="to-top-icon"
          />
        </ScrollTopButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 101vh;
  justify-content: space-between;
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

const FunctionalWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ScrollTopButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 70px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.toggleBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  color: ${({ theme }) => theme.toggleColor};
  border-radius: 5px;
  cursor: pointer;
  z-index: 99999;

  @media screen and (max-width: 768px) {
    width: 32px;
    height: 32px;
    bottom: 30px;
  }
`;

const ToTopIcon = styled.img`
  width: 32px;
  height: 32px;

  @media screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
