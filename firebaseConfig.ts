import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase config
export const firebaseConfig = {       // 🔥 thêm chữ "export" ở đây
  apiKey: "AIzaSyBEPPyhu9UZ-mbQZSez8TTkStTqGjLwnVw",
  authDomain: "nvchinh-538be.firebaseapp.com",
  projectId: "nvchinh-538be",
  storageBucket: "nvchinh-538be.firebasestorage.app",
  messagingSenderId: "965111430712",
  appId: "1:965111430712:web:20cd1f750f7b910232f0cd",
  measurementId: "G-8L6RHQ0CBG"
};

const app = initializeApp(firebaseConfig);

// 🔐 Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app);
