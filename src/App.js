import './App.css';
import React from 'react';
import Calculator from "./components/Calculator"

function App() {
  return (
      <>
        <br />
        <div id="header" className="header">
          <h2>CSc 47300 React Calculator</h2>
        </div>
        <Calculator />
      </>
  );
}

export default App;
