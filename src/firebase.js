import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"; 

console.log("Firebase initialized successfully");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQPjMvfDrIM3EGlVotgjkghC1gCby6LwA",
  authDomain: "rick-and-morty-app-37514.firebaseapp.com",
  projectId: "rick-and-morty-app-37514",
  storageBucket: "rick-and-morty-app-37514.appspot.com",
  messagingSenderId: "208685452365",
  appId: "1:208685452365:web:936c1edc042e52e662a004",
  measurementId: "G-2FM7T4WWDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);

export { db, auth };

console.log(auth);