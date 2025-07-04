import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state as { score: number; total: number };

  return (
    <div className="results-container">
      <h2>🎉 Congratulations! 🎉</h2>
      <p>You completed the quiz!</p>
      <h3>Your score: {score} / {total}</h3>
      <h3>Percentage: {((score / total) * 100).toFixed(2)}%</h3>
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default ResultsPage;
