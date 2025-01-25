import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://raw.githubusercontent.com/Imran751/daoAll/main/backend/data.json?timestamp=");
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
      const response = await fetch("https://raw.githubusercontent.com/Imran751/daoAll/main/backend/data.json?timestamp=");
      const data = await response.json();

      // Filter questions by category
      const filteredQuestions = data.filter((q) => q.category === category);

      // Shuffle questions and take only the first 8
      const shuffledQuestions = shuffleArray(filteredQuestions).slice(0, 8);
      setQuestions(shuffledQuestions);
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

  const handleAnswer = (selectedAnswer) => {
    // Correct answer, add 1 point
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    } else {
      // Incorrect answer, deduct 0.5 points
      setScore((prevScore) => prevScore - 0.5);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const startQuiz = (category) => {
    setSelectedCategory(category);
    fetchQuestions(category);
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setQuestions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="quiz-container bg-gray-100 min-h-screen flex justify-center items-center py-8">
      <div className="quiz-card bg-white p-6 rounded-md shadow-lg w-full max-w-3xl">
        {selectedCategory ? (
          quizFinished ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold">Quiz Finished!</h3>
              <p className="text-lg mt-4">
                Your Score: {score.toFixed(2)} / {questions.length}
              </p>
              <button
                onClick={resetQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              >
                Back to Categories
              </button>
            </div>
          ) : (
            <div>
              {/* Quiz Header */}
              <div className="quiz-header mb-6 p-4 bg-blue-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">{selectedCategory} Quiz</h2>
                <p className="text-lg">Attempt all questions. Each correct answer gives 1 point, and each wrong answer will deduct 0.5 points.</p>
                <p className="text-sm">Total Marks: {questions.length}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm">Question {currentQuestion + 1} of {questions.length}</p>
                  <p className="text-sm">Your Score: {score.toFixed(2)}</p>
                </div>
              </div>

              {/* Question and Options */}
              <div key={questions[currentQuestion].id}>
                <h3 className="text-xl font-medium mb-4">
                  {questions[currentQuestion].question}
                </h3>

                <div className="mt-4">
                  {questions[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option)}
                      className="block bg-gray-200 text-black px-4 py-2 rounded mt-2 w-full text-left hover:bg-gray-300"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge? Pick a Quiz and Show Your Skills! 🎯</h2>
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => startQuiz(category)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {category} Quiz
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
