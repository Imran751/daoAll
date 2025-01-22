import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { useAuthState } from 'react-firebase-hooks/auth'; // To handle user state
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods

const handleLogout = async () => {
  await signOut(auth);
};

const TopBar = () => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState(''); // State to store the user's name
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '/imge.png'); // State to store the user's avatar (load from localStorage)

  const hamburgerRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate to different routes

  const [user] = useAuthState(auth); // Get the current user

  // Fetch the user's name from Firestore when the user is authenticated
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userRef = doc(db, 'users', user.uid); // Reference to the user's document
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserName(userSnap.data().name); // Set the user's name from Firestore
        } else {
          console.log('No such document!');
        }
      };

      fetchUserData();
    }
  }, [user]);

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setHamburgerMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleHamburgerMenu = () => {
    setHamburgerMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark', !darkMode); // Toggle dark class on the body
  };

  // Handle "Take Quiz" button click
  const handleTakeQuizClick = () => {
    navigate('/quiz'); // Navigate to the quiz page when clicked
  };

  // Handle "Test" button click
  const handleTestClick = () => {
    navigate('/test'); // Navigate to the Test page when clicked
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Set the avatar state to the selected image URL
        localStorage.setItem('avatar', reader.result); // Save avatar to localStorage
      };
      reader.readAsDataURL(file); // Convert the image to a base64 URL
    }
  };

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-indigo-500'} text-white py-4 px-6 flex items-center justify-between shadow-lg`}>
      {/* Hamburger Menu */}
      <div
        className="text-2xl font-bold cursor-pointer hover:opacity-90 mt-2"
        onClick={toggleHamburgerMenu}
        ref={hamburgerRef}
      >
        ☰
      </div>

      {/* Welcome Text */}
      <div className="text-base md:text-lg font-medium tracking-wide">
        Welcome, <span className="font-bold">{userName || 'User'}</span> {/* Display user name */}
      </div>

      {/* Take Quiz Button and Test Button */}
      <div className="flex items-center">
        <button
          className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded-md ml-2 text-sm md:px-4 md:py-2 md:text-base"
          onClick={handleTakeQuizClick}
        >
          Take Quiz
        </button>
        <button
          className="px-2 py-1 bg-green-400 hover:bg-green-500 text-white rounded-md ml-2 text-sm md:px-4 md:py-2 md:text-base"
          onClick={handleTestClick}
        >
          Take Test
        </button>
      </div>

      {/* User Avatar and Dropdown Menu */}
      <div className="relative">
        <img
          src={avatar} // Display the selected avatar or the default avatar
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md cursor-pointer"
          onClick={toggleUserMenu}
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>

        {/* User Menu */}
        {userMenuOpen && (
          <div
            className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md p-2 text-sm w-48"
            ref={userMenuRef}
          >
            {/* Change Avatar Button */}
            <label
              htmlFor="fileInput"
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left cursor-pointer"
            >
              Change Avatar
            </label>

            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Hamburger Menu Dropdown */}
      {hamburgerMenuOpen && (
        <div
          className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md p-4 text-sm w-48"
          style={{
            top: '50px', // Push it down from the top
            left: '-20px', // Align it to the left
          }}
          ref={hamburgerRef}
        >
          <button
            className="block px-4 py-2 mt-2 hover:bg-gray-100 w-full text-left"
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}

      {/* Hidden file input to change avatar */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="fileInput"
      />
    </div>
  );
};

export default TopBar;
