// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaFUTKy-ZUR0xAmVn3CIJFUVyA2XSVPis",
  authDomain: "cabeleireiro2025-a3fe5.firebaseapp.com",
  projectId: "cabeleireiro2025-a3fe5",
  storageBucket: "cabeleireiro2025-a3fe5.firebasestorage.app",
  messagingSenderId: "520160015436",
  appId: "1:520160015436:web:10d435d57dcff1608bb0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);