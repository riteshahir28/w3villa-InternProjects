import sequelize from '../config/db.js';
import {users} from '../models/dbmodel.js'
import bcrypt from 'bcrypt'
// import { where } from 'sequelize';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

// Generate tokens
const generateTokens = (user) => {
    
    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRE }
    );
   

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );

  return { accessToken, refreshToken };
};

// Register
export const register = async (req, res) => {
  try {
    console.log("register data : ",req.body);
    const { fullName, email, password, role } = req.body;
    console.log(fullName);
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userexist = await users.findOne({ where: { email } });
    if (userexist) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    await users.create({ fullName, email, password: hashedPass, role });
    res.status(200).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login
export const login = async (req, res) => {
  try {
     
    const { email, password } = req.body;
    console.log(req.body);
    
    const userexist = await users.findOne({ where: { email } });
    
    if (!userexist) {
        return res.status(400).json({ message: "Email does not exist!" });
    }
    
    const ismatch = await bcrypt.compare(password, userexist.password);
    if (!ismatch) {
        return res.status(400).json({ message: "Invalid password!" });
    }
    
    const { accessToken, refreshToken } = generateTokens(userexist);
    console.log(accessToken, "/n",refreshToken);

     
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // production: true
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      message: "Login successful!",
      user: { id: userexist.id, fullName: userexist.fullName, email: userexist.email, role: userexist.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Refresh Token
export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token!" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const user = await users.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { accessToken } = generateTokens(user);

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        res.json({ accessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully!" });
};


 

// Get all registered users (Only Admin)
export const getAllUsers = async (req, res) => {
  try {
     const allUsers = await users.findAll({
      attributes: { exclude: ["password"] }, 
      order: [["id", "ASC"]],
    });
    res.status(200).json(allUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// Delete user (Only Admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

