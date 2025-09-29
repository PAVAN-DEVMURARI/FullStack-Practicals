import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit
}) => {
  const [editValue, setEditValue] = useState(task.text);

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue === '') {
      alert('Task cannot be empty!');
      return;
    }
    onSaveEdit(task.id, trimmedValue);
    setEditValue(trimmedValue);
  };

  const handleCancel = () => {
    setEditValue(task.text);
    onCancelEdit();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`complete-btn ${task.completed ? 'checked' : ''}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? '✓' : '○'}
        </button>

        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="edit-input"
              autoFocus
              maxLength={200}
            />
            <div className="edit-actions">
              <button
                onClick={handleSave}
                className="save-btn"
                title="Save"
              >
                ✓
              </button>
              <button
                onClick={handleCancel}
                className="cancel-btn"
                title="Cancel"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="task-text-container">
            <span className="task-text">{task.text}</span>
            <div className="task-meta">
              <span className="task-date">
                Created: {new Date(task.createdAt).toLocaleString()}
              </span>
              {task.completed && task.completedAt && (
                <span className="task-date completed-date">
                  Completed: {new Date(task.completedAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={() => onStartEdit(task.id, task.text)}
            className="edit-btn"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="delete-btn"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;