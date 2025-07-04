import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

const QuizPage = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  //fetching questions from firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try{
        const querySnapshot = await getDocs(collection(db, "questions"));
        const qArray: Question[] = [];
        querySnapshot.forEach(doc => {
          qArray.push({ id: doc.id, ...doc.data() } as Question);
        });
        setQuestions(qArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionChange = (index: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [index]: option }));
  };

  const handleSubmit = async () => {
    let tempScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) tempScore++;
    });
  
    if (user) {
      //saving result to firestore under user ID
      await addDoc(collection(db, "quizResults"), {
        userId: user.uid,
        email: user.email,
        score: tempScore,
        total: questions.length,
        timestamp: new Date()
      });
    }  

    navigate("/results", { state: { score: tempScore, total: questions.length } });
  };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="quiz-container">
      <h2>Welcome, {user?.email}</h2>

      {currentQuestions.map((q, idx) => {
        const realIndex = startIndex + idx;
        return (
          <div key={q.id} className="question-container">
            <h3>{realIndex + 1}. {q.question}</h3>
            <div className="options-container">
              {q.options.map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`q${realIndex}`}
                    value={option}
                    checked={userAnswers[realIndex] === option}
                    onChange={() => handleOptionChange(realIndex, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <hr />
          </div>
        );
      })}

      <div className="navigation-buttons">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0}>Previous</button>
        {currentPage < totalPages - 1 ? (
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
