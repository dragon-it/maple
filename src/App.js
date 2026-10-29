import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Main } from "./pages/Main.jsx";
import styled from "styled-components";
import { ThemeProvider } from "./context/ThemeProvider.js";
import { GlobalStyle } from "./components/theme/GlobalStyles.js";
import { Error } from "./pages/Error.jsx";
import { BackgroundImage } from "./components/main/BackgroundImage";
import { SearchGuild } from "./pages/SearchGuild";
import { CharacterCapture } from "./pages/CharacterCapture";
import { RandomClass } from "./pages/RandomClass";
import { ExpSimulator } from "./pages/ExpSimulator";
import { SlidingPuzzle } from "./pages/SlidingPuzzle";
import { Checklist } from "./pages/Checklist";
import Layout from "./Layout";
import { UserPage } from "./pages/UserPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

function App() {
  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    let padding = body.style.paddingBottom;
    let priority = body.style.getPropertyPriority("padding-bottom");

    const moveAdPadding = () => {
      const nextPadding = body.style.paddingBottom;
      const nextPriority = body.style.getPropertyPriority("padding-bottom");

      // 적용한 0px은 무시함. 다른 body 스타일 변경에도 광고 여백을 유지함
      if (nextPadding === "0px" && nextPriority === "important") return;

      padding = nextPadding;
      priority = nextPriority;
      root.style.setProperty("--adsense-footer-safe-area", padding || "0px");

      // 직접 변경하는 동안 감지를 끊어 자기 변경을 다시 처리하지 않음
      observer.disconnect();
      body.style.setProperty("padding-bottom", "0px", "important");
      observer.observe(body, { attributes: true, attributeFilter: ["style"] });
    };

    const observer = new MutationObserver(moveAdPadding);
    observer.observe(body, { attributes: true, attributeFilter: ["style"] });
    moveAdPadding();

    return () => {
      observer.disconnect();
      // 마지막으로 광고가 지정했던 값을 복원함 (StrictMode 재실행 포함)
      if (padding) body.style.setProperty("padding-bottom", padding, priority);
      else body.style.removeProperty("padding-bottom");
      root.style.removeProperty("--adsense-footer-safe-area");
    };
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Container>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Main />
                  </Layout>
                }
              />
              <Route
                path="/character-capture"
                element={
                  <Layout>
                    <CharacterCapture />
                  </Layout>
                }
              />
              <Route
                path="/character-capture/:characterName"
                element={
                  <Layout>
                    <CharacterCapture />
                  </Layout>
                }
              />
              <Route
                path="/user/:characterName"
                element={
                  <Layout>
                    <UserPage />
                  </Layout>
                }
              />
              <Route
                path="/guild-search"
                element={
                  <Layout>
                    <SearchGuild />
                  </Layout>
                }
              />
              <Route
                path="/guild-search/:guildName"
                element={
                  <Layout>
                    <SearchGuild />
                  </Layout>
                }
              />
              <Route
                path="/guild-search/:guildName/:worldName"
                element={
                  <Layout>
                    <SearchGuild />
                  </Layout>
                }
              />
              <Route
                path="/random-class"
                element={
                  <Layout>
                    <RandomClass />
                  </Layout>
                }
              />
              <Route
                path="/exp-simulator"
                element={
                  <Layout>
                    <ExpSimulator />
                  </Layout>
                }
              />
              <Route
                path="/checklist"
                element={
                  <Layout>
                    <Checklist />
                  </Layout>
                }
              />
              <Route
                path="/sliding-puzzle"
                element={
                  <Layout>
                    <SlidingPuzzle />
                  </Layout>
                }
              />
              <Route
                path="/privacy"
                element={
                  <Layout>
                    <PrivacyPolicy />
                  </Layout>
                }
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <Error errorMessage="페이지를 찾을 수 없습니다." />
                  </Layout>
                }
              />
            </Routes>
            <BackgroundImage />
          </Router>
        </Container>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
