import React, { useEffect, useState, useContext } from "react";
import API from '../utils/api';  
import { AuthContext } from '../components/authContext';

const AllUsers = () => {
  const { role, isAuthenticated } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Users fetch karna
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (isAuthenticated && role === "admin") {
          const response = await API.get("/users", { withCredentials: true });
          setUsers(response.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [isAuthenticated, role]);

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/users/${id}`, { withCredentials: true });
        setUsers(users.filter((u) => u.id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  if (!isAuthenticated) {
    return <p className="text-center text-lg mt-10">Please login first</p>;
  }

  if (role !== "admin") {
    return <p className="text-center text-lg mt-10 text-red-500">Only admin can view users</p>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Registered Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg shadow bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Role</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3 font-semibold">{user.fullName}</td>
                  <td className="border p-3">{user.email}</td>
                  <td
                    className={`border p-3 font-medium ${
                      user.role === "admin"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="border p-3">
                    {role === "admin" && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
