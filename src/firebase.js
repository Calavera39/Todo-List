// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoYtJgbFAmOOcqQKS514liIrKfHmUQ72U",
  authDomain: "todo-8a5d7.firebaseapp.com",
  projectId: "todo-8a5d7",
  storageBucket: "todo-8a5d7.appspot.com",
  messagingSenderId: "691390335072",
  appId: "1:691390335072:web:46ff2564f1b6f4d3629b05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app);