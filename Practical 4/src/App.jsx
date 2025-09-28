import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Counter functions
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)
  const incrementFive = () => setCount(count + 5)

  return (
    <div className="app-container">
      <h1>Counter App</h1>

      {/* Counter Section */}
      <div className="counter-section">
        <h2>Counter</h2>
        <div className="counter-display">
          <span className="count-value">{count}</span>
        </div>
        
        <div className="button-group">
          <button onClick={increment} className="btn btn-primary">
            Increment (+1)
          </button>
          <button onClick={decrement} className="btn btn-secondary">
            Decrement (-1)
          </button>
          <button onClick={incrementFive} className="btn btn-success">
            Increment Five (+5)
          </button>
          <button onClick={reset} className="btn btn-danger">
            Reset (0)
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div className="status-section">
        <p>Current Count: <strong>{count}</strong></p>
      </div>
    </div>
  )
}

export default App
