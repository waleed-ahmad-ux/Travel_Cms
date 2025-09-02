import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button, Chip, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, Accordion, AccordionSummary, AccordionDetails, Checkbox, InputBase, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GridViewIcon from '@mui/icons-material/GridView';
import MapIcon from '@mui/icons-material/Map';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { EnhancedSearchForm } from '../components/EnhancedSearchForm';
import { assetMap } from '../assets/assetMap';
// npm install @fontsource/great-vibes

const offers = [
  {
    hotel: 'Banyan Tree Phuket',
    location: 'Phuket',
    price: 1299,
    board: '7 Nights Bed & Breakfast',
    image: assetMap["Phuket pictures/1.jpeg"],
    offer: 'Early Bird Offer (Travel from 10/11/2025)',
  },
  {
    hotel: 'Anantara Riverside Bangkok',
    location: 'Bangkok',
    price: 999,
    board: '7 Nights Bed & Breakfast',
    image: assetMap["Phuket pictures/2.jpeg"],
    offer: 'Free Night Offer (Travel from 15/10/2025)',
  },
  {
    hotel: 'Rayavadee Krabi',
    location: 'Krabi',
    price: 1599,
    board: '7 Nights Bed & Breakfast',
    image: assetMap["Phuket pictures/3.jpeg"],
    offer: 'Special Discount (Travel from 01/09/2025)',
  },
  {
    hotel: 'The Slate Phuket',
    location: 'Phuket',
    price: 1399,
    board: '7 Nights Bed & Breakfast',
    image: assetMap["Phuket pictures/4.jpeg"],
    offer: 'Complimentary Upgrade (Travel from 20/08/2025)',
  },
];

const travelInfo = [
  { label: 'Currency', value: 'Thai Baht' },
  { label: 'Time difference', value: 'GMT+7' },
  { label: 'Flight from UK', value: '12hrs' },
  { label: 'Visa', value: 'No (up to 30 days)' },
  { label: 'Language', value: 'Thai' },
  { label: 'National dish', value: 'Pad Thai' },
];

const activities = [
  'Island hopping in Phuket',
  'Visit the Grand Palace in Bangkok',
  'Snorkeling in Koh Phi Phi',
  'Explore ancient temples in Chiang Mai',
  'Thai cooking class',
  'Elephant sanctuary visit',
  'Floating market tour',
];

const food = [
  'Pad Thai',
  'Green curry',
  'Tom Yum Goong (spicy shrimp soup)',
  'Som Tum (spicy green papaya salad)',
  'Satay skewers',
  'Mango sticky rice',
  'Street food',
];

const attractions = [
  'Phang Nga Bay',
  'Wat Arun (Temple of Dawn)',
  'Phi Phi Islands',
  'Doi Suthep Temple',
  'Railay Beach',
  'Chatuchak Weekend Market',
];

const hotels = [
  {
    name: 'Banyan Tree Phuket',
    location: 'Phuket',
    rating: 5,
    priceForTwo: 2598,
    pricePerPerson: 1299,
    offer: 'Early Bird Offer (Travel from 10/11/2025)',
    nights: '7 NIGHTS BED & BREAKFAST',
    images: [assetMap["Phuket pictures/1.jpeg"], assetMap["Phuket pictures/2.jpeg"], assetMap["Phuket pictures/3.jpeg"]],
  },
  {
    name: 'Anantara Riverside Bangkok',
    location: 'Bangkok',
    rating: 5,
    priceForTwo: 1998,
    pricePerPerson: 999,
    offer: 'Free Night Offer (Travel from 15/10/2025)',
    nights: '7 NIGHTS BED & BREAKFAST',
    images: [assetMap["Phuket pictures/2.jpeg"], assetMap["Phuket pictures/3.jpeg"], assetMap["Phuket pictures/4.jpeg"]],
  },
  {
    name: 'Rayavadee Krabi',
    location: 'Krabi',
    rating: 5,
    priceForTwo: 3198,
    pricePerPerson: 1599,
    offer: 'Special Discount (Travel from 01/09/2025)',
    nights: '7 NIGHTS BED & BREAKFAST',
    images: [assetMap["Phuket pictures/3.jpeg"], assetMap["Phuket pictures/4.jpeg"]],
  },
  {
    name: 'The Slate Phuket',
    location: 'Phuket',
    rating: 5,
    priceForTwo: 2798,
    pricePerPerson: 1399,
    offer: 'Complimentary Upgrade (Travel from 20/08/2025)',
    nights: '7 NIGHTS BED & BREAKFAST',
    images: [assetMap["Phuket pictures/4.jpeg"], assetMap["Phuket pictures/1.jpeg"]],
  },
];

