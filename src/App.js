import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import { User } from './pages/User';
import { Footer } from './components/common/Footer';
import { BackgroundImage } from './components/main/BackgroundImage';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:characterName" element={<User />} />
        </Routes>
        <BackgroundImage />
        <Footer />
      </Router>
    </Container>
  );
}


export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`