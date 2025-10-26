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
            'Craft Kit Building - Assemble and customize craft kits from local stores ($5-15).',
            'Origami Folding - Create paper animals and shapes using tutorials.',
            'Collage Making - Use magazines and photos to create artistic collages.',
            'Hand Lettering - Practice beautiful handwriting and calligraphy.',
            'Clay Sculpting - Create small sculptures from air-dry clay ($5-10).',
            'Photography - Take artistic photos with your smartphone.'
          ],
          '2 people': [
            'Art Study Buddy - Practice drawing together and give each other feedback.',
            'Craft Competition - Challenge each other to create the best art project.',
            'School Mural - Collaborate on a mural for your school or community.',
            'Art Supply Sharing - Share art materials and try new techniques together.',
            'Craft Kit - Work on craft kits together ($10-25).',
            'Pottery Together - Try clay wheel or hand-building together ($20-35).',
            'Origami Challenge - See who can fold the most creative designs.',
            'Photo Shoot - Take artistic portraits of each other.',
            'Vision Board Creation - Make inspiring collages together.',
            'Friendship Bracelets - Make and exchange bracelets.'
          ],
          '3 people': [
            'Art Club Meeting - Start a small art club with friends.',
            'Group Mural Project - Create a large artwork together for school.',
            'Craft Exchange - Make crafts and trade them with each other.',
            'Art Challenge Group - Weekly art challenges with friends.',
            'Craft Kit Party - Group craft kit assembly ($15-35).',
            'Comic Strip Creation - Write and illustrate group comic strips.',
            'Stop Motion Animation - Create short films together.',
            'Tie Dye Party - Make colorful tie-dye shirts and accessories ($20-40).',
            'Paint Night - Follow painting tutorials together ($25-50).',
            'Art Gallery Tour - Visit local galleries and discuss art ($15-30).'
          ],
          '4+ people': [
            'School Art Exhibition - Organize an art show at school.',
            'Community Art Project - Create art for local community center.',
            'Art Workshop Group - Take group art classes together.',
            'Craft Fair Preparation - Prepare crafts for school fair.',
            'Art Club Field Trip - Visit local art museums and galleries ($20-40).',
            'Giant Group Mural - Collaborate on large-scale wall art.',
            'Art Battle Competition - Timed drawing challenges.',
            'Craft Fair Booth - Design and run a craft fair booth ($30-60).',
            'Yearbook Design - Create creative yearbook pages.',
            'Art Walk - Visit local artist studios together ($20-50).'
          ]
        },
        'Active': {
          '1 person': [
            'Bike Riding - Explore neighborhood on your bike.',
            'Jump Rope - Practice jump rope tricks and routines.',
            'Hula Hooping - Learn hula hoop tricks and dance moves.',
            'Scooter Riding - Practice scooter tricks at local skate park.',
            'Swimming Lessons - Improve swimming skills at local pool ($10-20).',
            'Yoga Practice - Follow beginner yoga videos online.',
            'Dance Party - Learn new dance moves and routines.',
            'Frisbee Throwing - Improve aim and distance throwing.',
            'Mini Golf - Practice putting and chipping ($8-15).'
          ],
          '2 people': [
            'Bike Race - Friendly bike racing with friends.',
            'Jump Rope - Learn partner jump rope routines.',
            'Hula Hoop Battle - Compete in hula hoop tricks.',
            'Scooter Tag - Play tag on scooters at skate park.',
            'Swimming Buddy - Practice swimming together ($15-30).',
            'Yoga Together - Partner yoga practice sessions.',
            'Dance Practice - Learn choreography together.',
            'Frisbee Competition - See who can throw furthest.',
            'Basketball One-on-One - Practice shooting and dribbling.',
            'Tennis Match - Play a friendly game ($10-20).'
          ],
          '3 people': [
            'Bike Group Ride - Explore new bike trails together.',
            'Jump Rope Team - Learn group jump rope routines.',
            'Hula Hoop Circle - Create group hula hoop performances.',
            'Scooter Gang - Practice scooter tricks as a group.',
            'Yoga Circle - Group yoga practice together.',
            'Ultimate Frisbee - Play three-way frisbee games.',
            'Basketball 3v3 - Play mini basketball games.',
            'Obstacle Course - Create backyard obstacle courses.'
          ],
          '4+ people': [
            'Bike Club - Start a bike club with friends.',
            'Jump Rope Squad - Perform jump rope routines together.',
            'Hula Hoop Troupe - Create group hula hoop shows.',
            'Scooter Crew - Organize scooter competitions.',
            'Yoga Class - Group yoga sessions ($30-60).',
            'Ultimate Frisbee Team - Join or start a frisbee club.',
            'Basketball League - Join youth basketball league ($50-100).',
            'Field Day - Organize fun outdoor games.',
            'Swimming Competition - Join swim meets ($40-80).'
          ]
        },
        'Educational': {
          '1 person': [
            'Online Tutoring - Get help with school subjects for free.',
            'Educational YouTube Channels - Watch educational videos on topics you enjoy.',
            'Library Study Session - Study at the local library.',
            'Science Experiments - Try fun science experiments at home.',
            'Language Learning - Use free apps to learn new languages.',
            'Documentary Watching - Watch educational documentaries online.',
            'Educational Podcasts - Listen to podcasts about history and science.',
            'Practice Tests - Take practice tests for upcoming exams.',
            'Virtual Museum Tours - Explore museums online for free.',
            'Science Kit - Try science experiments from kits ($10-25).'
          ],
          '2 people': [
            'Study Group - Study for tests together.',
            'Language Practice - Practice speaking a new language together.',
            'Quiz Bowl - Quiz each other on school subjects.',
            'Book Club - Read and discuss books together.',
            'Science Fair Project - Work on science projects together.',
            'Mock Exam - Take practice tests as study partners.',
            'History Research - Research and discuss historical topics.',
            'Debate Practice - Practice argument and presentation skills.',
            'Geography Challenge - Learn about different countries together.',
            'Math Study Buddy - Help each other with math homework.'
          ],
          '3 people': [
            'Study Circle - Regular group study sessions.',
            'Language Club - Practice speaking new languages together.',
            'Quiz Team - Start a school quiz bowl team.',
            'Science Club - Conduct experiments and discuss findings.',
            'Debate Club - Practice debating and public speaking.',
            'Math Competition - Prepare for math competitions.',
            'History Circle - Discuss historical events and eras.',
            'Book Review Group - Share book recommendations and reviews.',
            'Science Field Trip - Visit science centers ($15-30).',
            'Academic Tournament - Compete in school academic contests.'
          ],
          '4+ people': [
            'Study Session - Large group homework and study time.',
            'Educational Trip - Visit museums and science centers ($20-40).',
            'Tutoring Group - Group tutoring sessions ($30-60).',
            'Science Competition - Enter science fairs together.',
            'Debate Team - Join school debate team.',
            'Academic Bowl - Participate in academic competitions.',
            'Book Club - Large group literary discussions.',
            'Educational Retreat - Weekend learning camp ($50-100).',
            'Science Symposium - Attend or present at science events.',
            'Museum Membership - Group museum access ($40-80).'
          ]
        },
        'Social': {
          '1 person': [
            'School Clubs - Join clubs at school.',
            'Online Gaming - Play multiplayer games with friends online.',
            'Study Cafe - Study with friends at cafes ($5-10).',
            'Volunteer Work - Volunteer for local organizations.',
            'Youth Group - Join a local youth group.',
            'Community Center - Participate in public events and activities.',
            'Library Events - Attend library programs and activities.',
            'Park Hangout - Meet friends at local parks.',
            'Mall Meetup - Socialize at shopping centers.',
            'Cafe Study - Study and chat at coffee shops ($5-10).'
          ],
          '2 people': [
            'Study Buddy - Study together regularly.',
            'Movie Night - Watch movies together at home.',
            'Shopping Together - Browse stores together ($10-25).',
            'Cooking Together - Learn to cook simple meals.',
            'Board Game Night - Play board games together.',
            'Park Picnic - Have a picnic at local parks.',
            'Mall Shopping - Shop and browse together ($20-40).',
            'Bike Ride - Go for bike rides together.',
            'Cafe Chat - Spend time at coffee shops ($5-15).',
            'Volunteer Together - Do community service together.'
          ],
          '3 people': [
            'Group Study - Study together for school.',
            'Game Night - Play video or board games together.',
            'Mall Trip - Shopping and hanging out ($15-35).',
            'Movie Marathon - Watch multiple movies together.',
            'Park Day - Spend time at local parks.',
            'Food Adventure - Try different restaurants together ($15-30).',
            'Photo Walk - Take photos while exploring together.',
            'Play Date - Fun activities at each other\'s houses.',
            'Cafe Meetup - Hang out at coffee shops ($10-25).',
            'Community Event - Attend local events together.'
          ],
          '4+ people': [
            'Group Project - Work on school projects together.',
            'Party Planning - Organize birthday or themed parties.',
            'Mall Hangout - Shopping and socializing ($20-50).',
            'Field Trip - Visit fun places together ($15-40).',
            'Sports Event - Attend school games together.',
            'Celebration Party - Celebrate birthdays or achievements.',
            'Community Service - Volunteer as a group.',
            'School Dance - Attend school dances together.',
            'Field Day - Organize outdoor activities together.',
            'Laser Tag - Play laser tag together ($25-40).'
          ]
        },
        'Relaxation': {
          '1 person': [
            'Reading - Read books for pleasure.',
            'Yoga - Practice gentle yoga at home.',
            'Music Listening - Listen to calming music.',
            'Coloring - Use coloring books to relax.',
            'Journaling - Write thoughts and feelings.',
            'Nature Walk - Take peaceful walks outside.',
            'Bubble Bath - Relax with a bubble bath.',
            'Music Making - Play an instrument or sing.',
            'Mindfulness - Practice breathing exercises.'
          ],
          '2 people': [
            'Reading Together - Read and discuss books together.',
            'Meditation - Practice calming meditation together.',
            'Yoga Session - Do gentle yoga together.',
            'Music Listening - Share favorite music together.',
            'Coloring Together - Use coloring books together.',
            'Journaling - Write and share thoughts.',
            'Nature Walk - Take peaceful walks together.',
            'Relaxation Video - Watch calming videos together.',
            'Music Session - Play music or sing together.',
            'Mindfulness - Practice breathing exercises together.'
          ],
          '3 people': [
            'Book Club - Read and discuss relaxing books.',
            'Group Meditation - Practice meditation together.',
            'Yoga Circle - Do yoga as a group.',
            'Music Share - Share calming music with each other.',
            'Coloring Party - Color together and chat.',
            'Nature Excursion - Go on peaceful nature walks.',
            'Relaxation Day - Spend a relaxing day together.',
            'Music Circle - Play or listen to music together.',
            'Mindfulness Group - Practice relaxation techniques together.',
            'Peaceful Activity - Do calming activities together.'
          ],
          '4+ people': [
            'Reading Club - Group book discussions.',
            'Group Meditation - Large group meditation sessions.',
            'Yoga Class - Group yoga for relaxation ($20-40).',
            'Music Event - Attend calming music performances ($15-35).',
            'Coloring Social - Large group coloring activity.',
            'Nature Retreat - Visit peaceful nature areas ($25-50).',
            'Relaxation Workshop - Learn relaxation techniques ($30-60).',
            'Wellness Day - Organize a group wellness activity.',
            'Mindfulness Retreat - Group relaxation sessions ($40-80).',
            'Peaceful Gathering - Group relaxing activities.'
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
            'Indie Film Making - Create short films on smartphone ($15-30).',
            'Street Art - Create mural concepts and sketches.',
            'Music Production - Make beats and tracks on your laptop.',
            'Web Design - Build creative websites for fun.',
            'Graphic Design - Design logos and posters ($15-30).',
            'Poetry Writing - Write and recite original poetry.'
          ],
          '2 people': [
            'Open Mic Night - Perform music or poetry at local cafes.',
            'Art Walk - Explore street art and murals together.',
            'Thrift Store Challenge - Competitive vintage clothing hunt ($20-40).',
            'Podcast Creation - Start a podcast with friends.',
            'Concert Going - Attend local indie music shows ($30-60).',
            'Photo Shoot - Creative portrait sessions together.',
            'Music Collab - Record songs together.',
            'Design Project - Work on graphic design together.',
            'Comedy Show - Perform stand-up or sketches ($20-35).',
            'Art Installation - Create temporary art installations.'
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
            'Dance Class - Individual dance lessons ($20-35).',
            'Hiking - Explore local trails solo.',
            'Basketball Practice - Shoot hoops at the gym.',
            'Tennis - Play on local courts ($10-20).',
            'Cycling - Long bike rides through the city.',
            'Yoga - Personal yoga practice.'
          ],
          '2 people': [
            'Gym Buddy Sessions - Partner workout routines.',
            'Running Partners -  Run outdoors together.',
            'Beach Volleyball Match - Friendly doubles games.',
            'Rock Climbing Partners - Indoor climbing together ($30-50).',
            'Partner Dance Lessons - Learn together ($35-65).'
          ],
          '3 people': [
            'Gym Squad - Group workout sessions.',
            'Running Group - Group outdoor running.',
            'Rock Climbing - Group climbing sessions ($50-75).',
            'Group Dance Class - Group dance lessons ($60-100).'
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
            'Concert - Attend live music together ($60-120).',
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
            'Study Partners - Study together in a focused environment.',
            'Language Exchange - Practice together.',
            'Podcast Discussion - Listen and discuss episodes.',
            'Skill Teaching - Learn from each other.',
            'Join Webinars - Attend together.'
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
            'Yoga - Home practice with videos.',
            'Reading - Library books.',
            'Nature Walks - Local parks.',
            'Music Therapy - Calming playlists.'
          ],
          '2 people': [
            'Meditation Together - Find inner peace and relaxation.',
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
            'Cooking Class - Learn gourmet cooking together ($40-80).',
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
            'Yoga - Partner yoga sessions.',
            'Tennis Match - Friendly doubles games.',
            'Hiking - Explore local trails together.',
            'Personal Training - Grow stronger together and improve your health ($100-180).'
          ],
          '3 people': [
            'Running Group - Regular group runs.',
            'Yoga Class - Group yoga sessions.',
            'Tennis - Court play sessions.',
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
            'Comedy Night - Attend shows and laugh together.',
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
            'Skill Training - Learn new skills together ($60-120).',
            'Business Networking - Connect with others in your field of interest.',
            'Attend Workshops - Attend together ($100-180).',
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
            'Partner Yoga - Partner yogasessions ($80-150).',
            'Retreat Together - Weekend getaway ($250-400).',
            'Wellness Couple - Health focused ($180-300).'
          ],
          '3 people': [
            'Group Spa Day - Team treatments ($150-250).',
            'Yoga - Group sessions ($120-200).',
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
            'Cooking Classes - Learn gourmet techniques together ($60-120).',
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
            'Swimming - Swimming at community pools.',
            'Walking - Daily walks for fitness.',
            'Tennis - Practice sessions ($20-40).',
            'Personal Training - Professional coaching ($80-120).'
          ],
          '2 people': [
            'Tennis Partners - Regular court sessions.',
            'Golfing Together - Play rounds as a couple ($50-100).',
            'Walking Partners - Daily exercise walks.',
            'Swimming Buddies - Lap swimming together.',
            'Fitness Classes - Get in good shape together.'
          ],
          '3 people': [
            'Golf Outing - Group rounds ($80-120).',
            'Tennis - Court play sessions.',
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
            'Wine Tasting - Educational tastings ($60-120).',
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
            'Professional Development - Together ($80-150).',
            'Book Club Couple - Reading together.',
            'Lecture Series - Attend together ($50-100).',
            'Museum Membership - Explore the exhibits together ($60-140).'
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
            'Gentle Yoga - Partner practice.',
            'Meditation Together - Find inner peace and relaxation.',
            'Travel Together - Travel to a new destination.',
            'Weekend Retreat - Spend the time with friends ($250-500).'
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
            'Art Projects - Collaborative creative work.',
            'Book Club - Find a new book to read together.',
            'Photography - Capture moments together.',
            'Garden Planning - Design projects together.',
            'Art Studio Classes - Exercise your creativity ($60-120).'
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
            'Swimming - Exercise your mobility and flexibility.',
            'Golfing - Solo rounds at local courses ($30-50).',
            'Tai Chi - Gentle movement practice.'
          ],
          '2 people': [
            'Walking Partners - Daily exercise together.',
            'Yoga - Relax and unwind together.',
            'Swimming Buddies - Lap sessions together.',
            'Golf Partners - Play rounds together ($50-100).',
            'Tai Chi - Move your body and mind together.'
          ],
          '3 people': [
            'Walking Group - Group daily walks.',
            'Yoga Class - Group gentle sessions.',
            'Swimming Group - Lap sessions together.',
            'Golf Outing - Play multiplerounds ($80-120).',
            'Tai Chi Circle - Group practice.'
          ],
          '4+ people': [
            'Walking Club - Organized group walks.',
            'Yoga Retreat - Weekend wellness ($200-400).',
            'Swimming Club - Swim at your local pool.',
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
            'Fine Dining - Quality restaurants ($100-180).'
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
            'Historical Research - Together.',
            'Genealogy Pair - Family research.',
            'Cultural Appreciation - Learning new cultures and languages.',
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
            'Meditation Together - Find inner peace and relaxation.',
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
            'Painting - Paint together in a relaxed setting.',
            'Knitting Partners - Work on knitting projects together.',
            'Garden Art - Create garden art installations together.',
            'Art Appreciation - Visit art galleries and discuss artwork.',
            'Art Therapy - Learn to express yourself through art ($30-60).'
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
            'Swimming - Swimming at your local pool.',
            'Gardening - Light gardening and plant care.',
            'Senior Fitness Class - Gentle exercise class ($15-25).'
          ],
          '2 people': [
            'Walking Partners - Regular walking with friends.',
            'Tai Chi - Practice tai chi together.',
            'Swimming Buddies - Gentle swimming together.',
            'Garden Partners - Share gardening activities.',
            'Senior Fitness - Exercise your mobility and flexibility ($25-45).'
          ],
          '3 people': [
            'Walking Group - Group walks in local parks.',
            'Tai Chi Circle - Group tai chi practice.',
            'Swimming Group - Swim with others in a public pool.',
            'Garden Club - Community gardening group.',
            'Senior Fitness Group - Group exercise classes ($35-65).'
          ],
          '4+ people': [
            'Senior Walking Club - Organized walking group.',
            'Senior Swimming Club - Regain mobility and improve your health.',
            'Community Garden - Plant and care for a garden together.',
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
            'Senior Couples Events - Participate in activities together.',
            'Cultural Date Night - Theater and concerts.',
            'Historical Tours - Explore together ($40-80).',
            'Book Club - Discuss a new book together.',
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
            'Genealogy Together - Family research.',
            'Cultural Appreciation - Learning new cultures and languages.',
            'Memory Activities - Play memory games together.',
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
            'Facials - Get a facial together.',
            'Meditation Together - Find inner peace and relaxation.',
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
          'Calligraphy Practice - Beautiful handwriting and lettering art. Use existing pens.',
          'Macrame Crafting - Knotting decorative wall hangings. Use old fabric strips.',
          'Digital Collage Design - Creating mixed media art on computer. Use free software.',
          'Create Your Own Piercing - Create your own piercing using paper clips.',
          'Digital Animation - Creating moving artwork. Use free software.',
          'Paper Quilling - Rolling paper into decorative shapes. Use colored paper.',
          'Tie Dye - Create custom dye shirts together. Use household dyes.',
          'Calligraphy Pen Set - Professional writing tools ($12-20).',
          'Macrame Cord Kit - Decorative knotting supplies ($15-25).',
          'Sculpture Clay Class - Individual pottery workshop ($25-40).',
          'Animation Software - Professional motion graphics ($50-80).',
          'Paper Quilling Kit - Decorative paper supplies ($20-35).',
          'Fabric Dyeing Kit - Textile coloring supplies ($30-50).',
          'Calligraphy Workshop - Hand lettering instruction ($35-55).',
          'Macrame Studio - Advanced knotting techniques ($45-70).',
        ],
        '2 people': [
          'Mural Painting - Create a wall art together. Use household supplies.',
          'Pottery Wheel - Shared ceramic throwing. Use community studio.',
          'Jewelry Making - Creating wearable art together. Use basic tools.',
          'Partner Wood Carving - Sculpture your own wood from your imagination. Use hand tools.',
          'Textile Design - Creating fabric patterns together. Use simple materials.',
          'Wax Painting - Create wax art together. Use household candles.',
          'Wire Sculpture - Creating metal art together. Use household wire.',
          'Tie Dye - Create custom dye shirts together. Use household dyes.',
          'Digital Art Software - Professional design tools ($50-80).',
          'Sculpture Studio - Advanced clay techniques ($60-90).',
          'Encaustic Masterclass - Expert wax techniques ($70-110).',
          'Wire Art Studio - Advanced metalwork ($60-100).',
          'Animation Academy - Professional motion graphics ($100-150).',
          'Paper Art Retreat - Weekend quilling workshop ($120-180).',
        ],
        '3 people': [
          'Mosaic Creation - Group tile art assembly. Use broken ceramics.',
          'Metalworking - Collaborative metal sculpture. Use basic tools.',
          'Printmaking - Learn art printing techniques. Use simple materials.',
          'Ceramic Glazing - Collaborative pottery finishing. Use community kiln.',
          'Weaving Project - Textile creation. Use basic looms.',
          'Encaustic Workshop - Group wax art creation. Use household candles.',
          'Wire Sculpture - Group metal art creation. Use household wire.',
          'Digital Animation - Collaborative moving artwork. Use free software.',
          'Paper Quilling - Group decorative paper art. Use colored paper.',
          'Group Fabric Dyeing - Collaborative textile creation. Use household dyes.',
          'Metalworking Tools - Basic metal sculpture supplies ($40-70).',
          'Printmaking Kit - Group printing materials ($35-60).',
          'Ceramic Glazing Set - Pottery finishing supplies ($45-75).',
          'Weaving Loom Rental - Group textile equipment ($50-85).',
          'Stained Glass Kit - Glass art materials ($60-100).',
        ],
        '4+ people': [
          'Printmaking - Create a print together. Use community press.',
          'Kiln Firing - Fire a ceramic piece together. Use community kiln.',
          'Weaving - Create a textile together. Use multiple looms.',
          'Glass Fusion - Show your creativity with glass art. Use community furnace.',
          'Wire Sculpture - Create a metal piece together. Use bulk wire.',
          'Digital Animation - Create a moving artwork together. Use shared software.',
          'Paper Quilling - Create a decorative paper piece together. Use bulk supplies.',
          'Fabric Dyeing - Create a textile piece together. Use bulk dyes.',
        ]
      },
      'Active': {
        '1 person': [
          'Trail Running - Individual mountain trail exploration. Use hiking shoes.',
          'Personal Kayaking - Self-guided water paddling. Use rental equipment.',
          'Archery Practice - Individual target shooting. Use local range.',
          'Personal Boxing Training - Individual combat fitness. Use home equipment.',
          'Parkour - Individual urban obstacle navigation. Use public spaces.',
          'Personal Skiing - Individual snow sports. Use rental equipment.',
          'Martial Arts - Individual combat training. Use home space.',
          'Cycling - Individual bike touring. Use personal bike.',
          'Personal Weightlifting - Individual strength training. Use gym equipment.',
          'Kayak Rental - Personal watercraft access ($25-40).',
          'Archery Equipment - Personal bow and arrows ($80-120).',
          'Boxing Gloves Set - Personal combat gear ($40-70).',
          'Parkour Training - Professional movement instruction ($50-80).',
          'Surfboard Rental - Personal wave equipment ($30-50).',
          'Cycling Equipment - Personal bike gear ($80-130).',
          'Weightlifting Kit - Personal strength equipment ($100-150).',
          'Trail Running Club - Professional outdoor training ($70-110).',
          'Kayaking Tour - Guided water exploration ($80-130).',
          'Archery Competition - Professional target shooting ($100-150).',
          'Boxing Gym Membership - Professional combat training ($120-180).',
          'Swimming Coaching - Professional water training ($100-180).',
          'Cycling Tour - Professional bike expedition ($200-350).',
          'Personal Training - Individual fitness coaching ($150-250).',
          'Adventure Sports Summit - Professional outdoor conference ($300-500).',
          'Elite Athlete Retreat - Premium training camp ($500-800).'
        ],
        '2 people': [
          'Rock Climbing - Partner indoor climbing adventure. Use climbing gym.',
          'Tandem Kayaking - Partner water paddling expedition. Use rental equipment.',
          'Archery Competition - Partner target shooting contest. Use local range.',
          'Partner Boxing Training - combat fitness workout. Use gym equipment.',
          'Parkour Challenge - Partner urban obstacle course. Use public spaces.',
          'Tandem Surfing - Partner wave riding experience. Use rental boards.',
          'Rock Climbing Gear - climbing equipment ($100-150).',
          'Tandem Kayak Rental - Partner watercraft access ($40-70).',
          'Archery Set - Partner bow and arrows ($120-180).',
          'Partner Boxing Kit - combat gear ($70-110).',
          'Parkour Training - Partner movement instruction ($80-130).',
          'Tandem Surfboard Rental - Partner wave equipment ($50-90).',
          'Rock Climbing Class - Partner climbing instruction ($100-150).',
          'Tandem Kayaking Tour - Partner water exploration ($120-180).',
          'Archery Tournament - Partner target competition ($150-220).',
          'Partner Boxing Gym - combat training ($140-200).',
        ],
        '3 people': [
          'Mountain Biking - Group off-road cycling adventure. Use rental bikes.',
          'Group Whitewater Rafting - Team river navigation. Use raft equipment.',
          'Archery Tournament - Group target shooting competition. Use local range.',
          'Group Boxing Sparring - Team combat training. Use gym equipment.',
          'Parkour Course - Group urban obstacle navigation. Use public spaces.',
          'Group Surfing Lesson - Team wave riding instruction. Use rental boards.',
          'Mountain Bike Rental - Group off-road equipment ($90-150).',
          'Whitewater Raft Rental - Team watercraft access ($60-100).',
          'Archery Kit - Group bow and arrows ($150-220).',
          'Group Boxing Equipment - Team combat gear ($100-150).',
          'Parkour Training - Group movement instruction ($120-180).',
          'Group Surfboard Rental - Team wave equipment ($80-130).',
          'Mountain Biking Tour - Group off-road instruction ($150-220).',
          'Group Whitewater Expedition - Team river exploration ($180-280).',
          'Archery Championship - Group target competition ($200-300).',
          'Group Boxing Gym - Team combat training ($180-250).',
          'Parkour Academy - Group movement techniques ($250-400).',
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
          'Podcast Deep Dive - Educational podcast series and audio learning.',
          'Documentary Study - Educational film analysis and note-taking.',
          'Skill Building - Learning new technical skills through tutorials.',
          'Personal Library - Building educational book collection ($15-30).',
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
          'Study Buddy Sessions - Regular collaborative learning meetings.',
          'Language Conversation - Practicing foreign languages through dialogue.',
          'Skill Teaching - Learning from each other\'s expertise.',
          'Library - Joint educational book collection ($25-50).',
          'Partner Online Course - Shared structured learning platform ($35-80).',
          'Language Learning- Joint language learning subscription ($25-40).',
          'Workshop - Joint learning session ($40-70).',
          'Partner Tutoring - Collaborative academic instruction ($60-100).',
          'Language Exchange Class - Mutual foreign language course ($80-120).',
          'Certification - Joint professional credential program ($100-150).',
          'Partner University Course - Shared continuing education ($120-200).',
          'Learning Getaway - educational weekend ($250-500).'
        ],
        '3 people': [
          'Study Circle - Group collaborative research and learning. Use library resources.',
          'Language Club - Group foreign language practice sessions. Use free language apps.',
          'Learning Discussion Group - Regular group educational meetings.',
          'Language Roundtable - Group foreign language conversation practice.',
          'Skill Exchange Circle - Group learning from each other\'s expertise.',
          'Group Library - Shared educational book collection ($35-70).',
          'Online Course - Group structured learning platform ($50-100).',
          'Group Workshop - Team learning session ($60-100).',
          'Group Tutoring - Collaborative academic instruction ($80-120).',
          'Language Club Class - Group foreign language course ($100-150).',
          'Group Certification - Team professional credential program ($150-250).',
          'University Course - Group continuing education ($150-300).',
          'Learning Adventure - Group educational weekend ($300-600).'
        ],
        '4+ people': [
          'Learning Community - Large group collaborative research and study. Use library resources.',
          'Language Society - Large group foreign language practice sessions. Use free language apps.',
          'Educational Forum - Large group learning discussion meetings.',
          'Language Convention - Large group foreign language conversation practice.',
          'Skill Exchange Network - Large group learning from each other\'s expertise.',
          'Community Library - Large group educational book collection ($50-100).',
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
          'Private Yoga Session - Individual guided instruction ($15-30).',
          'Personal Massage - Individual relaxation treatment ($40-60).',
          'Solo Spa Day - Personal wellness and relaxation treatment ($60-100).',
          'Personal Retreat - Individual mindfulness weekend ($100-200).',
          'Luxury Solo Spa - Premium personal wellness experience ($150-300).'
        ],
        '2 people': [
          'Meditation - Partner mindfulness and stress relief practice. Use free meditation apps.',
          'Partner Yoga Flow - flexibility and relaxation exercise. Use free online videos.',
          'Reading Date - book reading and literary relaxation. Use library resources.',
          'Romantic Nature Walk - peaceful outdoor mindfulness.',
          'Music Therapy - Shared calming music and ambient sound sessions.',
          'Partner Journaling - reflective writing and self-care.',
          'Aromatherapy - Shared essential oils and relaxation scents ($25-40).',
          'Yoga Class - Partner guided instruction ($25-50).',
          'Massage - Joint relaxation treatment ($60-100).',
          'Romantic Spa Day - wellness and relaxation treatment ($100-150).',
          'Retreat - Partner mindfulness weekend ($150-300).',
          'Luxury Spa - Premium partner wellness experience ($250-500).'
        ],
        '3 people': [
          'Meditation - Group mindfulness and stress relief practice. Use free meditation apps.',
          'Group Yoga Flow - Flexibility and relaxation exercise. Use free online videos.',
          'Reading Circle - Group book reading and literary relaxation. Use library resources.',
          'Friends Nature Walk - Group peaceful outdoor mindfulness.',
          'Group Music Therapy - Shared calming music and ambient sound sessions.',
          'Journaling - Group reflective writing and self-care.',
          'Group Aromatherapy - Shared essential oils and relaxation scents ($35-60).',
          'Group Yoga Class - Guided yoga session ($40-80).',
          'Group Massage - Joint relaxation treatment ($80-120).',
          'Friends Spa Day - Group wellness and relaxation treatment ($120-200).',
          'Retreat - Group mindfulness weekend ($200-400).',
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
          'Community Yoga Class - Large group guided instruction ($60-100).',
          'Community Massage - Large group relaxation treatment ($100-150).',
          'Community Spa Day - Large group wellness and relaxation treatment ($150-250).',
          'Community Retreat - Large group mindfulness weekend ($250-500).',
          'Luxury Community Spa - Premium large group wellness experience ($400-800).'
        ]
      },
      'Social': {
        '1 person': [
          'Social Media - Individual online community engagement. Use free online platforms.',
          'Personal Reading - Individual book enjoyment and entertainment. Use library resources.',
          'Music Discovery - Individual music and podcast exploration. Use free online resources.',
          'Online Networking - Individual professional and social connections.',
          'Video Calls - Call your friends and family.',
          'Community Events - Individual attendance at local free social gatherings.',
          'Coffee Shop - Individual social connection and conversation at cafes ($5-15).',
          'Movie Experience - Individual film enjoyment and entertainment ($10-20).',
          'Board Game Cafe - Individual gaming and socializing ($15-25).',
          'Restaurant Dining - Individual social dining and relationship building ($20-40).',
          'Concert Experience - Individual live entertainment and social experience ($30-60).',
          'Social Club - Individual organized social activities and events ($50-100).',
        ],
        '2 people': [
          'Coffee Chat - Partner conversation at home. Use home coffee.',
          'Cooking Date - Partner meal preparation and dining at home. Cook at home.',
          'Gaming - Partner video games and board games together. Use free games.',
          'Video Calls - Partner face-to-face conversations with friends and family.',
          'Community Events - Partner attendance at local free social gatherings.',
          'Coffee Shop - Partner social connection and conversation at cafes ($10-25).',
          'Movie Date - Partner film enjoyment and entertainment ($15-35).',
          'Board Game Cafe - Partner gaming and socializing ($25-45).',
          'Restaurant Dining - Partner social dining and relationship building ($30-60).',
          'Concert Date - Partner live entertainment and social experience ($50-100).',
          'Social Club - Partner organized social activities and events ($80-150).',
        ],
        '3 people': [
          'Cooking Session - Group meal preparation and dining at home. Cook at home.',
          ' Gaming Night - Group video games and board games together. Use free games.',
          'Chat Session - Group conversation and socializing together. Use free online platforms.',
          'Video Calls - Group face-to-face conversations with friends and family.',
          'Community Events - Group attendance at local free social gatherings.',
          'Social Media - Group online community engagement.',
          'Coffee Shop - Group social connection and conversation at cafes ($15-35).',
          'Movie Night - Group film enjoyment and entertainment ($20-50).',
          'Board Game Cafe - Group gaming and socializing ($35-65).',
          'Restaurant Dining - Group social dining and conversation at restaurants ($50-90).',
          'Concert Experience - Group live entertainment and social experience ($80-150).',
          'Social Club - Group organized social activities and events ($120-200).',
        ],
        '4+ people': [
          'Cooking Event - Large group meal preparation and dining. Cook at home.',
          'Gaming Tournament - Large group video games and board games. Use free games.',
          'Chat Session - Large group conversation and socializing. Use free online platforms.',
          'Video Calls - Large group face-to-face conversations with friends and family.',
          'Events Attendance - Large group attendance at local free social gatherings.',
          'Social Media - Large group online community engagement.',
          'Coffee Shop - Large group social connection and conversation at cafes ($20-50).',
          'Movie Night - Large group film enjoyment and entertainment ($30-70).',
          'Board Game Cafe - Large group gaming and socializing ($50-90).',
          'Restaurant Dining - Large group social dining and conversation ($80-120).',
          'Concert Experience - Large group live entertainment and social experience ($120-200).',
          'Social Club - Large group organized social activities and events ($150-300).',
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
