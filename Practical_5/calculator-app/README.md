# React Calculator App 🧮

A modern, responsive calculator application built with React.js featuring a beautiful glass-morphism design and advanced functionality.

![Calculator Demo](https://img.shields.io/badge/React-Calculator-blue) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0-orange)

## 🌟 Features

### ✨ Core Calculator Functions
- **Basic Arithmetic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Decimal Support**: Handle floating-point calculations
- **Percentage Calculations**: Convert numbers to percentages
- **Sign Toggle**: Switch between positive and negative numbers
- **Clear Function**: Reset calculator to initial state
- **Error Handling**: Display errors for invalid operations (like division by zero)

### 🎨 Advanced UI Features
- **Modern Glass-Morphism Design**: Beautiful translucent interface
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Visual Feedback**: Button press animations and hover effects
- **Operation Indicators**: Shows current operation and previous value
- **Error States**: Visual feedback for calculation errors
- **Smooth Animations**: Professional transitions and micro-interactions

### 🛠️ Technical Features
- **Component-Based Architecture**: Modular React components
- **State Management**: React hooks for efficient state handling
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance Optimized**: useCallback hooks to prevent unnecessary re-renders
- **Error Boundaries**: Graceful error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - The calculator should load automatically

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
calculator-app/
├── 📁 public/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📄 Button.js          # Reusable button component
│   │   ├── 🎨 Button.css         # Button styling
│   │   ├── 📄 Display.js         # Calculator display
│   │   └── 🎨 Display.css        # Display styling
│   ├── 📄 Calculator.js          # Main calculator component
│   ├── 🎨 Calculator.css         # Calculator styling
│   ├── 📄 App.js                # Root component
│   └── 🎨 App.css               # Global app styling
└── 📄 README.md                 # This file
```

## 🎮 How to Use

### Basic Operations
1. **Numbers**: Click number buttons (0-9) to input values
2. **Operations**: Click operation buttons (+, −, ×, ÷) to perform calculations
3. **Equals**: Click = to execute the calculation
4. **Clear**: Click AC to reset the calculator

### Advanced Functions
- **Decimal Point**: Click . to add decimal places
- **Percentage**: Click % to convert the current number to a percentage
- **Sign Toggle**: Click ± to change positive/negative
- **Continuous Calculations**: Chain operations without pressing equals

## 🏗️ Component Architecture

### Calculator Component
- Main component managing calculator state
- Business logic for calculations
- Error handling and validation

### Display Component
- Calculator display with current value
- Operation indicator
- Error state visualization

### Button Component
- Reusable button with different types
- Active state management
- Accessibility features

## 🎨 Design Features

### Glass Morphism Effects
- Backdrop filter blur effects
- Translucent backgrounds
- Modern gradient design

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly button sizes
- Adaptive layout

## 📚 Learning Outcomes

This project demonstrates:
- **React.js**: Functional components, hooks, state management
- **JavaScript ES6+**: Modern syntax and features
- **CSS3**: Grid, flexbox, animations, responsive design
- **Component Architecture**: Modular design patterns
- **User Experience**: Intuitive interface design

## 🔮 Future Enhancements

- Scientific calculator mode
- Calculation history
- Multiple themes
- Enhanced keyboard support
- Memory functions

## 📄 License

Created for educational purposes as part of React.js learning practicals.

---

**Built with ❤️ using React.js**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
