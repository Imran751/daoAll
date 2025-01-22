import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
        Search Questions:
      </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term here..."
        className="block border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
