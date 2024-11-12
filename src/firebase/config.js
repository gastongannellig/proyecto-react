// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh7N6FKalmn8adKmdTggx2Uipzf5LyyBc",
  authDomain: "coderhouse-tueshop.firebaseapp.com",
  projectId: "coderhouse-tueshop",
  storageBucket: "coderhouse-tueshop.firebasestorage.app",
  messagingSenderId: "1023293092546",
  appId: "1:1023293092546:web:a0720fe47c1ada74cb015b",
  measurementId: "G-M8BWK8EJCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
