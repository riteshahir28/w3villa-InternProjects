import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/authContext";
import API from "../utils/api.js";

function AllTasks() {
  const { role, isAuthenticated } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    status: ""
  });

  // Fetch tasks only once when user authenticated
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (isAuthenticated) {
          const response = await API.get("/tasks/getMyTasks", {
            withCredentials: true,
          });
          setTasks(response.data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [isAuthenticated]);

  // Delete task (Admin only)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${id}`, { withCredentials: true });
        setTasks(tasks.filter((t) => t.id !== id));
        console.log(tasks);
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  // Start editing task
  const handleUpdate = (task) => {
    setEditingTask(task.id);
    setUpdateData({
      title: task.title,
      description: task.description,
      status: task.status
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save task updates
  const handleSaveUpdate = async (taskId) => {
    try {
      const updatePayload = role === "admin" 
        ? updateData  // Admin can update all fields
        : { status: updateData.status }; // User can only update status

      await API.put(`/tasks/${taskId}`, updatePayload, {
        withCredentials: true,
      });

      // Update the task in the local state
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updatePayload }
          : task
      ));

      setEditingTask(null);
      setUpdateData({ title: "", description: "", status: "" });
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  // Cancel editing
  const handleCancelUpdate = () => {
    setEditingTask(null);
    setUpdateData({ title: "", description: "", status: "" });
  };

  if (!isAuthenticated) {
    return <p className="text-center text-lg mt-10"> Please login first</p>;
  }

return (
  <div className="p-4">
    <h1 className="text-xl mb-4">Tasks</h1>

    {tasks.length === 0 ? (
      <p>No tasks available.</p>
    ) : (
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                {editingTask === task.id ? (
                  <input
                    type="text"
                    name="title"
                    value={updateData.title}
                    onChange={handleInputChange}
                    className="w-full p-1 border"
                    disabled={role !== "admin"}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td className="p-2">
                {editingTask === task.id ? (
                  <input
                    type="text"
                    name="description"
                    value={updateData.description}
                    onChange={handleInputChange}
                    className="w-full p-1 border"
                    disabled={role !== "admin"}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td className="p-2">
                {editingTask === task.id ? (
                  <select
                    name="status"
                    value={updateData.status}
                    onChange={handleInputChange}
                    className="p-1 border"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>
              <td className="p-2">
                {editingTask === task.id ? (
                  <>
                    <button
                      onClick={() => handleSaveUpdate(task.id)}
                      className="mr-2 px-2 py-1 bg-green-200 text-black"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelUpdate}
                      className="px-2 py-1 bg-red-200 text-black"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleUpdate(task)}
                      className="mr-2 px-2 py-1 bg-gray-200 text-black"
                    >
                      Update
                    </button>

                    {role === "admin" && (
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-2 py-1 bg-gray-200 text-black"
                      >
                        Delete
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default AllTasks;
