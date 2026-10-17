import { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // UPDATE: Toggle completed status
  const handleToggle = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  // UPDATE: Save edited title
  const handleEdit = async () => {
    if (!editTitle.trim() || editTitle.trim() === todo.title) {
      setEditTitle(todo.title);
      setIsEditing(false);
      return;
    }
    setSaving(true);
    await onUpdate(todo.id, { title: editTitle.trim() });
    setSaving(false);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  // DELETE: Remove todo
  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(todo.id);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${deleting ? 'deleting' : ''}`} id={`todo-${todo.id}`}>
      {/* Toggle checkbox – UPDATE (completed) */}
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        id={`check-${todo.id}`}
        aria-label="Toggle complete"
      />

      {/* Title – READ / UPDATE (edit) */}
      {isEditing ? (
        <input
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleEditKeyDown}
          autoFocus
          disabled={saving}
          maxLength={200}
          id={`edit-${todo.id}`}
        />
      ) : (
        <span
          className="todo-title"
          onDoubleClick={() => !todo.completed && setIsEditing(true)}
          title={todo.completed ? '' : 'Double-click to edit'}
        >
          {todo.title}
        </span>
      )}

      {/* Action buttons */}
      <div className="todo-actions">
        {!todo.completed && !isEditing && (
          <button
            className="action-btn edit-btn"
            onClick={() => setIsEditing(true)}
            id={`edit-btn-${todo.id}`}
            aria-label="Edit todo"
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          disabled={deleting}
          id={`delete-btn-${todo.id}`}
          aria-label="Delete todo"
          title="Delete"
        >
          {deleting ? '…' : '🗑️'}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
