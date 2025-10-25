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
  const [hearts, setHearts] = useState([]);

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

  // AI-generated activity suggestions based on selections
  const generateActivitySuggestions = () => {
    if (!selectedPeople || !selectedActivity) {
      return [];
    }

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
