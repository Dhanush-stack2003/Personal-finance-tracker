// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh5LnP0xkrczaJEhjLEOoJjifPWFqw7ls",
  authDomain: "mern-finance-tracker.firebaseapp.com",
  projectId: "mern-finance-tracker",
  storageBucket: "mern-finance-tracker.firebasestorage.app",
  messagingSenderId: "493746218976",
  appId: "1:493746218976:web:c80abbb497113e22bc6d85",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
