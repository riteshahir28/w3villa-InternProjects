import { useState } from "react";
import API from "../api"; // 👈 apne api.js ka path
import { useAuth } from "../authcontext";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const { setIsLoggedIn, setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "", // input change hote hi error reset ho jaye
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ email: "", password: "" }); // reset error

        try {
            const response = await API.post("/api/login", formData, {withCredentials:true});

            if (response.status === 200) {
                setIsLoggedIn(true);                
                alert("Login successful!");
                setFormData({ email: "", password: "" });
                setUser(response.data.user)
                navigate("/Profile");
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response?.data?.field === "email") {
                setErrors({ email: error.response.data.message, password: "" });
            } else if (error.response?.data?.field === "password") {
                setErrors({ email: "", password: error.response.data.message });
            } else {
                alert(error.response?.data?.message || "Login failed!");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h3 className="text-center mb-4">Login</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && (
                                    <div className="text-danger small">{errors.email}</div>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""
                                        }`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {/* Pehle se helper text */}
                                <div className="form-text">Minimum 6 characters required.</div>

                                {/* Error from backend */}
                                {errors.password && (
                                    <div className="text-danger small">{errors.password}</div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-success w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
