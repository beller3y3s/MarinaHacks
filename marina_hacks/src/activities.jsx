import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './activities.css';

function Activities() {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [hearts, setHearts] = useState([]);

  const ageOptions = [
    'Age',
    'Under 18',
    '18-29',
    '30+'
  ];

  const peopleOptions = [
    'How many people?',
    '1 person',
    '2 people',
    '3+ people'
  ];

  const activityOptions = [
    'Type of activity',
    'Active',
    'Relaxation',
    'Social'
  ];


  const handleAgeSelect = (age) => {
    if (age === 'Age') {
      setSelectedAge('');
    } else {
      setSelectedAge(age);
    }
    setIsAgeOpen(false);
    setIsGenerated(false);
  };

  const handlePeopleSelect = (people) => {
    if (people === 'How many people?') {
      setSelectedPeople('');
    } else {
      setSelectedPeople(people);
    }
    setIsPeopleOpen(false);
    setIsGenerated(false);
  };

  const handleActivitySelect = (activity) => {
    if (activity === 'Type of activity') {
      setSelectedActivity('');
    } else {
      setSelectedActivity(activity);
    }
    setIsActivityOpen(false);
    setIsGenerated(false);
  };


  const handleGenerate = () => {
    setIsGenerated(true);
    setReloadCount(0);
  };

  const handleReload = () => {
    setReloadCount(prev => prev + 1);
  };

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

  // Get age-specific activities
  const getAgeSpecificActivities = (age, activityType, peopleCount) => {
    const ageSpecificActivities = {
      'Under 18': {
        'Active': {
          '1 person': [
            'Ride your bike around',
            'Jump rope',
            'Hula hoop',
            'Ride your scooter',
            'Swim laps at pool',
            'Do yoga at home',
            'Learn new dance moves and routines',
            'Kickball',
            'Frisbee',
          ],
          '2 people': [
            'Bike race with friends',
            'Jump rope with a partner',
            'Hula hoop battle!',
            'Scooter tag',
            'Swim with a friend',
            'Yoga with a partner',
            'Dance practice',
            'Frisbee competition',
            'Basketball one-on-one',
            'Tennis match'
          ],
          '3+ people': [
            'Cafe hopping',
            'Play Just Dance',
            'Play Mario Kart or any other game on your Nintendo Switch',
            'Hula Hoop Circle - Create group hula hoop performances.',
            'Yoga Circle - Group yoga practice together.',
            'Ultimate Frisbee - Play three-way frisbee games.',
            'Kickball Game - Organize kickball matches.',
            'Obstacle Course - Create backyard obstacle courses.'
          ],
        },
        'Social': {
          '1 person': [
            'Join clubs at school.',
            'Play video games',
            'Volunteer Work',
            'Join a local youth group.',
            'Go study at a library',
            'Study at a cafe'
          ],
          '2 people': [
            'Study together',
            'Watch movies together at home.',
            'Shopping Together',
            'Cook together',
            'Play board games together',
            'Have a picnic at local parks',
            'Shop and browse together',
            'Go for bike rides together',
            'Spend time at coffee shops',
            'Do community service together'
          ],
          '3+ people': [
            'Group Study',
            'Game Night',
            'Shopping and hanging out',
            'Watch multiple movies together',
            'Spend time at local parks',
            'Try different restaurants together',
            'Take photos while exploring together',
            'Fun activities at each other\'s houses',
            'Hang out at coffee shops',
            'Attend local events together'
          ],
        },
        'Relaxation': {
          '1 person': [
            'Read books for pleasure.',
            'Meditation - Try calming meditation apps.',
            'Practice gentle yoga at home.',
            'Listen to calming music.',
            'Use coloring books to relax.',
            'Journal thoughts and feelings.',
            'Take peaceful walks outside.',
            'Relax with a bubble bath.',
            'Play an instrument or sing.',
            'Practice breathing exercises.',
            'Make pipe cleaner flowers.',
          ],
          '2 people': [
            'Read and discuss books together.',
            'Practice calming meditation together.',
            'Do gentle yoga together.',
            'Share favorite music together.',
            'Use coloring books together.',
            'Journal thoughts and feelings together.',
            'Take peaceful walks together.',
            'Watch calming videos together.',
            'Play music or sing together.',
            'Practice breathing exercises together.'
          ],
          '3+ people': [
            'Read and discuss relaxing books.',
            'Group Meditation',
            'Do yoga as a group.',
            'Share calming music with each other.',
            'Color together and chat.',
            'Go on peaceful nature walks.',
            'Spend a relaxing day together.',
            'Play or listen to music together.',
            'Practice relaxation techniques together.',
            'Do calming activities together.'
          ],
        }
      },
      '18-29': {
        'Active': {
          '1 person': [
            'Bike to work for fitness.',
            'Individual yoga and meditation.',
            'Professional fitness coaching',
            'Solo long-distance running.',
            'High-intensity workouts'
          ],
          '2 people': [
            'Morning or evening runs together.',
            'Partner yoga sessions.',
            'Friendly doubles games.',
            'Explore local trails together.',
            'Joint fitness coaching'
          ],
          '3+ people': [
            'Regular group runs.',
            'Group yoga sessions.',
            'Court play sessions.',
            'Weekend trail adventures.',
            'CrossFit or HIIT together'
          ],
        },
        'Social': {
          '1 person': [
            'Professional industry gatherings.',
            'Explore local craft breweries',
            'Attend stand-up performances.',
            'Watch local theater',
            'Professional networking mixers.'
          ],
          '2 people': [
            'Romantic dinners and activities.',
            'Sample craft beers together',
            'Attend shows as a couple.',
            'Watch plays together',
            'Socialize with other couples.'
          ],
          '3+ people': [
            'Regular restaurant gatherings.',
            'Visit multiple craft breweries.',
            'Attend shows together.',
            'Regular show attendance.',
            'Monthly restaurant exploration.'
          ],
        },
        'Relaxation': {
          '1 person': [
            'Individual treatment.',
            'Regular sessions.',
            'Weekend getaway.',
            'Individual sessions.',
            'Health focused.'
          ],
          '2 people': [
            'Take a walk around the neighborhood',
            'Go to the movies',
            'Have a picnic at a local park',
            'Go to a facial spa',
            'Attend a group meditation session',
          ],
          '3+ people': [
            'Visit a local park',
            'Have a picnic on the beach',
            'Sky gaze',
            'Draw each other\'s portraits',
          ],
        }
      },
      '30+': {
        'Active': {
          '1 person': [
            'Golf rounds at local courses.',
            'Lap swimming at community pools.',
            'Daily walks for fitness.',
            'Find a fitness class.',
            'Join the gym.',
          ],
          '2 people': [
            'Play tennis together.',
            'Play golf rounds as a couple.',
            'Daily exercise walks.',
            'Go to the swimming pool',
            'Workouts.',
            'Grab food together.',
          ],
          '3+ people': [
            'Play golf together',
            'Play tennis or pickleball against each other',
            'Go to a local pool and swim together',
            'Join group classes in HIIT or Pilates',
            'Go bowling together',
          ],
        },
        'Social': {
          '1 person': [
            'Attend industry events.',
            'Attend cultural events',
            'Visit a museum',
            'Explore fine restaurants'
          ],
          '2 people': [
            'Have a romantic dinner date',
            'Attend wine tastings together',
            'Watch plays or shows together',
            'Visit a museum',
            'Explore a restaurant'
          ],
          '3+ people': [
            'Have a dinner party',
            'Go to the bar',
            'Movie marathon',
            'Visit a museum',
            'Cafe hopping'
          ],
        },
        'Relaxation': {
          '1 person': [
            'Get a spa treatment',
            'Revisit an old hobby',
            'Meditate',
            'Go to a concert',
            'Have a weekend getaway',
          ],
          '2 people': [
            'Have a spa day together',
            'Do yoga together',
            'Meditate together',
            'Get a massage together',
            'Drive somewhere far together',
          ],
          '3+ people': [
            'Go to a sauna',
            'Do goat yoga together',
            'Try out a new hobby together',
            'Go visit animals at a local animal shelter',
          ],
        }
      },
    };

    return ageSpecificActivities[age]?.[activityType]?.[peopleCount] || [];
  };

  // AI-generated activity suggestions based on selections
  const generateActivitySuggestions = () => {
    if (!selectedAge || !selectedPeople || !selectedActivity) {
      return [];
    }

    // Age-appropriate activity filtering
    const isAgeAppropriate = (activity) => {
      const activityText = activity.toLowerCase();
      
      switch (selectedAge) {
        case 'Under 18':
          // Avoid activities with alcohol, bars, clubs, high costs, or inappropriate themes
          return !activityText.includes('wine') && 
                 !activityText.includes('bar') && 
                 !activityText.includes('club') &&
                 !activityText.includes('martial arts') &&
                 !activityText.includes('boxing') &&
                 !activityText.includes('parkour') &&
                 !activityText.includes('skateboarding') &&
                 !activityText.includes('surfing') &&
                 !activityText.includes('rock climbing') &&
                 !activityText.includes('night out') &&
                 !activityText.includes('dating') &&
                 !activityText.includes('$100+') &&
                 !activityText.includes('$200+') &&
                 !activityText.includes('$300+') &&
                 !activityText.includes('$400+') &&
                 !activityText.includes('adult');
        
        case '18-29':
          // Include social activities, nightlife, and budget-friendly options
          // Avoid activities specifically for older audiences
          return !activityText.includes('golf') &&
                 !activityText.includes('retirement') &&
                 !activityText.includes('senior') &&
                 !activityText.includes('mature');
        
        case '30+':
          // Professional development, networking, moderate-cost activities
          // Avoid college-specific or extremely strenuous activities
          return !activityText.includes('college party') &&
                 !activityText.includes('student') &&
                 !activityText.includes('extreme') &&
                 !activityText.includes('martial arts') &&
                 !activityText.includes('parkour') &&
                 !activityText.includes('skateboarding') &&
                 !activityText.includes('surfing') &&
                 !activityText.includes('rock climbing') &&
                 !activityText.includes('boxing') &&
                 !activityText.includes('nightlife') &&
                 !activityText.includes('night out');
        
        default:
          return true;
      }
    };

    // Modern suggestion generator for updated dropdown options
    const getModernSuggestions = () => {
      const modernSuggestions = {
        'Active': {
          '1 person': [
            'Go for a morning jog',
            'Ride your bike around',
            'Do yoga at home',
            'Swim laps at pool',
            'Take a nature walk'
          ],
          '2 people': [
            'Play tennis together',
            'Go hiking together',
            'Ride bikes together',
            'Swim laps together',
            'Play basketball together'
          ],
          '3+ people': [
            'Play basketball together',
            'Go hiking as group',
            'Play volleyball together',
            'Go cycling together',
            'Play soccer together'
          ]
        },
        'Educational': {
          '1 person': [
            'Read educational books',
            'Watch documentaries online',
            'Learn new language',
            'Take online courses',
            'Study new topics'
          ],
          '2 people': [
            'Study together regularly',
            'Learn language together',
            'Take courses together',
            'Read books together',
            'Practice coding together'
          ],
          '3+ people': [
            'Form study group',
            'Learn language together',
            'Take courses together',
            'Start book club',
            'Practice coding together'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Take relaxing bath',
            'Listen to calm music',
            'Practice meditation daily',
            'Read fiction books',
            'Take peaceful walk'
          ],
          '2 people': [
            'Listen to music together',
            'Take peaceful walk',
            'Read books together',
            'Practice meditation together',
            'Watch movies together'
          ],
          '3+ people': [
            'Listen to music together',
            'Take peaceful walk',
            'Read books together',
            'Practice meditation together',
            'Watch movies together'
          ]
        },
        'Social': {
          '1 person': [
            'Call family members',
            'Join online communities',
            'Visit coffee shops',
            'Attend local events',
            'Volunteer for causes'
          ],
          '2 people': [
            'Have coffee together',
            'Go to movies',
            'Cook meals together',
            'Play board games',
            'Go shopping together'
          ],
          '3+ people': [
            'Have game night',
            'Go out to eat',
            'Plan group activities',
            'Have movie night',
            'Organize group outing'
          ]
        }
      };
      
      return modernSuggestions[selectedActivity]?.[selectedPeople] || [];
    };

    // Use modern suggestions for updated dropdown options
    const baseSuggestions = getModernSuggestions();
    
    // Filter suggestions based on age appropriateness
    const ageFilteredSuggestions = baseSuggestions.filter(isAgeAppropriate);
    
    // Get age-specific activities
    const ageSpecificActivities = getAgeSpecificActivities(selectedAge, selectedActivity, selectedPeople);
    
    // Prioritize age-specific activities and limit general suggestions
    // Put age-specific first, then add limited general suggestions
    const limitedGeneralSuggestions = ageFilteredSuggestions.slice(0, 10); // Limit to 10 general activities
    const allSuggestions = [...ageSpecificActivities, ...limitedGeneralSuggestions];
    
    // AI-like suggestion generation with variety based on reload count
    const shuffledSuggestions = [...allSuggestions];
    
    // Shuffle the array based on reloadCount for more variety
    for (let i = shuffledSuggestions.length - 1; i > 0; i--) {
      const j = (reloadCount + i * 3) % shuffledSuggestions.length;
      [shuffledSuggestions[i], shuffledSuggestions[j]] = [shuffledSuggestions[j], shuffledSuggestions[i]];
    }
    
    // Start from different positions based on reloadCount
    const startIndex = (reloadCount * 2) % shuffledSuggestions.length;
    const rotatedSuggestions = [
      ...shuffledSuggestions.slice(startIndex),
      ...shuffledSuggestions.slice(0, startIndex)
    ];
    
    // Remove duplicates and return unique suggestions
    // Use full activity name as key to ensure no duplicates
    const uniqueSuggestions = [];
    const seen = new Set();
    
    for (const suggestion of rotatedSuggestions) {
      // Create a normalized key from the activity name (first part before any dash or description)
      const key = suggestion.split(' - ')[0].toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueSuggestions.push(suggestion);
      }
    }
    
    return uniqueSuggestions;
  };

  return (
    <div className="activities-container">
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
      <div className="activities-header">
      <h1 className="activities-title">Activities</h1>
      </div>
      <div className="dropdowns-wrapper">
        <div className="dropdown-wrapper">
          <div className="dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setIsAgeOpen(!isAgeOpen)}
              onBlur={() => setTimeout(() => setIsAgeOpen(false), 200)}
            >
              <span className="dropdown-text">{selectedAge || 'Age'}</span>
              <span className={`dropdown-arrow ${isAgeOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isAgeOpen && (
              <div className="dropdown-menu">
                {ageOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleAgeSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dropdown-wrapper">
          <div className="dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setIsPeopleOpen(!isPeopleOpen)}
              onBlur={() => setTimeout(() => setIsPeopleOpen(false), 200)}
            >
              <span className="dropdown-text">{selectedPeople || 'How many people?'}</span>
              <span className={`dropdown-arrow ${isPeopleOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isPeopleOpen && (
              <div className="dropdown-menu">
                {peopleOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handlePeopleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dropdown-wrapper">
          <div className="dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setIsActivityOpen(!isActivityOpen)}
              onBlur={() => setTimeout(() => setIsActivityOpen(false), 200)}
            >
              <span className="dropdown-text">{selectedActivity || 'Type of activity'}</span>
              <span className={`dropdown-arrow ${isActivityOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isActivityOpen && (
              <div className="dropdown-menu">
                {activityOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleActivitySelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
      
      {/* Generate Button */}
      <div className="generate-button-container">
        <button 
          className="generate-button"
          onClick={handleGenerate}
          disabled={!selectedAge || !selectedPeople || !selectedActivity}
        >
          Generate
        </button>
      </div>
      
      {/* Fixed Size Output Box */}
      <div className="fixed-output-box">
        <div className="output-content">
          {isGenerated && selectedAge && selectedPeople && selectedActivity ? (
            <div className="suggestions-content">
              <div className="suggestions-header-container">
              <h3 className="suggestions-header">Activity Suggestions</h3>
                <button 
                  className="reload-button"
                  onClick={handleReload}
                  title="Generate new activity ideas"
                >
                  ↻
                </button>
              </div>
              <div className="suggestions-text">
                {generateActivitySuggestions().slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="compact-suggestion">
                    • {suggestion}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="placeholder-content">
              <p>Select your group size and activity type, then click "Generate" to see personalized activity suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
