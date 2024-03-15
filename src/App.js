import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { Main } from './pages/Main';
import { User } from './pages/User';
import { Footer } from './components/common/Footer';
import { BackgroundImage } from './components/main/BackgroundImage';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from './components/context/themeProvider';
import ThemeToggle from './components/theme/ThemeToggle';

const UserContainer = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// QueryClient 인스턴스를 외부에서 생성
const queryClient = new QueryClient();

function App() {
  const [themeMode, toggleTheme] = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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
            <ThemeToggle toggle={toggleTheme} mode={themeMode}>
              DarkMode
            </ThemeToggle>
          </Router>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
`;
