// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);