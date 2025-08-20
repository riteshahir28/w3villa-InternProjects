const jwt = require("jsonwebtoken");

// Middleware function
const authMiddleware = (req, res, next) => {
  // Token header se lena hoga
  const authHeader = req.headers["authorization"];

  // Format hoga => "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied, Token Missing!" });
  }

  try {
    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded me user ki id hoti hai
    req.user = decoded;  

    next(); // aage controller pe chala jaega
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token!" });
  }
};

module.exports = authMiddleware;
