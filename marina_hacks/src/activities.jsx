import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './activities.css';

function Activities() {
  const navigate = useNavigate();
  const [selectedPeople, setSelectedPeople] = useState('');
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  const peopleOptions = [
    'How many people?',
    '1 person',
    '2 people',
    '3 people',
    '4+ people'
  ];

  const activityOptions = [
    'Type of activity',
    'Creative',
    'Active',
    'Educational',
    'Relaxation',
    'Social'
  ];


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

  // AI-generated activity suggestions based on selections
  const generateActivitySuggestions = () => {
    if (!selectedPeople || !selectedActivity) {
      return [];
    }

    const suggestions = {
      'Creative': {
        '1 person': [
          'Drawing - Sketching and doodling with basic materials. Use existing supplies.',
          'Painting - Watercolor or acrylic painting at home. Use household items.',
          'Collage Making - Creating art from magazines and paper. Use recycled materials.',
          'Digital Art - Creating artwork using free software and apps.',
          'Photography - Taking creative photos with smartphone.',
          'Creative Writing - Journaling and storytelling.',
          'Basic Art Supplies - Sketching pencils and paper ($10-15).',
          'Watercolor Set - Beginner watercolor paints and brushes ($15-25).',
          'Acrylic Paint Kit - Basic acrylic paints and canvas ($20-35).',
          'Pottery Class - Working with clay at a local studio ($25-40).',
          'Art Supply Shopping - Buying quality art materials ($15-30).',
          'Digital Art Software - Professional art software subscription ($20-50).',
          'Art Workshop - Guided art instruction ($40-60).',
          'Pottery Studio - Premium clay and glazing ($50-80).',
          'Art Gallery Visit - Museum and gallery admission ($15-25).',
          'Professional Art Supplies - High-end materials and tools ($80-120).',
          'Private Art Lessons - One-on-one instruction ($60-100).',
          'Art Retreat - Weekend creative workshop ($150-300).'
        ],
        '2 people': [
          'Drawing Together - Collaborative sketching and art creation. Use existing materials.',
          'Painting Session - Partner painting with shared supplies. Use household items.',
          'Photography - Taking creative photos together. Use smartphones.',
          'Digital Art - Creating artwork using free software together.',
          'Crafting - DIY projects with household materials.',
          'Basic Art Supplies - Sketching pencils and paper for two ($15-25).',
          'Watercolor Set - Beginner watercolor paints and brushes for two ($25-40).',
          'Acrylic Paint Kit - Basic acrylic paints and canvas for two ($30-50).',
          'Art Supply Shopping - Buying quality art materials together ($20-40).',
          'Pottery Class - Working with clay at a local studio ($30-50).',
          'Art Workshop - Guided art instruction for two ($50-80).',
          'Digital Art Software - Professional art software subscription ($25-60).',
          'Art Gallery Visit - Museum and gallery admission for two ($25-50).',
          'Pottery Studio - Premium clay and glazing for two ($60-100).',
          'Professional Art Supplies - High-end materials and tools ($100-150).',
          'Private Art Lessons - One-on-one instruction for two ($80-120).',
          'Art Retreat - Weekend creative workshop for two ($200-400).'
        ],
        '3 people': [
          'Group Drawing - Collaborative sketching and art creation. Use existing materials.',
          'Music Making - Playing instruments and singing together. Use existing instruments.',
          'Art Creation - Group painting and crafting activities. Use household supplies.',
          'Digital Art - Creating artwork using free software as a group.',
          'Group Photography - Taking creative photos together. Use smartphones.',
          'Art Supply Shopping - Buying quality art materials for group ($30-60).',
          'Pottery Class - Working with clay at a local studio ($40-70).',
          'Art Workshop - Guided art instruction for group ($60-100).',
          'Digital Art Software - Professional art software subscription ($35-80).',
          'Art Gallery Visit - Museum and gallery admission for group ($40-75).',
          'Pottery Studio - Premium clay and glazing for group ($80-120).',
          'Professional Art Supplies - High-end materials and tools ($120-200).',
          'Private Art Lessons - One-on-one instruction for group ($100-150).',
          'Art Retreat - Weekend creative workshop for group ($250-500).'
        ],
        '4+ people': [
          'Group Art Creation - Large-scale collaborative artwork. Use existing materials.',
          'Music Ensemble - Playing instruments together as a group. Use existing instruments.',
          'Mural Painting - Creating large artwork on walls or canvas. Use household supplies.',
          'Group Digital Art - Creating artwork using free software as a large group.',
          'Group Photography - Taking creative photos as a large group. Use smartphones.',
          'Art Supply Shopping - Buying quality art materials for large group ($40-80).',
          'Pottery Class - Working with clay at a local studio ($50-90).',
          'Art Workshop - Guided art instruction for large group ($80-120).',
          'Digital Art Software - Professional art software subscription ($50-100).',
          'Art Gallery Visit - Museum and gallery admission for large group ($60-100).',
          'Pottery Studio - Premium clay and glazing for large group ($100-150).',
          'Professional Art Supplies - High-end materials and tools ($150-250).',
          'Private Art Lessons - One-on-one instruction for large group ($120-200).',
          'Art Retreat - Weekend creative workshop for large group ($300-600).'
        ]
      },
      'Active': {
        '1 person': [
          'Running - Jogging and running for fitness. No equipment needed.',
          'Cycling - Biking for exercise and exploration. Use existing bike.',
          'Swimming - Water exercise and fitness. Use public pools.',
          'Yoga - Flexibility and mindfulness exercise at home.',
          'Hiking - Nature walks and trail exploration.',
          'Bodyweight Training - Push-ups, squats, and calisthenics.',
          'Basic Workout Equipment - Resistance bands and weights ($10-20).',
          'Tennis Court Rental - Playing tennis at local courts ($15-25).',
          'Swimming Pool Pass - Access to community pools ($25-35).',
          'Yoga Class - Guided yoga instruction ($15-30).',
          'Gym Membership - Monthly fitness center access ($20-40).',
          'Personal Training - One-on-one fitness coaching ($40-60).',
          'Rock Climbing Gym - Indoor climbing sessions ($25-40).',
          'Martial Arts Class - Self-defense and fitness training ($50-80).',
          'Pilates Studio - Core strength and flexibility training ($60-100).',
          'CrossFit Membership - High-intensity group training ($100-150).'
        ],
        '2 people': [
          'Partner Running - Jogging together for motivation. No equipment needed.',
          'Cycling Together - Biking as a pair for exercise. Use existing bikes.',
          'Tennis Playing - Playing tennis for fitness. Use public courts.',
          'Partner Yoga - Practicing yoga together at home.',
          'Hiking Together - Nature walks and trail exploration.',
          'Partner Workouts - Bodyweight exercises together.',
          'Gym Membership - Monthly fitness center access for two ($35-60).',
          'Tennis Court Rental - Playing tennis at local courts ($20-40).',
          'Swimming Pool Pass - Access to community pools for two ($40-60).',
          'Yoga Class - Guided yoga instruction for two ($25-50).',
          'Personal Training - One-on-one fitness coaching for two ($60-100).',
          'Rock Climbing Gym - Indoor climbing sessions for two ($40-70).',
          'Martial Arts Class - Self-defense and fitness training for two ($80-120).',
          'Pilates Studio - Core strength and flexibility training for two ($100-150).',
          'CrossFit Membership - High-intensity group training for two ($150-250).'
        ],
        '3 people': [
          'Group Running - Jogging together as a team. No equipment needed.',
          'Basketball Playing - Playing basketball for fitness. Use public courts.',
          'Group Cycling - Biking together for exercise. Use existing bikes.',
          'Group Yoga - Practicing yoga together at home.',
          'Group Hiking - Nature walks and trail exploration.',
          'Group Workouts - Bodyweight exercises together.',
          'Gym Membership - Monthly fitness center access for group ($50-90).',
          'Tennis Court Rental - Playing tennis at local courts for group ($30-60).',
          'Swimming Pool Pass - Access to community pools for group ($60-90).',
          'Yoga Class - Guided yoga instruction for group ($40-80).',
          'Personal Training - One-on-one fitness coaching for group ($80-120).',
          'Rock Climbing Gym - Indoor climbing sessions for group ($60-100).',
          'Martial Arts Class - Self-defense and fitness training for group ($120-180).',
          'Pilates Studio - Core strength and flexibility training for group ($150-250).',
          'CrossFit Membership - High-intensity group training for group ($200-350).'
        ],
        '4+ people': [
          'Group Running - Large group jogging and running. No equipment needed.',
          'Group Cycling - Biking together as a large group. Use existing bikes.',
          'Group Swimming - Water exercise and fitness together. Use public pools.',
          'Group Yoga - Practicing yoga together as a large group.',
          'Group Hiking - Nature walks and trail exploration as a large group.',
          'Group Workouts - Bodyweight exercises as a large group.',
          'Gym Membership - Monthly fitness center access for large group ($70-120).',
          'Tennis Court Rental - Playing tennis at local courts for large group ($40-80).',
          'Swimming Pool Pass - Access to community pools for large group ($80-120).',
          'Yoga Class - Guided yoga instruction for large group ($60-100).',
          'Personal Training - One-on-one fitness coaching for large group ($100-150).',
          'Rock Climbing Gym - Indoor climbing sessions for large group ($80-120).',
          'Martial Arts Class - Self-defense and fitness training for large group ($150-250).',
          'Pilates Studio - Core strength and flexibility training for large group ($200-350).',
          'CrossFit Membership - High-intensity group training for large group ($250-450).'
        ]
      },
      'Educational': {
        '1 person': [
          'Reading - Self-directed learning through books and articles. Use library resources.',
          'Language Practice - Speaking and listening practice using apps. Use free language apps.',
          'Online Learning - Taking courses and tutorials online. Use free online resources.',
          'Podcast Learning - Educational podcasts and audio content.',
          'Documentaries - Educational films and documentaries online.',
          'Skill Practice - Learning new skills through free tutorials.',
          'Book Purchase - Buying educational books and materials ($15-30).',
          'Online Course - Structured learning through paid platforms ($20-50).',
          'Language App Subscription - Premium language learning apps ($15-25).',
          'Educational Workshop - Local learning workshops ($25-40).',
          'Private Tutoring - One-on-one learning and skill development ($40-60).',
          'Language Classes - Structured foreign language learning ($50-80).',
          'Professional Certification - Industry-specific training ($60-100).',
          'University Course - Continuing education classes ($80-120).',
          'Educational Retreat - Intensive learning weekend ($150-300).'
        ],
        '2 people': [
          'Study Together - Collaborative learning and reading. Use library resources.',
          'Language Practice - Speaking and listening practice together. Use free language apps.',
          'Online Learning - Taking courses and tutorials together. Use free online resources.',
          'Study Group - Collaborative learning and discussion.',
          'Language Exchange - Practicing foreign languages together.',
          'Skill Sharing - Learning from each other.',
          'Book Purchase - Buying educational books and materials for two ($25-50).',
          'Online Course - Structured learning through paid platforms for two ($35-80).',
          'Language App Subscription - Premium language learning apps for two ($25-40).',
          'Educational Workshop - Local learning workshops for two ($40-70).',
          'Partner Tutoring - Learning and skill development together ($60-100).',
          'Language Classes - Structured foreign language learning for two ($80-120).',
          'Professional Certification - Industry-specific training for two ($100-150).',
          'University Course - Continuing education classes for two ($120-200).',
          'Educational Retreat - Intensive learning weekend for two ($250-500).'
        ],
        '3 people': [
          'Group Study - Collaborative learning and reading together. Use library resources.',
          'Language Practice - Speaking and listening practice as a group. Use free language apps.',
          'Online Learning - Taking courses and tutorials together. Use free online resources.',
          'Group Discussion - Collaborative learning and discussion.',
          'Language Exchange - Practicing foreign languages as a group.',
          'Skill Sharing - Learning from each other as a group.',
          'Book Purchase - Buying educational books and materials for group ($35-70).',
          'Online Course - Structured learning through paid platforms for group ($50-100).',
          'Language App Subscription - Premium language learning apps for group ($35-60).',
          'Educational Workshop - Local learning workshops for group ($60-100).',
          'Group Tutoring - Learning and skill development as a team ($80-120).',
          'Language Classes - Structured foreign language learning as a group ($100-150).',
          'Professional Certification - Industry-specific training for group ($150-250).',
          'University Course - Continuing education classes for group ($150-300).',
          'Educational Retreat - Intensive learning weekend for group ($300-600).'
        ],
        '4+ people': [
          'Group Study - Large group collaborative learning and reading. Use library resources.',
          'Language Practice - Speaking and listening practice as a large group. Use free language apps.',
          'Online Learning - Taking courses and tutorials as a large group. Use free online resources.',
          'Group Discussion - Collaborative learning and discussion as a large group.',
          'Language Exchange - Practicing foreign languages as a large group.',
          'Skill Sharing - Learning from each other as a large group.',
          'Book Purchase - Buying educational books and materials for large group ($50-100).',
          'Online Course - Structured learning through paid platforms for large group ($70-120).',
          'Language App Subscription - Premium language learning apps for large group ($50-80).',
          'Educational Workshop - Local learning workshops for large group ($80-120).',
          'Group Tutoring - Learning and skill development as a large team ($100-150).',
          'Language Classes - Structured foreign language learning as a large group ($120-200).',
          'Professional Certification - Industry-specific training for large group ($200-350).',
          'University Course - Continuing education classes for large group ($200-400).',
          'Educational Retreat - Intensive learning weekend for large group ($400-800).'
        ]
      },
      'Relaxation': {
        '1 person': [
          'Meditation - Mindfulness and stress relief practice. Use free meditation apps.',
          'Yoga - Physical and mental relaxation exercise. Use free online videos.',
          'Reading - Relaxing with books and articles. Use library resources.',
          'Nature Walk - Peaceful outdoor relaxation and mindfulness.',
          'Music Listening - Calming music and ambient sounds.',
          'Journaling - Reflective writing and self-care.',
          'Aromatherapy - Essential oils and relaxation scents ($15-25).',
          'Meditation App - Premium mindfulness and meditation apps ($10-20).',
          'Yoga Class - Guided yoga instruction ($15-30).',
          'Massage Therapy - Professional relaxation treatment ($40-60).',
          'Spa Day - Full relaxation and wellness treatment ($60-100).',
          'Retreat Weekend - Intensive relaxation and mindfulness ($100-200).',
          'Luxury Spa - Premium wellness and relaxation experience ($150-300).'
        ],
        '2 people': [
          'Meditation Together - Mindfulness and stress relief practice as a pair. Use free meditation apps.',
          'Yoga Together - Physical and mental relaxation exercise as a pair. Use free online videos.',
          'Reading Together - Relaxing with books and articles as a pair. Use library resources.',
          'Nature Walk - Peaceful outdoor relaxation and mindfulness together.',
          'Music Listening - Calming music and ambient sounds together.',
          'Journaling - Reflective writing and self-care together.',
          'Aromatherapy - Essential oils and relaxation scents for two ($25-40).',
          'Meditation App - Premium mindfulness and meditation apps for two ($15-30).',
          'Yoga Class - Guided yoga instruction for two ($25-50).',
          'Massage Therapy - Professional relaxation treatment for two ($60-100).',
          'Spa Day - Full relaxation and wellness treatment for two ($100-150).',
          'Retreat Weekend - Intensive relaxation and mindfulness for two ($150-300).',
          'Luxury Spa - Premium wellness and relaxation experience for two ($250-500).'
        ],
        '3 people': [
          'Group Meditation - Mindfulness and stress relief practice as a group. Use free meditation apps.',
          'Group Yoga - Physical and mental relaxation exercise as a group. Use free online videos.',
          'Group Reading - Relaxing with books and articles as a group. Use library resources.',
          'Nature Walk - Peaceful outdoor relaxation and mindfulness as a group.',
          'Music Listening - Calming music and ambient sounds as a group.',
          'Group Journaling - Reflective writing and self-care as a group.',
          'Aromatherapy - Essential oils and relaxation scents for group ($35-60).',
          'Meditation App - Premium mindfulness and meditation apps for group ($20-40).',
          'Yoga Class - Guided yoga instruction for group ($40-80).',
          'Massage Therapy - Professional relaxation treatment for group ($80-120).',
          'Spa Day - Full relaxation and wellness treatment for group ($120-200).',
          'Retreat Weekend - Intensive relaxation and mindfulness for group ($200-400).',
          'Luxury Spa - Premium wellness and relaxation experience for group ($350-700).'
        ],
        '4+ people': [
          'Group Meditation - Mindfulness and stress relief practice as a large group. Use free meditation apps.',
          'Group Yoga - Physical and mental relaxation exercise as a large group. Use free online videos.',
          'Group Reading - Relaxing with books and articles as a large group. Use library resources.',
          'Nature Walk - Peaceful outdoor relaxation and mindfulness as a large group.',
          'Music Listening - Calming music and ambient sounds as a large group.',
          'Group Journaling - Reflective writing and self-care as a large group.',
          'Aromatherapy - Essential oils and relaxation scents for large group ($50-80).',
          'Meditation App - Premium mindfulness and meditation apps for large group ($30-50).',
          'Yoga Class - Guided yoga instruction for large group ($60-100).',
          'Massage Therapy - Professional relaxation treatment for large group ($100-150).',
          'Spa Day - Full relaxation and wellness treatment for large group ($150-250).',
          'Retreat Weekend - Intensive relaxation and mindfulness for large group ($250-500).',
          'Luxury Spa - Premium wellness and relaxation experience for large group ($400-800).'
        ]
      },
      'Social': {
        '1 person': [
          'Online Chatting - Connecting with friends and family online. Use free online platforms.',
          'Reading - Enjoying books and articles for entertainment. Use library resources.',
          'Music Listening - Enjoying music and podcasts. Use free online resources.',
          'Social Media - Connecting and sharing with online communities.',
          'Video Calls - Face-to-face conversations with friends and family.',
          'Community Events - Attending local free social gatherings.',
          'Coffee Shop Visit - Social connection and conversation at cafes ($5-15).',
          'Movie Theater - Enjoying films and entertainment ($10-20).',
          'Board Game Cafe - Playing games and socializing ($15-25).',
          'Restaurant Dining - Social dining and relationship building ($20-40).',
          'Concert or Show - Live entertainment and social experience ($30-60).',
          'Social Club Membership - Organized social activities and events ($50-100).',
          'VIP Event - Premium social experiences and exclusive gatherings ($100-200).'
        ],
        '2 people': [
          'Coffee Chatting - Casual conversation at home. Use home coffee.',
          'Cooking Together - Preparing meals and dining at home. Cook at home.',
          'Gaming - Playing video games and board games together. Use free games.',
          'Video Calls - Face-to-face conversations with friends and family.',
          'Community Events - Attending local free social gatherings together.',
          'Social Media - Connecting and sharing with online communities together.',
          'Coffee Shop Visit - Casual conversation and social connection at cafes ($10-25).',
          'Movie Theater - Enjoying films and entertainment together ($15-35).',
          'Board Game Cafe - Playing games and socializing together ($25-45).',
          'Restaurant Dining - Social dining and relationship building ($30-60).',
          'Concert or Show - Live entertainment and social experience for two ($50-100).',
          'Social Club Membership - Organized social activities and events for two ($80-150).',
          'VIP Event - Premium social experiences and exclusive gatherings for two ($150-350).'
        ],
        '3 people': [
          'Group Cooking - Preparing meals and dining together at home. Cook at home.',
          'Group Gaming - Playing video games and board games together. Use free games.',
          'Group Chatting - Casual conversation and socializing together. Use free online platforms.',
          'Video Calls - Face-to-face conversations with friends and family as a group.',
          'Community Events - Attending local free social gatherings as a group.',
          'Social Media - Connecting and sharing with online communities as a group.',
          'Coffee Shop Visit - Casual conversation and social connection at cafes for group ($15-35).',
          'Movie Theater - Enjoying films and entertainment as a group ($20-50).',
          'Board Game Cafe - Playing games and socializing as a group ($35-65).',
          'Restaurant Dining - Social dining and conversation at restaurants ($50-90).',
          'Concert or Show - Live entertainment and social experience as a group ($80-150).',
          'Social Club Membership - Organized social activities and events for group ($120-200).',
          'VIP Event - Premium social experiences and exclusive gatherings for group ($200-450).'
        ],
        '4+ people': [
          'Group Cooking - Large group meal preparation and dining. Cook at home.',
          'Group Gaming - Playing video games and board games as a large group. Use free games.',
          'Group Chatting - Casual conversation and socializing as a large group. Use free online platforms.',
          'Video Calls - Face-to-face conversations with friends and family as a large group.',
          'Community Events - Attending local free social gatherings as a large group.',
          'Social Media - Connecting and sharing with online communities as a large group.',
          'Coffee Shop Visit - Casual conversation and social connection at cafes for large group ($20-50).',
          'Movie Theater - Enjoying films and entertainment as a large group ($30-70).',
          'Board Game Cafe - Playing games and socializing as a large group ($50-90).',
          'Restaurant Dining - Social dining and conversation at restaurants as a large group ($80-120).',
          'Concert or Show - Live entertainment and social experience as a large group ($120-200).',
          'Social Club Membership - Organized social activities and events for large group ($150-300).',
          'VIP Event - Premium social experiences and exclusive gatherings for large group ($300-600).'
        ]
      }
    };

    const baseSuggestions = suggestions[selectedActivity]?.[selectedPeople] || [];
    
    // AI-like suggestion generation with variety based on reload count
    const shuffledSuggestions = [...baseSuggestions];
    
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
    const uniqueSuggestions = [];
    const seen = new Set();
    
    for (const suggestion of rotatedSuggestions) {
      const key = suggestion.split(' - ')[0]; // Use the activity name as key
      if (!seen.has(key)) {
        seen.add(key);
        uniqueSuggestions.push(suggestion);
      }
    }
    
    return uniqueSuggestions;
  };

  return (
    <div className="activities-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <div className="activities-header">
        <h1 className="activities-title">Activities</h1>
      </div>
      <div className="dropdowns-wrapper">
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
          disabled={!selectedPeople || !selectedActivity}
        >
          Generate
        </button>
      </div>
      
      {/* Fixed Size Output Box */}
      <div className="fixed-output-box">
        <div className="output-content">
          {isGenerated && selectedPeople && selectedActivity ? (
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
