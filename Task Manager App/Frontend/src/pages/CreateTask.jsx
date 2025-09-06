import { useState, useContext } from "react";
import { AuthContext } from "../components/authContext";
import API from "../utils/api";
import { useNavigate } from "react-router";

function CreateTask() {
  const { role, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [assignTo, setAssignTo] = useState(""); 
  const [assignAll, setAssignAll] = useState(false); // ✅ new state
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || role !== "admin") {
    return (
      <p className="text-center text-lg mt-10 text-red-500">
        ⚠️ Only admin can create tasks!
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Current user role:", role);
    console.log("Is authenticated:", isAuthenticated);
    console.log("Form data:", { title, description, status, assignTo: assignAll ? "all" : assignTo });

    try {
      const response = await API.post(
        "/tasks/createTask",
        { title, description, status, assignTo: assignAll ? "all" : assignTo },
        { withCredentials: true }
      );

      console.log("Task creation response:", response);
      alert("Task created successfully!");
      navigate("/tasks");
    } catch (err) {
      console.error("Error creating task:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      alert(`Failed to create task! Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Task</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter task title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter task description"
          ></textarea>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Assign To */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Assign To
          </label>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={assignAll}
              onChange={() => setAssignAll(!assignAll)}
            />
            <span>Assign to all users</span>
          </div>

          {!assignAll && (
            <input
              type="text"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2"
              placeholder="Enter user email or ID"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
