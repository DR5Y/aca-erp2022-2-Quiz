// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const questions = require ("../data/questions.json");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2O1QSCWjVSFHeWAi2IFVsgnHiSEdid5Y",
  authDomain: "aca-quiz-web.firebaseapp.com",
  projectId: "aca-quiz-web",
  storageBucket: "aca-quiz-web.firebasestorage.app",
  messagingSenderId: "1002098207982",
  appId: "1:1002098207982:web:6fdc2dec03c4b5141657ff"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const importQuestions = async () => {
  for (const q of questions) {
    await addDoc(collection(db, "quizQuestions"), q);
    console.log(`Imported: ${q.question}`);
  }
};

importQuestions().then(() => {
  console.log("All questions imported.");
  process.exit(0);
});
