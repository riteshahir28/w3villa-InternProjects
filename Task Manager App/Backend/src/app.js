import express from "express";
import authrouter from "./routes/authRoute.js";
import taskrouter from "./routes/tasksRoute.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://task-manager-app-lcvx.onrender.com",
    credentials:true
}));

app.use("/api", authrouter);
app.use("/api/tasks",taskrouter);
export default app;
