import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format date as: Day Month Date Year
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString(undefined, dateOptions);
  
  // Format time as: Hours:Minutes:Seconds
  const formattedTime = currentDateTime.toLocaleTimeString();

  return(
    <div>
      <h1>Welcome To Charusat</h1>
      <div className="datetime-container">
        <p><strong>Current Date:</strong> {formattedDate}</p>
        <p><strong>Current Time:</strong> {formattedTime}</p>
      </div>
    </div>
  )
}

export default App
