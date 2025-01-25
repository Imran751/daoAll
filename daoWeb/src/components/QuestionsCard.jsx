import React, { useState, useEffect, useMemo } from "react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import Categories from "./Categories"; // Import Categories component
import { useNavigate } from "react-router-dom";

const QuestionsCard = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [doneStatus, setDoneStatus] = useState(() => {
    const savedStatus = localStorage.getItem('doneStatus');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || "All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(localStorage.getItem('selectedSubCategory') || "All");
  const [selectedTopic, setSelectedTopic] = useState(localStorage.getItem('selectedTopic') || "All");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(""); // State to track answer feedback

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const url = "https://raw.githubusercontent.com/Imran751/daoAll/main/backend/data.json?timestamp=" + new Date().getTime();

        const response = await fetch(url);
        const data = await response.json();

        const uniqueCategories = [
          "All",
          ...new Set(data.map((item) => item.category)),
        ];

        const uniqueSubCategories = data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          if (!acc[item.category].includes(item.subCategory)) {
            acc[item.category].push(item.subCategory);
          }
          return acc;
        }, {});

        const uniqueTopics = data.reduce((acc, item) => {
          const key = `${item.category}-${item.subCategory}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          if (!acc[key].includes(item.topic)) {
            acc[key].push(item.topic);
          }
          return acc;
        }, {});

        setCategories(uniqueCategories);
        setSubCategories(uniqueSubCategories);
        setTopics(uniqueTopics);

        setQuestions(data); // Initially set all questions
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  

  // Memoize filtered questions based on selected category, subcategory, and topic
  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const categoryMatch =
        selectedCategory === "All" || question.category === selectedCategory;
      const subCategoryMatch =
        selectedSubCategory === "All" ||
        question.subCategory === selectedSubCategory;
      const topicMatch =
        selectedTopic === "All" || question.topic === selectedTopic;
      const searchMatch = question.question
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && subCategoryMatch && topicMatch && searchMatch;
    });
  }, [questions, selectedCategory, selectedSubCategory, selectedTopic, searchTerm]);

  const toggleDoneStatus = (id) => {
    const updatedStatus = { ...doneStatus, [id]: !doneStatus[id] };
    setDoneStatus(updatedStatus);
    localStorage.setItem('doneStatus', JSON.stringify(updatedStatus)); // Store doneStatus in localStorage
  };

  const handleOptionClick = (selectedOption, correctAnswer) => {
    // Check if the selected option matches the correct answer
    if (selectedOption === correctAnswer) {
      setAnswerFeedback("Right");
      alert("Right"); // Alert user if correct
    } else {
      setAnswerFeedback("Wrong");
      alert("Wrong"); // Alert user if wrong
    }
  };

  useEffect(() => {
    // Store selected category, subcategory, and topic in localStorage whenever they change
    localStorage.setItem('selectedCategory', selectedCategory);
    localStorage.setItem('selectedSubCategory', selectedSubCategory);
    localStorage.setItem('selectedTopic', selectedTopic);
  }, [selectedCategory, selectedSubCategory, selectedTopic]);

  
 

  const handleDetailButtonClick = (question) => {
    // Navigate to QuestionDetail page, passing the question data as state
    navigate(`/question-detail/${question.id}`, {
      state: { question },
    });
  };


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Category Selector - Using Categories component */}
      <Categories
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
  
      {/* Subcategory Dropdown */}
      {selectedCategory !== "All" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subcategory</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            {subCategories[selectedCategory]?.map((subCat, index) => (
              <option key={index} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </div>
      )}
  
      {/* Topic Dropdown */}
      {selectedSubCategory !== "All" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Topic</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            {topics[`${selectedCategory}-${selectedSubCategory}`]?.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      )}
  
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search questions..."
        className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      {/* Loading State */}
      {loading && <p>Loading...</p>}
  
      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <div
            key={question.id}
            className={`p-4 rounded-lg shadow-md ${doneStatus[question.id] ? "bg-green-50" : "bg-white"}`}
          >
            {/* Done Status */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => toggleDoneStatus(question.id)}
                className="flex items-center text-sm font-medium"
              >
                {doneStatus[question.id] ? (
                  <MdCheckCircle className="text-green-500 mr-1" />
                ) : (
                  <MdRadioButtonUnchecked className="text-gray-400 mr-1" />
                )}
                {doneStatus[question.id] ? "Done" : "Not Done"}
              </button>
            </div>
  
            {/* Question */}
            <h3 className="text-lg font-semibold mb-2">
              {index + 1}. {question.question}
            </h3>
  
            {/* Buttons */}
            <div className="flex justify-center space-x-2 mb-2">
              <button
                onClick={() =>
                  setShowAnswerIndex(showAnswerIndex === index ? null : index)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {showAnswerIndex === index ? "Hide Answer" : "Show Answer"}
              </button>
              <button
                onClick={() =>
                  setShowOptionsIndex(showOptionsIndex === index ? null : index)
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {showOptionsIndex === index ? "Hide Options" : "Show Options"}
              </button>
  
              {/* Detail Button */}
            <button
              onClick={() => handleDetailButtonClick(question)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Detail
            </button>
            </div>
  
            {/* Answer */}
            {showAnswerIndex === index && (
              <p className="text-green-600 font-medium mb-2">
                Answer: {question.answer}
              </p>
            )}
  
            {/* Options */}
            {showOptionsIndex === index && (
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleOptionClick(option, question.answer)}
                    className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default QuestionsCard;
