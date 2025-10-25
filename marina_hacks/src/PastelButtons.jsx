import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PastelButtons.css';

const PastelButtons = () => {
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked!`);
    
    if (buttonName === 'Activities') {
      navigate('/activities');
    }
    // You can add more navigation logic here for other buttons
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
