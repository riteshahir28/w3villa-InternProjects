import jwt from "jsonwebtoken";

export const adminOnly = (req, res, next) => {
  try {
    const token = req.cookies.accessToken; // login ke time jo cookie me save kiya tha
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // token verify karo
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // role check
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Only admin can perform this action" });
      }

      // user info req me dal do taaki baad me use ho sake
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
