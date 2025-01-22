import React, { useState, useEffect } from "react";
import QuestionsCard from "./QuestionsCard";

const SubjectCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Load the default or saved category from localStorage
  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    setSelectedCategory(savedCategory || "All"); // Default to "All" if no saved category
  }, []);

  // Save the selected category to localStorage whenever it changes
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const subjects = ['All', 'General Knowledge', 'Pakistan Affairs', 'Islamic Studies', 'Current Affairs', 'Geography', 'Mathematics', 'English Grammar', 'Urdu', 'Everyday Science', 'Computer Skills', 'Extra'];


  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">Subjects</h2>
      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className={`p-4 ${
              selectedCategory === subject
                ? "bg-blue-300"
                : "bg-blue-100 hover:bg-blue-200"
            } text-center rounded-lg shadow-md cursor-pointer`}
            onClick={() => handleCategorySelection(subject)}
          >
            {subject}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <QuestionsCard selectedCategory={selectedCategory} />
      )}
    </div>
  );
};

export default SubjectCategories;
