import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN8CUNI9rhpATs-9gMSswuAlutLfpsmYg",
  authDomain: "blogging-app-31aaf.firebaseapp.com",
  projectId: "blogging-app-31aaf",
  storageBucket: "blogging-app-31aaf.firebasestorage.app",
  messagingSenderId: "865151856886",
  appId: "1:865151856886:web:592aa4d437f365a6597cd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
