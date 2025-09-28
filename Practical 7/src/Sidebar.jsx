import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <button onClick={handleToggle} style={{ margin: '10px' }}>
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      <div
        style={{
          width: isOpen ? '200px' : '0',
          height: '100vh',
          background: '#282c34',
          color: '#fff',
          overflowX: 'hidden',
          transition: 'width 0.3s',
          position: 'fixed',
          top: 0,
          left: 0,
          padding: isOpen ? '20px' : '0',
          zIndex: 1000,
        }}
      >
        {isOpen && (
          <>
            <h2>Sidebar</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ margin: '10px 0' }}>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Home</Link>
              </li>
              <li style={{ margin: '10px 0' }}>
                <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>About</Link>
              </li>
              <li style={{ margin: '10px 0' }}>
                <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Contact</Link>
              </li>
              <li style={{ margin: '10px 0' }}>
                <Link to="/services" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Services</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;