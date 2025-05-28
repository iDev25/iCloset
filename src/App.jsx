import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Closet from './pages/Closet';
import OutfitCreator from './pages/OutfitCreator';
import OutfitDetails from './pages/OutfitDetails';
import Favorites from './pages/Favorites';
import History from './pages/History';
import StyleQuiz from './pages/StyleQuiz';
import { ClosetProvider } from './context/ClosetContext';

function App() {
  return (
    <ClosetProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/closet" element={<Closet />} />
            <Route path="/outfit-creator" element={<OutfitCreator />} />
            <Route path="/outfit/:id" element={<OutfitDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/style-quiz" element={<StyleQuiz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ClosetProvider>
  );
}

export default App;
