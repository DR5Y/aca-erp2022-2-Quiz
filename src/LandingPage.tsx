import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import "./App.css";

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    setActiveSection("about");
                } else {
                    setActiveSection("home");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="landing">
            <nav className="navbar">
                <div className="logo">AfricaCodeAcademy</div>
                <div className="nav-links">
                    <a href="/src/LandingPage.tsx" className={activeSection === "home" ? "active" : ""}>Home</a>
                    <a href="#about" className={activeSection === "about" ? "active" : ""}>About</a>
                    <a href="/login" className="">SignIn</a>
                    <a href="/src" className="">Admin</a>
                </div>
            </nav>

            <section className="hero">
                <h1>Welcome to <span>AfricaCodeAcademy</span></h1>
                <p>Test your knowledge with our interactive tech quizzes</p>
                <button onClick={() => navigate("/login")}>Start Quiz</button>
            </section>

            <section id="about" className="about-section">
                <h2 className="section-title">About Us</h2>
                <div className="about-content">
                    <p>AfricaCodeAcademy is a leading tech education platform dedicated to empowering African developers with cutting-edge skills and knowledge.</p>
                    <p>Our quiz portal is designed to help you test your understanding of various programming concepts and prepare for technical interviews.</p>
                    <p>Join our community of passionate learners and take your coding skills to the next level!</p>
                </div>
            </section>

            <footer className="footer">
                <div className="copyright">
                    QuizWeb was Developed by Lefika Andrew Setuke 2025
                </div>
                <div className="social-icons">
                    <a href="linkedin.com" className="social-icon"><FaLinkedin /></a>
                    <a href="twitter.com" className="social-icon"><FaTwitter /></a>
                    <a href="instagram.com" className="social-icon"><FaInstagram /></a>
                    <a href="gmail.com" className="social-icon"><FaEnvelope /></a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;