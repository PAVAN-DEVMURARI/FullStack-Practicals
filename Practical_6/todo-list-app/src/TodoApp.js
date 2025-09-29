import React, { useState, useEffect, useCallback } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  // Generate unique ID for new tasks
  const generateId = useCallback(() => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }, []);

  // Add new task
  const addTask = useCallback((e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue === '') {
      alert('Please enter a task!');
      return;
    }

    const newTask = {
      id: generateId(),
      text: trimmedValue,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setInputValue('');
  }, [inputValue, generateId]);

  // Delete task
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingValue('');
    }
  }, [editingId]);

  // Toggle task completion
  const toggleComplete = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null
            }
          : task
      )
    );
  }, []);

  // Start editing task
  const startEditing = useCallback((id, text) => {
    setEditingId(id);
    setEditingValue(text);
  }, []);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setEditingId(null);
    setEditingValue('');
  }, []);

  // Save edited task
  const saveEdit = useCallback((id) => {
    const trimmedValue = editingValue.trim();
    
    if (trimmedValue === '') {
      alert('Task cannot be empty!');
      return;
    }

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, text: trimmedValue }
          : task
      )
    );
    
    setEditingId(null);
    setEditingValue('');
  }, [editingValue]);

  // Clear all tasks
  const clearAllTasks = useCallback(() => {
    if (tasks.length === 0) {
      alert('No tasks to clear!');
      return;
    }
    
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
      setEditingId(null);
      setEditingValue('');
    }
  }, [tasks.length]);

  // Clear completed tasks
  const clearCompleted = useCallback(() => {
    const completedTasks = tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
      alert('No completed tasks to clear!');
      return;
    }
    
    if (window.confirm(`Clear ${completedTasks.length} completed task(s)?`)) {
      setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    }
  }, [tasks]);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Handle keyboard events for editing
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="todo-app">
      <div className="todo-header">
        <h1>📝 Smart Todo List</h1>
        <p>Organize your tasks efficiently with React Hooks</p>
      </div>

      <div className="todo-container">
        {/* Add Task Form */}
        <form onSubmit={addTask} className="add-task-form">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="task-input"
              maxLength={200}
            />
            <button type="submit" className="add-btn">
              ➕ Add Task
            </button>
          </div>
        </form>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{totalTasks}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{activeTasks}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{completionRate}%</span>
              <span className="stat-label">Progress</span>
            </div>
          </div>
          
          {totalTasks > 0 && (
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="controls">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({totalTasks})
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({activeTasks})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedTasks})
            </button>
          </div>

          <div className="action-buttons">
            <button
              onClick={clearCompleted}
              className="clear-btn secondary"
              disabled={completedTasks === 0}
            >
              Clear Completed
            </button>
            <button
              onClick={clearAllTasks}
              className="clear-btn danger"
              disabled={totalTasks === 0}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'all' ? '📋' : filter === 'active' ? '⏳' : '✅'}
              </div>
              <h3>
                {filter === 'all' && totalTasks === 0 && 'No tasks yet'}
                {filter === 'all' && totalTasks > 0 && 'All tasks are hidden by filter'}
                {filter === 'active' && 'No active tasks'}
                {filter === 'completed' && 'No completed tasks'}
              </h3>
              <p>
                {filter === 'all' && totalTasks === 0 && 'Add your first task to get started!'}
                {filter === 'active' && 'All tasks are completed! 🎉'}
                {filter === 'completed' && 'Complete some tasks to see them here.'}
              </p>
            </div>
          ) : (
            <ul className="tasks-list">
              {filteredTasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`complete-btn ${task.completed ? 'checked' : ''}`}
                      aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.completed ? '✓' : '○'}
                    </button>

                    {editingId === task.id ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                          className="edit-input"
                          autoFocus
                          maxLength={200}
                        />
                        <div className="edit-actions">
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="save-btn"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelEditing}
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

                  {editingId !== task.id && (
                    <div className="task-actions">
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="edit-btn"
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="delete-btn"
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="app-info">
            <h4>Features:</h4>
            <ul>
              <li>✓ Add, Edit, Delete Tasks</li>
              <li>✓ Mark Complete/Incomplete</li>
              <li>✓ Filter by Status</li>
              <li>✓ Local Storage Persistence</li>
              <li>✓ Progress Tracking</li>
              <li>✓ Responsive Design</li>
            </ul>
          </div>
          
          <div className="tech-info">
            <p>Built with React Hooks • useState • useEffect • localStorage</p>
            <div className="tech-badges">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Hooks</span>
              <span className="tech-badge">localStorage</span>
              <span className="tech-badge">CSS3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;