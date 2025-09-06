import { tasks } from "../models/tasks.js";
import { users } from "../models/dbmodel.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, assignTo } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Assign to ALL users
    if (assignTo === "all") {
      const allUsers = await users.findAll({ attributes: ["id"] });

      if (!allUsers.length) {
        return res.status(404).json({ message: "No users found to assign task" });
      }

      const createdTasks = await Promise.all(
        allUsers.map((user) =>
          tasks.create({
            title,
            description,
            status: status || "pending",
            userId: user.id,
          })
        )
      );

      return res.status(201).json({
        message: "Task assigned to all users successfully",
        tasks: createdTasks,
      });
    }

    // Assign to Single user (by id or email)
    let user;
    if (isNaN(assignTo)) {
      user = await users.findOne({ where: { email: assignTo } });
    } else {
      user = await users.findByPk(assignTo);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found for task assignment" });
    }

    const task = await tasks.create({
      title,
      description,
      status: status || "pending",
      userId: user.id,
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error while creating task" });
  }
};

// Get logged-in user's tasks
export const getMyTasks = async (req, res) => {
  try {
    const myTasks = await tasks.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(myTasks);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    // Admin can update any task, users can only update their own tasks
    const whereClause = req.user.role === "admin" 
      ? { id } 
      : { id, userId: req.user.id };

    const task = await tasks.findOne({ where: whereClause });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Users can only update status, admins can update all fields
    const updateData = req.user.role === "admin" 
      ? { title, description, status, dueDate }
      : { status };

    await task.update(updateData);

    res.json({ message: "Task updated", task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Admin can delete any task, users can only delete their own tasks
    const whereClause = req.user.role === "admin" 
      ? { id } 
      : { id, userId: req.user.id };

    const task = await tasks.findOne({ where: whereClause });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
