import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── READ: Fetch all todos ───────────────────────────────
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ─── CREATE: Add a new todo ──────────────────────────────
  const addTodo = async (title) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to create todo');
      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // ─── UPDATE: Toggle completed or edit title ──────────────
  const updateTodo = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // ─── DELETE: Remove a todo ───────────────────────────────
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">Todo List</h1>
          <p className="subtitle">Powered by MERN + Supabase</p>
          {todos.length > 0 && (
            <div className="stats">
              <span className="stat">
                <strong>{completedCount}</strong> done
              </span>
              <span className="stat-divider">·</span>
              <span className="stat">
                <strong>{todos.length - completedCount}</strong> remaining
              </span>
            </div>
          )}
        </header>

        {/* CRUD Labels Banner */}
        <div className="crud-banner">
          <span className="crud-tag create">Create</span>
          <span className="crud-tag read">Read</span>
          <span className="crud-tag update">Update</span>
          <span className="crud-tag delete">Delete</span>
        </div>

        {/* Create – Add Todo Form */}
        <section className="section">
          <div className="section-label">
            <span className="label-dot create-dot" />
            <span className="label-text">CREATE — Add a new todo</span>
          </div>
          <TodoForm onAdd={addTodo} />
        </section>

        {/* Read + Update + Delete – Todo List */}
        <section className="section">
          <div className="section-label">
            <span className="label-dot read-dot" />
            <span className="label-text">READ / UPDATE / DELETE — Manage todos</span>
          </div>

          {error && (
            <div className="error-banner">
              ⚠️ {error}
              <button className="dismiss-btn" onClick={() => setError(null)}>✕</button>
            </div>
          )}

          {loading ? (
            <div className="loading">
              <div className="spinner" />
              <span>Loading todos…</span>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
