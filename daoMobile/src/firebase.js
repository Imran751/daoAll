import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, getAuth, initializeAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwSFz72Enl8GGN4sgssvsnSCGAwWOk3-g",
  authDomain: "daoall.firebaseapp.com",
  projectId: "daoall",
  storageBucket: "daoall.firebasestorage.app",
  messagingSenderId: "75608549350",
  appId: "1:75608549350:web:ee505f8413c4b5c9d4d827"
};

// Initialize Firebase App
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Auth with React Native persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized, use the existing auth instance
  if (e.code === "auth/already-initialized") {
    auth = getAuth(app);
  } else {
    throw e; // Re-throw any other errors
  }
}

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
