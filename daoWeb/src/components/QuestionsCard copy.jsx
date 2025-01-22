import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import Categories from "./Categories"; // Import Categories component

const QuestionDetailModal = ({ question, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent click on modal background
      >
        <h2 className="text-2xl font-semibold mb-4">Question Detail</h2>
        <p className="mb-2"><strong>Category:</strong> {question.category}</p>
        <p className="mb-2"><strong>Question:</strong> {question.question}</p>
        <p className="mb-2"><strong>Answer:</strong> {question.answer}</p>
        <p className="mb-2"><strong>Details:</strong> {question.details}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const QuestionsCard = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [doneStatus, setDoneStatus] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const categories = [
    "All",
    "General Knowledge",
    "Pakistan Affairs",
    "Islamic Studies",
    "Current Affairs",
    "Geography",
    "Mathematics",
    "English Grammar",
    "Urdu",
    "Everyday Science",
    "Computer Skills",
    "Extra",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url =
          "https://raw.githubusercontent.com/Imran751/courseWebsite/8b85b9b62e935ba9634851c593491f77c58ef39e/data.json";
        const response = await fetch(url);
        const data = await response.json();

        const filteredData =
          selectedCategory === "All"
            ? data
            : data.filter((item) => item.category === selectedCategory);

        setQuestions(filteredData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option, answer) => {
    alert(option === answer ? "Correct!" : "Wrong answer!");
  };

  const toggleDoneStatus = (id) => {
    const updatedStatus = { ...doneStatus, [id]: !doneStatus[id] };
    setDoneStatus(updatedStatus);
  };

  const handleDetailButtonClick = (question) => {
    setSelectedQuestion(question);
    setShowDetailModal(true);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Category Selector - Using Categories component */}
      <Categories
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search questions..."
        className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <div
            key={question.id}
            className={`p-4 rounded-lg shadow-md ${
              doneStatus[question.id] ? "bg-green-50" : "bg-white"
            }`}
          >
            {/* Done Status */}
            <button
              onClick={() => toggleDoneStatus(question.id)}
              className="flex items-center text-sm font-medium mb-2"
            >
              {doneStatus[question.id] ? (
                <MdCheckCircle className="text-green-500 mr-1" />
              ) : (
                <MdRadioButtonUnchecked className="text-gray-400 mr-1" />
              )}
              {doneStatus[question.id] ? "Done" : "Not Done"}
            </button>

            {/* Question */}
            <h3 className="text-lg font-semibold mb-2">
              {index + 1}. {question.question}
            </h3>

            {/* Buttons */}
            <div className="flex space-x-2 mb-2">
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
                  setShowOptionsIndex(
                    showOptionsIndex === index ? null : index
                  )
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
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(option, question.answer)}
                    className="w-full px-4 py-2 bg-gray-200 text-left rounded-lg hover:bg-gray-300"
                  >
                    {String.fromCharCode(97 + i)}) {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Question Detail Modal */}
      {showDetailModal && selectedQuestion && (
        <QuestionDetailModal
          question={selectedQuestion}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default QuestionsCard;