const hotelNames = [
  { name: 'Banyan Tree Phuket', img: assetMap["Phuket pictures/1.jpeg"] },
  { name: 'Anantara Riverside Bangkok', img: assetMap["Phuket pictures/2.jpeg"] },
  { name: 'Rayavadee Krabi', img: assetMap["Phuket pictures/3.jpeg"] },
  { name: 'The Slate Phuket', img: assetMap["Phuket pictures/4.jpeg"] },
];

const hotelLocations = Array.from(new Set(hotels.map(h => h.location)));

// Multi-centre itineraries for Thailand
const multiCentres = [
  {
    title: 'Bangkok & Phuket',
    description: 'Experience the vibrant city life of Bangkok followed by the serene beaches of Phuket.',
    duration: 10,
    image: assetMap["Phuket pictures/1.jpeg"],
  },
  {
    title: 'Phuket & Krabi',
    description: "Combine two of Thailand's most beautiful beach destinations for the ultimate island-hopping adventure.",
    duration: 10,
    image: assetMap["Phuket pictures/2.jpeg"],
  },
  {
    title: 'Bangkok, Chiang Mai & Phuket',
    description: 'Discover the culture of Chiang Mai, the buzz of Bangkok, and the relaxation of Phuket in one trip.',
    duration: 12,
    image: assetMap["Phuket pictures/3.jpeg"],
  },
];

