import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

// Context create
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // backend se user ka data
  const [role, setRole] = useState(null); // "USER", "ADMIN"
  const [loading, setLoading] = useState(true);

  // 👇 ye ek example hai - backend se token verify karke user fetch karna
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // yaha tum backend ka API call karoge "/auth/me" ya "/verify"
        // jo cookie me saved accessToken ko check karega
        const res = await fetch("http://localhost:5000/api/profile", {
          credentials: "include", // cookie bhejne ke liye
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setRole(data.user.role);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function (backend call ke baad set karna)
  const login = (userData) => {
    console.log(userData.data.user.role);
    setUser(userData.data.user);
    setRole(userData.data.user.role);

     
  };

  // Logout function
   const logout = async () => {
    setUser(null);
    setRole(null);
    try{
      await API.post('/logout')
    }catch(err){

    }
    // backend me bhi logout API call kar sakte ho
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
