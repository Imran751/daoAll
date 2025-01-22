import React from "react";

const Categories = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4 bg-gray-100">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`whitespace-nowrap px-4 py-2 rounded-full border transition duration-200 ${
            selectedCategory === category
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
