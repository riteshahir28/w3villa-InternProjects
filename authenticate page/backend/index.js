const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const authRoutes = require("./routes/authRoute");
const cors = require("cors")
const cookieParser = require("cookie-parser");

dotenv.config(); // .env file load hogi

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true                  
}));
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);

// DB Connection
connectDB();

// Server Run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
