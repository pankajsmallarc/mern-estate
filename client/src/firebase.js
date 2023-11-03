// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADFWiX2rSfUZWprboGBVBs0zNNbkqfQQQ",
  // apiKey: import.meta.VITE_FIREBASE_API_KET,
  authDomain: "mern-estate-1ea16.firebaseapp.com",
  projectId: "mern-estate-1ea16",
  storageBucket: "mern-estate-1ea16.appspot.com",
  messagingSenderId: "595704350297",
  appId: "1:595704350297:web:d7c4d50e278a26d4691348"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);