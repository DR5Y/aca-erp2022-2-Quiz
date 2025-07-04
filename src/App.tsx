import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './aca.png';
import './App.css';
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import QuizPage from './QuizPage';
import ResultsPage from "./ResultsPage";
import { db } from './firebase-config';
import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { timeStamp } from 'console';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
