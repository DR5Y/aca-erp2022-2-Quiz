import React, { useState } from "react";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate("/quiz");
        }   catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h1>{isRegister ? "Register" : "Login"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                />
                <button type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Already have an account? Login" : "Dont have an account? Register"}
            </button>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    );
};

export default LoginPage;