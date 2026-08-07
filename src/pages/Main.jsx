import React, { useRef, useState, useEffect } from "react";
import { Search } from "../components/main/Search";
import styled from "styled-components";
import { Favorite } from "../components/user/favorite/Favorite";
import { SundayMaple } from "../components/main/SundayMaple";
import { Helmet } from "react-helmet-async";
import { InfoPanel } from "../components/main/InfoPanel";
import { Footer } from "../components/common/footer/Footer";
import { useNoticeEvent } from "../context/NoticeEventContext";
import logoMain from "../assets/logos/Logo.svg";
import { ChevronUp } from "lucide-react";

export const Main = () => {
  const { eventData, noticeData, loading, error } = useNoticeEvent();
  const containerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // 메인 로고 사전 로딩 (Preload)
    const img = new Image();
    img.src = logoMain;

    const onScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container ref={containerRef}>
      <Helmet>
        <title>{`메짱`}</title>
        <meta
          name="description"
          content="메이플스토리 캐릭터 검색사이트 메짱입니다."
        />
        <link rel="preload" href={logoMain} as="image" type="image/svg+xml" />
      </Helmet>
      <FunctionalWrap>
        <HeroBranding>
          <SubHeading>MapleStory Search & Utility</SubHeading>
          <HeroLogo src={logoMain} alt="메짱" fetchpriority="high" />
          <DescriptionText>
            인게임 감성 그대로, 가장 쉽고 빠른 메이플 검색
          </DescriptionText>
        </HeroBranding>
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

      <ScrollTopButton
        onClick={scrollToTop}
        $visible={showScrollTop}
        aria-label="맨 위로 이동"
      >
        <ChevronUp size={22} />
      </ScrollTopButton>

      <Footer />
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
  max-width: 100%;
  box-sizing: border-box;
  min-height: 100px;
`;

const FavoriteWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  height: auto;
  z-index: 50;
`;

const FunctionalWrap = styled.div`
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 80px;
  box-sizing: border-box;
`;

const HeroBranding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
`;

const SubHeading = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  `;

const HeroLogo = styled.img`
  height: 112px;
  width: auto;
  filter: drop-shadow(0 6px 24px rgba(0, 0, 0, 0.4));

  @media screen and (max-width: 768px) {
    height: 80px;
  }
`;

const DescriptionText = styled.p`
  margin: 16px 0 0 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);

  @media screen and (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--foreground, #ffffff);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(20px)")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  &:hover {
    transform: ${({ $visible }) => ($visible ? "translateY(0) scale(1.08)" : "translateY(20px)")};
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
`;
