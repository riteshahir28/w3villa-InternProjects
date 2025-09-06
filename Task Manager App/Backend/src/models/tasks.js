import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { users } from "./dbmodel.js";

export const tasks = db.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: users,
        key: "id",
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

// Relations
users.hasMany(tasks, { foreignKey: "userId", onDelete: "CASCADE" });
tasks.belongsTo(users, { foreignKey: "userId" });
