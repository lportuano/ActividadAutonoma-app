import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6cFVE7fNzHEwYQjQoS77R7EOPCKf49qc",
  authDomain: "autonoma-app-77747.firebaseapp.com",
  projectId: "autonoma-app-77747",
  storageBucket: "autonoma-app-77747.firebasestorage.app",
  messagingSenderId: "937466554365",
  appId: "1:937466554365:web:7db705a72a3a0f90245b94"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);