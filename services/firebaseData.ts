import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyBEPPyhu9UZ-mbQZSez8TTkStTqGjLwnVw",
  authDomain: "nvchinh-538be.firebaseapp.com",
  databaseURL: "https://nvchinh-538be-default-rtdb.firebaseio.com",
  projectId: "nvchinh-538be",
  storageBucket: "nvchinh-538be.appspot.com",
  messagingSenderId: "965111430712",
  appId: "1:965111430712:web:20cd1f750f7b910232f0cd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

