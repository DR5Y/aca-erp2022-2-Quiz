import React, { useState } from 'react';
import logo from './aca.png';
import './App.css';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: 'What Git command do I use when I want to combine my newly developed code to an existing code in my repository?',
    options: ["Commit", "Merge", "Pull", "Push"],
    answer: "Merge",
  },
  {
    question: 'What command initializes a new Git repository?',
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
  {
    question: 'Which command clones a repository from Github?',
    options: ["git download URL", "git clone URL", "git fetch URL", "git copy URL"],
    answer: "git clone URL"
  },
  {
    question: 'What command creates a new branch?',
    options: ["git new branchName", "git branch branchName", "git create branch branchName", "git checkout branchName"],
    answer: "git branch branchName"
  },
  {
    question: 'How do you push commits to Github?',
    options: ["git push", "git commit", "git pull", "git fetch"],
    answer: "git push"
  },
  {
    question: 'What command removes a file from your repository?',
    options: ["git delete", "git remove", "git rm", "git delete file"],
    answer: "git rm"
  },
  {
    question: 'How do you create a new repository on Github via terminal?',
    options: ["git create repository", "git new repository", "git init repository", "gh repo create"],
    answer: "gh repo create"
  },
  {
    question: 'How do you remane a branch?',
    options: ["git remane branchName newBranchName", "git branch -m oldName newName", "git switch newName", "git change branch newName"],
    answer: "git branch -m oldName newName"
  },
  {
    question: 'Which command initializes a new Node project?',
    options: ["npm init", "npm start", "npm install", "npm create"],
    answer: "npm init"
  },
  {
    question: 'How do you install a package in your Node project?',
    options: ["npm install package", "npm add package", "npm use package", "npm get package"],
    answer: "npm install package"
  },
  {
    question: 'How do you start a Node project?',
    options: ["npm start", "npm run start", "npm init", "npm install"],
    answer: "npm start"
  },
];

function App() {
  const [score, setScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const handleOptionChange = (index: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [index]: option }));
  };

  const submitQuiz = () => {
    let tempScore = 0;
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
        <img src={logo} style={{ maxWidth: 150, maxHeight: 150 }} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://africacode.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        
        </a>

        <form>
          {questions.map((q, index) => (
            <div key={index}>
              <h3>{index + 1}. {q.question}</h3>
              {q.options.map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                  />
                  {option}
                </label>
              ))}
              <hr />
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
