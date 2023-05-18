import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (userData.phoneNumber === undefined) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-500 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-rose-500 hover:bg-rose-800 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
      <h1 className="text-4xl text-white font-bold mb-4">Welcome</h1>
      <p className="text-lg text-white">
        Logged in successfully using OTP. Your phone number is {userData.phoneNumber}
      </p>
      <button className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4 rounded mt-8">
        Get Started
      </button>
    </div>
  );
};

export default Home;
