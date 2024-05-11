import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import { User } from './pages/User';
import { BackgroundImage } from './components/main/BackgroundImage';
import styled from 'styled-components';
import { ThemeProvider } from './context/ThemeProvider';
import ThemeToggleButton from './context/ThemeToggleButton';
import { GlobalStyle } from './components/theme/GlobalStyles';
import { Error } from './pages/Error';
import { Analytics } from "@vercel/analytics/react"


const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media screen and (max-width:767px) {
    padding: 20px;
  }

  @media screen and (max-width:576px) {
    padding: 5px;
  }
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Router>
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
              <Route path="*" element={<Error errorMessage="페이지를 찾을 수 없습니다."  />} /> 
          </Routes>
          <BackgroundImage />
        </Router>
        <ThemeToggleWrap>
          <ThemeToggleButton /> 
        </ThemeToggleWrap>
      </Container>
      <Analytics/>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  position: relative;
`;


const ThemeToggleWrap = styled.div`
  @media screen and (max-width:767px){
    display: none;
  }

`