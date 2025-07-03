import React, { useState } from 'react';
import logo from './aca.png';
import './App.css';


type Question = {
  question: string,
  options: string[],
  answer: string,
};

const questions: Question[] = [
  {
    question: 'What Git command do I use when I want to combine my newly developed code to an existing code in my repository?',
    options: ["Commit", "Merge", "Pull", "Push"],
    answer: "Merge",
  },
  {
    question: 'What command initializes a new Gitrepository?',
    options: ["git init", "git start", "git new", "git create"],
    answer: "git init"
  },
  {
    question: 'How do you check the status of files in your Git repository?',
    options: ["git check", "git status", "git log", "git show"],
    answer: "git status"
  },
  {
    question: 'What command shows your commit history?',
    options: ["git history", "git status", "git log", "git commits"],
    answer: "git log"
  },
];

function App() {
  //state to score the users score.
  const [score, setScore] = useState<number | null>(null);
  //state to score the users selected answers as a object with key=index and value=selected option
  const [userAnswers, setUserAnswers] = useState<{[key:number]: string}>({});

  const handleOptionChange = (index: number, option: string) => {
    setUserAnswers(prev => ({...prev, [index]: option}));
  };

  //function to calculate and set the users final score upon submitting the quiz
  const submitQuiz = () => {
    let tempScore = 0; //this is going to be my temporary score counter
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        tempScore++;
    }
  });
  setScore(tempScore);
};


  return (
    <div className="App">
      <h1>ACA Multiple Choice Quiz</h1>
      <header className="App-header">
        <img src={logo} style={{maxWidth:150, maxHeight:150}} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://africacode.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          I Love ACA
        </a>
      
        <form>
          {questions.map((q, index) => (
            <div key={index}>
              <h3>{index + 1}. {q.question}</h3>
              {q.options.map(option => (
                <label key={option}>
                  <input
                  type="radio"
                  name={`q${index}`} //to ensure options are grouped per question
                  value={option
                  checked={userAnswers[index] === option} //set as checked if userAnswers match
                  onChange={() => handleOptionChange(index, option)}
                  />
                  {option}
                </label>
              ))}
              <hr/>
            </div>
          ))}
        </form>
      </header>

      <button onClick={submitQuiz}>Submit</button>
      {score !== null && (
        <div>
        <h2>Your score: {score} / {questions.length}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
