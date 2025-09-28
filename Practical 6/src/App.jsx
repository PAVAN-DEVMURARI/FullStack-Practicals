import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [task,setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [isEditing, setIsEditing] = useState(null)

  const addTask = () => {
    if (task.trim() === '') 
    {
      alert('Please enter a task')
      return
    }
    if (isEditing !== null) {
      const updatedTasks = tasks.map((t, index) => 
        index === isEditing ? task : t
      )
      setTasks(updatedTasks)
      setIsEditing(null)
    } 
    else 
    {
      setTasks([...tasks, task])
    }
    setTask('')
  }

  const deleteTask = (id) => {
    //write the function to delete a task
    const updatedTasks = tasks.filter((_, index) => index !== id)
    setTasks(updatedTasks)
    if (isEditing === id) {
      setIsEditing(null)
      setTask('')
    }
  }

  const editTask = (id) => {
    //write the function to edit a task
    setTask(tasks[id])
    setIsEditing(id)
  }

  return (
    <div className="app-container">
      <h1 className="app-title">My Todo List</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">
          {isEditing !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="empty-state">
          No tasks yet. Add one above to get started! 📝
        </div>
      ) : (
        <ul className="tasks-list">
          {tasks.map((t, index) => (
            <li key={index} className="task-item">
              <span className="task-text">{t}</span>
              <div className="task-actions">
                <button onClick={() => editTask(index)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteTask(index)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
