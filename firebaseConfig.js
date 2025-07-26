// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTRReo5jv4TYhhErGn64xmJVeJaVRfMT4",
  authDomain: "visit-planner-f4aed.firebaseapp.com",
  projectId: "visit-planner-f4aed",
  storageBucket: "visit-planner-f4aed.firebasestorage.app",
  messagingSenderId: "495421610257",
  appId: "1:495421610257:web:e765da7f1cd2c7aeef54b0",
  measurementId: "G-QR9W4ZWCBN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };