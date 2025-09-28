import React, { useState, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  // Handle task creation/update
  const handleTaskSubmit = async (taskData) => {
    try {
      const url = editingTask ? `${API_BASE}/tasks/${editingTask.id}` : `${API_BASE}/tasks`;
      const method = editingTask ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (data.success) {
        if (editingTask) {
          setTasks(tasks.map(task => task.id === editingTask.id ? data.data : task));
        } else {
          setTasks([...tasks, data.data]);
        }
        setShowForm(false);
        setEditingTask(null);
        fetchStats();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle task status update
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks(tasks.map(task => task.id === taskId ? data.data : task));
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'in-progress') return task.status === 'in-progress';
    if (filter === 'high') return task.priority === 'high';
    return true;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Creative Task Manager</h1>
          <p>Organize your work, boost productivity, achieve more</p>
          <button 
            className="hero-cta"
            onClick={() => setShowForm(true)}
          >
            Create New Task
          </button>
        </div>
        <div className="hero-bg"></div>
      </div>

      <div className="container">
        <Stats stats={stats} />

        <div className="controls">
          <div className="filters">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'in-progress' ? 'active' : ''}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={filter === 'high' ? 'active' : ''}
              onClick={() => setFilter('high')}
            >
              High Priority
            </button>
          </div>

          <button 
            className="add-task-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Task
          </button>
        </div>

        <div className="tasks-grid">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks found</h3>
              <p>Create your first task to get started!</p>
              <button 
                className="create-first-task"
                onClick={() => setShowForm(true)}
              >
                Create Task
              </button>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setShowForm(true);
                }}
                onDelete={handleDeleteTask}
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          )}
        </div>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
