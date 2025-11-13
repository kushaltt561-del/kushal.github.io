import React, { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todoList")) || [];
    setItems(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems([...items, newItem]);
    setNewItem("");
  };

  const deleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = () => {
    const updated = [...items];
    updated[editIndex] = editValue;
    setItems(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📝 My To-Do List</h2>
      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {editIndex === i ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item}{" "}
                <button onClick={() => startEdit(i)}>Edit</button>
                <button onClick={() => deleteItem(i)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