const Thailand: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'HOTELS' | 'OFFERS' | 'MULTI-CENTRES' | 'TRAVEL GUIDE' | 'ABOUT & FAQ'>('HOTELS');
  const filteredHotels = hotels.filter(h => {
    const hotelMatch = selectedHotel ? h.name === selectedHotel : true;
    const locationMatch = selectedLocation ? h.location === selectedLocation : true;
    return hotelMatch && locationMatch;
  });
  const [selectedOfferHotel, setSelectedOfferHotel] = useState<string | null>(null);
  const [selectedOfferMonth, setSelectedOfferMonth] = useState<string | null>(null);
  const [selectedOfferPrice, setSelectedOfferPrice] = useState<string | null>(null);
  const [selectedOfferDuration, setSelectedOfferDuration] = useState<number | null>(null);
  const [selectedOfferRating, setSelectedOfferRating] = useState<number | null>(null);
  const offerBoards = Array.from(new Set(offers.map(o => o.board)));
  const [selectedOfferBoard, setSelectedOfferBoard] = useState<string | null>(null);
  const offerHotelNames = Array.from(new Set(offers.map(o => o.hotel)));
  const filteredOffers = offers.filter(o => {
    const hotelMatch = selectedOfferHotel ? o.hotel === selectedOfferHotel : true;
    const month = extractMonth(o.offer);
    const monthMatch = selectedOfferMonth ? month === selectedOfferMonth : true;
    const price = o.price;
    let priceMatch = true;
    if (selectedOfferPrice === '<1200') priceMatch = price < 1200;
    else if (selectedOfferPrice === '1200-1400') priceMatch = price >= 1200 && price <= 1400;
    else if (selectedOfferPrice === '>1400') priceMatch = price > 1400;
    const duration = extractNights(o.board);
    const durationMatch = selectedOfferDuration ? duration === selectedOfferDuration : true;
    const hotelObj = hotels.find(h => h.name === o.hotel);
    const rating = hotelObj ? hotelObj.rating : null;
    const ratingMatch = selectedOfferRating ? rating === selectedOfferRating : true;
    const boardMatch = selectedOfferBoard ? o.board === selectedOfferBoard : true;
    return hotelMatch && monthMatch && priceMatch && durationMatch && ratingMatch && boardMatch;
  });
  const [hotelImageIndexes, setHotelImageIndexes] = useState<{ [hotelName: string]: number }>({});
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingHotel, setBookingHotel] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', dates: '', requests: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handlePrevImage = (hotelName: string, imagesLength: number) => {
    setHotelImageIndexes(prev => ({
      ...prev,
      [hotelName]: prev[hotelName] > 0 ? prev[hotelName] - 1 : imagesLength - 1
    }));
  };
  const handleNextImage = (hotelName: string, imagesLength: number) => {
    setHotelImageIndexes(prev => ({
      ...prev,
      [hotelName]: prev[hotelName] < imagesLength - 1 ? prev[hotelName] + 1 : 0
    }));
  };
  const handleCloseBooking = () => {
    setBookingOpen(false);
    setBookingHotel(null);
    setBookingSuccess(false);
  };
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingOpen(false);
      setBookingSuccess(false);
    }, 2000);
  };

  function extractMonth(offerStr: string): string | null {
    const fromMatch = offerStr.match(/Travel from (\d{2})\/(\d{2})\/(\d{4})/);
    const betweenMatch = offerStr.match(/Travel between (\d{2})\/(\d{2})\/(\d{4}) and (\d{2})\/(\d{2})\/(\d{4})/);
    const months = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (fromMatch) {
      const month = months[parseInt(fromMatch[2], 10)];
      return `${month} ${fromMatch[3]}`;
    }
    if (betweenMatch) {
      const month = months[parseInt(betweenMatch[2], 10)];
      return `${month} ${betweenMatch[3]}`;
    }
    return null;
  }

  function extractNights(boardStr: string): number | null {
    const match = boardStr.match(/(\d+)\s*Nights?/i);
    return match ? parseInt(match[1], 10) : null;
  }

  const offerMonths = Array.from(new Set(offers.map(o => extractMonth(o.offer)).filter(Boolean)));
  const offerDurations = Array.from(new Set(offers.map(o => extractNights(o.board)).filter(Boolean)));

  const priceRanges = [
    { label: '< £1200', value: '<1200' },
    { label: '£1200–£1400', value: '1200-1400' },
    { label: '> £1400', value: '>1400' },
  ];

  const handleReadMore = () => {
    setShowMore((prev) => {
      const next = !prev;
      if (!prev && aboutRef.current) {
        setTimeout(() => {
          aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 250); // Wait for Collapse animation
      }
      return next;
    });
  };

  return (
    <Box 
    //sx={{ background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)', minHeight: '100vh', pb: 8 }}
    
    >
      {/* Hero Section */}
   
    
     <Box

    
  sx={{
    position: 'relative',
    height: { xs: 360, md: 620 }, // Reduced height
    background: `url(${assetMap["Phuket pictures/1.jpeg"]}) center/cover no-repeat`,
    display: 'flex',
    //alignItems: 'center',
    //alignItems:'flex-end',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    py: { xs: 4, md: 6 }, // Balanced vertical spacing
  }}
>


        
             
  {/* Dark overlay */}
  {/* Overlay for darkened effect */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.45)',
              zIndex: 0,
            }}
          />
        
  <Container
            maxWidth={false}
            disableGutters
            sx={{
              position: 'relative',
              zIndex: 1,
              pt: 0, //  Change this to a smaller number (e.g. pt: 4 or pt: 2) to move it higher
              mt: { xs: 0, md: -27 },  // try negative margin to lift the form
              width: '100vw',
            }}
          >
            <EnhancedSearchForm fixedDestination="Thailand" />

            {/* Fixed Caption */}
                    <Typography
                      variant="h2"
                      sx={{
                        position: 'absolute',
                        bottom: { xs: '3%', md: '0.5%' }, // moved even further down
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#fff',
                        fontWeight: 'normal',
                        fontSize: { xs: '1.7rem', md: '3rem' }, // smaller text
                        zIndex: 2,
                        textAlign: 'center',
                        textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                        letterSpacing: 4,
                        fontFamily: '"Great Vibes", cursive',
                        fontStyle: 'italic',
                        width: '100%',
                        maxWidth: '90vw',
                      }}
                    >
                      <span style={{ fontSize: '2em', display: 'inline-block', verticalAlign: 'middle' }}>
                        Thailand
                      </span>
                      <span style={{ fontSize: '2em' }}> </span>
                      <br />
                      <span style={{
                        fontSize: '0.85em', // smaller subtitle
                        display: 'block',
                        verticalAlign: 'middle',
                        fontFamily: '"Great Vibes", cursive',
                        paddingTop: '0.5em'
                      }}>
                        A Journey of Opulence, Culture, and Calm
                      </span>
                    </Typography>
  
          </Container>
