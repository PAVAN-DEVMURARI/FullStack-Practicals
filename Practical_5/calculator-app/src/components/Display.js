import React from 'react';
import './Display.css';

const Display = ({ value, operation, previousValue, hasError = false }) => {
  const formatDisplay = (value) => {
    // Handle very long numbers
    if (value.length > 12) {
      const num = parseFloat(value);
      if (num > 999999999999) {
        return num.toExponential(6);
      }
      return num.toPrecision(12);
    }
    return value;
  };

  return (
    <div className={`calculator-display ${hasError ? 'error' : ''}`}>
      {operation && previousValue !== null && (
        <div className="operation-indicator">
          {previousValue} {operation}
        </div>
      )}
      <div className="display-value">
        {formatDisplay(value)}
      </div>
      <div className="display-info">
        <span className="calc-info">React Calculator v1.0</span>
      </div>
    </div>
  );
};

export default Display;