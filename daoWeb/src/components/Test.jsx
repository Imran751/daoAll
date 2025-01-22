import React, { useState, useEffect } from "react";

const Test = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://raw.githubusercontent.com/Imran751/daoAll/7a8049fe1b5676559279dca62ed5164ccab29c70/backend/data.json");
        const data = await response.json();

        // Extract unique categories from the questions
        const uniqueCategories = [
          ...new Set(data.map((question) => question.category)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchQuestions = async (category) => {
    setLoading(true);
    try {
      const response = await fetch("./src/data/data.json");
      const data = await response.json();

      // Filter questions by category
      const filteredQuestions = data.filter(
        (q) => q.category === category
      );

      // Select 7 questions (the first 1 mandatory, 6 remaining)
      const selectedQuestions = shuffleArray(filteredQuestions).slice(0, 7);

      // Set the first question as mandatory, and rest are optional
      const questionsWithMarks = selectedQuestions.map((question, index) => ({
        ...question,
        marks: 20, // Assigning equal marks to each question (total 25 for 5 selected questions)
        mandatory: index === 0, // Make the first question mandatory
      }));

      setQuestions(questionsWithMarks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startTest = (category) => {
    setSelectedCategory(category);
    fetchQuestions(category);
  };

  const resetTest = () => {
    setSelectedCategory(null);
    setQuestions([]);
  };

  // Get today's date in a readable format
  const currentDate = new Date().toLocaleDateString();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="test-container bg-gray-100 min-h-screen flex justify-center items-center py-8">
      <div className="test-card bg-white p-6 rounded-md shadow-lg w-full max-w-3xl">
        {selectedCategory ? (
          <div>
            <div className="header mb-6 p-4 bg-blue-100 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Test - {selectedCategory}</h3>
                <p className="text-lg">{currentDate}</p>
              </div>
              <div className="mt-4 text-lg">
                <p>Total Marks: 100</p>
                <p className="mt-2">
                  <strong>Instructions:</strong>
                  <ul className="list-disc pl-5">
                    <li>Attempt any 5 questions from the test.</li>
                    <li>The first question is mandatory and must be answered.</li>
                    <li>Choose 4 more questions from the remaining 6 questions.</li>
                    <li>Each question carries equal marks.</li>
                  </ul>
                </p>
              </div>
            </div>
            {questions.length > 0 ? (
              <div>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-medium mb-2">
                      Q {index + 1}: {question.question}
                    </h3>
                    <p className="text-lg mb-4 text-right">Marks: {question.marks}</p>
                    {question.mandatory && (
                      <p className="text-sm text-red-500">This question is mandatory.</p>
                    )}
                  </div>
                ))}
                <button
                  onClick={resetTest}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                >
                  Back to Categories
                </button>
              </div>
            ) : (
              <p>No questions available for this category.</p>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select a Category</h2>
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => startTest(category)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {category} Test
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
