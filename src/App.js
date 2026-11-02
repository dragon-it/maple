import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Main } from "./pages/Main.jsx";
import styled from "styled-components";
import { ThemeProvider } from "./context/ThemeProvider.js";
import { GlobalStyle } from "./components/theme/GlobalStyles.js";
import { MapleCursor } from "./components/common/MapleCursor";
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
    const paddingProperties = ["padding-top", "padding-bottom"];
    const previousPadding = new Map();

    const clearAdPadding = () => {
      // 광고가 상단 또는 하단에 붙을 때 body에 넣는 여백을 각각 확인함
      // 이미 처리한 방향 때문에 다른 방향의 여백 처리가 생략되지 않게 함
      const changed = paddingProperties.filter((property) =>
        body.style.getPropertyValue(property) !== "0px" ||
        body.style.getPropertyPriority(property) !== "important"
      );
      if (changed.length === 0) return;

      // 직접 변경하는 동안 감지를 끊어 자기 변경을 다시 처리하지 않음
      observer.disconnect();
      changed.forEach((property) => {
        previousPadding.set(property, {
          value: body.style.getPropertyValue(property),
          priority: body.style.getPropertyPriority(property),
        });
        body.style.setProperty(property, "0px", "important");
      });
      observer.observe(body, { attributes: true, attributeFilter: ["style"] });
    };

    const observer = new MutationObserver(clearAdPadding);
    observer.observe(body, { attributes: true, attributeFilter: ["style"] });
    clearAdPadding();

    return () => {
      observer.disconnect();
      // 마지막으로 광고가 지정했던 값을 복원함 (StrictMode 재실행 포함)
      previousPadding.forEach(({ value, priority }, property) => {
        if (value) body.style.setProperty(property, value, priority);
        else body.style.removeProperty(property);
      });
    };
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <GlobalStyle />
        <MapleCursor />
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
