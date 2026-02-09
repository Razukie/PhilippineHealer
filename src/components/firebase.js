// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPyFrlr9Por_JWrtXyZO9RrMhh_gG5u9E",
  authDomain: "ncmfapps.firebaseapp.com",
  databaseURL: "https://ncmfapps-default-rtdb.firebaseio.com",
  projectId: "ncmfapps",
  storageBucket: "ncmfapps.appspot.com",
  messagingSenderId: "514879909921",
  appId: "1:514879909921:web:d5fd68a1c8b801a3773360"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
// Initialize Realtime Database and export
export const rtdb = getDatabase(app);

// Optional: export app itself if you need it
export default app;
