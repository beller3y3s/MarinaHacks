import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

function Events() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showEvents, setShowEvents] = useState(false);

  // Categories of events
  const categories = [
    { name: 'Community/Social', icon: '👥' },
    { name: 'Arts/Culture', icon: '🎨' },
    { name: 'Food/Markets', icon: '🍽️' },
    { name: 'Sports/Wellness', icon: '⚽' }
  ];

  // Long Beach Events - real local happenings
  const events = {
      'Community/Social': [
      { title: 'Long Beach Public Library Events', date: 'Various Dates', description: 'Book clubs, crafting, and community programs', url: 'https://www.longbeach.gov/library/events/' },
      { title: 'California State University, Long Beach Campus Events', date: 'All Year', description: 'Student activities and campus happenings', url: 'https://www.asicsulb.org/corporate/enjoy/event-calendar#year=2025&month=10&day=26&view=month' },
      { title: 'Long Beach Community Cleanup', date: 'First Saturday of Month', description: 'Help keep Long Beach beautiful', url: 'https://longbeach.surfrider.org/calendar' }
    ],
    'Arts/Culture': [
      { title: 'Long Beach Museum of Art', date: 'Open Daily', description: 'Free admission for students, art exhibits', url: 'https://www.lbma.org/calendar/'},
      { title: 'Long Beach Symphony', date: 'Monthly Concerts', description: 'Classical and contemporary music performances', url: 'https://longbeachsymphony.org/calendar/' },
      { title: 'Art Theatre Long Beach', date: 'Ongoing', description: 'Independent films and special screenings', url: 'https://arttheatrelongbeach.org/calendar/' },
      ],
      'Food/Markets': [
      { title: 'Long Beach Farmers Market', date: 'Every Friday', description: 'Fresh produce and local vendors', url: 'https://www.visitlongbeach.com/blog/long-beach-farmers-markets/' },
      { title: 'Weekend Night Market', date: 'Every Thursday', description: 'Local foods, goods, and produce', url: 'https://www.visitlongbeach.com/blog/weekend-night-market/' },
      { title: 'Long Beach Antique & Vintage Market', date: 'First Sunday', description: 'Find unique treasures and vintage items', url: 'https://www.longbeachantiquemarket.com/index.cfm/schedule/' },
      ],
      'Sports/Wellness': [
      { title: 'Long Beach Running Club', date: 'Every Tuesday', description: 'Group runs along the beach path', url: 'https://www.longbeachrunclub.com/' },
      { title: 'Long Beach Yoga', date: 'Various Dates', description: 'Free yoga classes at Marina Park', url: 'https://www.yogalutionmovement.com/events' },
      { title: 'Acura Grand Prix of Long Beach', date: 'Various Dates', description: 'Motorsports festival', url: 'https://www.gplb.com/weekend-schedule' },
    ]
  };

  // Handle category selection
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Handle showing events
  const handleShowEvents = () => {
    if (selectedCategory) {
      setShowEvents(true);
    }
  };

  // Get current events based on selected category
  const currentEvents = events[selectedCategory] || [];

  // Handle clicking on an event to open link
  const handleEventClick = (event) => {
    if (event.url) {
      window.open(event.url, '_blank');
    }
  };

  return (
    <div className="events-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      
      <h1 className="events-title">Events</h1>
      
      {!showEvents ? (
        <div className="events-content">
          <p className="events-subtitle">Select a category to see events:</p>
          
          <div className="categories-container">
            {categories.map((category, index) => (
              <button 
                            key={index}
                className={`category-button ${selectedCategory === category.name ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category.name)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
              
          {selectedCategory && (
                  <button 
              className="show-events-button"
              onClick={handleShowEvents}
                  >
              Show Events
                  </button>
              )}
            </div>
      ) : (
            <div className="events-results">
              <button 
            className="back-button"
                onClick={() => {
              setShowEvents(false);
              setSelectedCategory('');
                }}
              >
            ← Change Category
              </button>

          <h2 className="category-title">{selectedCategory} Events</h2>
          
          <div className="events-list">
            {currentEvents.map((event, index) => (
              <div 
                key={index} 
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">📅 {event.date}</p>
                <p className="event-description">{event.description}</p>
                {event.url && <div className="event-link">Click to learn more →</div>}
            </div>
            ))}
          </div>
          </div>
        )}
    </div>
  );
}

export default Events;
