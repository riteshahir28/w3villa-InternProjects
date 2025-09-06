import jwt from "jsonwebtoken";
import { users } from "../models/dbmodel.js";

export const protect = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    console.log("Protect middleware - Access token:", !!accessToken);
    console.log("Protect middleware - Refresh token:", !!refreshToken);
   
    if (!accessToken) {
      
      if (!refreshToken) {
        console.log("No tokens found - returning 401");
        return res.status(401).json({ message: "Not authenticated" });
      }

      
      return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return res.status(403).json({ message: "Invalid refresh token" });

     
          const user = await users.findByPk(decoded.id);
          if (!user) return res.status(404).json({ message: "User not found" });

           
          const newAccessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRE }
          );

     
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false, // prod = true
            sameSite: "strict",
            maxAge: 5 * 60 * 1000, // 5 min
          });

          req.user = { id: user.id, role: user.role };
          next();
        }
      );
    }

     
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Access token verification failed:", err.message);
        return res.status(403).json({ message: "Invalid token" });
      }
      console.log("Access token verified successfully, user:", decoded);
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const roleCheck = (roles) => {
  return (req, res, next) => {
    console.log("Role check - Required roles:", roles);
    console.log("Role check - User role:", req.user?.role);
    if (!roles.includes(req.user.role)) {
      console.log("Role check failed - Access denied");
      return res.status(403).json({ message: "Access denied" });
    }
    console.log("Role check passed");
    next();
  };
};
