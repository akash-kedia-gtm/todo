# 📝 Todo App — MERN + Supabase

A simple Todo application built with the **MERN stack** (MongoDB → Supabase) to demonstrate the four **CRUD operations**.

## 🏗️ Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (Vite) |
| **Backend** | Node.js + Express.js |
| **Database** | Supabase (PostgreSQL) |

## 📂 Project Structure

```
todo-test/
├── backend/
│   ├── routes/
│   │   └── todos.js      ← CRUD route handlers
│   ├── server.js         ← Express app entry point
│   ├── setup-db.js       ← DB connection checker
│   └── .env              ← Supabase credentials
└── frontend/
    └── src/
        ├── App.jsx              ← Main app + API calls
        ├── App.css              ← All styles
        └── components/
            ├── TodoForm.jsx     ← CREATE operation
            ├── TodoList.jsx     ← READ operation
            └── TodoItem.jsx     ← UPDATE + DELETE
```

## 🔄 CRUD Operations

| Operation | HTTP Method | Endpoint | Description |
|-----------|------------|----------|-------------|
| **Create** | `POST` | `/api/todos` | Add a new todo |
| **Read** | `GET` | `/api/todos` | Fetch all todos |
| **Update** | `PUT` | `/api/todos/:id` | Edit title or toggle completion |
| **Delete** | `DELETE` | `/api/todos/:id` | Remove a todo |

## 🚀 Running Locally

**Backend** (runs on port 5001):
```bash
cd backend
npm install
npm run dev
```

**Frontend** (runs on port 5173):
```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173**

## 🗃️ Supabase Table Schema

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
