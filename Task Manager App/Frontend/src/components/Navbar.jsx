import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { role, isAuthenticated, logout, user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Common links (sabko visible honge jab tak login nahi hai)
  const guestLinks = [
    { label: "Home", path: "/" },
    { label: "Tasks", path: "/tasks" },
    { label: "About", path: "/about" },
  ];

  // Role ke hisaab se links (sirf login hone ke baad)
  let roleLinks = [];
  if (role === "user") {
    roleLinks = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Tasks", path: "/tasks" },
      { label: "Profile", path: "/profile" },
    ];
  } else if (role === "admin") {
    roleLinks = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "All Tasks", path: "/tasks" },
      { label: "All User's", path: "/users" },
      { label: "Create Task", path: "/createtask" },
      { label: "Profile", path: "/profile" },
    ];
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Task Manager
      </div>

      {/* Links */}
      <div className="space-x-6 hidden md:flex">
        {/* Guest Links */}
        {!isAuthenticated &&
          guestLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-gray-200"
            >
              {link.label}
            </Link>
          ))}

        {/* Role Based Links (after login) */}
        {isAuthenticated &&
          roleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-gray-200"
            >
              {link.label}
            </Link>
          ))}
      </div>

      {/* Right Side Buttons */}
      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
