// src/components/QuestionDetail.jsx

import React from "react";
import { useLocation } from "react-router-dom";

const QuestionDetail = () => {
  const location = useLocation();
  const question = location.state?.question;

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Question Detail</h2>
      <p className="mb-2"><strong>Category:</strong> {question.category}</p>
      <p className="mb-2"><strong>Question:</strong> {question.question}</p>
      <p className="mb-2"><strong>Answer:</strong> {question.answer}</p>
      <p><strong>Options:</strong></p>
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li key={index}>
            {String.fromCharCode(97 + index)}) {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDetail;
