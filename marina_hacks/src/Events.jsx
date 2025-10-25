import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

function Events() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showEventResults, setShowEventResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [manualLocation, setManualLocation] = useState('');
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = [
    { id: 'community', name: 'Community/Social', icon: '👥' },
    { id: 'arts', name: 'Arts/Culture/Entertainment', icon: '🎨' },
    { id: 'service', name: 'Service/Charity', icon: '🤝' },
    { id: 'food', name: 'Food/Markets', icon: '🍽️' },
    { id: 'sports', name: 'Sports/Wellness', icon: '⚽' },
    { id: 'educational', name: 'Educational', icon: '📚' }
  ];

  const citySuggestions = [
    // Major California Cities
    'Los Angeles, CA', 'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Fresno, CA',
    'Sacramento, CA', 'Long Beach, CA', 'Oakland, CA', 'Bakersfield, CA', 'Anaheim, CA',
    'Santa Ana, CA', 'Riverside, CA', 'Stockton, CA', 'Irvine, CA', 'Chula Vista, CA',
    'Fremont, CA', 'San Bernardino, CA', 'Modesto, CA', 'Fontana, CA', 'Oxnard, CA',
    'Moreno Valley, CA', 'Huntington Beach, CA', 'Glendale, CA', 'Santa Clarita, CA', 'Garden Grove, CA',
    'Oceanside, CA', 'Rancho Cucamonga, CA', 'Santa Rosa, CA', 'Ontario, CA', 'Lancaster, CA',
    'Elk Grove, CA', 'Corona, CA', 'Palmdale, CA', 'Salinas, CA', 'Pomona, CA',
    'Pasadena, CA', 'Hayward, CA', 'Escondido, CA', 'Torrance, CA', 'Sunnyvale, CA',
    'Orange, CA', 'Fullerton, CA', 'Thousand Oaks, CA', 'Carson, CA', 'Concord, CA',
    'Visalia, CA', 'Simi Valley, CA', 'Santa Clara, CA', 'Vallejo, CA', 'Victorville, CA',
    'El Monte, CA', 'Berkeley, CA', 'Downey, CA', 'Costa Mesa, CA', 'Inglewood, CA',
    'Ventura, CA', 'West Covina, CA', 'Norwalk, CA', 'Carlsbad, CA', 'Fairfield, CA',
    'Richmond, CA', 'Murrieta, CA', 'Antioch, CA', 'Temecula, CA', 'Burbank, CA',
    'Daly City, CA', 'Rialto, CA', 'Santa Monica, CA', 'El Cajon, CA', 'San Mateo, CA',
    'Clovis, CA', 'Compton, CA', 'Jurupa Valley, CA', 'Vista, CA', 'South Gate, CA',
    'Mission Viejo, CA', 'Vacaville, CA', 'Hesperia, CA', 'Santa Barbara, CA', 'Tracy, CA',
    'Redding, CA', 'Santa Maria, CA', 'Livermore, CA', 'Newport Beach, CA', 'Buena Park, CA',
    'Lakewood, CA', 'Merced, CA', 'Hemet, CA', 'Chico, CA', 'Napa, CA',
    'Redwood City, CA', 'Yuba City, CA', 'Madera, CA', 'Santa Cruz, CA', 'San Rafael, CA',
    'San Leandro, CA', 'Hawthorne, CA', 'Whittier, CA', 'Citrus Heights, CA', 'Tulare, CA',
    'Lake Forest, CA', 'Mountain View, CA', 'Alameda, CA', 'Redondo Beach, CA', 'San Marcos, CA',
    'Union City, CA', 'Palo Alto, CA', 'Folsom, CA', 'La Mesa, CA', 'Turlock, CA',
    'Baldwin Park, CA', 'Chino Hills, CA', 'Manteca, CA', 'San Clemente, CA', 'Pacifica, CA',
    'Lodi, CA', 'Montebello, CA', 'La Habra, CA', 'San Ramon, CA', 'Cypress, CA',
    'La Puente, CA', 'Pittsburg, CA', 'Covina, CA', 'Rowland Heights, CA', 'Yorba Linda, CA',
    'San Bruno, CA', 'Westminster, CA', 'San Gabriel, CA', 'Ceres, CA', 'La Mirada, CA',
    'Hollister, CA', 'Lynwood, CA', 'Laguna Niguel, CA', 'Camarillo, CA', 'Fountain Valley, CA',
    'Diamond Bar, CA', 'Petaluma, CA', 'Santee, CA', 'La Verne, CA', 'San Jacinto, CA',
    'Rancho Cordova, CA', 'Monterey Park, CA', 'Rosemead, CA', 'Paramount, CA', 'Hanford, CA',
    'Highland, CA', 'Lake Elsinore, CA', 'La Presa, CA', 'Colton, CA', 'Bellflower, CA',
    'Brea, CA', 'La Palma, CA', 'San Dimas, CA', 'Lomita, CA', 'Cudahy, CA',
    'Bell Gardens, CA', 'La Canada Flintridge, CA', 'Maywood, CA', 'Hawaiian Gardens, CA', 'La Habra Heights, CA',
    'Vernon, CA', 'Industry, CA', 'Commerce, CA', 'Bell, CA', 'Huntington Park, CA',
    'South El Monte, CA', 'Artesia, CA', 'Cudahy, CA', 'La Canada Flintridge, CA', 'Maywood, CA',
    'Hawaiian Gardens, CA', 'La Habra Heights, CA', 'Vernon, CA', 'Industry, CA', 'Commerce, CA',
    'Bell, CA', 'Huntington Park, CA', 'South El Monte, CA', 'Artesia, CA',

    // Additional California Cities
    'Alameda, CA', 'Albany, CA', 'Alhambra, CA', 'Aliso Viejo, CA', 'Altadena, CA',
    'American Canyon, CA', 'Anaheim Hills, CA', 'Antioch, CA', 'Apple Valley, CA', 'Arcadia, CA',
    'Arroyo Grande, CA', 'Artesia, CA', 'Atascadero, CA', 'Atherton, CA', 'Atwater, CA',
    'Auburn, CA', 'Avalon, CA', 'Avenal, CA', 'Azusa, CA', 'Bakersfield, CA',
    'Banning, CA', 'Barstow, CA', 'Beaumont, CA', 'Bell Gardens, CA', 'Bell, CA',
    'Bellflower, CA', 'Belmont, CA', 'Benicia, CA', 'Berkeley, CA', 'Beverly Hills, CA',
    'Big Bear Lake, CA', 'Bishop, CA', 'Blue Lake, CA', 'Blythe, CA', 'Brawley, CA',
    'Brea, CA', 'Brentwood, CA', 'Brisbane, CA', 'Buellton, CA', 'Buena Park, CA',
    'Burbank, CA', 'Burlingame, CA', 'Calabasas, CA', 'Calexico, CA', 'California City, CA',
    'Calimesa, CA', 'Calistoga, CA', 'Camarillo, CA', 'Campbell, CA', 'Canyon Lake, CA',
    'Capitola, CA', 'Carlsbad, CA', 'Carmel-by-the-Sea, CA', 'Carpinteria, CA', 'Carson, CA',
    'Cathedral City, CA', 'Ceres, CA', 'Cerritos, CA', 'Chico, CA', 'Chino, CA',
    'Chino Hills, CA', 'Chowchilla, CA', 'Chula Vista, CA', 'Citrus Heights, CA', 'Claremont, CA',
    'Clayton, CA', 'Clearlake, CA', 'Cloverdale, CA', 'Clovis, CA', 'Coachella, CA',
    'Coalinga, CA', 'Colfax, CA', 'Colma, CA', 'Colton, CA', 'Colusa, CA',
    'Commerce, CA', 'Compton, CA', 'Concord, CA', 'Corcoran, CA', 'Corona, CA',
    'Coronado, CA', 'Corte Madera, CA', 'Costa Mesa, CA', 'Cotati, CA', 'Covina, CA',
    'Crescent City, CA', 'Cudahy, CA', 'Culver City, CA', 'Cupertino, CA', 'Cypress, CA',
    'Daly City, CA', 'Dana Point, CA', 'Danville, CA', 'Davis, CA', 'Del Mar, CA',
    'Del Rey Oaks, CA', 'Delano, CA', 'Desert Hot Springs, CA', 'Diamond Bar, CA', 'Dinuba, CA',
    'Dixon, CA', 'Dorris, CA', 'Dos Palos, CA', 'Downey, CA', 'Duarte, CA',
    'Dublin, CA', 'Dunsmuir, CA', 'East Palo Alto, CA', 'Eastvale, CA', 'El Cajon, CA',
    'El Centro, CA', 'El Cerrito, CA', 'El Monte, CA', 'El Segundo, CA', 'Elk Grove, CA',
    'Emeryville, CA', 'Encinitas, CA', 'Escalon, CA', 'Escondido, CA', 'Etna, CA',
    'Eureka, CA', 'Exeter, CA', 'Fairfax, CA', 'Fairfield, CA', 'Farmersville, CA',
    'Ferndale, CA', 'Fillmore, CA', 'Firebaugh, CA', 'Folsom, CA', 'Fontana, CA',
    'Fort Bragg, CA', 'Fort Jones, CA', 'Fortuna, CA', 'Foster City, CA', 'Fountain Valley, CA',
    'Fowler, CA', 'Fremont, CA', 'Fresno, CA', 'Fullerton, CA', 'Galt, CA',
    'Garden Grove, CA', 'Gardena, CA', 'Gilroy, CA', 'Glendale, CA', 'Glendora, CA',
    'Goleta, CA', 'Gonzales, CA', 'Grand Terrace, CA', 'Grass Valley, CA', 'Greenfield, CA',
    'Gridley, CA', 'Grover Beach, CA', 'Guadalupe, CA', 'Gustine, CA', 'Half Moon Bay, CA',
    'Hanford, CA', 'Hawaiian Gardens, CA', 'Hawthorne, CA', 'Hayward, CA', 'Healdsburg, CA',
    'Hemet, CA', 'Hercules, CA', 'Hermosa Beach, CA', 'Hesperia, CA', 'Hidden Hills, CA',
    'Highland, CA', 'Hillsborough, CA', 'Hollister, CA', 'Holtville, CA', 'Hughson, CA',
    'Huntington Beach, CA', 'Huntington Park, CA', 'Huron, CA', 'Imperial, CA', 'Imperial Beach, CA',
    'Indian Wells, CA', 'Indio, CA', 'Industry, CA', 'Inglewood, CA', 'Ione, CA',
    'Irvine, CA', 'Irwindale, CA', 'Isleton, CA', 'Jackson, CA', 'Jurupa Valley, CA',
    'Kerman, CA', 'King City, CA', 'Kingsburg, CA', 'La Cañada Flintridge, CA', 'La Habra, CA',
    'La Habra Heights, CA', 'La Mesa, CA', 'La Mirada, CA', 'La Palma, CA', 'La Puente, CA',
    'La Quinta, CA', 'La Verne, CA', 'Lafayette, CA', 'Laguna Beach, CA', 'Laguna Hills, CA',
    'Laguna Niguel, CA', 'Laguna Woods, CA', 'Lake Elsinore, CA', 'Lake Forest, CA', 'Lakeport, CA',
    'Lakewood, CA', 'Lancaster, CA', 'Larkspur, CA', 'Lathrop, CA', 'Lawndale, CA',
    'Lemon Grove, CA', 'Lemoore, CA', 'Lincoln, CA', 'Lindsay, CA', 'Live Oak, CA',
    'Livermore, CA', 'Livingston, CA', 'Lodi, CA', 'Loma Linda, CA', 'Lomita, CA',
    'Lompoc, CA', 'Long Beach, CA', 'Loomis, CA', 'Los Alamitos, CA', 'Los Altos, CA',
    'Los Altos Hills, CA', 'Los Angeles, CA', 'Los Banos, CA', 'Los Gatos, CA', 'Loyalton, CA',
    'Lynwood, CA', 'Madera, CA', 'Malibu, CA', 'Mammoth Lakes, CA', 'Manhattan Beach, CA',
    'Manteca, CA', 'Maricopa, CA', 'Marina, CA', 'Martinez, CA', 'Marysville, CA',
    'Maywood, CA', 'McFarland, CA', 'Mendota, CA', 'Menifee, CA', 'Menlo Park, CA',
    'Merced, CA', 'Mill Valley, CA', 'Millbrae, CA', 'Milpitas, CA', 'Mission Viejo, CA',
    'Modesto, CA', 'Monrovia, CA', 'Montague, CA', 'Montclair, CA', 'Montebello, CA',
    'Monterey, CA', 'Monterey Park, CA', 'Moorpark, CA', 'Moraga, CA', 'Moreno Valley, CA',
    'Morgan Hill, CA', 'Mountain View, CA', 'Murrieta, CA', 'Napa, CA', 'National City, CA',
    'Needles, CA', 'Nevada City, CA', 'Newark, CA', 'Newman, CA', 'Newport Beach, CA',
    'Norco, CA', 'Norwalk, CA', 'Novato, CA', 'Oakdale, CA', 'Oakland, CA',
    'Oakley, CA', 'Oceanside, CA', 'Ojai, CA', 'Ontario, CA', 'Orange, CA',
    'Orange Cove, CA', 'Orinda, CA', 'Orland, CA', 'Oroville, CA', 'Oxnard, CA',
    'Pacific Grove, CA', 'Pacifica, CA', 'Palm Desert, CA', 'Palm Springs, CA', 'Palmdale, CA',
    'Palo Alto, CA', 'Palos Verdes Estates, CA', 'Paradise, CA', 'Paramount, CA', 'Parlier, CA',
    'Pasadena, CA', 'Paso Robles, CA', 'Patterson, CA', 'Perris, CA', 'Petaluma, CA',
    'Pico Rivera, CA', 'Piedmont, CA', 'Pinole, CA', 'Pismo Beach, CA', 'Pittsburg, CA',
    'Placentia, CA', 'Placerville, CA', 'Pleasant Hill, CA', 'Pleasanton, CA', 'Plymouth, CA',
    'Point Arena, CA', 'Pomona, CA', 'Port Hueneme, CA', 'Porterville, CA', 'Portola, CA',
    'Portola Valley, CA', 'Poway, CA', 'Rancho Cordova, CA', 'Rancho Cucamonga, CA', 'Rancho Mirage, CA',
    'Rancho Palos Verdes, CA', 'Rancho Santa Margarita, CA', 'Red Bluff, CA', 'Redding, CA', 'Redlands, CA',
    'Redondo Beach, CA', 'Redwood City, CA', 'Reedley, CA', 'Rialto, CA', 'Richmond, CA',
    'Ridgecrest, CA', 'Rio Vista, CA', 'Ripon, CA', 'Riverbank, CA', 'Riverside, CA',
    'Rocklin, CA', 'Rohnert Park, CA', 'Rolling Hills, CA', 'Rolling Hills Estates, CA', 'Rosemead, CA',
    'Roseville, CA', 'Ross, CA', 'Sacramento, CA', 'Salinas, CA', 'San Anselmo, CA',
    'San Bernardino, CA', 'San Bruno, CA', 'San Carlos, CA', 'San Clemente, CA', 'San Diego, CA',
    'San Dimas, CA', 'San Fernando, CA', 'San Francisco, CA', 'San Gabriel, CA', 'San Jacinto, CA',
    'San Joaquin, CA', 'San Jose, CA', 'San Juan Bautista, CA', 'San Juan Capistrano, CA', 'San Leandro, CA',
    'San Luis Obispo, CA', 'San Marcos, CA', 'San Marino, CA', 'San Mateo, CA', 'San Pablo, CA',
    'San Rafael, CA', 'San Ramon, CA', 'Sand City, CA', 'Sanger, CA', 'Santa Ana, CA',
    'Santa Barbara, CA', 'Santa Clara, CA', 'Santa Clarita, CA', 'Santa Cruz, CA', 'Santa Fe Springs, CA',
    'Santa Maria, CA', 'Santa Monica, CA', 'Santa Paula, CA', 'Santa Rosa, CA', 'Santee, CA',
    'Saratoga, CA', 'Sausalito, CA', 'Scotts Valley, CA', 'Seal Beach, CA', 'Seaside, CA',
    'Sebastopol, CA', 'Selma, CA', 'Shafter, CA', 'Shasta Lake, CA', 'Sierra Madre, CA',
    'Signal Hill, CA', 'Simi Valley, CA', 'Solana Beach, CA', 'Soledad, CA', 'Solvang, CA',
    'Sonoma, CA', 'Sonora, CA', 'South El Monte, CA', 'South Gate, CA', 'South Lake Tahoe, CA',
    'South Pasadena, CA', 'South San Francisco, CA', 'St. Helena, CA', 'Stanton, CA', 'Stockton, CA',
    'Suisun City, CA', 'Sunnyvale, CA', 'Susanville, CA', 'Sutter Creek, CA', 'Taft, CA',
    'Tehachapi, CA', 'Tehama, CA', 'Temecula, CA', 'Temple City, CA', 'Thousand Oaks, CA',
    'Tiburon, CA', 'Torrance, CA', 'Tracy, CA', 'Trinidad, CA', 'Truckee, CA',
    'Tulare, CA', 'Tulelake, CA', 'Turlock, CA', 'Tustin, CA', 'Twentynine Palms, CA',
    'Ukiah, CA', 'Union City, CA', 'Upland, CA', 'Vacaville, CA', 'Vallejo, CA',
    'Ventura, CA', 'Vernon, CA', 'Victorville, CA', 'Villa Park, CA', 'Visalia, CA',
    'Vista, CA', 'Walnut, CA', 'Walnut Creek, CA', 'Wasco, CA', 'Waterford, CA',
    'Watsonville, CA', 'Weed, CA', 'West Covina, CA', 'West Hollywood, CA', 'West Sacramento, CA',
    'Westlake Village, CA', 'Westminster, CA', 'Westmorland, CA', 'Wheatland, CA', 'Whittier, CA',
    'Wildomar, CA', 'Williams, CA', 'Willits, CA', 'Willows, CA', 'Windsor, CA',
    'Winters, CA', 'Woodlake, CA', 'Woodland, CA', 'Woodside, CA', 'Yorba Linda, CA',
    'Yountville, CA', 'Yreka, CA', 'Yuba City, CA', 'Yucaipa, CA', 'Yucca Valley, CA'
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const generateMockResults = (categoryName, userLocation) => {
    const cityName = userLocation?.manual ? userLocation.locationName.split(',')[0].trim() : 'Long Beach';
    
    const mockEvents = {
      'Community/Social': [
        { title: `${cityName} Community Cleanup`, date: 'January 20, 2025', location: `${cityName} City Park`, description: 'Join neighbors for a community cleanup event' },
        { title: `${cityName} Student Social Mixer`, date: 'January 25, 2025', location: `${cityName} Community Center`, description: 'Meet fellow students and build connections' },
        { title: `${cityName} Networking Event`, date: 'February 1, 2025', location: `${cityName} Downtown`, description: 'Professional networking for local businesses' }
      ],
      'Arts/Culture/Entertainment': [
        { title: `${cityName} Art Walk`, date: 'January 22, 2025', location: `${cityName} Arts District`, description: 'Explore local galleries and meet artists' },
        { title: `${cityName} Theatre Production`, date: 'January 28, 2025', location: `${cityName} Theatre`, description: 'Local theatre performance' },
        { title: `${cityName} Music Festival`, date: 'February 8, 2025', location: `${cityName} City Park`, description: 'Live music from local bands' }
      ],
      'Service/Charity': [
        { title: `${cityName} Volunteer Day`, date: 'January 19, 2025', location: `${cityName} Community Center`, description: 'Help with local community service projects' },
        { title: `${cityName} Food Bank Volunteer Event`, date: 'January 26, 2025', location: `${cityName} Food Bank`, description: 'Sort and package food donations' },
        { title: `${cityName} Animal Shelter Adoption Fair`, date: 'February 2, 2025', location: `${cityName} Animal Shelter`, description: 'Help find homes for rescue animals' }
      ],
      'Food/Markets': [
        { title: `${cityName} Farmers Market`, date: 'January 18, 2025', location: `${cityName} Downtown Plaza`, description: 'Fresh local produce and artisan goods' },
        { title: `${cityName} Food Truck Festival`, date: 'January 24, 2025', location: `${cityName} City Center`, description: 'Diverse cuisine from local food trucks' },
        { title: `${cityName} Food Fair`, date: 'January 31, 2025', location: `${cityName} Community Center`, description: 'Local food vendors and activities' }
      ],
      'Sports/Wellness': [
        { title: `${cityName} Sports Tournament`, date: 'January 21, 2025', location: `${cityName} Recreation Center`, description: 'Competitive sports for all skill levels' },
        { title: `${cityName} Fitness Challenge`, date: 'January 27, 2025', location: `${cityName} Gym`, description: 'Community fitness and wellness event' },
        { title: `${cityName} Marathon Training`, date: 'February 3, 2025', location: `${cityName} City Park`, description: 'Group training run for marathon participants' }
      ],
      'Educational': [
        { title: `${cityName} Tech Talk Series`, date: 'January 23, 2025', location: `${cityName} Library`, description: 'Weekly technology and innovation discussions' },
        { title: `${cityName} Public Library Workshop`, date: 'January 29, 2025', location: `${cityName} Public Library`, description: 'Digital literacy and coding basics workshop' },
        { title: `${cityName} Hackathon`, date: 'February 7-9, 2025', location: `${cityName} Community Center`, description: '48-hour coding competition and innovation event' }
      ]
    };

    return mockEvents[categoryName] || [];
  };

  const handleLocationInputChange = (value) => {
    setManualLocation(value);
    if (value.length > 1) {
      const filtered = citySuggestions.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Show top 5 matches
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setManualLocation(suggestion);
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleManualLocationSubmit = () => {
    if (manualLocation.trim()) {
      setLocation({
        latitude: null,
        longitude: null,
        manual: true,
        locationName: manualLocation.trim()
      });
      setLocationError(null);
      setShowSuggestions(false);
    }
  };

  const handleEventClick = (event) => {
    // Create a Google search query for the event
    const locationText = location?.manual ? location.locationName : 'Long Beach CA';
    const searchQuery = `${event.title} ${event.location} ${locationText} events`;
    
    // Use Google's "I'm Feeling Lucky" feature to go directly to the first result
    const googleLuckyUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&btnI=I%27m+Feeling+Lucky`;
    
    // Open the first result directly in a new tab
    window.open(googleLuckyUrl, '_blank', 'noopener,noreferrer');
  };

  const searchEvents = () => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = selectedCategories.map(categoryId => {
        const category = categories.find(cat => cat.id === categoryId);
        return {
          category: category.name,
          events: generateMockResults(category.name, location)
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
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <h1 className="events-title">Events</h1>
      
      <div className="location-section">
        {!location && !isRequestingLocation && (
          <div className="location-prompt">
            <p className="location-text">
              To find events near you, we need your location.
            </p>
            <div className="location-options">
              <button 
                className="location-button" 
                onClick={requestLocationPermission}
              >
                📍 Use My Current Location
              </button>
              <button 
                className="location-button secondary" 
                onClick={() => setShowManualLocation(true)}
              >
                ✏️ Enter Location Manually
              </button>
            </div>
            
            {showManualLocation && (
              <div className="manual-location-section">
                <p className="location-text">Enter your city or location:</p>
                <div className="location-input-group">
                  <div className="input-with-suggestions">
                    <input
                      type="text"
                      value={manualLocation}
                      onChange={(e) => handleLocationInputChange(e.target.value)}
                      placeholder="e.g., Long Beach, CA or Los Angeles, CA"
                      className="location-input"
                      onKeyPress={(e) => e.key === 'Enter' && handleManualLocationSubmit()}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onFocus={() => manualLocation.length > 1 && setShowSuggestions(true)}
                    />
                    {showSuggestions && locationSuggestions.length > 0 && (
                      <div className="suggestions-dropdown">
                        {locationSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button 
                    className="location-button"
                    onClick={handleManualLocationSubmit}
                    disabled={!manualLocation.trim()}
                  >
                    Continue
                  </button>
                </div>
                <button 
                  className="back-button"
                  onClick={() => {
                    setShowManualLocation(false);
                    setManualLocation('');
                  }}
                >
                  ← Back to Options
                </button>
              </div>
            )}
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
              {location.manual ? `Location set to: ${location.locationName}` : 'Location access granted!'} Choose your interests:
            </p>
            {!location.manual && (
              <p className="coordinates-text">
                Latitude: {location.latitude.toFixed(4)}, 
                Longitude: {location.longitude.toFixed(4)}
              </p>
            )}
            
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
              Here are events in your selected categories near {location?.manual ? location.locationName : 'your location'}:
            </p>
            
            <div className="events-results">
              {searchResults.map((categoryResult, index) => (
                <div key={index} className="category-results">
                  <h4 className="category-header">
                    {categories.find(cat => cat.name === categoryResult.category)?.icon} {categoryResult.category}
                  </h4>
                  <div className="events-list">
                    {categoryResult.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="event-card" onClick={() => handleEventClick(event)}>
                        <h5 className="event-title">{event.title}</h5>
                        <p className="event-date">📅 {event.date}</p>
                        <p className="event-location">📍 {event.location}</p>
                        <p className="event-description">{event.description}</p>
                        <div className="event-link">
                          Find Event Details →
                        </div>
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
