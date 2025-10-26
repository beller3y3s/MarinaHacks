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
    
    const allMockEvents = {
      'Community/Social': [
        { title: `${cityName} Community Cleanup`, date: 'October 25, 2025', location: `${cityName} City Park`, description: 'Join neighbors for a community cleanup event' },
        { title: `${cityName} Student Social Mixer`, date: 'October 28, 2025', location: `${cityName} Community Center`, description: 'Meet fellow students and build connections' },
        { title: `${cityName} Networking Event`, date: 'November 2, 2025', location: `${cityName} Downtown`, description: 'Professional networking for local businesses' },
        { title: `${cityName} Book Club Meeting`, date: 'November 8, 2025', location: `${cityName} Library`, description: 'Monthly book discussion and social gathering' },
        { title: `${cityName} Community Garden Workshop`, date: 'November 15, 2025', location: `${cityName} Community Garden`, description: 'Learn sustainable gardening techniques' },
        { title: `${cityName} Language Exchange`, date: 'November 22, 2025', location: `${cityName} Cultural Center`, description: 'Practice languages with native speakers' },
        { title: `${cityName} Game Night`, date: 'November 29, 2025', location: `${cityName} Community Center`, description: 'Board games and card games for all ages' },
        { title: `${cityName} Coffee Meetup`, date: 'December 6, 2025', location: `${cityName} Local Cafe`, description: 'Casual coffee and conversation with neighbors' },
        { title: `${cityName} Trivia Night`, date: 'December 13, 2025', location: `${cityName} Pub`, description: 'Test your knowledge in friendly competition' },
        { title: `${cityName} Community Potluck`, date: 'December 20, 2025', location: `${cityName} Community Center`, description: 'Share homemade dishes and stories' },
        { title: `${cityName} Speed Dating`, date: 'December 27, 2025', location: `${cityName} Event Venue`, description: 'Meet new people in a fun, structured setting' },
        { title: `${cityName} Karaoke Night`, date: 'January 3, 2026', location: `${cityName} Bar`, description: 'Sing your heart out with friends and strangers' }
      ],
      'Arts/Culture/Entertainment': [
        { title: `${cityName} Art Walk`, date: 'October 26, 2025', location: `${cityName} Arts District`, description: 'Explore local galleries and meet artists' },
        { title: `${cityName} Theatre Production`, date: 'November 1, 2025', location: `${cityName} Theatre`, description: 'Local theatre performance' },
        { title: `${cityName} Music Festival`, date: 'November 9, 2025', location: `${cityName} City Park`, description: 'Live music from local bands' },
        { title: `${cityName} Poetry Night`, date: 'November 16, 2025', location: `${cityName} Coffee House`, description: 'Open mic poetry and spoken word' },
        { title: `${cityName} Film Screening`, date: 'November 23, 2025', location: `${cityName} Cinema`, description: 'Independent film showcase' },
        { title: `${cityName} Dance Workshop`, date: 'November 30, 2025', location: `${cityName} Dance Studio`, description: 'Learn various dance styles' },
        { title: `${cityName} Art Exhibition`, date: 'December 7, 2025', location: `${cityName} Gallery`, description: 'Contemporary art showcase by local artists' },
        { title: `${cityName} Concert Series`, date: 'December 14, 2025', location: `${cityName} Concert Hall`, description: 'Classical and contemporary music performances' },
        { title: `${cityName} Comedy Show`, date: 'December 21, 2025', location: `${cityName} Comedy Club`, description: 'Stand-up comedy featuring local comedians' },
        { title: `${cityName} Craft Workshop`, date: 'December 28, 2025', location: `${cityName} Art Studio`, description: 'Learn pottery, painting, or other crafts' },
        { title: `${cityName} Cultural Festival`, date: 'January 4, 2026', location: `${cityName} Cultural Center`, description: 'Celebrate diverse cultures through food, music, and art' },
        { title: `${cityName} Photography Walk`, date: 'January 11, 2026', location: `${cityName} Historic District`, description: 'Capture the beauty of the city with fellow photographers' }
      ],
      'Service/Charity': [
        { title: `${cityName} Volunteer Day`, date: 'October 27, 2025', location: `${cityName} Community Center`, description: 'Help with local community service projects' },
        { title: `${cityName} Food Bank Volunteer Event`, date: 'November 3, 2025', location: `${cityName} Food Bank`, description: 'Sort and package food donations' },
        { title: `${cityName} Animal Shelter Adoption Fair`, date: 'November 10, 2025', location: `${cityName} Animal Shelter`, description: 'Help find homes for rescue animals' },
        { title: `${cityName} Beach Cleanup`, date: 'November 17, 2025', location: `${cityName} Beach`, description: 'Environmental conservation effort' },
        { title: `${cityName} Senior Center Visit`, date: 'November 24, 2025', location: `${cityName} Senior Center`, description: 'Spend time with elderly community members' },
        { title: `${cityName} Homeless Shelter Support`, date: 'December 1, 2025', location: `${cityName} Shelter`, description: 'Prepare meals and provide assistance' },
        { title: `${cityName} Blood Drive`, date: 'December 8, 2025', location: `${cityName} Community Center`, description: 'Donate blood to help save lives' },
        { title: `${cityName} Habitat for Humanity`, date: 'December 15, 2025', location: `${cityName} Construction Site`, description: 'Help build homes for families in need' },
        { title: `${cityName} School Supply Drive`, date: 'December 22, 2025', location: `${cityName} Elementary School`, description: 'Collect and distribute school supplies to students' },
        { title: `${cityName} Environmental Restoration`, date: 'December 29, 2025', location: `${cityName} Nature Reserve`, description: 'Restore local ecosystems and wildlife habitats' },
        { title: `${cityName} Disaster Relief Training`, date: 'January 5, 2026', location: `${cityName} Emergency Center`, description: 'Learn emergency response and disaster preparedness' },
        { title: `${cityName} Community Garden Volunteer`, date: 'January 12, 2026', location: `${cityName} Community Garden`, description: 'Help maintain community gardens and teach gardening' }
      ],
      'Food/Markets': [
        { title: `${cityName} Farmers Market`, date: 'October 29, 2025', location: `${cityName} Downtown Plaza`, description: 'Fresh local produce and artisan goods' },
        { title: `${cityName} Food Truck Festival`, date: 'November 5, 2025', location: `${cityName} City Center`, description: 'Diverse cuisine from local food trucks' },
        { title: `${cityName} Food Fair`, date: 'November 12, 2025', location: `${cityName} Community Center`, description: 'Local food vendors and activities' },
        { title: `${cityName} Cooking Class`, date: 'November 19, 2025', location: `${cityName} Culinary School`, description: 'Learn to cook international dishes' },
        { title: `${cityName} Wine Tasting`, date: 'November 26, 2025', location: `${cityName} Winery`, description: 'Sample local wines and learn pairing' },
        { title: `${cityName} Food Festival`, date: 'December 3, 2025', location: `${cityName} Convention Center`, description: 'Celebrate diverse culinary traditions' },
        { title: `${cityName} Brewery Tour`, date: 'December 10, 2025', location: `${cityName} Local Brewery`, description: 'Tour local brewery and sample craft beers' },
        { title: `${cityName} Chocolate Making Workshop`, date: 'December 17, 2025', location: `${cityName} Chocolate Shop`, description: 'Learn to make artisanal chocolates' },
        { title: `${cityName} Food Truck Rally`, date: 'December 24, 2025', location: `${cityName} Park`, description: 'Multiple food trucks offering diverse cuisines' },
        { title: `${cityName} Sushi Making Class`, date: 'December 31, 2025', location: `${cityName} Japanese Restaurant`, description: 'Learn traditional sushi preparation techniques' },
        { title: `${cityName} Farmers Market Cooking Demo`, date: 'January 7, 2026', location: `${cityName} Farmers Market`, description: 'Watch chefs prepare dishes with fresh ingredients' },
        { title: `${cityName} Food Photography Workshop`, date: 'January 14, 2026', location: `${cityName} Photography Studio`, description: 'Learn to photograph food like a professional' }
      ],
      'Sports/Wellness': [
        { title: `${cityName} Sports Tournament`, date: 'October 30, 2025', location: `${cityName} Recreation Center`, description: 'Competitive sports for all skill levels' },
        { title: `${cityName} Fitness Challenge`, date: 'November 6, 2025', location: `${cityName} Gym`, description: 'Community fitness and wellness event' },
        { title: `${cityName} Marathon Training`, date: 'November 13, 2025', location: `${cityName} City Park`, description: 'Group training run for marathon participants' },
        { title: `${cityName} Yoga in the Park`, date: 'November 20, 2025', location: `${cityName} City Park`, description: 'Free outdoor yoga session' },
        { title: `${cityName} Basketball League`, date: 'November 27, 2025', location: `${cityName} Sports Complex`, description: 'Weekly basketball games and tournaments' },
        { title: `${cityName} Wellness Workshop`, date: 'December 4, 2025', location: `${cityName} Wellness Center`, description: 'Mental health and stress management' },
        { title: `${cityName} Swimming Competition`, date: 'December 11, 2025', location: `${cityName} Aquatic Center`, description: 'Competitive swimming for all ages' },
        { title: `${cityName} Cycling Group Ride`, date: 'December 18, 2025', location: `${cityName} Bike Trail`, description: 'Group cycling through scenic routes' },
        { title: `${cityName} Tennis Tournament`, date: 'December 25, 2025', location: `${cityName} Tennis Club`, description: 'Singles and doubles tennis competition' },
        { title: `${cityName} Meditation Retreat`, date: 'January 1, 2026', location: `${cityName} Meditation Center`, description: 'Guided meditation and mindfulness practice' },
        { title: `${cityName} Rock Climbing Workshop`, date: 'January 8, 2026', location: `${cityName} Climbing Gym`, description: 'Learn rock climbing techniques and safety' },
        { title: `${cityName} Martial Arts Demo`, date: 'January 15, 2026', location: `${cityName} Martial Arts Studio`, description: 'Demonstration of various martial arts styles' }
      ],
      'Educational': [
        { title: `${cityName} Tech Talk Series`, date: 'October 31, 2025', location: `${cityName} Library`, description: 'Weekly technology and innovation discussions' },
        { title: `${cityName} Public Library Workshop`, date: 'November 7, 2025', location: `${cityName} Public Library`, description: 'Digital literacy and coding basics workshop' },
        { title: `${cityName} Hackathon`, date: 'November 14-16, 2025', location: `${cityName} Community Center`, description: '48-hour coding competition and innovation event' },
        { title: `${cityName} Science Fair`, date: 'November 21, 2025', location: `${cityName} Science Museum`, description: 'Student science projects and demonstrations' },
        { title: `${cityName} Career Fair`, date: 'November 28, 2025', location: `${cityName} Convention Center`, description: 'Meet employers and explore career opportunities' },
        { title: `${cityName} Language Learning Group`, date: 'December 5, 2025', location: `${cityName} Community Center`, description: 'Practice foreign languages with peers' },
        { title: `${cityName} Financial Literacy Workshop`, date: 'December 12, 2025', location: `${cityName} Bank`, description: 'Learn about budgeting, investing, and financial planning' },
        { title: `${cityName} Entrepreneurship Seminar`, date: 'December 19, 2025', location: `${cityName} Business Center`, description: 'Learn about starting and running a business' },
        { title: `${cityName} History Walking Tour`, date: 'December 26, 2025', location: `${cityName} Historic District`, description: 'Explore local history with a guided tour' },
        { title: `${cityName} AI and Machine Learning Workshop`, date: 'January 2, 2026', location: `${cityName} Tech Hub`, description: 'Introduction to artificial intelligence concepts' },
        { title: `${cityName} Public Speaking Course`, date: 'January 9, 2026', location: `${cityName} Community College`, description: 'Improve presentation and communication skills' },
        { title: `${cityName} Sustainability Workshop`, date: 'January 16, 2026', location: `${cityName} Environmental Center`, description: 'Learn about environmental conservation and sustainable living' }
      ]
    };

    // Get all events for the category and randomly select 3
    const categoryEvents = allMockEvents[categoryName] || [];
    const shuffled = [...categoryEvents].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
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
              <button 
                className="refresh-button"
                onClick={() => {
                  setIsSearching(true);
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
                  }, 1500);
                }}
                disabled={isSearching}
              >
                {isSearching ? '🔄 Refreshing...' : '🔄 Load More Events'}
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
