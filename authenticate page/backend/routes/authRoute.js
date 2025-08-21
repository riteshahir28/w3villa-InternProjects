const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authentication") ;

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Protected route (sirf token wale user access kar sakte hain)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,     // production me true rakho (HTTPS ke liye)
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});


module.exports = router;
