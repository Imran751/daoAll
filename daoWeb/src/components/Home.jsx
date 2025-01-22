import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './TopBar'; // Import TopBar
import SubjectCategories from './SubjectCategories'; // Import SubjectCategories
import QuestionsCard from './QuestionsCard'; // Import QuestionsCard
import Quiz from './Quiz'; // Import Quiz
import Footer from './Footer'; // Import Footer
import Test from './Test';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar /> {/* Keep TopBar always visible */}
      <div className="flex-grow w-full max-w-4xl p-4 mx-auto">
        <Routes>
          {/* Default Route for Home */}
          <Route
            path="/"
            element={
              <>
                {/* <SubjectCategories /> */}
                <QuestionsCard />
              </>
            }
          />

          {/* Quiz Page */}
          <Route path="/quiz" element={<Quiz />} />

          {/* Test Page */}
          <Route path="/test" element={<Test />} />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default Home;
