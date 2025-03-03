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
    "id": 3,
    "question": "What is the national language of Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Urdu", "Punjabi", "Sindhi", "Pashto"],
    "answer": "Urdu",
    "details": "Urdu is the national language of Pakistan, spoken by the majority of the population."
  },
  {
    "id": 4,
    "question": "What is the past tense of 'run'?",
    "category": "English Grammar",
    "options": ["Ran", "Runned", "Running", "Runs"],
    "answer": "Ran",
    "details": "The past tense of 'run' is 'ran'."
  },
  {
    "id": 5,
    "question": "Who was the first Caliph of Islam?",
    "category": "Islamic Studies",
    "options": ["Abu Bakr", "Umar", "Uthman", "Ali"],
    "answer": "Abu Bakr",
    "details": "Abu Bakr was the first Caliph of Islam, following the death of Prophet Muhammad."
  },
  {
    "id": 6,
    "question": "What is the capital of France?",
    "category": "Extra",
    "options": ["Paris", "Rome", "Madrid", "Berlin"],
    "answer": "Paris",
    "details": "Paris is the capital city of France, known for its art, fashion, and culture."
  },
  {
    "id": 7,
    "question": "Who is the founder of Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Allama Iqbal", "Zulfikar Ali Bhutto", "Quaid-e-Azam Muhammad Ali Jinnah", "Benazir Bhutto"],
    "answer": "Quaid-e-Azam Muhammad Ali Jinnah",
    "details": "Quaid-e-Azam Muhammad Ali Jinnah is the founder of Pakistan, leading the country to independence from British rule."
  },
  {
    "id": 8,
    "question": "In which year did Pakistan become independent?",
    "category": "Pakistan Affairs",
    "options": ["1945", "1947", "1950", "1960"],
    "answer": "1947",
    "details": "Pakistan became independent on August 14, 1947, after the partition of India."
  },
  {
    "id": 9,
    "question": "Who was the first President of Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Iskander Mirza", "Liaquat Ali Khan", "Ayub Khan", "Yahya Khan"],
    "answer": "Iskander Mirza",
    "details": "Iskander Mirza became the first President of Pakistan in 1956."
  },
  {
    "id": 10,
    "question": "Which city is known as the 'City of Lights' in Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Karachi", "Lahore", "Islamabad", "Peshawar"],
    "answer": "Karachi",
    "details": "Karachi is known as the 'City of Lights' due to its vibrant nightlife and significance in Pakistan's economy."
  },
  {
    "id": 11,
    "question": "What is the national animal of Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Markhor", "Lion", "Tiger", "Elephant"],
    "answer": "Markhor",
    "details": "The Markhor is the national animal of Pakistan, a wild goat found in the mountainous regions."
  },
  {
    "id": 12,
    "question": "Which river is the longest in Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Indus River", "Ravi River", "Chenab River", "Jhelum River"],
    "answer": "Indus River",
    "details": "The Indus River is the longest river in Pakistan, flowing through much of the country."
  },
  {
    "id": 13,
    "question": "Which of the following is the largest city in Pakistan by population?",
    "category": "Pakistan Affairs",
    "options": ["Karachi", "Lahore", "Rawalpindi", "Faisalabad"],
    "answer": "Karachi",
    "details": "Karachi is the largest city in Pakistan by population and is also the economic hub of the country."
  },
  {
    "id": 14,
    "question": "What is the official name of Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Republic of Pakistan", "Islamic Republic of Pakistan", "Federation of Pakistan", "Union of Pakistan"],
    "answer": "Islamic Republic of Pakistan",
    "details": "The official name of Pakistan is the Islamic Republic of Pakistan."
  },
  {
    "id": 15,
    "question": "Who was the first woman Prime Minister of Pakistan?",
    "category": "Pakistan Affairs",
    "options": ["Fatima Jinnah", "Benazir Bhutto", "Hina Rabbani Khar", "Asma Jahangir"],
    "answer": "Benazir Bhutto",
    "details": "Benazir Bhutto became the first woman Prime Minister of Pakistan in 1988."
  },
  {
    "id": 16,
    "question": "Which is the largest province in Pakistan by area?",
    "category": "Pakistan Affairs",
    "options": ["Sindh", "Punjab", "Balochistan", "Khyber Pakhtunkhwa"],
    "answer": "Balochistan",
    "details": "Balochistan is the largest province in Pakistan by area, covering nearly half of the country."
  },
  {
    "id": 17,
    "question": "Which of these is a correct sentence?",
    "category": "English Grammar",
    "options": ["I is going to the store", "I am going to the store", "I going to store", "I go to store"],
    "answer": "I am going to the store",
    "details": "The correct form of the verb 'to be' in the sentence is 'am'."
  },
  {
    "id": 18,
    "question": "Which sentence uses the correct form of 'there'?",
    "category": "English Grammar",
    "options": ["There are many people here", "Their are many people here", "They're are many people here", "They are many people here"],
    "answer": "There are many people here",
    "details": "'There' refers to a location or existence, whereas 'their' and 'they're' are possessive and contraction forms respectively."
  },
  {
    "id": 19,
    "question": "Which sentence is grammatically correct?",
    "category": "English Grammar",
    "options": ["She can sings well", "She can sing well", "She can singing well", "She can sings good"],
    "answer": "She can sing well",
    "details": "The correct structure for a modal verb like 'can' is 'can + base verb'."
  },
  {
    "id": 20,
    "question": "Which of the following sentences is correct?",
    "category": "English Grammar",
    "options": ["Its raining outside", "It's raining outside", "It raining outside", "It rains outside"],
    "answer": "It's raining outside",
    "details": "The contraction 'it's' stands for 'it is'."
  },
  {
    "id": 21,
    "question": "Which is the correct past tense form of 'swim'?",
    "category": "English Grammar",
    "options": ["Swimmed", "Swam", "Swim", "Swimming"],
    "answer": "Swam",
    "details": "The past tense of 'swim' is 'swam'."
  },
  {
    "id": 22,
    "question": "Which of these is a correct sentence?",
    "category": "English Grammar",
    "options": ["I was excited to meet them.", "I was excited meeting them.", "I excited was to meet them.", "Excited I was to meet them."],
    "answer": "I was excited to meet them.",
    "details": "The subject 'I' should come first, followed by the verb 'was'."
  },
  {
    "id": 23,
    "question": "Which of the following is a correct usage of 'much'?",
    "category": "English Grammar",
    "options": ["How much money do you have?", "How many money do you have?", "How much are money?", "How many is money?"],
    "answer": "How much money do you have?",
    "details": "'Much' is used for uncountable nouns, like 'money'."
  },
  {
    "id": 24,
    "question": "Which of these is an example of a compound sentence?",
    "category": "English Grammar",
    "options": ["I went to the store, and I bought bread.", "I went to the store.", "I bought bread.", "I went and I bought."],
    "answer": "I went to the store, and I bought bread.",
    "details": "A compound sentence contains two independent clauses connected by a conjunction like 'and'."
  },
  {
    "id": 25,
    "question": "Which sentence is in the passive voice?",
    "category": "English Grammar",
    "options": ["The cat chased the mouse.", "The mouse was chased by the cat.", "The cat was chasing the mouse.", "The mouse chased by the cat."],
    "answer": "The mouse was chased by the cat.",
    "details": "In passive voice, the object of the action becomes the subject of the sentence."
  },
  {
    "id": 26,
    "question": "Which sentence is an example of a simile?",
    "category": "English Grammar",
    "options": ["The stars shone brightly in the sky.", "Her smile was like sunshine.", "He runs fast.", "She is happy."],
    "answer": "Her smile was like sunshine.",
    "details": "A simile is a figure of speech that compares two things using 'like' or 'as'."
  },
  {
    "id": 27,
    "question": "Who invented the telephone?",
    "category": "General Knowledge",
    "options": ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Marie Curie"],
    "answer": "Alexander Graham Bell",
    "details": "Alexander Graham Bell is credited with inventing the telephone in 1876."
  },
  {
    "id": 28,
    "question": "What is the largest planet in our solar system?",
    "category": "General Knowledge",
    "options": ["Earth", "Mars", "Jupiter", "Saturn"],
    "answer": "Jupiter",
    "details": "Jupiter is the largest planet in our solar system, with a diameter of about 139,820 km."
  },
  {
    "id": 29,
    "question": "What is the smallest country in the world?",
    "category": "General Knowledge",
    "options": ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    "answer": "Vatican City",
    "details": "Vatican City is the smallest independent state in the world, with an area of 44 hectares."
  },
  {
    "id": 30,
    "question": "Which ocean is the largest?",
    "category": "General Knowledge",
    "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    "answer": "Pacific Ocean",
    "details": "The Pacific Ocean is the largest and deepest ocean on Earth, covering about 63 million square miles."
  },
  {
    "id": 31,
    "question": "Who painted the Mona Lisa?",
    "category": "General Knowledge",
    "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    "answer": "Leonardo da Vinci",
    "details": "The Mona Lisa is a famous painting by the Italian artist Leonardo da Vinci, created between 1503 and 1506."
  },
  {
    "id": 32,
    "question": "What is the capital of Japan?",
    "category": "General Knowledge",
    "options": ["Seoul", "Beijing", "Tokyo", "Kyoto"],
    "answer": "Tokyo",
    "details": "Tokyo is the capital of Japan and the largest city in the country."
  },
  {
    "id": 33,
    "question": "Who wrote the play 'Romeo and Juliet'?",
    "category": "General Knowledge",
    "options": ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    "answer": "William Shakespeare",
    "details": "'Romeo and Juliet' is one of William Shakespeare's most famous tragedies, written in the late 16th century."
  },
  {
    "id": 34,
    "question": "What is the longest river in the world?",
    "category": "General Knowledge",
    "options": ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    "answer": "Amazon River",
    "details": "The Amazon River is considered the longest river in the world, stretching about 4,345 miles (7,062 km)."
  },
  {
    "id": 35,
    "question": "Which is the largest continent by area?",
    "category": "General Knowledge",
    "options": ["Asia", "Africa", "Europe", "North America"],
    "answer": "Asia",
    "details": "Asia is the largest continent, covering 30% of Earth's land area and home to about 60% of the global population."
  },
  {
    "id": 36,
    "question": "Which country is known as the Land of the Rising Sun?",
    "category": "General Knowledge",
    "options": ["China", "South Korea", "Japan", "Thailand"],
    "answer": "Japan",
    "details": "Japan is called the Land of the Rising Sun due to its location to the east of the Asian continent."
  },
  {
    "id": 36,
    "question": "What was the first battle fought by Prophet Muhammad (PBUH)?",
    "category": "Islamic Studies",
    "options": ["Battle of Uhud", "Battle of Badr", "Battle of Khaybar", "Battle of Tabuk"],
    "answer": "Battle of Badr",
    "details": "The Battle of Badr was the first major battle fought by Prophet Muhammad (PBUH) in 624 CE, and it was a decisive victory for the Muslims."
  },
  {
    "id": 37,
    "question": "Which of the following is one of the 99 names of Allah?",
    "category": "Islamic Studies",
    "options": ["Al-Rahman", "Al-Qamar", "Al-Malik", "Al-Jabbar"],
    "answer": "Al-Rahman",
    "details": "Al-Rahman, meaning 'The Most Merciful', is one of the 99 names of Allah, emphasizing His mercy and compassion."
  },
  {
    "id": 38,
    "question": "What is the significance of the month of Ramadan in Islam?",
    "category": "Islamic Studies",
    "options": ["Month of fasting and prayer", "Month of pilgrimage", "Month of charity", "Month of sacrifice"],
    "answer": "Month of fasting and prayer",
    "details": "Ramadan is the holy month of fasting, prayer, and reflection in Islam. Muslims fast from dawn to sunset to increase their spirituality."
  },
  {
    "id": 39,
    "question": "Which Surah in the Quran is the longest?",
    "category": "Islamic Studies",
    "options": ["Al-Fatiha", "Al-Baqarah", "Al-Imran", "Al-Mulk"],
    "answer": "Al-Baqarah",
    "details": "Al-Baqarah is the longest Surah (chapter) in the Quran, consisting of 286 verses (Ayahs)."
  },
  {
    "id": 40,
    "question": "In which year did the Battle of Uhud take place?",
    "category": "Islamic Studies",
    "options": ["624 CE", "630 CE", "622 CE", "615 CE"],
    "answer": "625 CE",
    "details": "The Battle of Uhud took place in 625 CE between the Muslims of Medina and the Quraysh of Makkah. It was a challenging battle for the Muslims."
  },
  {
    "id": 41,
    "question": "Who was the second caliph of Islam?",
    "category": "Islamic Studies",
    "options": ["Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib", "Abu Bakr"],
    "answer": "Umar ibn al-Khattab",
    "details": "Umar ibn al-Khattab was the second caliph of Islam and played a significant role in the expansion of the Islamic empire."
  },
  {
    "id": 42,
    "question": "What is the name of Prophet Muhammad's (PBUH) mother?",
    "category": "Islamic Studies",
    "options": ["Amina", "Fatima", "Khadijah", "Zaynab"],
    "answer": "Amina",
    "details": "Amina bint Wahb was the mother of Prophet Muhammad (PBUH). She passed away when Muhammad (PBUH) was only six years old."
  },
  {
    "id": 43,
    "question": "Which city is known as the 'City of Knowledge' in Islam?",
    "category": "Islamic Studies",
    "options": ["Medina", "Kufa", "Cairo", "Baghdad"],
    "answer": "Baghdad",
    "details": "Baghdad was known as the 'City of Knowledge' during the Islamic Golden Age, a center for scholars, poets, and scientists."
  },
  {
    "id": 44,
    "question": "What is the name of the angel who blows the trumpet to signal the Day of Judgment?",
    "category": "Islamic Studies",
    "options": ["Angel Jibril", "Angel Israfil", "Angel Mikail", "Angel Malik"],
    "answer": "Angel Israfil",
    "details": "Angel Israfil is the angel who will blow the trumpet to signal the end of the world and the Day of Judgment in Islamic eschatology."
  },
  {
    "id": 45,
    "question": "What is the significance of the Hijrah in Islamic history?",
    "category": "Islamic Studies",
    "options": ["Migration of Prophet Muhammad from Makkah to Medina", "Birth of Prophet Muhammad", "Battle of Badr", "Revelation of the Quran"],
    "answer": "Migration of Prophet Muhammad from Makkah to Medina",
    "details": "The Hijrah refers to the migration of Prophet Muhammad (PBUH) and his followers from Makkah to Medina in 622 CE, marking the beginning of the Islamic calendar."
  },
  {
    "id": 46,
    "question": "What is the largest continent by land area?",
    "category": "Extra",
    "options": ["Asia", "Africa", "North America", "Europe"],
    "answer": "Asia",
    "details": "Asia is the largest continent, covering approximately 30% of the Earth's total land area."
  },
  {
    "id": 47,
    "question": "Which planet is known as the Red Planet?",
    "category": "Extra",
    "options": ["Mars", "Venus", "Jupiter", "Saturn"],
    "answer": "Mars",
    "details": "Mars is often called the Red Planet due to its reddish appearance, caused by iron oxide (rust) on its surface."
  },
  {
    "id": 48,
    "question": "Which country is known as the Land of the Rising Sun?",
    "category": "Extra",
    "options": ["China", "Japan", "South Korea", "Thailand"],
    "answer": "Japan",
    "details": "Japan is called the Land of the Rising Sun because it lies to the east of the Asian continent, where the sun rises."
  },
  {
    "id": 49,
    "question": "What is the chemical symbol for gold?",
    "category": "Extra",
    "options": ["Au", "Ag", "Pb", "Fe"],
    "answer": "Au",
    "details": "The chemical symbol for gold is Au, derived from the Latin word 'aurum'."
  },
  {
    "id": 50,
    "question": "Which of the following is the smallest country in the world by land area?",
    "category": "Extra",
    "options": ["Vatican City", "Monaco", "Nauru", "San Marino"],
    "answer": "Vatican City",
    "details": "Vatican City is the smallest independent state in the world by both area and population, located entirely within Rome, Italy."
  },
  {
    "id": 51,
    "question": "What is the longest river in the world?",
    "category": "Extra",
    "options": ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    "answer": "Nile River",
    "details": "The Nile River, flowing through northeastern Africa, is traditionally considered the longest river in the world."
  },
  {
    "id": 52,
    "question": "Which animal is known as the King of the Jungle?",
    "category": "Extra",
    "options": ["Lion", "Elephant", "Tiger", "Giraffe"],
    "answer": "Lion",
    "details": "The lion is often referred to as the King of the Jungle due to its majestic appearance and its position at the top of the food chain."
  },
  {
    "id": 53,
    "question": "What is the tallest mountain in the world?",
    "category": "Extra",
    "options": ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
    "answer": "Mount Everest",
    "details": "Mount Everest, located in the Himalayas, is the tallest mountain in the world, standing at 8,848 meters (29,029 feet) above sea level."
  },
  {
    "id": 54,
    "question": "Who invented the light bulb?",
    "category": "Extra",
    "options": ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Michael Faraday"],
    "answer": "Thomas Edison",
    "details": "Thomas Edison is credited with inventing the practical light bulb in 1879, although others like Joseph Swan contributed to its development."
  },
  {
    "id": 55,
    "question": "Which element has the atomic number 1?",
    "category": "Extra",
    "options": ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    "answer": "Hydrogen",
    "details": "Hydrogen is the lightest and most abundant element in the universe, with an atomic number of 1."
  },
  // Add remaining quiz questions here
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
