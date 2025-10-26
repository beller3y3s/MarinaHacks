import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);

  const handleBackClick = () => {
    // Create multiple hearts
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50, // Random horizontal position
      y: Math.random() * 50 - 25,  // Random vertical position
    }));
    
    setHearts(prev => [...prev, ...newHearts]);
    
    // Remove hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.includes(heart)));
    }, 2000);
    
    // Navigate back
    navigate('/');
  };

  const handleBunnyClick = (event) => {
    // Determine which bunny was clicked
    const isLeftBunny = event.target.classList.contains('about-bunny-left');
    const bunnyX = isLeftBunny ? 20 + 125 : window.innerWidth - 20 - 125; // Center of bunny (250px wide / 2 = 125px)
    const bunnyY = window.innerHeight - 20 - 125; // Center of bunny vertically
    
    // Create multiple hearts in a circular pattern around the bunny
    const newHearts = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5 - 0.25; // Random angle variation
      const radius = 60 + Math.random() * 80; // More random distance from center (60-140px)
      const x = bunnyX + Math.cos(angle) * radius + (Math.random() * 40 - 20); // Extra random offset
      const y = bunnyY + Math.sin(angle) * radius + (Math.random() * 40 - 20); // Extra random offset
      
      return {
        id: Date.now() + i,
        x: x,
        y: y,
        isBunnyHeart: true // Flag to identify these hearts
      };
    });
    
    setHearts(prev => [...prev, ...newHearts]);
    
    // Remove hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.includes(heart)));
    }, 2000);
  };

  return (
    <div className="about-page">
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Home
      </button>
      
      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={heart.isBunnyHeart ? {
            left: `${heart.x}px`,
            top: `${heart.y}px`,
          } : {
            left: `calc(100px + ${heart.x}px)`,
            top: `calc(20px + ${heart.y}px)`,
          }}
        >
          💖
        </div>
      ))}
      
      <h1 className="about-title">About</h1>
      <h2 className="about-subtitle">Origin / Introduction</h2>
      <p className="about-text">
        Hi users! Thank you for visiting our website ^-^ This was made for California State University, Long Beach's annual hackathon, MarinaHacks 5.0. We created this site to provide convenience to our users who are looking for activities to do by themselves or with their friends, whether it is creative, active, or productive. We hope to help you discover fun side quests and new hobbies to do when bored or just looking for something new! Thank you again for visiting our site &lt;3
        <br />
        <br />🥕
      </p>
      
      {/* Cute bunny images in bottom corners */}
      <img 
        src="/cute-bunny.png" 
        alt="Cute bunny" 
        className="about-bunny-image about-bunny-right"
        onClick={handleBunnyClick}
      />
      <img 
        src="/cute-bunny.png" 
        alt="Cute bunny" 
        className="about-bunny-image about-bunny-left"
        onClick={handleBunnyClick}
      />
    </div>
  );
}

export default AboutPage;
