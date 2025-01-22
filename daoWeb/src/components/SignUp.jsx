import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '../firebase'; // Firebase configuration and db reference
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !contactNumber || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get user UID
      const user = userCredential.user;

      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        contactNumber: contactNumber,
        createdAt: new Date(),
      });

      // Navigate to home page or wherever
      navigate('/');
    } catch (err) {
      console.error('Error signing up: ', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <button
          onClick={() => navigate('/login')}
          className="text-blue-500 underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
