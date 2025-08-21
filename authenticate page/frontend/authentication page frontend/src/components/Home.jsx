// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Title Section */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
        Welcome to <span className="text-blue-600">My App</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
        Your one-stop solution to manage users, authentication, and profile 
        settings with a clean and simple UI.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-6 mb-12">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition"
        >
          Register
        </Link>
        <Link
          to="/profile"
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow-md hover:bg-purple-600 transition"
        >
          Profile
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-8">
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-gray-800 mb-3"> Secure Login</h3>
          <p className="text-gray-600">
            Safe and reliable authentication with cookies and JWT for your account.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-gray-800 mb-3"> Responsive Design</h3>
          <p className="text-gray-600">
            Mobile-friendly UI that adapts to any screen size for a smooth experience.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Fast Performance</h3>
          <p className="text-gray-600">
            Optimized frontend with React and backend API integration for speed.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
