import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';

import CreatePoll from './pages/CreatePoll';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PollPage from './pages/PollPage'; // импорт новой страницы голосования по id

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vote/:id" element={<PollPage />} /> {/* маршрут голосования по id */}
      </Routes>
    </Router>
  );
};

export default App;