</Box>



      {/* About Thailand Section */}
      <Container sx={{ mt: 8, px: { xs: 1, sm: 2, md: 0 } }}>
        <Paper ref={aboutRef} elevation={4} sx={{ p: { xs: 2, md: 5 }, 
        borderRadius: 4, 
        background:'rgb(0, 119, 182)',
        color: '#fff',
        mb: 6,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2" gutterBottom sx={{ 
                  color: '#fff',
                  fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' },
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}>
                  Uncover the Wonders of Thailand
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ 
                color: '#fff',
                mb: 2, fontSize: { xs: '1.05rem', md: '1.35rem' },
                lineHeight: 2,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}>
                Welcome to Thailand! From the bustling streets of Bangkok to the tranquil beaches of Phuket and the lush jungles of Chiang Mai, Thailand offers a world of adventure, relaxation, and cultural discovery.
                <br /><br />
                Whether you're seeking vibrant nightlife, ancient temples, or world-class cuisine, Thailand has something for everyone. Enjoy luxury resorts, friendly locals, and unforgettable experiences. Book your 2025 and 2026 Thailand holidays now and start your journey to the Land of Smiles!
                <br /><br />
                <Collapse in={showMore} timeout="auto" unmountOnExit>
                  <Box component="span" sx={{ display: 'block', mt: 2, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    Thailand's beaches are legendary, with crystal-clear waters and powdery white sand. Explore bustling markets, take a tuk-tuk ride, or relax with a traditional Thai massage.
                    <br /><br />
                    Our travel consultants will help tailor your dream Thailand holiday, customized to your preferences. We are ATOL protected for your peace of mind. Discover Thailand today!
                  </Box>
                </Collapse>
                <Button variant="outlined" 
                  color="primary"
                  sx={{
                    mt: 2,
                    ml: 0,
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    boxShadow: 1,
                    backgroundColor: '#1e3a8a',
                    color: '#fff',
                    border: 'none',
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    '&:hover': {
                      backgroundColor: '#1e40af',
                      color: '#fff',
                    },
                  }}
                  onClick={handleReadMore}>
                  {showMore ? 'Read less' : 'Read more'}
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Navigation Tabs Bar (interactive) and Main Section: Switch by selectedTab */}
      <Container sx={{ mt: 0, mb: 1, px: { xs: 1, sm: 2, md: 0 } }}>
        <Box sx={{ width: '100%', bgcolor: '#f8fafc', pt: 1, pb: 0.5, boxShadow: '0 2px 12px 0 rgba(30,58,138,0.07)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' }, overflowX: { xs: 'auto', md: 'visible' }, px: { xs: 1, md: 0 } }}>
            {[
              'HOTELS',
              'OFFERS',
              'MULTI-CENTRES',
              'TRAVEL GUIDE',
              'ABOUT & FAQ',
            ].map((label) => (
              <Box
                key={label}
                onClick={() => setSelectedTab(label as typeof selectedTab)}
                sx={{
                  px: { xs: 1.2, sm: 2 },
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: selectedTab === label ? 'white' : '#f3f4f6',
                  boxShadow: selectedTab === label ? '0 2px 8px 0 rgba(30,58,138,0.10)' : 'none',
                  fontWeight: selectedTab === label ? 700 : 600,
                  color: selectedTab === label ? 'text.primary' : 'text.secondary',
                  fontSize: { xs: 13, sm: 14 },
                  letterSpacing: 0.5,
                  cursor: 'pointer',
                  border: selectedTab === label ? '1px solid #e5e7eb' : '1px solid transparent',
                  transition: 'all 0.2s',
                  mr: 0.5,
                  minWidth: 90,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Main Section: Switch by selectedTab */}
      {selectedTab === 'HOTELS' && (
        <Container sx={{ mt: 4, mb: 8, px: { xs: 1, sm: 2, md: 0 } }}>
          <Grid container spacing={4}>
            {/* Sidebar Filters (Hotels) */}
            <Grid item xs={12} md={3} sx={{ order: { xs: 2, md: 1 } }}>
              <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: 'background.paper', mb: { xs: 3, md: 0 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ fontSize: { xs: 15, md: 16 } }}>FILTERS</Typography>
                  <Button variant="text" color="primary" size="small" sx={{ fontWeight: 600, textTransform: 'none', p: 0, fontSize: { xs: 13, md: 14 } }} onClick={() => { setSelectedHotel(null); setSelectedLocation(null); }}>Clear all</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, bgcolor: 'grey.100', borderRadius: 2, px: 1 }}>
                  <SearchIcon color="action" />
                  <InputBase placeholder="Type Hotel Name" sx={{ ml: 1, flex: 1, fontSize: 15 }} />
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>HOTEL RATING</Typography>
                <Box sx={{ mb: 2 }}>
                  {[5, 4, 3].map(stars => (
                    <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Checkbox color="primary" size="small" />
                      {[...Array(stars)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 18 }} />
                      ))}
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>HOTEL</Typography>
                <Box>
                  {hotelNames.map(hotel => (
                    <Box key={hotel.name} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedHotel(hotel.name)}>
                      <Checkbox color="primary" size="small" checked={selectedHotel === hotel.name} readOnly />
                      <img src={hotel.img} alt={hotel.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }} />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{hotel.name}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>DESTINATION</Typography>
                <Box>
                  {hotelLocations.map(location => (
                    <Box key={location} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedLocation(location)}>
                      <Checkbox color="primary" size="small" checked={selectedLocation === location} readOnly />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{location}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            {/* Main Hotel Results */}
            <Grid item xs={12} md={9} sx={{ order: { xs: 1, md: 2 } }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 1, sm: 0 } }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700} sx={{ fontSize: { xs: 15, md: 16 } }}>
                  Showing {filteredHotels.length} results for <span style={{ color: '#1e3a8a' }}>Hotels to Thailand</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: { xs: 1, sm: 0 } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, md: 14 } }}>VIEW</Typography>
                  <Button size="small" color="primary" variant="outlined" sx={{ minWidth: 32, px: 1, borderRadius: 2 }}> <GridViewIcon fontSize="small" /> </Button>
                  <Button size="small" color="primary" variant="outlined" sx={{ minWidth: 32, px: 1, borderRadius: 2 }}> <MapIcon fontSize="small" /> </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2, fontSize: { xs: 13, md: 14 } }}>SORTED BY</Typography>
                  <Button size="small" color="primary" variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, ml: 1, fontSize: { xs: 13, md: 14 } }}>Star</Button>
                </Box>
              </Box>
              {/* Hotel Card */}
              {filteredHotels.map((hotel, idx) => (
                <Paper key={idx} elevation={3} sx={{ display: { xs: 'block', sm: 'flex' }, mb: 4, borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper', flexDirection: { xs: 'column', sm: 'row' } }}>
                  {/* Image/Carousel */}
                  <Box sx={{ width: { xs: '100%', sm: 320 }, minHeight: { xs: 180, sm: 220 }, position: 'relative', bgcolor: 'grey.200', display: { xs: 'block', sm: 'block' } }}>
                    <img
                      src={hotel.images[hotelImageIndexes[hotel.name] || 0]}
                      alt={hotel.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: 220 }}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'white', boxShadow: 1, display: { xs: 'none', sm: 'flex' } }}
                      size="small"
                      onClick={() => handlePrevImage(hotel.name, hotel.images.length)}
                    >
                      <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'white', boxShadow: 1, display: { xs: 'none', sm: 'flex' } }}
                      size="small"
                      onClick={() => handleNextImage(hotel.name, hotel.images.length)}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {/* Hotel Info */}
                  <Box sx={{ flex: 1, p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h5" fontWeight={700} color="primary" sx={{ mb: 0.5, fontSize: { xs: 18, md: 22 } }}>{hotel.name} {Array.from({ length: hotel.rating }).map((_, i) => <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20, verticalAlign: 'middle' }} />)}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: 13, md: 14 } }}>{hotel.location}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, md: 14 } }}>PRICE FOR 2 PEOPLE £{hotel.priceForTwo}</Typography>
                      <Typography variant="h5" color="secondary" fontWeight={700} sx={{ mb: 1, fontSize: { xs: 18, md: 22 } }}>
                        from £{hotel.pricePerPerson} pp <span style={{ fontSize: 14, color: '#64748b' }}>(inc. flights)</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: 13, md: 14 } }}>{hotel.nights}</Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mb: 0.5, fontSize: { xs: 13, md: 14 } }}>Offers</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, md: 14 } }}>{hotel.offer}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                      <Button variant="contained" color="primary" sx={{ fontWeight: 700, borderRadius: 2, px: 4, fontSize: { xs: 14, md: 16 } }}>Search</Button>
                      <Button variant="outlined" color="primary" sx={{ fontWeight: 700, borderRadius: 2, px: 4, fontSize: { xs: 14, md: 16 } }}>Hotel Details</Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Container>
      )}

      {selectedTab === 'OFFERS' && (
        <Container sx={{ mt: 4, mb: 8, px: { xs: 1, sm: 2, md: 0 } }}>
          <Grid container spacing={4}>
            {/* Sidebar Filters (Offers) */}
            <Grid item xs={12} md={3} sx={{ order: { xs: 2, md: 1 } }}>
              <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: 'background.paper', mb: { xs: 3, md: 0 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ fontSize: { xs: 15, md: 16 } }}>FILTERS</Typography>
                  <Button variant="text" color="primary" size="small" sx={{ fontWeight: 600, textTransform: 'none', p: 0, fontSize: { xs: 13, md: 14 } }} onClick={() => {
                    setSelectedOfferHotel(null);
                    setSelectedOfferMonth(null);
                    setSelectedOfferPrice(null);
                    setSelectedOfferDuration(null);
                    setSelectedOfferRating(null);
                    setSelectedOfferBoard(null);
                  }}>Clear all</Button>
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>HOTEL</Typography>
                <Box>
                  {offerHotelNames.map(name => (
                    <Box key={name} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferHotel(name)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferHotel === name} readOnly />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{name}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>MONTH</Typography>
                <Box>
                  {offerMonths.map(month => (
                    <Box key={month as string} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferMonth(month as string)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferMonth === month} readOnly />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{month}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>PRICE</Typography>
                <Box>
                  {priceRanges.map(range => (
                    <Box key={range.value} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferPrice(range.value)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferPrice === range.value} readOnly />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{range.label}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>DURATION</Typography>
                <Box>
                  {offerDurations.map(duration => (
                    <Box key={duration as number} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferDuration(duration as number)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferDuration === duration} readOnly />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{duration} Nights</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>HOTEL RATING</Typography>
                <Box sx={{ mb: 2 }}>
                  {[5, 4, 3].map(stars => (
                    <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferRating(selectedOfferRating === stars ? null : stars)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferRating === stars} readOnly />
                      {[...Array(stars)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 18 }} />
                      ))}
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 13, md: 14 } }}>BOARD</Typography>
                <Box>
                  {offerBoards.map(board => (
                    <Box key={board} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferBoard(selectedOfferBoard === board ? null : board)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferBoard === board} readOnly />
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: 13, md: 14 } }}>{board}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            {/* Main Offers Results */}
            <Grid item xs={12} md={9} sx={{ order: { xs: 1, md: 2 } }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 1, sm: 0 } }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700} sx={{ fontSize: { xs: 15, md: 16 } }}>
                  Showing {filteredOffers.length} special offers
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {filteredOffers.map((offer, idx) => (
                  <Grid item xs={12} sm={6} md={6} key={idx}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'primary.light', borderWidth: 1, borderStyle: 'solid' }}>
                      <CardMedia component="img" height="160" image={offer.image} alt={offer.hotel} sx={{ objectFit: 'cover', width: '100%' }} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" color="primary.main" gutterBottom sx={{ fontSize: { xs: 16, md: 18 } }}>{offer.hotel}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, md: 14 } }}>{offer.location}</Typography>
                        <Typography variant="body1" color="secondary.main" fontWeight={700} sx={{ mt: 1, fontSize: { xs: 15, md: 16 } }}>
                          from £{offer.price} pp
                        </Typography>
                        <Chip icon={<LocalOfferIcon />} label={offer.board} color="secondary" size="small" sx={{ mt: 1, mb: 1, fontSize: { xs: 12, md: 13 } }} />
                        <Typography variant="caption" color="primary.dark" sx={{ fontSize: { xs: 12, md: 13 } }}>{offer.offer}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                          <Button variant="contained" color="primary" size="small" sx={{ fontWeight: 700, borderRadius: 2, minWidth: 120, fontSize: { xs: 13, md: 14 } }}>
                            Check Availability
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Placeholder for other tabs */}
      {['MULTI-CENTRES', 'TRAVEL GUIDE', 'ABOUT & FAQ'].includes(selectedTab) && (
        <Container sx={{ mt: 4, mb: 8, px: { xs: 1, sm: 2, md: 0 } }}>
          {selectedTab === 'MULTI-CENTRES' ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  Showing {multiCentres.length} results for <span style={{ color: '#6d28d9' }}>Multi-Centres for you</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>SORTED BY</Typography>
                  <select
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontWeight: 600,
                      color: '#1e293b',
                      background: '#fff',
                      fontSize: 15
                    }}
                    value={''}
                    onChange={() => {}}
                  >
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                    <option value="duration">Duration</option>
                  </select>
                </Box>
              </Box>
              <Grid container spacing={3}>
                {multiCentres.map((item, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Paper elevation={2} sx={{ display: 'flex', alignItems: 'stretch', borderRadius: 3, overflow: 'hidden', mb: 2, boxShadow: '0 2px 12px 0 rgba(30,58,138,0.07)' }}>
                      <Box sx={{ width: 220, minHeight: 160, background: '#e0e7ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h5" fontWeight={800} color="primary" sx={{ mb: 1 }}>{item.title}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{item.description}</Typography>
                        <Typography variant="body2" color="secondary" fontWeight={700} sx={{ mb: 1, letterSpacing: 1 }}>{item.duration} NIGHTS</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pr: 3, justifyContent: 'center', gap: 2 }}>
                        <Button variant="outlined" color="primary" sx={{ fontWeight: 700, borderRadius: 2, px: 4, py: 1, bgcolor: '#f3f6fa' }}>View Itinerary</Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : selectedTab === 'TRAVEL GUIDE' ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Accordion defaultExpanded sx={{
                  mt: 0,
                  background: 'linear-gradient(135deg, #f8fafc 80%, #e0e7ef 100%)',
                  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.08)',
                  borderRadius: 3,
                  mb: 2,
                  '&:before': { display: 'none' },
                  '& .MuiAccordionSummary-root': {
                    borderRadius: 3,
                    minHeight: 56,
                    transition: 'background 0.2s',
                    '&:hover': { background: '#e0e7ef' },
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: 'primary.main',
                  },
                  '& .MuiAccordionDetails-root': {
                    background: '#f3f6fa',
                    borderRadius: 2,
                    p: 2.5,
                  },
                }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                      Activities
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {activities.map((act, i) => (
                        <ListItem key={i} sx={{ pl: 0, py: 0.5 }}>
                          <ListItemIcon><BeachAccessIcon color="primary" /></ListItemIcon>
                          <ListItemText primary={act} primaryTypographyProps={{ fontSize: '1rem', color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 1, borderColor: 'primary.light', opacity: 0.15 }} />
                <Accordion sx={{
                  background: 'linear-gradient(135deg, #f8fafc 80%, #e0e7ef 100%)',
                  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.08)',
                  borderRadius: 3,
                  mb: 2,
                  '&:before': { display: 'none' },
                  '& .MuiAccordionSummary-root': {
                    borderRadius: 3,
                    minHeight: 56,
                    transition: 'background 0.2s',
                    '&:hover': { background: '#e0e7ef' },
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: 'secondary.main',
                  },
                  '& .MuiAccordionDetails-root': {
                    background: '#f3f6fa',
                    borderRadius: 2,
                    p: 2.5,
                  },
                }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5" color="secondary" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                      Food & Drink
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {food.map((item, i) => (
                        <ListItem key={i} sx={{ pl: 0, py: 0.5 }}>
                          <ListItemIcon><RestaurantIcon color="secondary" /></ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ fontSize: '1rem', color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 1, borderColor: 'primary.light', opacity: 0.15 }} />
                <Accordion sx={{
                  background: 'linear-gradient(135deg, #f8fafc 80%, #e0e7ef 100%)',
                  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.08)',
                  borderRadius: 3,
                  mb: 2,
                  '&:before': { display: 'none' },
                  '& .MuiAccordionSummary-root': {
                    borderRadius: 3,
                    minHeight: 56,
                    transition: 'background 0.2s',
                    '&:hover': { background: '#e0e7ef' },
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: 'primary.dark',
                  },
                  '& .MuiAccordionDetails-root': {
                    background: '#f3f6fa',
                    borderRadius: 2,
                    p: 2.5,
                  },
                }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5" color="primary.dark" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                      Attractions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {attractions.map((attr, i) => (
                        <ListItem key={i} sx={{ pl: 0, py: 0.5 }}>
                          <ListItemIcon><FlightIcon color="primary" /></ListItemIcon>
                          <ListItemText primary={attr} primaryTypographyProps={{ fontSize: '1rem', color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: '0 2px 8px rgba(30,58,138,0.07)' }}>
                  <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                    Travel Information
                  </Typography>
                  <List>
                    {travelInfo.map((info, i) => (
                      <ListItem key={i} sx={{ pl: 0 }}>
                        <ListItemIcon><InfoIcon color="secondary" /></ListItemIcon>
                        <ListItemText primary={info.label} secondary={info.value} />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <VerifiedUserIcon color="primary" />
                    <Typography variant="body2" color="primary.main">ATOL Protected</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h5" color="primary">{selectedTab.replace('-', ' ')} content coming soon!</Typography>
            </Paper>
          )}
        </Container>
      )}

      <Dialog open={bookingOpen} onClose={handleCloseBooking} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Book: {bookingHotel?.name}
          <IconButton onClick={handleCloseBooking}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          {bookingSuccess ? (
            <Alert severity="success" sx={{ my: 2 }}>
              Booking request sent! We will contact you soon.
            </Alert>
          ) : (
            <form onSubmit={handleBookingSubmit}>
              <TextField
                label="Name"
                name="name"
                value={bookingForm.name}
                onChange={handleBookingChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={bookingForm.email}
                onChange={handleBookingChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={bookingForm.phone}
                onChange={handleBookingChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Preferred Dates"
                name="dates"
                value={bookingForm.dates}
                onChange={handleBookingChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Special Requests"
                name="requests"
                value={bookingForm.requests}
                onChange={handleBookingChange}
                fullWidth
                multiline
                minRows={2}
                sx={{ mb: 2 }}
              />
              <DialogActions>
                <Button onClick={handleCloseBooking}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Submit Booking</Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Thailand; 