import React, { useState, useEffect } from "react";
import "./Events.css";

function Events() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showEventResults, setShowEventResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const categories = [
    { id: 'community', name: 'Community/Social', icon: '👥' },
    { id: 'arts', name: 'Arts/Culture/Entertainment', icon: '🎨' },
    { id: 'service', name: 'Service/Charity', icon: '🤝' },
    { id: 'food', name: 'Food/Markets', icon: '🍽️' },
    { id: 'sports', name: 'Sports/Wellness', icon: '⚽' }
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const generateMockResults = (categoryName) => {
    const mockEvents = {
      'Community/Social': [
        { title: 'Long Beach Community Cleanup', date: 'March 15, 2024', location: 'Shoreline Aquatic Park', description: 'Join neighbors for a community cleanup event' },
        { title: 'CSULB Student Social Mixer', date: 'March 20, 2024', location: 'CSULB Campus', description: 'Meet fellow students and build connections' },
        { title: 'Beach Cities Networking Event', date: 'March 25, 2024', location: 'The Pike Outlets', description: 'Professional networking for local businesses' }
      ],
      'Arts/Culture/Entertainment': [
        { title: 'Long Beach Art Walk', date: 'March 16, 2024', location: 'East Village Arts District', description: 'Explore local galleries and meet artists' },
        { title: 'CSULB Theatre Production', date: 'March 22, 2024', location: 'CSULB Theatre', description: 'Student-directed play performance' },
        { title: 'Beach Cities Music Festival', date: 'March 30, 2024', location: 'Marina Green Park', description: 'Live music from local bands' }
      ],
      'Service/Charity': [
        { title: 'Beach Cleanup Volunteer Day', date: 'March 17, 2024', location: 'Belmont Shore Beach', description: 'Help keep our beaches clean' },
        { title: 'Food Bank Volunteer Event', date: 'March 23, 2024', location: 'Long Beach Food Bank', description: 'Sort and package food donations' },
        { title: 'Animal Shelter Adoption Fair', date: 'March 28, 2024', location: 'Long Beach Animal Care', description: 'Help find homes for rescue animals' }
      ],
      'Food/Markets': [
        { title: 'Long Beach Farmers Market', date: 'March 18, 2024', location: 'Marina Green', description: 'Fresh local produce and artisan goods' },
        { title: 'Food Truck Festival', date: 'March 24, 2024', location: 'Shoreline Village', description: 'Diverse cuisine from local food trucks' },
        { title: 'CSULB Food Fair', date: 'March 29, 2024', location: 'CSULB Campus', description: 'Student-run food vendors and activities' }
      ],
      'Sports/Wellness': [
        { title: 'Beach Volleyball Tournament', date: 'March 19, 2024', location: 'Belmont Shore Beach', description: 'Competitive beach volleyball for all skill levels' },
        { title: 'CSULB Fitness Challenge', date: 'March 26, 2024', location: 'CSULB Recreation Center', description: 'Campus-wide fitness and wellness event' },
        { title: 'Long Beach Marathon Training', date: 'March 31, 2024', location: 'Shoreline Aquatic Park', description: 'Group training run for marathon participants' }
      ]
    };

    return mockEvents[categoryName] || [];
  };

  const searchEvents = () => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = selectedCategories.map(categoryId => {
        const category = categories.find(cat => cat.id === categoryId);
        return {
          category: category.name,
          events: generateMockResults(category.name)
        };
      });
      
      setSearchResults(results);
      setIsSearching(false);
      setShowEventResults(true);
    }, 2000);
  };

  const requestLocationPermission = () => {
    setIsRequestingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsRequestingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setIsRequestingLocation(false);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setLocationError(errorMessage);
        setIsRequestingLocation(false);
      }
    );
  };

  return (
    <div className="events-page">
      <h1 className="events-title">Events</h1>
      
      <div className="location-section">
        {!location && !isRequestingLocation && (
          <div className="location-prompt">
            <p className="location-text">
              To find events near you, we need your location permission.
            </p>
            <button 
              className="location-button" 
              onClick={requestLocationPermission}
            >
              Allow Location Access
            </button>
          </div>
        )}

        {isRequestingLocation && (
          <div className="location-loading">
            <p className="location-text">Requesting location permission...</p>
          </div>
        )}

        {location && !showEventResults && (
          <div className="location-success">
            <p className="location-text">
              Location access granted! Choose your interests:
            </p>
            
            <div className="categories-section">
              <h3 className="categories-title">What type of events interest you?</h3>
              <div className="categories-grid">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-button ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
              
              {selectedCategories.length > 0 && (
                <div className="search-section">
                  <p className="selected-text">
                    Selected: {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'}
                  </p>
                  <button 
                    className="search-button"
                    onClick={searchEvents}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Searching...' : 'Find Events Near Me'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {isSearching && (
          <div className="searching-section">
            <p className="location-text">🔍 Searching for events...</p>
            <div className="loading-spinner"></div>
          </div>
        )}

        {showEventResults && (
          <div className="results-section">
            <h3 className="results-title">🎉 Events Found!</h3>
            <p className="results-text">
              Here are events in your selected categories near Long Beach:
            </p>
            
            <div className="events-results">
              {searchResults.map((categoryResult, index) => (
                <div key={index} className="category-results">
                  <h4 className="category-header">
                    {categories.find(cat => cat.name === categoryResult.category)?.icon} {categoryResult.category}
                  </h4>
                  <div className="events-list">
                    {categoryResult.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="event-card">
                        <h5 className="event-title">{event.title}</h5>
                        <p className="event-date">📅 {event.date}</p>
                        <p className="event-location">📍 {event.location}</p>
                        <p className="event-description">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button 
                className="new-search-button"
                onClick={() => {
                  setShowEventResults(false);
                  setSelectedCategories([]);
                  setSearchResults([]);
                }}
              >
                New Search
              </button>
            </div>
          </div>
        )}

        {locationError && (
          <div className="location-error">
            <p className="error-text">{locationError}</p>
            <button 
              className="location-button" 
              onClick={requestLocationPermission}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
