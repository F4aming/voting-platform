import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePoll from './pages/CreatePoll';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PollPage from './pages/PollPage';
import PollCreator from './pages/PollCreator';
import PollViewer from './pages/PollViewer';

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/voting-platform' : '/';


  return (
    <Router basename="/voting-platform">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/create-vote" element={<PollCreator />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vote/:id" element={<PollPage />} />
        <Route path="/poll/:id" element={<PollViewer />} />
      </Routes>
    </Router>
  );
};
export default App;
