import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const QuestionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { question } = location.state; // Retrieve the question data passed via navigation

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-6 mb-8">
        <h2 className="text-3xl font-semibold text-center mb-4">Question Detail</h2>
        
        <div className="space-y-4">
          <p><strong>Question:</strong> {question.question}</p>
          <p><strong>Marks:</strong> {question.marks}</p>
          <p><strong>Category:</strong> {question.category}</p>
          <p><strong>Sub Category:</strong> {question.subCategory}</p>
          <p><strong>Topic:</strong> {question.topic}</p>
          <p><strong>Answer:</strong> {question.answer}</p>
          <p><strong>Details:</strong> {question.details}</p>
        </div>

        {/* Display images if available */}
        {question.images && question.images.length > 0 && (
          <div className="my-6">
            <h3 className="text-xl font-semibold mb-2">Images</h3>
            <div className="flex flex-col space-y-4"> {/* Stack images vertically with spacing */}
              {question.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Display videos if available */}
{question.videos && question.videos.length > 0 && (
  <div className="my-6">
    <h3 className="text-xl font-semibold mb-2">Videos</h3>
    <div className="space-y-4">
      {question.videos.map((video, index) => {
        // Extract video ID from various types of YouTube URLs
        let videoId;

        // Handle standard YouTube watch URL
        if (video.includes("youtube.com/watch?v=")) {
          videoId = video.split("v=")[1]?.split("&")[0];
        }
        // Handle shortened YouTube URL (youtu.be)
        else if (video.includes("youtu.be/")) {
          videoId = video.split("youtu.be/")[1]?.split("?")[0];
        }
        // Handle YouTube Shorts URL
        else if (video.includes("youtube.com/shorts/")) {
          videoId = video.split("shorts/")[1]?.split("?")[0];
        }

        // If video ID is invalid or not found, skip rendering the iframe
        if (!videoId) {
          return <p key={index} className="text-red-500">Invalid video URL</p>;
        }

        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0`;

        return (
          <div key={index} className="mb-4">
            <iframe
              src={embedUrl}
              title={`Video ${index + 1}`}
              className="w-full h-96 rounded-lg shadow-lg"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      })}
    </div>
  </div>
)}


        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
