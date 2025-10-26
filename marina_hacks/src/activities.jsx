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
    '18-25',
    '26-35',
    '36-50',
    '51-65',
    '65+'
  ];

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
        'Creative': {
          '1 person': [
            'School Art Project - Create artwork for school assignments using free materials.',
            'YouTube Art Tutorial - Follow online art tutorials for beginners.',
            'DIY Room Decor - Make decorations for your bedroom using recycled materials.',
            'Sketchbook Journaling - Keep a daily art journal with drawings and ideas.',
            'Craft Kit Building - Assemble and customize craft kits from local stores ($5-15).'
          ],
          '2 people': [
            'Art Study Buddy - Practice drawing together and give each other feedback.',
            'Craft Competition - Challenge each other to create the best art project.',
            'School Mural - Collaborate on a mural for your school or community.',
            'Art Supply Sharing - Share art materials and try new techniques together.',
            'Craft Kit Duo - Work on craft kits together ($10-25).'
          ],
          '3 people': [
            'Art Club Meeting - Start a small art club with friends.',
            'Group Mural Project - Create a large artwork together for school.',
            'Craft Exchange - Make crafts and trade them with each other.',
            'Art Challenge Group - Weekly art challenges with friends.',
            'Craft Kit Party - Group craft kit assembly ($15-35).'
          ],
          '4+ people': [
            'School Art Exhibition - Organize an art show at school.',
            'Community Art Project - Create art for local community center.',
            'Art Workshop Group - Take group art classes together.',
            'Craft Fair Preparation - Prepare crafts for school fair.',
            'Art Club Field Trip - Visit local art museums and galleries ($20-40).'
          ]
        },
        'Active': {
          '1 person': [
            'Bike Riding - Explore neighborhood on your bike.',
            'Jump Rope - Practice jump rope tricks and routines.',
            'Hula Hooping - Learn hula hoop tricks and dance moves.',
            'Scooter Riding - Practice scooter tricks at local skate park.',
            'Swimming Lessons - Improve swimming skills at local pool ($10-20).'
          ],
          '2 people': [
            'Bike Race - Friendly bike racing with friends.',
            'Jump Rope Duo - Learn partner jump rope routines.',
            'Hula Hoop Battle - Compete in hula hoop tricks.',
            'Scooter Tag - Play tag on scooters at skate park.',
            'Swimming Buddy - Practice swimming together ($15-30).'
          ],
          '3 people': [
            'Bike Group Ride - Explore new bike trails together.',
            'Jump Rope Team - Learn group jump rope routines.',
            'Hula Hoop Circle - Create group hula hoop performances.',
            'Scooter Gang - Practice scooter tricks as a group.',
            'Swimming Team - Join local swimming team ($25-50).'
          ],
          '4+ people': [
            'Bike Club - Start a bike club with friends.',
            'Jump Rope Squad - Perform jump rope routines together.',
            'Hula Hoop Troupe - Create group hula hoop shows.',
            'Scooter Crew - Organize scooter competitions.',
            'Swimming Club - Join competitive swimming team ($40-80).'
          ]
        }
      },
      '18-25': {
        'Creative': {
          '1 person': [
            'Digital Art Creation - Create digital artwork using free design software.',
            'Song Writing - Write original music and lyrics.',
            'Photography - Explore urban photography and street art.',
            'DIY Fashion Design - Upcycle thrift store finds into unique pieces ($10-20).',
            'Indie Film Making - Create short films on smartphone ($15-30).'
          ],
          '2 people': [
            'Open Mic Night - Perform music or poetry at local cafes.',
            'Art Walk - Explore street art and murals together.',
            'Thrift Store Challenge - Competitive vintage clothing hunt ($20-40).',
            'Podcast Creation - Start a podcast with friends.',
            'Concert Going - Attend local indie music shows ($30-60).'
          ],
          '3 people': [
            'College Art Exhibition - Showcase group artwork on campus.',
            'Music Jam Session - Collaborate on original music.',
            'Film Festival - Create and submit short films ($40-80).',
            'Art Collective - Join local artists for collaborative projects.',
            'Creative Workshop - Learn new artistic skills together ($50-100).'
          ],
          '4+ people': [
            'Art Gallery Opening - Attend and network at exhibitions.',
            'Music Festival - Large group concert attendance ($60-120).',
            'Creative Retreat - Weekend art and music immersion ($100-200).',
            'Film Competition - Enter group film contests.',
            'Artisan Market - Sell handmade goods at local markets ($150-300).'
          ]
        },
        'Active': {
          '1 person': [
            'Gym Workout - Solo strength and cardio training.',
            'Running - Solo outdoor running and jogging.',
            'Beach Volleyball - Individual court practice.',
            'Rock Climbing - Indoor climbing wall sessions ($15-25).',
            'Dance Class - Individual dance lessons ($20-35).'
          ],
          '2 people': [
            'Gym Buddy Sessions - Partner workout routines.',
            'Running Partners - Joint outdoor running.',
            'Beach Volleyball Match - Friendly doubles games.',
            'Rock Climbing Partners - Indoor climbing together ($30-50).',
            'Partner Dance Lessons - Learn together ($35-65).'
          ],
          '3 people': [
            'Gym Squad - Group workout sessions.',
            'Running Group - Group outdoor running.',
            'Beach Volleyball Tournament - Trio competitive play.',
            'Rock Climbing Trio - Group climbing sessions ($50-75).',
            'Group Dance Class - Trio dance lessons ($60-100).'
          ],
          '4+ people': [
            'Fitness Club - Organized group fitness activities.',
            'Running Club - Regular group runs.',
            'Beach Volleyball League - Competitive team play.',
            'Rock Climbing Gym - Group climbing memberships ($80-150).',
            'Dance Studio Membership - Group dance classes ($120-200).'
          ]
        },
        'Social': {
          '1 person': [
            'Coffee Shop Studying - Work and study at cafes.',
            'Local Concert - Attend indie music shows alone.',
            'Student Events - Participate in campus activities.',
            'Bar Hopping - Solo night out exploring venues ($25-50).',
            'Comedy Club - Attend stand-up shows ($15-30).'
          ],
          '2 people': [
            'Coffee Date - Catch up with friends at cafes.',
            'Concert Date - Attend live music together ($40-80).',
            'Campus Events - Join student activities as a pair.',
            'Night Out - Explore nightlife together ($50-100).',
            'Comedy Night - Attend stand-up shows ($30-60).'
          ],
          '3 people': [
            'Study Group - Collaborative learning sessions.',
            'Concert Trio - Attend live music together ($60-120).',
            'Party Planning - Organize social gatherings.',
            'Group Night Out - Socialize at bars and clubs ($80-150).',
            'Comedy Night - Attend shows together ($50-100).'
          ],
          '4+ people': [
            'College Parties - Attend large social gatherings.',
            'Music Festival - Group concert experience ($100-200).',
            'Group Trips - Organized travel to events.',
            'Night Out Group - Large group socializing ($120-250).',
            'Comedy Festival - Group stand-up experience ($80-150).'
          ]
        },
        'Educational': {
          '1 person': [
            'Online Courses - Free college-level courses.',
            'Language Learning - Duolingo and similar apps.',
            'Podcast Series - Educational podcasts on interests.',
            'Skill Building - YouTube tutorials for hobbies.',
            'Webinars - Free online educational seminars.'
          ],
          '2 people': [
            'Study Partners - Joint learning sessions.',
            'Language Exchange - Practice together.',
            'Podcast Discussion - Listen and discuss episodes.',
            'Skill Teaching - Learn from each other.',
            'Webinar Duo - Attend together.'
          ],
          '3 people': [
            'Study Group - Regular sessions.',
            'Language Club - Practice together.',
            'Podcast Circle - Listen and discuss.',
            'Skill Exchange - Group learning.',
            'Webinar Group - Attend together.'
          ],
          '4+ people': [
            'Learning Community - Organized group ($100-200).',
            'Language Society - Large group ($120-250).',
            'Podcast Convention - Educational events ($150-300).',
            'Skill Network - Large group learning ($200-400).',
            'Educational Conference - Professional events ($250-500).'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Meditation - Free apps and YouTube.',
            'Yoga - Home practice with videos.',
            'Reading - Library books.',
            'Nature Walks - Local parks.',
            'Music Therapy - Calming playlists.'
          ],
          '2 people': [
            'Meditation Together - Joint practice.',
            'Partner Yoga - Couple sessions.',
            'Reading Date - Shared books.',
            'Nature Walk - Together.',
            'Music Therapy - Shared playlists.'
          ],
          '3 people': [
            'Group Meditation - Regular sessions.',
            'Yoga Class - Group practice.',
            'Reading Circle - Shared books.',
            'Group Nature Walk - Together.',
            'Music Therapy - Group sessions.'
          ],
          '4+ people': [
            'Meditation Retreat - Weekend ($150-300).',
            'Yoga Retreat - Wellness ($200-400).',
            'Book Club - Literary group.',
            'Nature Retreat - Group ($250-500).',
            'Wellness Retreat - Comprehensive ($300-600).'
          ]
        }
      },
      '26-35': {
        'Creative': {
          '1 person': [
            'Professional Photography - Build portfolio with outdoor sessions.',
            'Writing Workshop - Develop writing skills and projects.',
            'Home Decor DIY - Transform living space with budget projects ($20-40).',
            'Wine and Paint Night - Solo artistic evening ($25-45).',
            'Craft Market Visit - Explore local artisan markets ($15-30).'
          ],
          '2 people': [
            'Couple Cooking Class - Learn gourmet cooking together ($40-80).',
            'Art Gallery Date - Visit exhibitions together.',
            'Wine Tasting - Sample wines and discuss flavors ($50-100).',
            'Dance Lessons - Learn ballroom or salsa together ($60-120).',
            'Pottery Date Night - Create ceramics together ($50-90).'
          ],
          '3 people': [
            'Group Photography - Outdoor portrait sessions.',
            'Book Club - Discuss literature over wine.',
            'Cooking Party - Host themed dinner parties.',
            'Art Workshop - Professional skill-building class ($80-150).',
            'Wine and Paint Group - Artistic social evenings ($100-180).'
          ],
          '4+ people': [
            'Professional Networking - Industry art and creative events.',
            'Cooking Club - Monthly culinary adventures.',
            'Group Art Exhibition - Collaborate on larger projects.',
            'Wine Festival - Regional wine tasting events ($150-300).',
            'Creative Conference - Professional development summit ($200-400).'
          ]
        },
        'Active': {
          '1 person': [
            'Cycling Commuting - Bike to work for fitness.',
            'Yoga Practice - Individual yoga and meditation.',
            'Personal Training - Professional fitness coaching ($60-100).',
            'Marathon Training - Solo long-distance running.',
            'CrossFit Classes - High-intensity workouts ($80-150).'
          ],
          '2 people': [
            'Running Partners - Morning or evening runs together.',
            'Couple Yoga - Partner yoga sessions.',
            'Tennis Match - Friendly doubles games.',
            'Hiking Duo - Explore local trails together.',
            'Personal Training Couple - Joint fitness coaching ($100-180).'
          ],
          '3 people': [
            'Running Group - Regular group runs.',
            'Yoga Class - Group yoga sessions.',
            'Tennis Trio - Court play sessions.',
            'Hiking Group - Weekend trail adventures.',
            'Group Fitness Classes - CrossFit or HIIT together ($150-250).'
          ],
          '4+ people': [
            'Running Club - Organized weekly runs.',
            'Yoga Retreat - Weekend wellness getaway ($200-400).',
            'Tennis League - Competitive team play.',
            'Hiking Club - Regular outdoor adventures.',
            'Group Training Program - Professional fitness coaching ($250-500).'
          ]
        },
        'Social': {
          '1 person': [
            'Networking Events - Professional industry gatherings.',
            'Brewery Tours - Explore local craft breweries ($20-40).',
            'Comedy Shows - Attend stand-up performances.',
            'Theater Productions - Watch local theater ($25-50).',
            'Mixer Events - Professional networking mixers.'
          ],
          '2 people': [
            'Date Nights - Romantic dinners and activities.',
            'Brewery Tasting - Sample craft beers together ($40-80).',
            'Comedy Night - Attend shows as a couple.',
            'Theater Date - Watch plays together ($50-100).',
            'Double Date Events - Socialize with other couples.'
          ],
          '3 people': [
            'Friends Dinner - Regular restaurant gatherings.',
            'Brewery Hop - Visit multiple craft breweries ($60-120).',
            'Comedy Night - Attend shows together.',
            'Theater Group - Regular show attendance ($75-150).',
            'Social Dining Club - Monthly restaurant exploration.'
          ],
          '4+ people': [
            'Professional Events - Industry conferences and mixers.',
            'Brewery Festival - Large craft beer celebrations ($100-200).',
            'Comedy Festival - Group stand-up experiences ($150-300).',
            'Theater Season Ticket - Group subscription ($200-400).',
            'Social Club - Regular organized group activities ($150-300).'
          ]
        },
        'Educational': {
          '1 person': [
            'Professional Development - Industry certifications ($50-100).',
            'Skill Training - Specialized courses ($40-80).',
            'Business Networking - Professional mixers.',
            'Workshop Attendance - Industry workshops ($60-120).',
            'Continuing Education - University courses.'
          ],
          '2 people': [
            'Joint Certification - Professional together ($80-150).',
            'Couple Skill Training - Learn together ($60-120).',
            'Business Networking - Joint events.',
            'Workshop Duo - Attend together ($100-180).',
            'Educational Classes - Shared enrollment.'
          ],
          '3 people': [
            'Group Certification - Team training ($120-200).',
            'Skill Circle - Group learning.',
            'Business Network - Professional group.',
            'Workshop Group - Attend together ($150-250).',
            'Educational Circle - Group classes.'
          ],
          '4+ people': [
            'Professional Conference - Industry events ($300-600).',
            'Skill Summit - Large training ($250-500).',
            'Business Association - Professional group.',
            'Workshop Series - Group training ($400-800).',
            'Educational Summit - Large programs ($500-1000).'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Spa Day - Individual treatment ($60-100).',
            'Yoga Class - Regular sessions ($50-80).',
            'Meditation Retreat - Weekend getaway ($150-250).',
            'Massage Therapy - Individual sessions ($80-120).',
            'Wellness Program - Health focused ($100-180).'
          ],
          '2 people': [
            'Couple Spa Day - Joint treatments ($100-180).',
            'Partner Yoga - Couple sessions ($80-150).',
            'Retreat Together - Weekend getaway ($250-400).',
            'Couple Massage - Joint therapy ($120-200).',
            'Wellness Couple - Health focused ($180-300).'
          ],
          '3 people': [
            'Group Spa Day - Team treatments ($150-250).',
            'Yoga Trio - Group sessions ($120-200).',
            'Group Retreat - Weekend getaway ($300-500).',
            'Group Massage - Team therapy ($180-300).',
            'Wellness Group - Health focused ($250-450).'
          ],
          '4+ people': [
            'Wellness Retreat - Comprehensive ($400-700).',
            'Yoga Retreat - Group weekend ($350-600).',
            'Group Retreat - Wellness program ($500-900).',
            'Spa Weekend - Team treatments ($600-1000).',
            'Comprehensive Wellness - Professional program ($800-1500).'
          ]
        }
      },
      '36-50': {
        'Creative': {
          '1 person': [
            'Gourmet Cooking - Try new recipes at home.',
            'Gardening - Design and maintain personal garden.',
            'Woodworking - Create furniture and home decor.',
            'Watercolor Painting - Relaxing artistic hobby.',
            'Art Museum Membership - Regular gallery visits ($30-60).'
          ],
          '2 people': [
            'Couple Cooking Classes - Learn gourmet techniques together ($60-120).',
            'Garden Design Project - Create landscape together.',
            'Home Renovation - DIY home improvement projects.',
            'Paint and Sip - Artistic social activity ($50-100).',
            'Wine and Art Evening - Combine activities.'
          ],
          '3 people': [
            'Cooking Club - Share recipes and techniques.',
            'Garden Club - Group gardening activities.',
            'Home Improvement Group - Collaborative projects.',
            'Art Workshop - Professional skill classes ($120-200).',
            'Pottery Class - Ceramic creation together ($150-250).'
          ],
          '4+ people': [
            'Cooking Club - Monthly themed dinners.',
            'Garden Tour - Visit exemplary gardens.',
            'Home Renovation Circle - Help each other with projects.',
            'Art Studio Membership - Group creative space ($200-400).',
            'Cultural Arts Festival - Attend multi-day events ($250-500).'
          ]
        },
        'Active': {
          '1 person': [
            'Golfing - Solo rounds at local courses ($30-50).',
            'Swimming - Lap swimming at community pools.',
            'Walking - Daily walks for fitness.',
            'Tennis - Practice sessions ($20-40).',
            'Personal Training - Professional coaching ($80-120).'
          ],
          '2 people': [
            'Tennis Partners - Regular court sessions.',
            'Golfing Together - Play rounds as a couple ($50-100).',
            'Walking Partners - Daily exercise walks.',
            'Swimming Buddies - Lap swimming together.',
            'Couple Fitness Classes - Joint workouts.'
          ],
          '3 people': [
            'Golf Outing - Group rounds ($80-120).',
            'Tennis Doubles - Court play sessions.',
            'Walking Group - Regular group walks.',
            'Swimming Group - Lap sessions together.',
            'Group Fitness Classes - HIIT or Pilates ($150-250).'
          ],
          '4+ people': [
            'Golf League - Organized competitive play ($200-400).',
            'Tennis League - Team competition.',
            'Walking Club - Organized group walks.',
            'Swimming Club - Regular group sessions.',
            'Group Training Program - Professional coaching ($300-600).'
          ]
        },
        'Social': {
          '1 person': [
            'Professional Networking - Industry events.',
            'Wine Tastings - Educational tastings ($30-60).',
            'Cultural Events - Theater and performances.',
            'Museum Visits - Cultural enrichment ($20-40).',
            'Dining Out - Explore fine restaurants ($40-80).'
          ],
          '2 people': [
            'Date Nights - Regular romantic evenings.',
            'Wine Tasting Couples - Educational tastings ($60-120).',
            'Theater Dates - Watch plays together ($100-150).',
            'Museum Tours - Cultural visits together ($50-100).',
            'Fine Dining - Explore restaurants together ($80-150).'
          ],
          '3 people': [
            'Dinner Group - Regular restaurant gatherings.',
            'Wine Tasting Group - Educational tastings ($100-200).',
            'Theater Group - Season ticket holders ($150-300).',
            'Museum Tours - Group cultural visits.',
            'Social Dining Club - Monthly explorations ($150-300).'
          ],
          '4+ people': [
            'Dinner Club - Organized restaurant group ($200-400).',
            'Wine Festival - Attend tastings together ($300-600).',
            'Theater Season - Group subscriptions ($400-800).',
            'Cultural Group - Regular museum visits.',
            'Social Events - Organized group activities ($400-800).'
          ]
        },
        'Educational': {
          '1 person': [
            'Lifelong Learning - Continuing education courses ($40-80).',
            'Professional Workshops - Industry skills ($60-100).',
            'Book Club - Literary enrichment.',
            'Cultural Lectures - Educational talks ($20-50).',
            'Museum Memberships - Regular visits ($40-80).'
          ],
          '2 people': [
            'Couple Learning - Joint courses ($60-120).',
            'Professional Development - Together ($80-150).',
            'Book Club Couple - Joint reading.',
            'Lecture Series - Attend together ($50-100).',
            'Museum Membership - Couple ($60-140).'
          ],
          '3 people': [
            'Learning Circle - Group courses ($100-180).',
            'Professional Group - Training together.',
            'Book Club - Regular discussions.',
            'Lecture Group - Educational talks ($80-150).',
            'Museum Group - Group visits.'
          ],
          '4+ people': [
            'Learning Community - Programs ($250-500).',
            'Professional Summit - Group training ($300-600).',
            'Literary Society - Regular group.',
            'Lecture Series - Educational ($200-400).',
            'Cultural Society - Group activities ($300-600).'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Spa Membership - Regular treatments ($80-120).',
            'Gentle Yoga - Individual practice.',
            'Meditation - Regular sessions.',
            'Massage Therapy - Regular appointments ($80-120).',
            'Weekend Getaway - Solo retreat ($150-300).'
          ],
          '2 people': [
            'Couple Spa Day - Joint treatments ($120-200).',
            'Gentle Yoga - Partner practice.',
            'Meditation Together - Joint sessions.',
            'Couple Massage - Regular appointments ($120-200).',
            'Weekend Retreat - Together ($250-500).'
          ],
          '3 people': [
            'Group Spa - Treatments together ($150-250).',
            'Gentle Yoga Group - Group practice.',
            'Meditation Circle - Regular group.',
            'Group Massage - Team appointments ($150-250).',
            'Wellness Weekend - Group retreat ($350-700).'
          ],
          '4+ people': [
            'Spa Retreat - Comprehensive ($500-900).',
            'Yoga Retreat - Weekend group ($400-800).',
            'Meditation Retreat - Group intensive ($450-850).',
            'Wellness Weekend - Team program ($600-1200).',
            'Comprehensive Retreat - All activities ($800-1500).'
          ]
        }
      },
      '51-65': {
        'Creative': {
          '1 person': [
            'Mature Art Hobbies - Knitting, quilting, or painting.',
            'Reading - Join book clubs and literary activities.',
            'Photography - Landscape and nature photography.',
            'Gardening - Detailed garden design.',
            'Art Classes - Senior-friendly instruction ($35-60).'
          ],
          '2 people': [
            'Couple Art Projects - Collaborative creative work.',
            'Book Club Couple - Joint reading activities.',
            'Photography Duo - Capture moments together.',
            'Garden Planning - Design projects together.',
            'Art Studio Classes - Joint instruction ($60-120).'
          ],
          '3 people': [
            'Art Circle - Group creative sessions.',
            'Book Club - Regular literary discussions.',
            'Photography Group - Nature and landscape shoots.',
            'Garden Club - Group gardening activities.',
            'Art Workshop Series - Professional instruction ($120-200).'
          ],
          '4+ people': [
            'Art Society - Organized creative group ($200-400).',
            'Literary Society - Book discussion group.',
            'Photography Club - Regular group shoots.',
            'Garden Tour Group - Visit exemplary gardens.',
            'Cultural Arts Festival - Multi-day events ($300-600).'
          ]
        },
        'Active': {
          '1 person': [
            'Gentle Yoga - Individual practice sessions.',
            'Walking - Individual daily walks.',
            'Swimming - Lap swimming ($25-40).',
            'Golfing - Solo rounds at local courses ($30-50).',
            'Tai Chi - Gentle movement practice.'
          ],
          '2 people': [
            'Walking Partners - Daily exercise together.',
            'Yoga Couple - Joint gentle practice.',
            'Swimming Buddies - Lap sessions together.',
            'Golf Partners - Play rounds together ($50-100).',
            'Tai Chi Duo - Practice together.'
          ],
          '3 people': [
            'Walking Group - Group daily walks.',
            'Yoga Class - Group gentle sessions.',
            'Swimming Group - Lap sessions together.',
            'Golf Outing - Trio rounds ($80-120).',
            'Tai Chi Circle - Group practice.'
          ],
          '4+ people': [
            'Walking Club - Organized group walks.',
            'Yoga Retreat - Weekend wellness ($200-400).',
            'Swimming Club - Regular group sessions.',
            'Golf League - Organized competitive play ($250-500).',
            'Tai Chi Society - Community organization.'
          ]
        },
        'Social': {
          '1 person': [
            'Cultural Events - Theater and concerts.',
            'Museum Memberships - Regular gallery visits ($40-80).',
            'Lecture Series - Educational talks.',
            'Historical Tours - Explore local history ($30-60).',
            'Fine Dining - Enjoy quality restaurants ($50-100).'
          ],
          '2 people': [
            'Cultural Date Nights - Theater and concerts.',
            'Museum Tours - Visit exhibitions together ($60-120).',
            'Lecture Series - Attend educational talks.',
            'Historical Tours - Explore together ($50-100).',
            'Fine Dining Couple - Quality restaurants ($100-180).'
          ],
          '3 people': [
            'Cultural Group Events - Regular activities.',
            'Museum Group - Visit exhibitions together ($80-160).',
            'Lecture Group - Educational discussions.',
            'Historical Tour Group - Explore together.',
            'Dining Group - Organized restaurant visits ($150-300).'
          ],
          '4+ people': [
            'Cultural Society - Organized events ($250-500).',
            'Museum Circle - Regular group visits.',
            'Lecture Series - Educational organization.',
            'Historical Society - Organized tours.',
            'Dining Club - Sophisticated group dinners ($300-600).'
          ]
        },
        'Educational': {
          '1 person': [
            'Mature Learning - Senior education courses ($30-60).',
            'Historical Research - Local history study.',
            'Genealogy - Family tree research.',
            'Cultural Appreciation - Literature and arts.',
            'Lifelong Learning - University programs ($40-80).'
          ],
          '2 people': [
            'Couple Learning - Joint courses ($50-100).',
            'Historical Research - Together.',
            'Genealogy Pair - Family research.',
            'Cultural Appreciation - Couple activities.',
            'Lifelong Learning - Shared programs ($60-140).'
          ],
          '3 people': [
            'Learning Circle - Group courses ($80-150).',
            'Historical Research - Group study.',
            'Genealogy Circle - Regular meetings.',
            'Cultural Appreciation - Group activities.',
            'Educational Circle - Regular programs ($100-200).'
          ],
          '4+ people': [
            'Learning Society - Programs ($250-500).',
            'Historical Society - Group research ($300-600).',
            'Genealogy Society - Regular meetings.',
            'Cultural Society - Organized activities ($350-700).',
            'Educational Summit - Comprehensive programs ($400-800).'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Gentle Yoga - Individual practice.',
            'Senior Spa - Regular treatments ($60-100).',
            'Meditation - Regular sessions.',
            'Gentle Massage - Regular appointments ($60-100).',
            'Relaxing Retreat - Solo getaway ($120-250).'
          ],
          '2 people': [
            'Gentle Yoga - Partner practice.',
            'Couple Spa - Joint treatments ($100-180).',
            'Meditation Together - Joint sessions.',
            'Couple Massage - Regular appointments ($100-180).',
            'Retreat Together - Weekend getaway ($200-400).'
          ],
          '3 people': [
            'Gentle Yoga Group - Group practice.',
            'Group Spa - Treatments together ($120-220).',
            'Meditation Circle - Regular group.',
            'Group Massage - Team appointments ($120-220).',
            'Wellness Weekend - Group retreat ($250-500).'
          ],
          '4+ people': [
            'Yoga Retreat - Weekend group ($300-600).',
            'Spa Retreat - Comprehensive ($400-800).',
            'Meditation Retreat - Group intensive ($350-700).',
            'Wellness Weekend - Team program ($500-1000).',
            'Comprehensive Retreat - All activities ($600-1200).'
          ]
        }
      },
      '65+': {
        'Creative': {
          '1 person': [
            'Gentle Watercolor - Relaxing watercolor painting with soft brushes.',
            'Adult Coloring Books - Detailed coloring for stress relief.',
            'Knitting Circle - Learn or continue knitting projects.',
            'Garden Art - Create art using natural materials from garden.',
            'Art Therapy Session - Guided art therapy for relaxation ($20-40).'
          ],
          '2 people': [
            'Couple Painting - Paint together in a relaxed setting.',
            'Knitting Partners - Work on knitting projects together.',
            'Garden Art Duo - Create garden art installations together.',
            'Art Appreciation - Visit art galleries and discuss artwork.',
            'Art Therapy Couple - Joint art therapy sessions ($30-60).'
          ],
          '3 people': [
            'Senior Art Group - Join senior art classes.',
            'Knitting Circle - Regular knitting group meetings.',
            'Garden Art Club - Create art for community gardens.',
            'Art Discussion Group - Discuss art history and techniques.',
            'Art Therapy Group - Group art therapy sessions ($40-80).'
          ],
          '4+ people': [
            'Senior Art Society - Join senior art organization.',
            'Knitting Guild - Participate in knitting guild activities.',
            'Community Garden Art - Create art for community spaces.',
            'Art Lecture Series - Attend art history lectures.',
            'Art Therapy Workshop - Group art therapy workshops ($60-120).'
          ]
        },
        'Active': {
          '1 person': [
            'Gentle Walking - Daily walks in neighborhood or park.',
            'Tai Chi - Practice gentle tai chi movements.',
            'Swimming - Low-impact swimming at local pool.',
            'Gardening - Light gardening and plant care.',
            'Senior Fitness Class - Gentle exercise class ($15-25).'
          ],
          '2 people': [
            'Walking Partners - Regular walking with friends.',
            'Tai Chi Duo - Practice tai chi together.',
            'Swimming Buddies - Gentle swimming together.',
            'Garden Partners - Share gardening activities.',
            'Senior Fitness Couple - Joint fitness classes ($25-45).'
          ],
          '3 people': [
            'Walking Group - Group walks in local parks.',
            'Tai Chi Circle - Group tai chi practice.',
            'Swimming Group - Senior swimming group.',
            'Garden Club - Community gardening group.',
            'Senior Fitness Group - Group exercise classes ($35-65).'
          ],
          '4+ people': [
            'Senior Walking Club - Organized walking group.',
            'Tai Chi Society - Community tai chi organization.',
            'Senior Swimming Club - Competitive senior swimming.',
            'Community Garden - Large community gardening project.',
            'Senior Fitness Center - Comprehensive senior fitness program ($50-100).'
          ]
        },
        'Social': {
          '1 person': [
            'Senior Center Activities - Community programs.',
            'Cultural Events - Theater and musical performances.',
            'Historical Society - Join local history group.',
            'Book Club - Literary discussion groups ($15-30).',
            'Garden Tours - Visit beautiful gardens ($20-40).'
          ],
          '2 people': [
            'Senior Couples Events - Joint activities.',
            'Cultural Date Night - Theater and concerts.',
            'Historical Tours - Explore together ($40-80).',
            'Book Club Couple - Joint literary discussions.',
            'Garden Tour - Visit gardens together ($40-80).'
          ],
          '3 people': [
            'Senior Group Events - Regular activities.',
            'Cultural Group - Attend performances together.',
            'Historical Society - Organized tours.',
            'Book Club - Literary discussion group.',
            'Garden Club - Group garden visits ($60-120).'
          ],
          '4+ people': [
            'Senior Social Club - Organized events ($100-200).',
            'Cultural Society - Regular performances ($150-300).',
            'Historical Society - Organized activities ($120-250).',
            'Literary Circle - Book discussion group.',
            'Garden Tour Group - Visit exemplary gardens ($150-300).'
          ]
        },
        'Educational': {
          '1 person': [
            'Senior Education - Age-appropriate courses ($20-40).',
            'Genealogy Research - Family history projects.',
            'Cultural Appreciation - Arts and literature.',
            'Memory Activities - Brain fitness exercises.',
            'Gentle Learning - Low-impact courses ($25-50).'
          ],
          '2 people': [
            'Couple Learning - Joint courses ($30-60).',
            'Genealogy Together - Family research.',
            'Cultural Appreciation - Couple activities.',
            'Memory Activities - Joint exercises.',
            'Gentle Learning - Together ($40-80).'
          ],
          '3 people': [
            'Learning Circle - Group courses ($50-100).',
            'Genealogy Circle - Regular meetings.',
            'Cultural Appreciation - Group activities.',
            'Memory Circle - Group exercises.',
            'Educational Circle - Regular programs ($60-120).'
          ],
          '4+ people': [
            'Learning Society - Programs ($150-300).',
            'Genealogy Society - Regular meetings ($200-400).',
            'Cultural Society - Organized activities ($250-500).',
            'Memory Society - Group programs.',
            'Educational Summit - Comprehensive programs ($300-600).'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Gentle Yoga - Individual practice.',
            'Senior Spa - Regular treatments ($50-90).',
            'Meditation - Regular calm sessions.',
            'Gentle Massage - Regular appointments ($50-90).',
            'Peaceful Retreat - Solo getaway ($100-200).'
          ],
          '2 people': [
            'Gentle Yoga - Partner practice.',
            'Couple Spa - Joint treatments ($80-160).',
            'Meditation Together - Joint calm sessions.',
            'Couple Massage - Regular appointments ($80-160).',
            'Retreat Together - Weekend getaway ($150-300).'
          ],
          '3 people': [
            'Gentle Yoga Group - Group practice.',
            'Group Spa - Treatments together ($100-200).',
            'Meditation Circle - Regular group.',
            'Group Massage - Team appointments ($100-200).',
            'Wellness Weekend - Group retreat ($200-400).'
          ],
          '4+ people': [
            'Yoga Retreat - Weekend group ($250-500).',
            'Spa Retreat - Comprehensive ($300-600).',
            'Meditation Retreat - Group intensive ($280-550).',
            'Wellness Weekend - Team program ($400-800).',
            'Comprehensive Retreat - All activities ($500-1000).'
          ]
        }
      }
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
        
        case '18-25':
          // Include social activities, nightlife, and budget-friendly options
          // Avoid activities specifically for older audiences
          return !activityText.includes('golf') &&
                 !activityText.includes('retirement') &&
                 !activityText.includes('senior');
        
        case '26-35':
          // Professional development, networking, moderate-cost activities
          // Avoid extremely high-cost or young-adult specific activities
          return !activityText.includes('college') &&
                 !activityText.includes('student') &&
                 !activityText.includes('senior') &&
                 !activityText.includes('retirement');
        
        case '36-50':
          // Family-friendly, professional activities
          // Avoid college-specific or extremely strenuous activities
          return !activityText.includes('college party') &&
                 !activityText.includes('student') &&
                 !activityText.includes('extreme') &&
                 !activityText.includes('martial arts') &&
                 !activityText.includes('parkour');
        
        case '51-65':
          // Avoid high-intensity, extreme, or very strenuous activities
          return !activityText.includes('extreme') && 
                 !activityText.includes('intense') &&
                 !activityText.includes('high-energy') &&
                 !activityText.includes('adrenaline') &&
                 !activityText.includes('parkour') &&
                 !activityText.includes('skateboarding') &&
                 !activityText.includes('martial arts') &&
                 !activityText.includes('surfing') &&
                 !activityText.includes('rock climbing') &&
                 !activityText.includes('boxing') &&
                 !activityText.includes('college party') &&
                 !activityText.includes('student') &&
                 !activityText.includes('nightlife');
        
        case '65+':
          // Focus on gentle, accessible, low-impact activities
          return !activityText.includes('extreme') && 
                 !activityText.includes('intense') &&
                 !activityText.includes('high-energy') &&
                 !activityText.includes('adrenaline') &&
                 !activityText.includes('rock climbing') &&
                 !activityText.includes('skateboarding') &&
                 !activityText.includes('martial arts') &&
                 !activityText.includes('surfing') &&
                 !activityText.includes('boxing') &&
                 !activityText.includes('parkour') &&
                 !activityText.includes('fighting') &&
                 !activityText.includes('college') &&
                 !activityText.includes('student') &&
                 !activityText.includes('nightlife') &&
                 !activityText.includes('night out');
        
        default:
          return true;
      }
    };

    const suggestions = {
      'Creative': {
        '1 person': [
          'Abstract Sculpture Making - Creating 3D art from found objects. Use household items.',
          'Calligraphy Practice - Beautiful handwriting and lettering art. Use existing pens.',
          'Macrame Crafting - Knotting decorative wall hangings. Use old fabric strips.',
          'Digital Collage Design - Creating mixed media art on computer. Use free software.',
          'Shadow Puppetry - Making and performing with paper puppets. Use recycled materials.',
          'Sound Art Creation - Recording and mixing ambient sounds. Use smartphone.',
          'Encaustic Painting - Wax-based painting technique. Use household candles.',
          'Linocut Printmaking - Carving and printing designs. Use soft linoleum.',
          'Wire Sculpture - Creating 3D forms with wire. Use household wire.',
          'Digital Animation - Creating moving artwork. Use free software.',
          'Paper Quilling - Rolling paper into decorative shapes. Use colored paper.',
          'Fabric Dyeing - Creating custom colored fabrics. Use household dyes.',
          'Calligraphy Pen Set - Professional writing tools ($12-20).',
          'Macrame Cord Kit - Decorative knotting supplies ($15-25).',
          'Digital Drawing Pad - Professional art tablet ($30-50).',
          'Sculpture Clay Class - Individual pottery workshop ($25-40).',
          'Encaustic Kit - Wax painting supplies ($35-55).',
          'Linocut Tools - Printmaking equipment ($40-65).',
          'Wire Sculpture Kit - Metalworking supplies ($25-45).',
          'Animation Software - Professional motion graphics ($50-80).',
          'Paper Quilling Kit - Decorative paper supplies ($20-35).',
          'Fabric Dyeing Kit - Textile coloring supplies ($30-50).',
          'Calligraphy Workshop - Hand lettering instruction ($35-55).',
          'Macrame Studio - Advanced knotting techniques ($45-70).',
          'Digital Art Software - Professional design tools ($50-80).',
          'Sculpture Studio - Advanced clay techniques ($60-90).',
          'Encaustic Masterclass - Expert wax techniques ($70-110).',
          'Linocut Workshop - Professional printmaking ($80-120).',
          'Wire Art Studio - Advanced metalwork ($60-100).',
          'Animation Academy - Professional motion graphics ($100-150).',
          'Paper Art Retreat - Weekend quilling workshop ($120-180).',
          'Textile Design Course - Professional fabric techniques ($150-250).',
          'Calligraphy Masterclass - Expert lettering instruction ($80-120).',
          'Macrame Retreat - Weekend knotting workshop ($120-180).',
          'Digital Art Conference - Professional design summit ($150-250).',
          'Sculpture Exhibition - Art gallery showcase ($200-350).',
          'Encaustic Gallery Show - Wax art exhibition ($180-300).',
          'Printmaking Symposium - Professional print summit ($200-400).'
        ],
        '2 people': [
          'Tandem Mural Painting - Couple wall art creation. Use household supplies.',
          'Partner Glass Blowing - Joint glass art creation. Use local studio.',
          'Couple Pottery Wheel - Shared ceramic throwing. Use community studio.',
          'Duo Jewelry Making - Creating wearable art together. Use basic tools.',
          'Partner Wood Carving - Joint sculpture from wood. Use hand tools.',
          'Couple Textile Design - Creating fabric patterns together. Use simple materials.',
          'Tandem Encaustic Painting - Couple wax art creation. Use household candles.',
          'Partner Linocut Printing - Joint printmaking project. Use soft linoleum.',
          'Couple Wire Sculpture - Creating metal art together. Use household wire.',
          'Duo Digital Animation - Collaborative moving artwork. Use free software.',
          'Partner Paper Quilling - Joint decorative paper art. Use colored paper.',
          'Couple Fabric Dyeing - Creating custom textiles together. Use household dyes.',
          'Glass Blowing Kit - Basic glass art supplies ($20-35).',
          'Pottery Wheel Rental - Shared ceramic equipment ($30-50).',
          'Jewelry Making Tools - Basic metalworking supplies ($25-40).',
          'Wood Carving Set - Hand carving tools ($35-55).',
          'Textile Design Kit - Fabric printing supplies ($40-65).',
          'Encaustic Couple Kit - Joint wax painting supplies ($45-75).',
          'Linocut Partner Tools - Shared printmaking equipment ($50-80).',
          'Wire Sculpture Duo Kit - Couple metalworking supplies ($40-70).',
          'Animation Software Bundle - Joint motion graphics ($60-100).',
          'Paper Quilling Couple Kit - Shared decorative supplies ($35-60).',
          'Fabric Dyeing Duo Kit - Joint textile coloring ($50-85).',
          'Glass Studio Class - Professional glass techniques ($50-80).',
          'Pottery Masterclass - Advanced ceramic skills ($60-90).',
          'Jewelry Design Course - Professional metalwork ($70-110).',
          'Wood Sculpture Workshop - Advanced carving techniques ($80-120).',
          'Textile Art Studio - Professional fabric design ($90-130).',
          'Encaustic Couple Workshop - Joint wax techniques ($80-130).',
          'Linocut Partner Course - Shared printmaking skills ($100-150).',
          'Wire Art Couple Studio - Joint metalwork techniques ($90-140).',
          'Animation Couple Academy - Shared motion graphics ($120-180).',
          'Paper Art Couple Retreat - Joint quilling workshop ($150-250).',
          'Textile Couple Design Course - Shared fabric techniques ($180-300).',
          'Glass Art Retreat - Weekend glass workshop ($150-250).',
          'Pottery Exhibition - Ceramic art showcase ($200-400).',
          'Jewelry Gallery Show - Metalwork exhibition ($180-350).',
          'Wood Art Symposium - Carving summit ($200-450).',
          'Textile Design Conference - Fabric art summit ($250-500).'
        ],
        '3 people': [
          'Trio Mosaic Creation - Group tile art assembly. Use broken ceramics.',
          'Group Metalworking - Collaborative metal sculpture. Use basic tools.',
          'Trio Printmaking - Group art printing techniques. Use simple materials.',
          'Group Ceramic Glazing - Collaborative pottery finishing. Use community kiln.',
          'Trio Weaving Project - Group textile creation. Use basic looms.',
          'Group Stained Glass - Collaborative glass art. Use colored glass.',
          'Trio Encaustic Workshop - Group wax art creation. Use household candles.',
          'Group Linocut Printing - Collaborative printmaking. Use soft linoleum.',
          'Trio Wire Sculpture - Group metal art creation. Use household wire.',
          'Group Digital Animation - Collaborative moving artwork. Use free software.',
          'Trio Paper Quilling - Group decorative paper art. Use colored paper.',
          'Group Fabric Dyeing - Collaborative textile creation. Use household dyes.',
          'Mosaic Tile Kit - Group tile art supplies ($30-50).',
          'Metalworking Tools - Basic metal sculpture supplies ($40-70).',
          'Printmaking Kit - Group printing materials ($35-60).',
          'Ceramic Glazing Set - Pottery finishing supplies ($45-75).',
          'Weaving Loom Rental - Group textile equipment ($50-85).',
          'Stained Glass Kit - Glass art materials ($60-100).',
          'Encaustic Trio Kit - Group wax painting supplies ($60-100).',
          'Linocut Group Tools - Shared printmaking equipment ($70-110).',
          'Wire Sculpture Trio Kit - Group metalworking supplies ($55-90).',
          'Animation Software Suite - Group motion graphics ($80-130).',
          'Paper Quilling Trio Kit - Group decorative supplies ($50-85).',
          'Fabric Dyeing Group Kit - Shared textile coloring ($70-120).',
          'Mosaic Workshop - Professional tile techniques ($70-110).',
          'Metal Sculpture Class - Advanced metalwork ($80-130).',
          'Printmaking Studio - Professional printing techniques ($90-140).',
          'Ceramic Glazing Course - Advanced pottery finishing ($100-150).',
          'Weaving Retreat - Weekend textile workshop ($150-250).',
          'Stained Glass Masterclass - Expert glass techniques ($200-350).',
          'Encaustic Trio Workshop - Group wax techniques ($120-180).',
          'Linocut Group Course - Shared printmaking skills ($150-220).',
          'Wire Art Trio Studio - Group metalwork techniques ($130-200).',
          'Animation Trio Academy - Group motion graphics ($180-280).',
          'Paper Art Trio Retreat - Group quilling workshop ($200-350).',
          'Textile Trio Design Course - Group fabric techniques ($250-400).',
          'Mosaic Symposium - Tile art summit ($200-400).',
          'Metal Art Conference - Sculpture summit ($250-500).',
          'Printmaking Festival - Professional print celebration ($300-600).',
          'Ceramic Art Symposium - Pottery summit ($350-650).'
        ],
        '4+ people': [
          'Community Mosaic Installation - Large-scale tile art project. Use donated materials.',
          'Group Bronze Casting - Collaborative metal sculpture. Use foundry facilities.',
          'Community Printmaking - Mass art printing workshop. Use community press.',
          'Group Kiln Firing - Large-scale ceramic firing. Use community kiln.',
          'Community Weaving Circle - Large group textile creation. Use multiple looms.',
          'Group Glass Fusion - Collaborative glass art. Use community furnace.',
          'Community Encaustic Workshop - Large group wax art creation. Use bulk candles.',
          'Group Linocut Printing - Mass printmaking project. Use community equipment.',
          'Community Wire Sculpture - Large group metal art creation. Use bulk wire.',
          'Group Digital Animation - Mass collaborative moving artwork. Use shared software.',
          'Community Paper Quilling - Large group decorative paper art. Use bulk supplies.',
          'Group Fabric Dyeing - Mass collaborative textile creation. Use bulk dyes.',
          'Community Mosaic Kit - Large-scale tile supplies ($50-90).',
          'Bronze Casting Tools - Group metalwork equipment ($70-120).',
          'Community Print Press - Mass printing equipment ($80-130).',
          'Group Kiln Rental - Large ceramic firing ($90-150).',
          'Community Weaving Looms - Multiple textile equipment ($100-180).',
          'Glass Fusion Kit - Group glass art supplies ($120-200).',
          'Community Encaustic Kit - Large group wax supplies ($100-160).',
          'Group Linocut Equipment - Mass printmaking tools ($120-200).',
          'Community Wire Kit - Large group metalwork supplies ($90-150).',
          'Group Animation Software - Mass motion graphics ($150-250).',
          'Community Paper Kit - Large group decorative supplies ($100-180).',
          'Group Fabric Dye Kit - Mass textile coloring ($120-220).',
          'Community Mosaic Workshop - Large-scale tile techniques ($150-250).',
          'Bronze Casting Course - Professional metalwork ($200-350).',
          'Community Printmaking Studio - Mass printing techniques ($250-400).',
          'Group Kiln Masterclass - Advanced ceramic firing ($300-500).',
          'Community Weaving Festival - Weekend textile celebration ($400-700).',
          'Glass Fusion Conference - Professional glass summit ($500-800).',
          'Community Encaustic Festival - Large group wax celebration ($300-600).',
          'Group Printmaking Symposium - Mass print summit ($400-800).',
          'Community Wire Art Festival - Large group metal celebration ($500-900).',
          'Group Animation Conference - Mass motion graphics summit ($600-1000).',
          'Community Paper Art Festival - Large group decorative celebration ($400-800).',
          'Group Textile Design Summit - Mass fabric art conference ($600-1200).',
          'Community Art Biennial - Large-scale art exhibition ($800-1500).',
          'Group Creative Symposium - Mass art summit ($1000-2000).'
        ]
      },
      'Active': {
        '1 person': [
          'Solo Trail Running - Individual mountain trail exploration. Use hiking shoes.',
          'Personal Kayaking - Self-guided water paddling. Use rental equipment.',
          'Solo Archery Practice - Individual target shooting. Use local range.',
          'Personal Boxing Training - Individual combat fitness. Use home equipment.',
          'Solo Parkour - Individual urban obstacle navigation. Use public spaces.',
          'Personal Surfing - Individual wave riding. Use rental board.',
          'Solo Rock Climbing - Individual indoor climbing. Use climbing gym.',
          'Personal Skiing - Individual snow sports. Use rental equipment.',
          'Solo Martial Arts - Individual combat training. Use home space.',
          'Personal Swimming - Individual water fitness. Use public pools.',
          'Solo Cycling - Individual bike touring. Use personal bike.',
          'Personal Weightlifting - Individual strength training. Use gym equipment.',
          'Trail Running Shoes - Professional outdoor footwear ($60-100).',
          'Kayak Rental - Personal watercraft access ($25-40).',
          'Archery Equipment - Personal bow and arrows ($80-120).',
          'Boxing Gloves Set - Personal combat gear ($40-70).',
          'Parkour Training - Professional movement instruction ($50-80).',
          'Surfboard Rental - Personal wave equipment ($30-50).',
          'Rock Climbing Gear - Personal climbing equipment ($60-100).',
          'Ski Rental - Personal snow equipment ($40-70).',
          'Martial Arts Gi - Personal training uniform ($50-80).',
          'Swimming Gear - Personal water equipment ($30-60).',
          'Cycling Equipment - Personal bike gear ($80-130).',
          'Weightlifting Kit - Personal strength equipment ($100-150).',
          'Trail Running Club - Professional outdoor training ($70-110).',
          'Kayaking Tour - Guided water exploration ($80-130).',
          'Archery Competition - Professional target shooting ($100-150).',
          'Boxing Gym Membership - Professional combat training ($120-180).',
          'Parkour Academy - Advanced movement techniques ($150-250).',
          'Surfing Retreat - Weekend wave riding ($200-400).',
          'Rock Climbing Course - Professional climbing instruction ($120-200).',
          'Skiing Lessons - Professional snow instruction ($150-250).',
          'Martial Arts Masterclass - Expert combat training ($180-300).',
          'Swimming Coaching - Professional water training ($100-180).',
          'Cycling Tour - Professional bike expedition ($200-350).',
          'Personal Training - Individual fitness coaching ($150-250).',
          'Adventure Sports Summit - Professional outdoor conference ($300-500).',
          'Elite Athlete Retreat - Premium training camp ($500-800).'
        ],
        '2 people': [
          'Couple Rock Climbing - Partner indoor climbing adventure. Use climbing gym.',
          'Tandem Kayaking - Partner water paddling expedition. Use rental equipment.',
          'Couple Archery Competition - Partner target shooting contest. Use local range.',
          'Partner Boxing Training - Couple combat fitness workout. Use gym equipment.',
          'Couple Parkour Challenge - Partner urban obstacle course. Use public spaces.',
          'Tandem Surfing - Partner wave riding experience. Use rental boards.',
          'Rock Climbing Gear - Couple climbing equipment ($100-150).',
          'Tandem Kayak Rental - Partner watercraft access ($40-70).',
          'Couple Archery Set - Partner bow and arrows ($120-180).',
          'Partner Boxing Kit - Couple combat gear ($70-110).',
          'Couple Parkour Training - Partner movement instruction ($80-130).',
          'Tandem Surfboard Rental - Partner wave equipment ($50-90).',
          'Couple Rock Climbing Class - Partner climbing instruction ($100-150).',
          'Tandem Kayaking Tour - Partner water exploration ($120-180).',
          'Couple Archery Tournament - Partner target competition ($150-220).',
          'Partner Boxing Gym - Couple combat training ($140-200).',
          'Couple Parkour Academy - Partner movement techniques ($200-300).',
          'Tandem Surfing Retreat - Partner wave riding ($300-500).'
        ],
        '3 people': [
          'Trio Mountain Biking - Group off-road cycling adventure. Use rental bikes.',
          'Group Whitewater Rafting - Team river navigation. Use raft equipment.',
          'Trio Archery Tournament - Group target shooting competition. Use local range.',
          'Group Boxing Sparring - Team combat training. Use gym equipment.',
          'Trio Parkour Course - Group urban obstacle navigation. Use public spaces.',
          'Group Surfing Lesson - Team wave riding instruction. Use rental boards.',
          'Mountain Bike Rental - Group off-road equipment ($90-150).',
          'Whitewater Raft Rental - Team watercraft access ($60-100).',
          'Trio Archery Kit - Group bow and arrows ($150-220).',
          'Group Boxing Equipment - Team combat gear ($100-150).',
          'Trio Parkour Training - Group movement instruction ($120-180).',
          'Group Surfboard Rental - Team wave equipment ($80-130).',
          'Trio Mountain Biking Tour - Group off-road instruction ($150-220).',
          'Group Whitewater Expedition - Team river exploration ($180-280).',
          'Trio Archery Championship - Group target competition ($200-300).',
          'Group Boxing Gym - Team combat training ($180-250).',
          'Trio Parkour Academy - Group movement techniques ($250-400).',
          'Group Surfing Retreat - Team wave riding ($400-650).'
        ],
        '4+ people': [
          'Community Mountain Biking - Large group off-road cycling expedition. Use rental bikes.',
          'Group Whitewater Expedition - Large team river navigation. Use raft equipment.',
          'Community Archery Tournament - Large group target shooting competition. Use local range.',
          'Group Boxing Championship - Large team combat training. Use gym equipment.',
          'Community Parkour Course - Large group urban obstacle navigation. Use public spaces.',
          'Group Surfing Competition - Large team wave riding contest. Use rental boards.',
          'Community Mountain Bike Fleet - Large group off-road equipment ($120-200).',
          'Group Whitewater Fleet - Large team watercraft access ($100-150).',
          'Community Archery Range - Large group bow and arrows ($200-300).',
          'Group Boxing Arena - Large team combat gear ($150-250).',
          'Community Parkour Facility - Large group movement equipment ($200-350).',
          'Group Surfboard Fleet - Large team wave equipment ($150-250).',
          'Community Mountain Biking Festival - Large group off-road celebration ($250-400).',
          'Group Whitewater Championship - Large team river competition ($300-500).',
          'Community Archery Olympics - Large group target championship ($350-550).',
          'Group Boxing Tournament - Large team combat championship ($400-650).',
          'Community Parkour Festival - Large group movement celebration ($500-800).',
          'Group Surfing Championship - Large team wave competition ($600-1000).'
        ]
      },
      'Educational': {
        '1 person': [
          'Solo Research Project - Independent study on topics of interest. Use library resources.',
          'Language Immersion - Self-directed foreign language practice using apps. Use free language apps.',
          'Online Course Marathon - Intensive individual learning through online platforms. Use free resources.',
          'Podcast Deep Dive - Educational podcast series and audio learning.',
          'Documentary Study - Educational film analysis and note-taking.',
          'Skill Building - Learning new technical skills through tutorials.',
          'Personal Library - Building educational book collection ($15-30).',
          'Premium Online Course - Advanced structured learning platform ($20-50).',
          'Language App Pro - Advanced language learning subscription ($15-25).',
          'Individual Workshop - Personal learning session ($25-40).',
          'Private Tutor - One-on-one academic instruction ($40-60).',
          'Language Immersion Class - Intensive foreign language course ($50-80).',
          'Professional Certification - Industry credential program ($60-100).',
          'University Extension - Continuing education enrollment ($80-120).',
          'Learning Retreat - Intensive educational weekend ($150-300).'
        ],
        '2 people': [
          'Study Partnership - Collaborative research and learning. Use library resources.',
          'Language Exchange - Mutual foreign language practice together. Use free language apps.',
          'Couple Course Taking - Joint online learning through platforms. Use free resources.',
          'Study Buddy Sessions - Regular collaborative learning meetings.',
          'Language Conversation - Practicing foreign languages through dialogue.',
          'Skill Teaching - Learning from each other\'s expertise.',
          'Couple Library - Joint educational book collection ($25-50).',
          'Partner Online Course - Shared structured learning platform ($35-80).',
          'Language App Duo - Joint language learning subscription ($25-40).',
          'Couple Workshop - Joint learning session ($40-70).',
          'Partner Tutoring - Collaborative academic instruction ($60-100).',
          'Language Exchange Class - Mutual foreign language course ($80-120).',
          'Couple Certification - Joint professional credential program ($100-150).',
          'Partner University Course - Shared continuing education ($120-200).',
          'Learning Getaway - Couple educational weekend ($250-500).'
        ],
        '3 people': [
          'Study Circle - Group collaborative research and learning. Use library resources.',
          'Language Club - Group foreign language practice sessions. Use free language apps.',
          'Trio Course Taking - Group online learning through platforms. Use free resources.',
          'Learning Discussion Group - Regular group educational meetings.',
          'Language Roundtable - Group foreign language conversation practice.',
          'Skill Exchange Circle - Group learning from each other\'s expertise.',
          'Group Library - Shared educational book collection ($35-70).',
          'Trio Online Course - Group structured learning platform ($50-100).',
          'Language App Group - Group language learning subscription ($35-60).',
          'Group Workshop - Team learning session ($60-100).',
          'Group Tutoring - Collaborative academic instruction ($80-120).',
          'Language Club Class - Group foreign language course ($100-150).',
          'Group Certification - Team professional credential program ($150-250).',
          'Trio University Course - Group continuing education ($150-300).',
          'Learning Adventure - Group educational weekend ($300-600).'
        ],
        '4+ people': [
          'Learning Community - Large group collaborative research and study. Use library resources.',
          'Language Society - Large group foreign language practice sessions. Use free language apps.',
          'Community Course Taking - Mass online learning through platforms. Use free resources.',
          'Educational Forum - Large group learning discussion meetings.',
          'Language Convention - Large group foreign language conversation practice.',
          'Skill Exchange Network - Large group learning from each other\'s expertise.',
          'Community Library - Large group educational book collection ($50-100).',
          'Community Online Course - Mass structured learning platform ($70-120).',
          'Language App Community - Large group language learning subscription ($50-80).',
          'Community Workshop - Mass learning session ($80-120).',
          'Community Tutoring - Large group academic instruction ($100-150).',
          'Language Society Class - Large group foreign language course ($120-200).',
          'Community Certification - Mass professional credential program ($200-350).',
          'Community University Course - Large group continuing education ($200-400).',
          'Learning Festival - Large group educational weekend ($400-800).'
        ]
      },
      'Relaxation': {
        '1 person': [
          'Solo Meditation - Personal mindfulness and stress relief practice. Use free meditation apps.',
          'Home Yoga Flow - Individual flexibility and relaxation exercise. Use free online videos.',
          'Reading Retreat - Personal book reading and literary relaxation. Use library resources.',
          'Solo Nature Walk - Individual peaceful outdoor mindfulness.',
          'Personal Music Therapy - Calming music and ambient sound sessions.',
          'Solo Journaling - Personal reflective writing and self-care.',
          'Personal Aromatherapy - Individual essential oils and relaxation scents ($15-25).',
          'Premium Meditation App - Advanced mindfulness subscription ($10-20).',
          'Private Yoga Session - Individual guided instruction ($15-30).',
          'Personal Massage - Individual relaxation treatment ($40-60).',
          'Solo Spa Day - Personal wellness and relaxation treatment ($60-100).',
          'Personal Retreat - Individual mindfulness weekend ($100-200).',
          'Luxury Solo Spa - Premium personal wellness experience ($150-300).'
        ],
        '2 people': [
          'Couple Meditation - Partner mindfulness and stress relief practice. Use free meditation apps.',
          'Partner Yoga Flow - Couple flexibility and relaxation exercise. Use free online videos.',
          'Reading Date - Couple book reading and literary relaxation. Use library resources.',
          'Romantic Nature Walk - Couple peaceful outdoor mindfulness.',
          'Couple Music Therapy - Shared calming music and ambient sound sessions.',
          'Partner Journaling - Couple reflective writing and self-care.',
          'Couple Aromatherapy - Shared essential oils and relaxation scents ($25-40).',
          'Partner Meditation App - Joint mindfulness subscription ($15-30).',
          'Couple Yoga Class - Partner guided instruction ($25-50).',
          'Couple Massage - Joint relaxation treatment ($60-100).',
          'Romantic Spa Day - Couple wellness and relaxation treatment ($100-150).',
          'Couple Retreat - Partner mindfulness weekend ($150-300).',
          'Luxury Couple Spa - Premium partner wellness experience ($250-500).'
        ],
        '3 people': [
          'Trio Meditation - Group mindfulness and stress relief practice. Use free meditation apps.',
          'Group Yoga Flow - Trio flexibility and relaxation exercise. Use free online videos.',
          'Reading Circle - Group book reading and literary relaxation. Use library resources.',
          'Friends Nature Walk - Group peaceful outdoor mindfulness.',
          'Group Music Therapy - Shared calming music and ambient sound sessions.',
          'Trio Journaling - Group reflective writing and self-care.',
          'Group Aromatherapy - Shared essential oils and relaxation scents ($35-60).',
          'Trio Meditation App - Group mindfulness subscription ($20-40).',
          'Group Yoga Class - Trio guided instruction ($40-80).',
          'Group Massage - Joint relaxation treatment ($80-120).',
          'Friends Spa Day - Group wellness and relaxation treatment ($120-200).',
          'Trio Retreat - Group mindfulness weekend ($200-400).',
          'Luxury Group Spa - Premium group wellness experience ($350-700).'
        ],
        '4+ people': [
          'Community Meditation - Large group mindfulness and stress relief practice. Use free meditation apps.',
          'Community Yoga Flow - Large group flexibility and relaxation exercise. Use free online videos.',
          'Reading Community - Large group book reading and literary relaxation. Use library resources.',
          'Community Nature Walk - Large group peaceful outdoor mindfulness.',
          'Community Music Therapy - Large group calming music and ambient sound sessions.',
          'Community Journaling - Large group reflective writing and self-care.',
          'Community Aromatherapy - Large group essential oils and relaxation scents ($50-80).',
          'Community Meditation App - Large group mindfulness subscription ($30-50).',
          'Community Yoga Class - Large group guided instruction ($60-100).',
          'Community Massage - Large group relaxation treatment ($100-150).',
          'Community Spa Day - Large group wellness and relaxation treatment ($150-250).',
          'Community Retreat - Large group mindfulness weekend ($250-500).',
          'Luxury Community Spa - Premium large group wellness experience ($400-800).'
        ]
      },
      'Social': {
        '1 person': [
          'Solo Social Media - Individual online community engagement. Use free online platforms.',
          'Personal Reading - Individual book enjoyment and entertainment. Use library resources.',
          'Solo Music Discovery - Individual music and podcast exploration. Use free online resources.',
          'Online Networking - Individual professional and social connections.',
          'Solo Video Calls - Individual face-to-face conversations with friends and family.',
          'Solo Community Events - Individual attendance at local free social gatherings.',
          'Solo Coffee Shop - Individual social connection and conversation at cafes ($5-15).',
          'Solo Movie Experience - Individual film enjoyment and entertainment ($10-20).',
          'Solo Board Game Cafe - Individual gaming and socializing ($15-25).',
          'Solo Restaurant Dining - Individual social dining and relationship building ($20-40).',
          'Solo Concert Experience - Individual live entertainment and social experience ($30-60).',
          'Solo Social Club - Individual organized social activities and events ($50-100).',
          'Solo VIP Event - Individual premium social experiences and exclusive gatherings ($100-200).'
        ],
        '2 people': [
          'Couple Coffee Chat - Partner conversation at home. Use home coffee.',
          'Cooking Date - Partner meal preparation and dining at home. Cook at home.',
          'Couple Gaming - Partner video games and board games together. Use free games.',
          'Couple Video Calls - Partner face-to-face conversations with friends and family.',
          'Couple Community Events - Partner attendance at local free social gatherings.',
          'Couple Social Media - Partner online community engagement.',
          'Couple Coffee Shop - Partner social connection and conversation at cafes ($10-25).',
          'Couple Movie Date - Partner film enjoyment and entertainment ($15-35).',
          'Couple Board Game Cafe - Partner gaming and socializing ($25-45).',
          'Couple Restaurant Dining - Partner social dining and relationship building ($30-60).',
          'Couple Concert Date - Partner live entertainment and social experience ($50-100).',
          'Couple Social Club - Partner organized social activities and events ($80-150).',
          'Couple VIP Event - Partner premium social experiences and exclusive gatherings ($150-350).'
        ],
        '3 people': [
          'Trio Cooking Session - Group meal preparation and dining at home. Cook at home.',
          'Trio Gaming Night - Group video games and board games together. Use free games.',
          'Trio Chat Session - Group conversation and socializing together. Use free online platforms.',
          'Trio Video Calls - Group face-to-face conversations with friends and family.',
          'Trio Community Events - Group attendance at local free social gatherings.',
          'Trio Social Media - Group online community engagement.',
          'Trio Coffee Shop - Group social connection and conversation at cafes ($15-35).',
          'Trio Movie Night - Group film enjoyment and entertainment ($20-50).',
          'Trio Board Game Cafe - Group gaming and socializing ($35-65).',
          'Trio Restaurant Dining - Group social dining and conversation at restaurants ($50-90).',
          'Trio Concert Experience - Group live entertainment and social experience ($80-150).',
          'Trio Social Club - Group organized social activities and events ($120-200).',
          'Trio VIP Event - Group premium social experiences and exclusive gatherings ($200-450).'
        ],
        '4+ people': [
          'Community Cooking Event - Large group meal preparation and dining. Cook at home.',
          'Community Gaming Tournament - Large group video games and board games. Use free games.',
          'Community Chat Session - Large group conversation and socializing. Use free online platforms.',
          'Community Video Calls - Large group face-to-face conversations with friends and family.',
          'Community Events Attendance - Large group attendance at local free social gatherings.',
          'Community Social Media - Large group online community engagement.',
          'Community Coffee Shop - Large group social connection and conversation at cafes ($20-50).',
          'Community Movie Night - Large group film enjoyment and entertainment ($30-70).',
          'Community Board Game Cafe - Large group gaming and socializing ($50-90).',
          'Community Restaurant Dining - Large group social dining and conversation ($80-120).',
          'Community Concert Experience - Large group live entertainment and social experience ($120-200).',
          'Community Social Club - Large group organized social activities and events ($150-300).',
          'Community VIP Event - Large group premium social experiences and exclusive gatherings ($300-600).'
        ]
      }
    };

    const baseSuggestions = suggestions[selectedActivity]?.[selectedPeople] || [];
    
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
