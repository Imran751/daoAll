import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { writeFile } from "fs";
import { promisify } from "util";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbDcEc6stPu2jumcUi50LspIoNoJwOHG0",
  authDomain: "ppsc-pre.firebaseapp.com",
  projectId: "ppsc-pre",
  storageBucket: "ppsc-pre.firebasestorage.app",
  messagingSenderId: "1017974693436",
  appId: "1:1017974693436:web:a34ed30a0d09045f76ad39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Promisify writeFile for async/await
const writeFileAsync = promisify(writeFile);

// Function to download and save quiz data
const downloadQuizData = async () => {
  try {
    const quizCollectionRef = collection(db, "quizzes");
    const snapshot = await getDocs(quizCollectionRef);
    
    const quizData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Save data as JSON
    await writeFileAsync("quizData.json", JSON.stringify(quizData, null, 2));

    console.log("Quiz data downloaded and saved as 'quizData.json'");
  } catch (error) {
    console.error("Error downloading quiz data: ", error);
  }
};

downloadQuizData();
