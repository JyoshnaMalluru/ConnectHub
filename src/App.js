import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FeedPage from './pages/FeedPage';
import TrendingPage from './pages/TrendingPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const moveCard = () => {};

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<FeedPage moveCard={moveCard} searchTerm={searchTerm} />} />
              <Route path="/trending" element={<TrendingPage moveCard={moveCard} />} />
              <Route path="/favorites" element={<FavoritesPage moveCard={moveCard} />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
