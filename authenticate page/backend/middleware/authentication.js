const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // ✅ Token cookies se nikalna
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied, Token Missing!" });
  }

  try {
    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // user info store

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token!" });
  }
};

module.exports = authMiddleware;
