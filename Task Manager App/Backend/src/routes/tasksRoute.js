import express from "express";
import { protect, roleCheck } from "../middlewares/authMeddelware.js"; 
import {  createTask, getMyTasks,updateTask,deleteTask, } from "../controlars/taskController.js";

const router = express.Router();

 
router.post("/createTask", protect, roleCheck(["admin"]), createTask);
router.get("/getMyTasks", protect, getMyTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, roleCheck(["admin"]), deleteTask);

export default router;
