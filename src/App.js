import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import React from 'react';

import './App.css';
import { Search } from './components/main/Search';

function App() {
  return (
    <div className="App">
        <Header/>
        <Search/>
        <Footer/>
    </div>
  );
}




export default App;

