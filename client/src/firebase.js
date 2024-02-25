// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codezilla-oauth.firebaseapp.com",
  projectId: "codezilla-oauth",
  storageBucket: "codezilla-oauth.appspot.com",
  messagingSenderId: "529804770645",
  appId: "1:529804770645:web:3f85cf58d5e85e6af943dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
