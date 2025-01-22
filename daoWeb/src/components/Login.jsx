import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset the error message
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to the main page after successful login
    } catch (error) {
      setError('Failed to log in. Please check your email and password.');
      console.error("Error signing in: ", error.message);
    } finally {
      setLoading(false); // Reset the loading state after login attempt
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${loading ? 'bg-gray-400' : 'hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <button
          onClick={() => navigate('/signup')}
          className="text-blue-500 underline"
        >
           Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
