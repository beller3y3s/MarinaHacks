import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PastelButtons.css';

const PastelButtons = () => {
  const navigate = useNavigate();
  const [isJumping, setIsJumping] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked!`);
    
    if (buttonName === 'Activities') {
      navigate('/activities');
    } else if (buttonName === 'About') {
      navigate('/about');
    } else if (buttonName === 'Events') {
      navigate('/events');
    }
  };

  const handleBunnyClick = () => {
    setIsJumping(true);
    
    // Create multiple hearts
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50, // Random horizontal position
      y: Math.random() * 50 - 25,  // Random vertical position
    }));
    
    setHearts(prev => [...prev, ...newHearts]);
    
    // Reset the jumping state after animation completes
    setTimeout(() => {
      setIsJumping(false);
    }, 300); // Shorter duration for instant hop
    
    // Remove hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.includes(heart)));
    }, 2000);
  };

  return (
    <div className="main-page-container">
      <h1 className="main-title">Hop & Play</h1>
      <div className="pastel-buttons-container">
        <h2>🎲 What to do? 🎲</h2>
      
      <div className="button-group">
        <div className="button-row">
          <button 
            className="pastel-btn pastel-pink" 
            onClick={() => handleButtonClick('Activities')}
          >
            🌷 Activities 🌷
          </button>
          <button 
            className="pastel-btn pastel-lavender" 
            onClick={() => handleButtonClick('Events')}
          >
            🌷 Events 🌷
          </button>
          <button 
            className="pastel-btn pastel-mint" 
            onClick={() => handleButtonClick('About')}
          >
            🌷 About 🌷
          </button>
        </div>
      </div>
      
      {/* Cute bunny image in bottom right corner */}
      <img 
        src="/cute-bunny.png" 
        alt="Cute bunny" 
        className={`bottom-right-image ${isJumping ? 'bunny-hop' : ''}`}
        onClick={handleBunnyClick}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `calc(100% - 60px + ${heart.x}px)`,
            top: `calc(100% - 60px + ${heart.y}px)`,
          }}
        >
          💖
        </div>
      ))}
      </div>
    </div>
  );
};

export default PastelButtons;
