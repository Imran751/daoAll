import { collection, addDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDbDcEc6stPu2jumcUi50LspIoNoJwOHG0",
  authDomain: "ppsc-pre.firebaseapp.com",
  projectId: "ppsc-pre",
  storageBucket: "ppsc-pre.firebasestorage.app",
  messagingSenderId: "1017974693436",
  appId: "1:1017974693436:web:a34ed30a0d09045f76ad39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample quiz data
const quizData = [
  {
    "question": "Which country is known as the 'Land of the Long White Cloud'?",
    "category": "General Knowledge",
    "options": [
      "Australia",
      "New Zealand",
      "Ireland",
      "Canada"
    ],
    "answer": "New Zealand",
    "details": "New Zealand is known as the 'Land of the Long White Cloud' due to the Māori name 'Aotearoa' and the frequent presence of clouds over the country."
  },
  {
    "question": "Which is the largest island in the world?",
    "category": "General Knowledge",
    "options": [
      "Greenland",
      "Australia",
      "New Guinea",
      "Borneo"
    ],
    "answer": "Greenland",
    "details": "Greenland is the world's largest island, covering over 2.1 million square kilometers."
  },
  {
    "question": "Which is the longest river in Asia?",
    "category": "General Knowledge",
    "options": [
      "Yangtze River",
      "Ganges River",
      "Mekong River",
      "Yellow River"
    ],
    "answer": "Yangtze River",
    "details": "The Yangtze River, located in China, is the longest river in Asia, stretching approximately 6,300 kilometers."
  },
  {
    "question": "Which country is the world's largest producer of coffee?",
    "category": "General Knowledge",
    "options": [
      "Colombia",
      "Brazil",
      "Vietnam",
      "India"
    ],
    "answer": "Brazil",
    "details": "Brazil is the world's largest producer of coffee, contributing more than 37% of the world's coffee supply."
  },
  {
    "question": "Who is known as the 'Father of the Nation' in India?",
    "category": "General Knowledge",
    "options": [
      "Jawaharlal Nehru",
      "Mahatma Gandhi",
      "Sardar Patel",
      "Bhagat Singh"
    ],
    "answer": "Mahatma Gandhi",
    "details": "Mahatma Gandhi is known as the 'Father of the Nation' in India due to his role in leading the country to independence through nonviolent civil disobedience."
  },
  {
    "question": "Which is the smallest continent in the world?",
    "category": "General Knowledge",
    "options": [
      "Australia",
      "Europe",
      "Africa",
      "Antarctica"
    ],
    "answer": "Australia",
    "details": "Australia is the smallest continent in the world, covering an area of approximately 2.9 million square miles."
  },
  {
    "question": "Which city is known as the 'City of Lights'?",
    "category": "General Knowledge",
    "options": [
      "London",
      "New York",
      "Paris",
      "Tokyo"
    ],
    "answer": "Paris",
    "details": "Paris is often referred to as the 'City of Lights' due to its early adoption of street lighting and its bright cultural scene."
  },
  {
    "question": "What is the chemical symbol for gold?",
    "category": "General Knowledge",
    "options": [
      "Au",
      "Ag",
      "Pb",
      "Fe"
    ],
    "answer": "Au",
    "details": "The chemical symbol for gold is 'Au', derived from the Latin word 'aurum'."
  },
  {
    "question": "What is the capital of Japan?",
    "category": "General Knowledge",
    "options": [
      "Tokyo",
      "Osaka",
      "Kyoto",
      "Hiroshima"
    ],
    "answer": "Tokyo",
    "details": "Tokyo is the capital city of Japan and is one of the most populous and technologically advanced cities in the world."
  },
  {
    "question": "Which country has the highest population in the world?",
    "category": "General Knowledge",
    "options": [
      "India",
      "United States",
      "China",
      "Indonesia"
    ],
    "answer": "China",
    "details": "China has the highest population in the world, with over 1.4 billion people."
  },
  {
    "question": "Who invented the light bulb?",
    "category": "General Knowledge",
    "options": [
      "Nikola Tesla",
      "Thomas Edison",
      "Benjamin Franklin",
      "Michael Faraday"
    ],
    "answer": "Thomas Edison",
    "details": "Thomas Edison is credited with inventing the first practical electric light bulb in 1879."
  },
  {
    "question": "Which country is the largest producer of oil?",
    "category": "General Knowledge",
    "options": [
      "Saudi Arabia",
      "Russia",
      "United States",
      "China"
    ],
    "answer": "United States",
    "details": "The United States is currently the world's largest producer of oil, surpassing Saudi Arabia and Russia in production."
  },
  {
    "question": "Which element is used in the production of nuclear energy?",
    "category": "General Knowledge",
    "options": [
      "Uranium",
      "Plutonium",
      "Hydrogen",
      "Oxygen"
    ],
    "answer": "Uranium",
    "details": "Uranium is commonly used as a fuel in nuclear reactors for the generation of nuclear energy."
  },
  {
    "question": "What is the largest continent by area?",
    "category": "General Knowledge",
    "options": [
      "Asia",
      "Africa",
      "North America",
      "South America"
    ],
    "answer": "Asia",
    "details": "Asia is the largest continent by area, covering about 44.58 million square kilometers."
  },
  {
    "question": "Which city is the capital of Canada?",
    "category": "General Knowledge",
    "options": [
      "Toronto",
      "Ottawa",
      "Vancouver",
      "Montreal"
    ],
    "answer": "Ottawa",
    "details": "Ottawa is the capital city of Canada, located in the province of Ontario."
  },
  {
    "question": "Which country was the first to land a human on the Moon?",
    "category": "General Knowledge",
    "options": [
      "Soviet Union",
      "United States",
      "China",
      "India"
    ],
    "answer": "United States",
    "details": "The United States was the first country to land a human on the Moon during the Apollo 11 mission in 1969."
  },
  {
    "question": "What is the name of the world's largest ocean?",
    "category": "General Knowledge",
    "options": [
      "Atlantic Ocean",
      "Pacific Ocean",
      "Indian Ocean",
      "Arctic Ocean"
    ],
    "answer": "Pacific Ocean",
    "details": "The Pacific Ocean is the largest ocean, covering more than 63 million square miles."
  },
  {
    "question": "What is the capital of Italy?",
    "category": "General Knowledge",
    "options": [
      "Rome",
      "Milan",
      "Naples",
      "Venice"
    ],
    "answer": "Rome",
    "details": "Rome is the capital city of Italy, known for its rich history and landmarks like the Colosseum."
  },
  {
    "question": "What is the largest animal on Earth?",
    "category": "General Knowledge",
    "options": [
      "Elephant",
      "Blue Whale",
      "Giraffe",
      "Shark"
    ],
    "answer": "Blue Whale",
    "details": "The blue whale is the largest animal on Earth, growing up to 100 feet long and weighing up to 200 tons."
  }
];



// Function to upload quiz data to Firestore
const uploadQuizData = async () => {
  try {
    const quizCollectionRef = collection(db, "quizzes"); // Collection name in Firestore
    for (const quiz of quizData) {
      await addDoc(quizCollectionRef, quiz);
    }
    console.log("Quiz data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading quiz data: ", error);
  }
};

uploadQuizData();
