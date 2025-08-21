import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 navigate hook import
import API from "../api"; // 👈 path apne project ke hisaab se adjust karo

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate(); // 👈 navigate instance

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // axios instance ka use
            const response = await API.post("/api/register", formData);

            if (response.status === 200) {
                alert("Registration successful!");
                setFormData({ name: "", email: "", password: "" });

                // 👇 yaha pe login page pe redirect
                navigate("/login");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6"> 
                    <div className="card shadow-lg p-4">
                        <h3 className="text-center mb-4">Register</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
