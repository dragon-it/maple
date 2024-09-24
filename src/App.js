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
import { FindMain } from "./pages/FindMain";
import { SearchGuild } from "./pages/SearchGuild";
import { SundayMaple } from "./pages/SundayMaple";
import { Footer } from "./components/common/footer/Footer";

const UserContainer = styled.div``;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Router>
          <BackgroundImage />
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            {/* /find-main 경로에서 characterName이 없는 경우 처리 */}
            <Route path="/find-main" element={<FindMain />} />
            <Route path="/find-main/:characterName" element={<FindMain />} />
            <Route
              path="/user/:characterName"
              element={
                <UserContainer>
                  <User />
                </UserContainer>
              }
            />
            <Route path="/guild-search" element={<SearchGuild />} />
            <Route path="/sunday-maple" element={<SundayMaple />} />
            <Route
              path="*"
              element={<Error errorMessage="페이지를 찾을 수 없습니다." />}
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
