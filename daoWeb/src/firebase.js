

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwSFz72Enl8GGN4sgssvsnSCGAwWOk3-g",
  authDomain: "daoall.firebaseapp.com",
  projectId: "daoall",
  storageBucket: "daoall.firebasestorage.app",
  messagingSenderId: "75608549350",
  appId: "1:75608549350:web:ee505f8413c4b5c9d4d827"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
