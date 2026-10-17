import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    await onAdd(title.trim());
    setTitle('');
    setSubmitting(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} id="add-todo-form">
      <input
        id="todo-input"
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
        maxLength={200}
        autoFocus
      />
      <button
        id="add-todo-btn"
        type="submit"
        className="add-btn"
        disabled={!title.trim() || submitting}
      >
        {submitting ? '…' : '+ Add'}
      </button>
    </form>
  );
}

export default TodoForm;
