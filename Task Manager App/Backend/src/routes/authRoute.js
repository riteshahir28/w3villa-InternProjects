import express from "express";
import { protect, roleCheck } from "../middlewares/authMeddelware.js";

import {register,login,refresh,logout, getAllUsers, deleteUser} from "../controlars/authController.js";


const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/refresh", refresh);
route.post("/logout", logout);
route.get("/users", protect, roleCheck(["admin"]), getAllUsers);
route.delete("/users/:id", protect, roleCheck(["admin"]), deleteUser);

// Example protected route
route.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to profile", user: req.user });
});

// Example role-based route
route.get("/admin", protect, roleCheck(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default route;
