// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3ezDIETu0PNMToVUh4KHJKgoj8mOoKIE",
  authDomain: "world-of-pengs-game.firebaseapp.com",
  projectId: "world-of-pengs-game",
  storageBucket: "world-of-pengs-game.appspot.com",
  messagingSenderId: "797058991355",
  appId: "1:797058991355:web:ffc73375f23e08c4609c5e",
  measurementId: "G-1Q361VJ6H4",
};

export const initFirebase = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return { app, analytics };
};
