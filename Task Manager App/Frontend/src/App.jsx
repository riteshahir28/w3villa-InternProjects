import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState ,useEffect} from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/auth/register";
import Login from "./pages/auth/Login";
import API from "./utils/api";

import { AuthContext } from "./components/authContext";
import { useContext } from "react";
import UserDashboard from "./pages/UserDashboard";
import AllTasks from "./pages/AllTasks";
import AllUsers from "./pages/AllUsers";
import CreateTask from "./pages/CreateTask";
import Profile from "./pages/Profile";
import Home from "./pages/Home";


function App() {
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await API.post("/refresh", {
          withCredentials: true, 
        });
        console.log("Access token refreshed ");
      } catch (err) {
        console.log("Refresh failed ", err);
      }
    }, 10 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <Navbar/>

      <Routes>

        <Route path="/" element={<Home></Home>} />
        <Route path="/signup" element={<Register></Register>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/dashboard" element={<UserDashboard></UserDashboard>} />
        <Route path="/tasks" element={<AllTasks></AllTasks>} />
        <Route path="/users" element={<AllUsers></AllUsers>} />
        <Route path="/createtask" element={<CreateTask></CreateTask>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>

      <Footer />
 </>
  );
}

export default App;
