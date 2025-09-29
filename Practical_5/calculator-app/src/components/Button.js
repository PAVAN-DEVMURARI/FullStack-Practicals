import React from 'react';
import './Button.css';

const Button = ({ 
  value, 
  onClick, 
  className = '', 
  type = 'number',
  isActive = false,
  span = 1 
}) => {
  const getButtonClass = () => {
    let baseClass = 'calculator-button';
    
    switch (type) {
      case 'operator':
        baseClass += ' btn-operator';
        break;
      case 'function':
        baseClass += ' btn-function';
        break;
      case 'equals':
        baseClass += ' btn-equals';
        break;
      default:
        baseClass += ' btn-number';
    }
    
    if (isActive) {
      baseClass += ' active';
    }
    
    if (span > 1) {
      baseClass += ` span-${span}`;
    }
    
    return `${baseClass} ${className}`.trim();
  };

  return (
    <button 
      className={getButtonClass()}
      onClick={() => onClick(value)}
      aria-label={`Calculator button ${value}`}
    >
      {value}
    </button>
  );
};

export default Button;