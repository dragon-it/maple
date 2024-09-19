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

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <BackgroundImage />
      <Container>
        <Router>
          <Header />
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
            <Route path="/find-main/:Name" element={<FindMain />} />
            <Route path="/search-guild/:Name" element={<SearchGuild />} />
            <Route path="/sunday-maple" element={<SundayMaple />} />
            <Route
              path="*"
              element={<Error errorMessage="페이지를 찾을 수 없습니다." />}
            />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  position: relative;
`;
