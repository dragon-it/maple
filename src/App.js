import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/Main.jsx";
import { User } from "./pages/User.jsx";
import BackImg from "./assets/Kerning-City.webp";
import styled from "styled-components";
import { ThemeProvider } from "./context/ThemeProvider.js";
import { GlobalStyle } from "./components/theme/GlobalStyles.js";
import { Error } from "./pages/Error.jsx";
import { Header } from "./components/common/header/Header.jsx";

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    padding: 20px;
  }

  @media screen and (max-width: 576px) {
    padding: 5px;
  }
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Header />
        <Router>
          {/* AppContainer를 Routes 바깥에 위치 */}
          <AppContainer>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/user/:characterName"
                element={
                  <UserContainer>
                    <User />
                  </UserContainer>
                }
              />
              <Route
                path="*"
                element={<Error errorMessage="페이지를 찾을 수 없습니다." />}
              />
            </Routes>
          </AppContainer>
        </Router>
        {/* <BackgroundImage /> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

// 배경 이미지 스타일이 적용된 컨테이너
const AppContainer = styled.div`
  height: auto;
  width: 100%;
  position: fixed;
  background-image: url(${BackImg}); /* 이미지 경로를 변수로 설정 */
  background-size: cover; /* object-fit: cover 대신 사용 */
  background-position: center; /* 이미지 중앙에 배치 */
  background-repeat: no-repeat;
  min-height: 100vh; /* 이미지가 최소 높이를 유지 */
`;
