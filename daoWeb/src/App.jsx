import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // For auth state
import { auth } from './firebase'; // Firebase auth instance
import Login from './components/Login'; // Import Login component
import SignUp from './components/SignUp'; // Import SignUp component
import Home from './components/Home'; // Import Home component

const App = () => {
  const [user, loading] = useAuthState(auth); // Get the current user and loading state

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    ); // Display loading state while checking user
  }

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />

        {/* Sign Up Page */}
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" replace />}
        />

        {/* Main Page - Home (Requires Authentication) */}
        <Route
          path="/*"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
