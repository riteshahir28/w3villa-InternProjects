import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

 

// import { useState, useEffect } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const API_URL = "http://localhost:5000/crud"; // Apna backend API URL


  // ✅ GET - Load Data from API
  const fetchTodos = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setTodos(data); 
        } catch (err) {
            console.error("Error fetching todos:", err);
        }
    };
 
    useEffect(() => {
        fetchTodos();
        
    });


  useEffect(() => {
     fetchTodos();
  }, []);

  // ✅ POST or UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = { title, name };

    if (editIndex !== null) {
      // UPDATE (PUT)
      fetch(`${API_URL}/${todos[editIndex]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          const updatedTodos = [...todos];
          updatedTodos[editIndex] = updatedTodo;
          setTodos(updatedTodos);
          setEditIndex(null);
          setTitle("");
          setName("");
        });
    } else {
      // ADD (POST)
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos([...todos, newTodo]);
          setTitle("");
          setName("");
        });
    }
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // ✅ Edit Button
  const handleEdit = (index) => {
    setTitle(todos[index].title);
    setName(todos[index].name);
    setEditIndex(index);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>CRUD App</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ flex: "1", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ flex: "1", padding: "8px" }}
        />
        <button
          type="submit"
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "8px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      {todos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Todos Yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{todo.title}</strong> - {todo.name}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    marginRight: "5px",
                    background: "#2196F3",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  style={{
                    background: "#f44336",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
