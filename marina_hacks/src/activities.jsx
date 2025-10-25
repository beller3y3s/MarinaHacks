import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './activities.css';

function Activities() {
  const navigate = useNavigate();
  const [selectedPeople, setSelectedPeople] = useState('');
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

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

  const budgetOptions = [
    'Budget',
    'Free',
    '<$50',
    '<$100',
    '$100+'
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

  const handleBudgetSelect = (budget) => {
    if (budget === 'Budget') {
      setSelectedBudget('');
    } else {
      setSelectedBudget(budget);
    }
    setIsBudgetOpen(false);
    setIsGenerated(false);
  };

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  // AI-generated activity suggestions based on selections
  const generateActivitySuggestions = () => {
    if (!selectedPeople || !selectedActivity) {
      return [];
    }

    // Filter activities based on budget selection
    const filterByBudget = (activities) => {
      if (!selectedBudget || selectedBudget === 'Budget') {
        return activities;
      }
      
      if (selectedBudget === 'Free') {
        return activities.filter(activity => 
          activity.toLowerCase().includes('free') || 
          activity.includes('$0') ||
          activity.includes('no cost')
        );
      }
      
      if (selectedBudget === '<$50') {
        return activities.filter(activity => {
          const costMatch = activity.match(/\$(\d+)-?\$?(\d+)?/);
          if (costMatch) {
            const maxCost = parseInt(costMatch[2] || costMatch[1]);
            return maxCost < 50;
          }
          return false;
        });
      }
      
      if (selectedBudget === '<$100') {
        return activities.filter(activity => {
          const costMatch = activity.match(/\$(\d+)-?\$?(\d+)?/);
          if (costMatch) {
            const maxCost = parseInt(costMatch[2] || costMatch[1]);
            return maxCost < 100;
          }
          return false;
        });
      }
      
      if (selectedBudget === '$100+') {
        return activities.filter(activity => {
          const costMatch = activity.match(/\$(\d+)-?\$?(\d+)?/);
          if (costMatch) {
            const maxCost = parseInt(costMatch[2] || costMatch[1]);
            return maxCost >= 100;
          }
          return false;
        });
      }
      
      return activities;
    };

    const suggestions = {
      'Creative': {
        '1 person': [
          '1. Free Solo Art Session - Personal creative expression with basic materials. Average cost: $0 (use existing supplies)',
          '2. Individual Crafting - DIY projects with recycled materials. Average cost: $0 (use household items)',
          '3. Personal Photography - Creative photo exploration with phone camera. Average cost: $0 (use smartphone)',
          '4. Solo Art Session - Personal creative expression and painting. Average cost: $30-60 per session',
          '5. Individual Crafting - DIY projects and handmade creations. Average cost: $20-40 per session',
          '6. Personal Photography - Creative photo exploration and techniques. Average cost: $15-30 per session'
        ],
        '2 people': [
          '1. Free Art Workshop - Painting and drawing with basic supplies. Average cost: $0 (use existing materials)',
          '2. Free Crafting Session - DIY projects with recycled materials. Average cost: $0 (use household items)',
          '3. Free Photography Walk - Creative photo exploration with phones. Average cost: $0 (use smartphones)',
          '4. Art Workshop - Painting, drawing, and creative expression. Average cost: $40-80 per session',
          '5. Crafting Session - DIY projects and handmade creations. Average cost: $30-60 per session',
          '6. Photography Walk - Creative photo exploration and techniques. Average cost: $25-50 per session'
        ],
        '3 people': [
          '1. Free Creative Studio Session - Group art with basic supplies. Average cost: $0 (use existing materials)',
          '2. Free Music Jam Session - Collaborative musical creativity. Average cost: $0 (use existing instruments)',
          '3. Free Art Gallery Tour - Virtual gallery tours and discussion. Average cost: $0 (online resources)',
          '4. Creative Studio Session - Group art and design projects. Average cost: $60-120 total',
          '5. Pottery Workshop - Clay sculpting and ceramic creation. Average cost: $80-160 total',
          '6. Music Jam Session - Collaborative musical creativity. Average cost: $50-100 total'
        ],
        '4+ people': [
          '1. Free Art Gallery Tour - Virtual gallery tours and discussion. Average cost: $0 (online resources)',
          '2. Free Creative Writing Workshop - Storytelling and literary expression. Average cost: $0 (use existing materials)',
          '3. Free Design Thinking Session - Creative problem-solving methods. Average cost: $0 (use existing supplies)',
          '4. Art Gallery Tour - Creative inspiration and discussion. Average cost: $100-200 total',
          '5. Creative Writing Workshop - Storytelling and literary expression. Average cost: $150-300 total',
          '6. Design Thinking Session - Creative problem-solving methods. Average cost: $120-250 total'
        ]
      },
      'Active': {
        '1 person': [
          '1. Free Solo Fitness - Personal workout using bodyweight exercises. Average cost: $0 (no equipment needed)',
          '2. Free Individual Hiking - Outdoor exploration and physical activity. Average cost: $0 (use local trails)',
          '3. Free Personal Sports - Individual athletic practice. Average cost: $0 (use public courts/fields)',
          '4. Solo Fitness Training - Personal workout and exercise guidance. Average cost: $30-60 per session',
          '5. Individual Hiking - Outdoor exploration and physical activity. Average cost: $15-30 per session',
          '6. Personal Sports Coaching - Individual athletic skill development. Average cost: $25-50 per session'
        ],
        '2 people': [
          '1. Free Fitness Training - Partner workout using bodyweight exercises. Average cost: $0 (no equipment needed)',
          '2. Free Hiking Adventure - Outdoor exploration and physical activity. Average cost: $0 (use local trails)',
          '3. Free Sports Practice - Athletic skill development. Average cost: $0 (use public courts/fields)',
          '4. Fitness Training - Personal workout and exercise guidance. Average cost: $50-100 per session',
          '5. Hiking Adventure - Outdoor exploration and physical activity. Average cost: $30-60 per session',
          '6. Sports Coaching - Individual athletic skill development. Average cost: $40-80 per session'
        ],
        '3 people': [
          '1. Free Group Fitness - Team workout using bodyweight exercises. Average cost: $0 (no equipment needed)',
          '2. Free Team Sports - Basketball, soccer, or volleyball games. Average cost: $0 (use public courts/fields)',
          '3. Free Outdoor Adventure - Group hiking and exploration. Average cost: $0 (use local trails)',
          '4. Group Fitness Class - Team workout and exercise session. Average cost: $60-120 total',
          '5. Adventure Sports - Rock climbing, kayaking, or outdoor activities. Average cost: $80-160 total',
          '6. Team Sports - Basketball, soccer, or volleyball games. Average cost: $50-100 total'
        ],
        '4+ people': [
          '1. Free Fitness Bootcamp - Intensive group training using bodyweight. Average cost: $0 (no equipment needed)',
          '2. Free Outdoor Adventure - Group hiking, camping, or exploration. Average cost: $0 (use local trails)',
          '3. Free Sports Tournament - Competitive athletic competition. Average cost: $0 (use public courts/fields)',
          '4. Fitness Bootcamp - Intensive group training program. Average cost: $120-250 total',
          '5. Outdoor Adventure - Group hiking, camping, or exploration. Average cost: $150-300 total',
          '6. Sports Tournament - Competitive athletic competition. Average cost: $100-200 total'
        ]
      },
      'Educational': {
        '1 person': [
          '1. Free Personal Tutoring - Self-study using online resources. Average cost: $0 (use free online courses)',
          '2. Free Individual Language Learning - Foreign language practice using apps. Average cost: $0 (use free language apps)',
          '3. Free Solo Skill Workshop - Professional development using online resources. Average cost: $0 (use free online tutorials)',
          '4. Personal Tutoring - One-on-one learning and skill development. Average cost: $25-50 per session',
          '5. Individual Language Learning - Foreign language practice and study. Average cost: $20-40 per session',
          '6. Solo Skill Workshop - Professional development and training. Average cost: $30-60 per session'
        ],
        '2 people': [
          '1. Free Tutoring Session - Self-study using online resources. Average cost: $0 (use free online courses)',
          '2. Free Language Learning - Foreign language practice using apps. Average cost: $0 (use free language apps)',
          '3. Free Skill Workshop - Professional development using online resources. Average cost: $0 (use free online tutorials)',
          '4. Tutoring Session - One-on-one learning and skill development. Average cost: $40-80 per session',
          '5. Language Learning - Foreign language practice and study. Average cost: $30-60 per session',
          '6. Skill Workshop - Professional development and training. Average cost: $50-100 per session'
        ],
        '3 people': [
          '1. Free Study Group - Collaborative learning using online resources. Average cost: $0 (use free online materials)',
          '2. Free Workshop Series - Multi-session educational program. Average cost: $0 (use free online courses)',
          '3. Free Book Club - Literary discussion and learning. Average cost: $0 (use library books)',
          '4. Study Group - Collaborative learning and knowledge sharing. Average cost: $60-120 total',
          '5. Workshop Series - Multi-session educational program. Average cost: $80-160 total',
          '6. Book Club - Literary discussion and learning. Average cost: $50-100 total'
        ],
        '4+ people': [
          '1. Free Educational Seminar - Group learning using online resources. Average cost: $0 (use free online materials)',
          '2. Free Training Program - Professional skill development. Average cost: $0 (use free online courses)',
          '3. Free Conference Workshop - Intensive learning session. Average cost: $0 (use free online tutorials)',
          '4. Educational Seminar - Group learning and discussion. Average cost: $120-250 total',
          '5. Training Program - Professional skill development. Average cost: $150-300 total',
          '6. Conference Workshop - Intensive learning session. Average cost: $100-200 total'
        ]
      },
      'Relaxation': {
        '1 person': [
          '1. Free Personal Spa Session - Home relaxation and wellness treatment. Average cost: $0 (use household items)',
          '2. Free Individual Meditation - Mindfulness and stress relief practice. Average cost: $0 (use free meditation apps)',
          '3. Free Solo Yoga Session - Physical and mental relaxation exercise. Average cost: $0 (use free online videos)',
          '4. Personal Spa Session - Massage, relaxation, and wellness treatment. Average cost: $60-120 per session',
          '5. Individual Meditation - Mindfulness and stress relief practice. Average cost: $20-40 per session',
          '6. Solo Yoga Session - Physical and mental relaxation exercise. Average cost: $25-50 per session'
        ],
        '2 people': [
          '1. Free Spa Session - Home relaxation and wellness treatment. Average cost: $0 (use household items)',
          '2. Free Meditation Class - Mindfulness and stress relief practice. Average cost: $0 (use free meditation apps)',
          '3. Free Yoga Session - Physical and mental relaxation exercise. Average cost: $0 (use free online videos)',
          '4. Spa Session - Massage, relaxation, and wellness treatment. Average cost: $80-160 per session',
          '5. Meditation Class - Mindfulness and stress relief practice. Average cost: $30-60 per session',
          '6. Yoga Session - Physical and mental relaxation exercise. Average cost: $40-80 per session'
        ],
        '3 people': [
          '1. Free Group Meditation - Collaborative mindfulness and relaxation. Average cost: $0 (use free meditation apps)',
          '2. Free Wellness Retreat - Day-long relaxation and rejuvenation. Average cost: $0 (use home and local resources)',
          '3. Free Spa Day - Group wellness and pampering experience. Average cost: $0 (use household items)',
          '4. Group Meditation - Collaborative mindfulness and relaxation. Average cost: $60-120 total',
          '5. Wellness Retreat - Day-long relaxation and rejuvenation. Average cost: $80-160 total',
          '6. Spa Day - Group wellness and pampering experience. Average cost: $120-250 total'
        ],
        '4+ people': [
          '1. Free Wellness Workshop - Group relaxation and stress management. Average cost: $0 (use free online resources)',
          '2. Free Yoga Retreat - Intensive relaxation and mindfulness program. Average cost: $0 (use free online videos)',
          '3. Free Spa Package - Group wellness and relaxation treatment. Average cost: $0 (use household items)',
          '4. Wellness Workshop - Group relaxation and stress management. Average cost: $120-250 total',
          '5. Yoga Retreat - Intensive relaxation and mindfulness program. Average cost: $150-300 total',
          '6. Spa Package - Group wellness and relaxation treatment. Average cost: $200-400 total'
        ]
      },
      'Social': {
        '1 person': [
          '1. Free Solo Coffee Meetup - Personal social connection at home. Average cost: $0 (use home coffee)',
          '2. Free Individual Social Activity - Personal social engagement. Average cost: $0 (use free online platforms)',
          '3. Free Personal Entertainment - Solo social and entertainment activities. Average cost: $0 (use free online resources)',
          '4. Solo Coffee Meetup - Personal social connection and conversation. Average cost: $10-20 per meeting',
          '5. Individual Social Activity - Personal social engagement. Average cost: $15-30 per session',
          '6. Personal Entertainment - Solo social and entertainment activities. Average cost: $10-25 per session'
        ],
        '2 people': [
          '1. Free Coffee Meetup - Casual conversation at home. Average cost: $0 (use home coffee)',
          '2. Free Dinner Date - Social dining at home. Average cost: $0 (cook at home)',
          '3. Free Game Night - Fun social interaction and entertainment. Average cost: $0 (use free games)',
          '4. Coffee Meetup - Casual conversation and social connection. Average cost: $20-40 per meeting',
          '5. Dinner Date - Social dining and relationship building. Average cost: $40-80 per meeting',
          '6. Game Night - Fun social interaction and entertainment. Average cost: $15-30 per session'
        ],
        '3 people': [
          '1. Free Group Dinner - Social dining at home. Average cost: $0 (cook at home)',
          '2. Free Game Night - Group entertainment and social interaction. Average cost: $0 (use free games)',
          '3. Free Social Mixer - Casual networking and socializing. Average cost: $0 (use free online platforms)',
          '4. Group Dinner - Social dining and conversation. Average cost: $60-120 total',
          '5. Game Night - Group entertainment and social interaction. Average cost: $40-80 total',
          '6. Social Mixer - Casual networking and socializing. Average cost: $80-160 total'
        ],
        '4+ people': [
          '1. Free Social Event - Group entertainment and interaction. Average cost: $0 (use free online platforms)',
          '2. Free Party Planning - Social celebration and gathering. Average cost: $0 (use home and free resources)',
          '3. Free Community Event - Local social engagement and connection. Average cost: $0 (use free community resources)',
          '4. Social Event - Group entertainment and interaction. Average cost: $120-250 total',
          '5. Party Planning - Social celebration and gathering. Average cost: $150-300 total',
          '6. Community Event - Local social engagement and connection. Average cost: $100-200 total'
        ]
      }
    };

    const baseSuggestions = suggestions[selectedActivity]?.[selectedPeople] || [];
    return filterByBudget(baseSuggestions);
  };

  return (
    <div className="activities-container">
      <div className="activities-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
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

        {/* Budget Dropdown */}
        <div className="dropdown-wrapper">
          <div className="dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setIsBudgetOpen(!isBudgetOpen)}
              onBlur={() => setTimeout(() => setIsBudgetOpen(false), 200)}
            >
              <span className="dropdown-text">{selectedBudget || 'Budget'}</span>
              <span className={`dropdown-arrow ${isBudgetOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isBudgetOpen && (
              <div className="dropdown-menu">
                {budgetOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleBudgetSelect(option)}
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
          disabled={!selectedPeople || !selectedActivity || !selectedBudget}
        >
          Generate
        </button>
      </div>
      
      {/* Fixed Size Output Box */}
      <div className="fixed-output-box">
        <div className="output-content">
          {isGenerated && selectedPeople && selectedActivity && selectedBudget ? (
            <div className="suggestions-content">
              <h3 className="suggestions-header">Activity Suggestions</h3>
              <div className="suggestions-text">
                {generateActivitySuggestions().slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="compact-suggestion">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="placeholder-content">
              <p>Select all options and click "Generate" to see personalized activity suggestions with descriptions and cost estimates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
