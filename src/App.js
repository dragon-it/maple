import React from "react";
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
import Layout from "./Layout";
import { UserPage } from "./pages/UserPage";

function App() {
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
                path="/sliding-puzzle"
                element={
                  <Layout>
                    <SlidingPuzzle />
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
