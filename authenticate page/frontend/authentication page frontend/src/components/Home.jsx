// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to My App
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        This is the home page of your project.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Register
        </Link>
        <Link
          to="/profile"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Home;
