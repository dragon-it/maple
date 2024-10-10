import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/Main.jsx";
import { User } from "./pages/User.jsx";
import styled from "styled-components";
import { ThemeProvider } from "./context/ThemeProvider.js";
import { GlobalStyle } from "./components/theme/GlobalStyles.js";
import { Error } from "./pages/Error.jsx";
import { Header } from "./components/common/header/Header.jsx";
import { BackgroundImage } from "./components/main/BackgroundImage";

import { SearchGuild } from "./pages/SearchGuild";
import { SundayMaple } from "./pages/SundayMaple";
import { Footer } from "./components/common/footer/Footer";
import { CharacterCapture } from "./pages/CharacterCapture";

function Layout({ children }) {
  return (
    <HeaderContentsWrap>
      <Header />
      {children}
    </HeaderContentsWrap>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Router>
          <BackgroundImage />
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
                  <User />
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
              path="/sunday-maple"
              element={
                <Layout>
                  <SundayMaple />
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
          <Footer />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContentsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
