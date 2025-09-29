import React, { useState, useCallback } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [hasError, setHasError] = useState(false);

  const inputNumber = useCallback((num) => {
    setHasError(false);
    
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }, [display, waitingForNewValue]);

  const inputDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForNewValue]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setHasError(false);
  }, []);

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (isNaN(inputValue)) {
      setHasError(true);
      return;
    }

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      if (newValue === null) {
        setHasError(true);
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        if (secondValue === 0) {
          return null; // Division by zero
        }
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = useCallback(() => {
    const inputValue = parseFloat(display);

    if (isNaN(inputValue)) {
      setHasError(true);
      return;
    }

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      if (newValue === null) {
        setHasError(true);
        setDisplay('Error');
      } else {
        setDisplay(String(newValue));
      }
      
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  }, [display, previousValue, operation]);

  const handlePercentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  const handleSign = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  }, [display]);

  const buttonConfig = [
    // Row 1
    { value: 'AC', type: 'function', action: clear },
    { value: '±', type: 'function', action: handleSign },
    { value: '%', type: 'function', action: handlePercentage },
    { value: '÷', type: 'operator', action: () => performOperation('/') },
    
    // Row 2
    { value: '7', type: 'number', action: () => inputNumber(7) },
    { value: '8', type: 'number', action: () => inputNumber(8) },
    { value: '9', type: 'number', action: () => inputNumber(9) },
    { value: '×', type: 'operator', action: () => performOperation('*') },
    
    // Row 3
    { value: '4', type: 'number', action: () => inputNumber(4) },
    { value: '5', type: 'number', action: () => inputNumber(5) },
    { value: '6', type: 'number', action: () => inputNumber(6) },
    { value: '−', type: 'operator', action: () => performOperation('-') },
    
    // Row 4
    { value: '1', type: 'number', action: () => inputNumber(1) },
    { value: '2', type: 'number', action: () => inputNumber(2) },
    { value: '3', type: 'number', action: () => inputNumber(3) },
    { value: '+', type: 'operator', action: () => performOperation('+') },
    
    // Row 5
    { value: '0', type: 'number', action: () => inputNumber(0), span: 2 },
    { value: '.', type: 'number', action: inputDecimal },
    { value: '=', type: 'equals', action: handleEquals },
  ];

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1>React Calculator</h1>
        <p>Advanced Arithmetic Operations</p>
      </div>
      
      <div className="calculator-body">
        <Display 
          value={display}
          operation={operation}
          previousValue={previousValue}
          hasError={hasError}
        />

        <div className="buttons">
          {buttonConfig.map((btn, index) => (
            <Button
              key={index}
              value={btn.value}
              type={btn.type}
              onClick={btn.action}
              span={btn.span || 1}
              isActive={operation === btn.value.replace('×', '*').replace('÷', '/').replace('−', '-')}
            />
          ))}
        </div>
      </div>

      <div className="calculator-footer">
        <div className="features">
          <h3>Features & Operations:</h3>
          <div className="features-grid">
            <div className="feature-category">
              <h4>Basic Operations</h4>
              <ul>
                <li>✓ Addition (+)</li>
                <li>✓ Subtraction (−)</li>
                <li>✓ Multiplication (×)</li>
                <li>✓ Division (÷)</li>
              </ul>
            </div>
            <div className="feature-category">
              <h4>Advanced Features</h4>
              <ul>
                <li>✓ Decimal Support</li>
                <li>✓ Percentage (%)</li>
                <li>✓ Sign Toggle (±)</li>
                <li>✓ Clear Function (AC)</li>
              </ul>
            </div>
            <div className="feature-category">
              <h4>UI Features</h4>
              <ul>
                <li>✓ Responsive Design</li>
                <li>✓ Error Handling</li>
                <li>✓ Visual Feedback</li>
                <li>✓ Keyboard Support</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="calculator-info">
          <p>Built with React.js | Modern Calculator Interface</p>
          <div className="tech-stack">
            <span className="tech-badge">React</span>
            <span className="tech-badge">CSS3</span>
            <span className="tech-badge">JavaScript ES6+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;