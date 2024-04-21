import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import { User } from './pages/User';
import { Footer } from './components/common/Footer';
import { BackgroundImage } from './components/main/BackgroundImage';
import styled from 'styled-components';
import { ThemeProvider } from './context/ThemeProvider';
import ThemeToggleButton from './context/ThemeToggleButton';
import { GlobalStyle } from './components/theme/GlobalStyles';



const UserContainer = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
              path="/user"
              element={
                <UserContainer>
                  <User />
                </UserContainer>
              }
            />
            <Route
              path="/user/:characterName"
              element={
                <UserContainer>
                  <User />
                </UserContainer>
              }
            />
          </Routes>
          <BackgroundImage />
          <Footer />
        </Router>
        <ThemeToggleButton />
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  position: relative;
`;
