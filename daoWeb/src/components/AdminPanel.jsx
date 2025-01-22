import React, { useState, useEffect } from "react";
import axios from "axios"; // For API communication

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    id: "",
    question: "",
    marks: "",
    answer: "",
    solution: "",
    solution2: "",
    solution3: "",
    subject: "",
    topic: "",
    options: [],
    category: "",
  });

  // Fetch existing questions (replace with API if server-based)
  useEffect(() => {
    fetch("/src/data/mathStatEco.json") // Replace with your API endpoint if using a server
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes for new or edited questions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      id: "",
      question: "",
      marks: "",
      answer: "",
      solution: "",
      solution2: "",
      solution3: "",
      subject: "",
      topic: "",
      options: [],
      category: "",
    });
    // Save to backend (if applicable)
  };

  // Update an existing question
  const updateQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = newQuestion;
    setQuestions(updatedQuestions);
    // Save to backend (if applicable)
  };

  // Delete a question
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    // Save to backend (if applicable)
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {/* Form for adding/updating a question */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Add / Edit Question</h3>

        <input
          type="text"
          name="id"
          value={newQuestion.id}
          onChange={handleInputChange}
          placeholder="ID"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="question"
          value={newQuestion.question}
          onChange={handleInputChange}
          placeholder="Question"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="number"
          name="marks"
          value={newQuestion.marks}
          onChange={handleInputChange}
          placeholder="Marks"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="answer"
          value={newQuestion.answer}
          onChange={handleInputChange}
          placeholder="Answer"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="solution"
          value={newQuestion.solution}
          onChange={handleInputChange}
          placeholder="Solution (Path)"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="solution2"
          value={newQuestion.solution2}
          onChange={handleInputChange}
          placeholder="Solution2 (Path)"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="solution3"
          value={newQuestion.solution3}
          onChange={handleInputChange}
          placeholder="Solution3 (Path)"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="subject"
          value={newQuestion.subject}
          onChange={handleInputChange}
          placeholder="Subject"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="topic"
          value={newQuestion.topic}
          onChange={handleInputChange}
          placeholder="Topic"
          className="block border p-2 my-2 w-full"
        />
        <input
          type="text"
          name="category"
          value={newQuestion.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="block border p-2 my-2 w-full"
        />
        <textarea
          name="options"
          value={newQuestion.options.join(", ")}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, options: e.target.value.split(",") })
          }
          placeholder="Options (comma-separated)"
          className="block border p-2 my-2 w-full"
        />

        <button
          onClick={addQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
      </div>

      {/* Display existing questions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Questions</h3>
        {questions.map((q, index) => (
          <div key={q.id} className="p-4 bg-white shadow rounded mb-2">
            <h4 className="font-bold">{q.question}</h4>
            <p>
              <strong>Marks:</strong> {q.marks}
            </p>
            <p>
              <strong>Answer:</strong> {q.answer}
            </p>
            <p>
              <strong>Category:</strong> {q.category}
            </p>
            <p>
              <strong>Subject:</strong> {q.subject}
            </p>
            <p>
              <strong>Topic:</strong> {q.topic}
            </p>
            <p>
              <strong>Options:</strong> {q.options.join(", ")}
            </p>
            <p>
              <strong>Solution Paths:</strong> {q.solution}, {q.solution2},{" "}
              {q.solution3}
            </p>
            <button
              onClick={() => setNewQuestion(q)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteQuestion(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
