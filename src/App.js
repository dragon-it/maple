import React, { useState, useEffect } from "react";
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
import { Footer } from "./components/common/footer/Footer";
import { CharacterCapture } from "./pages/CharacterCapture";
import { RandomClass } from "./pages/RandomClass";
import { ExpSimulator } from "./pages/ExpSimulator";
import { SlidingPuzzle } from "./pages/SlidingPuzzle";
import { Notice } from "./components/common/header/Notice";
import axios from "axios";

function Layout({ children }) {
  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("/notice-event", {
          headers: {
            "x-nxopen-api-key": process.env.REACT_APP_API_KEY,
          },
        });
        if (response.status === 200) {
          setNoticeData(response.data);
        } else {
          console.error(
            "현재 API 호출이 원활하지 않습니다. 잠시 후 다시 시도해주세요."
          );
          setError(
            "현재 API 호출이 원활하지 않습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } catch (err) {
        console.error("공지 데이터 가져오기 오류:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, []);

  return (
    <>
      <HeaderContentsWrap>
        <Header />
        <Notice noticeData={noticeData} isSunday={new Date().getDay() === 0} />
      </HeaderContentsWrap>
      {React.cloneElement(children, { noticeData, loading, error })}
    </>
  );
}

function App() {
  return (
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
                  <UserWrap>
                    <User />
                  </UserWrap>
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
  min-height: 100vh;
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
`;

const UserWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
