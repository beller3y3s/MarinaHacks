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
          style={{
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
        A website that was made for California State University, Long Beach's annual hackathon, MarinaHacks. For MarianaHacks 5.0, we created this site to provide convenience to our users who are looking for options to do by themselves or with their friends, whether it be creative, active, or even productive. This website was made to help individuals and friend groups discover fun, spontaneous "side quests", activities, and hobbies to do when they're bored or just looking for something new.

        Searching for recommendations separately on our search engines may be tedious. In this convenient web page, users can find activities and nearby events within their interests and needs. With our website's flexibility, we hope to be a suited website for users.
      </p>
    </div>
  );
}

export default AboutPage;
