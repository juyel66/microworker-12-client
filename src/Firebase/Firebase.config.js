// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDArjbDXn8z4ZShpzYZfts1TBWn5G5-Qw4",
  authDomain: "assignment-12-a9d5d.firebaseapp.com",
  projectId: "assignment-12-a9d5d",
  storageBucket: "assignment-12-a9d5d.appspot.com",
  messagingSenderId: "887173212482",
  appId: "1:887173212482:web:6d80e3718d4264c96a00db"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

