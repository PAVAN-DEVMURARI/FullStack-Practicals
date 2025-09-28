import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('gymReps')
    return savedCount ? parseInt(savedCount) : 0
  })

  useEffect(() => {
    localStorage.setItem('gymReps', count.toString())
  }, [count])

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev > 0 ? prev - 1 : 0)
  const reset = () => {
    setCount(0)
    localStorage.removeItem('gymReps')
  }

  return (
    <div className="gym-container">
      <header>
        <h1>💪 GYM REP COUNTER</h1>
        <p className="subtitle">Track your exercise repetitions</p>
      </header>

      <main className="counter-container">
        <div className="display-section">
          <span className="count">{count}</span>
          <span className="label">REPS</span>
        </div>

        <div className="controls">
          <button className="control-btn minus" onClick={decrement}>-</button>
          <button className="control-btn plus" onClick={increment}>+</button>
        </div>

        <button className="reset-btn" onClick={reset}>
          Reset Count
        </button>
      </main>

      <footer className="session-info">
        <p>Current Session: <strong>{count}</strong> reps</p>
      </footer>
    </div>
  )
}

export default App
