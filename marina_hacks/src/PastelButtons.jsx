import React from 'react';
import './PastelButtons.css';

const PastelButtons = () => {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked!`);
    // You can add your custom logic here
  };

  return (
    <div className="pastel-buttons-container">
      <h2>🎲 What to do? 🎲</h2>
      
      <div className="button-group">
        <div className="button-row">
          <button 
            className="pastel-btn pastel-pink" 
            onClick={() => handleButtonClick('Activities')}
          >
            🎨 Activities 🎨
          </button>
          <button 
            className="pastel-btn pastel-lavender" 
            onClick={() => handleButtonClick('Events')}
          >
            🎉 Events 🎉
          </button>
          <button 
            className="pastel-btn pastel-mint" 
            onClick={() => handleButtonClick('About')}
          >
            ℹ️ About ℹ️
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastelButtons;
