import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing">
            <h1>Welcome to ACA Quiz Portal</h1>
            <button onClick={() => navigate("/login")}>Start Quiz</button>
        </div>
    );
};

export default LandingPage;