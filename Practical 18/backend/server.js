const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database (In a real app, this would be MongoDB)
let tasks = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create a beautiful homepage design for the new website",
    priority: "high",
    status: "in-progress",
    category: "Design",
    createdAt: new Date('2025-09-28T10:00:00Z'),
    dueDate: new Date('2025-09-30T18:00:00Z')
  },
  {
    id: 2,
    title: "Setup Database",
    description: "Configure MongoDB database and create necessary collections",
    priority: "medium",
    status: "completed",
    category: "Backend",
    createdAt: new Date('2025-09-27T09:00:00Z'),
    dueDate: new Date('2025-09-29T17:00:00Z')
  },
  {
    id: 3,
    title: "Write API Documentation",
    description: "Document all API endpoints with examples and responses",
    priority: "low",
    status: "pending",
    category: "Documentation",
    createdAt: new Date('2025-09-28T14:00:00Z'),
    dueDate: new Date('2025-10-05T12:00:00Z')
  }
];

let nextId = 4;

// Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
  try {
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Create new task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Title and description are required'
      });
    }

    const newTask = {
      id: nextId++,
      title,
      description,
      priority: priority || 'medium',
      status: 'pending',
      category: category || 'General',
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : null
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
      id: parseInt(req.params.id), // Ensure ID doesn't change
      updatedAt: new Date()
    };

    tasks[taskIndex] = updatedTask;

    res.json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get task statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      pending: tasks.filter(t => t.status === 'pending').length,
      highPriority: tasks.filter(t => t.priority === 'high').length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});