import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreatePoll from './pages/CreatePoll';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PollPage from './pages/PollPage';

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/voting-platform' : '/';


  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vote/:id" element={<PollPage />} />
      </Routes>
    </Router>
  );
};

export default App;
