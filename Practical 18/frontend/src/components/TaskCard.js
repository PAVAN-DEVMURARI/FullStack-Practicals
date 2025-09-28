import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusUpdate }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#26de81';
      default: return '#3742fa';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#26de81';
      case 'in-progress': return '#3742fa';
      case 'pending': return '#ffa502';
      default: return '#747d8c';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div className={`task-card ${task.status} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-header">
        <div className="task-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority.toUpperCase()}
        </div>
        <div className="task-category">{task.category}</div>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>

      <div className="task-meta">
        <div className="task-dates">
          <div className="due-date">
            📅 {formatDate(task.dueDate)}
            {isOverdue() && <span className="overdue-label">OVERDUE</span>}
          </div>
          <div className="created-date">
            Created: {formatDate(task.createdAt)}
          </div>
        </div>
      </div>

      <div className="task-status">
        <select
          value={task.status}
          onChange={(e) => onStatusUpdate(task.id, e.target.value)}
          className="status-select"
          style={{ borderColor: getStatusColor(task.status) }}
        >
          <option value="pending">📋 Pending</option>
          <option value="in-progress">⚡ In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

      <div className="task-actions">
        <button 
          className="edit-btn"
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          ✏️
        </button>
        <button 
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
        >
          🗑️
        </button>
      </div>

      <div className="task-progress-bar">
        <div 
          className="progress-fill"
          style={{
            width: task.status === 'completed' ? '100%' : 
                   task.status === 'in-progress' ? '60%' : '20%',
            backgroundColor: getStatusColor(task.status)
          }}
        ></div>
      </div>
    </div>
  );
};

export default TaskCard;