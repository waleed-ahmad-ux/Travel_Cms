import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button, Chip, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
import { Checkbox, InputBase, IconButton } from '@mui/material';
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

// Mock data for offers
const offers = [
  {
    hotel: 'Cocos Hotel',
    location: 'Saint Johns',
    price: 1639,
    board: '7 Nights ALL INCLUSIVE',
    image: assetMap["1.jpeg"],
    offer: 'Special Offer (Travel from 04/09/2025)',
  },
  {
    hotel: 'Sandals Grande Antigua',
    location: 'Saint Johns',
    price: 1728,
    board: '7 Nights All inclusive',
    image: assetMap["2.jpeg"],
    offer: 'UKSAT55- 60% OFF (Travel from 04/09/2025)',
  },
  {
    hotel: 'Royalton CHIC Antigua',
    location: 'Saint Johns',
    price: 1808,
    board: '7 Nights All inclusive',
    image: assetMap["3.jpeg"],
    offer: 'Special Offer (Travel from 28/08/2025)',
  },
  {
    hotel: 'Hammock Cove, Antigua',
    location: 'Saint Johns',
    price: 3329,
    board: '7 Nights All inclusive',
    image: assetMap["4.jpeg"],
    offer: 'Stay 7 Nights Pay for 5 (Travel between 04/09/2025 and 12/10/2025)',
  },
];

const travelInfo = [
  { label: 'Currency', value: 'East Caribbean Dollar' },
  { label: 'Time difference', value: 'GMT-5' },
  { label: 'Flight from UK', value: '8hrs' },
  { label: 'Visa', value: 'No' },
  { label: 'Language', value: 'English' },
  { label: 'National dish', value: 'Fungie and pepper pot' },
];

const activities = [
  'Scuba diving or snorkelling',
  'Kayaking between the islands',
  '4x4 island discovery tour',
  
  'Visit Nelson\'s Dockyard',
  'Hike Great Bird Island',
  'Snorkelling at the reef',
  'Kayak North Sound Marine Park',
];

const food = [
  'Seafood (fresh local catches)',
  'French dining',
  'Italian home cooking',
  'American dishes',
  'Caribbean fare',
  'Fungie and pepper pot',
  'Street vendor food',
];

const attractions = [
  'Shirley Heights (18th-century fort, coastal views)',
  'Hiking Great Bird Island',
  'Snorkelling at the reef',
  'North Sound Marine Park',
];

// Mock hotel data for the hotel listing section
const hotels = [
  {
    name: 'Blue Waters Resort and Spa',
    location: 'Soldier Bay',
    rating: 5,
    priceForTwo: 3670,
    pricePerPerson: 1835,
    offer: 'Up to 30% saving + Complimentary Resort Credit per room per stay (Travel between 17/06/2025 and 10/11/2025)',
    nights: '7 NIGHTS BED AND BREAKFAST',
    images: [assetMap["1.jpeg"], assetMap["2.jpeg"], assetMap["3.jpeg"], assetMap["4.jpeg"], assetMap["5.jpeg"]],
  },
  // Add more hotels as needed
];

// Update hotelNames to use the first image for each hotel
const hotelNames = [
  { name: 'Blue Waters Resort and Spa', img: assetMap["1.jpeg"] },
  { name: 'Carlisle Bay', img: assetMap["2.jpeg"] },
  { name: 'Cocobay', img: assetMap["3.jpeg"] },
  { name: 'Cocos Hotel', img: assetMap["4.jpeg"] },
];

// Mock data for multi-centre itineraries
const multiCentres = [
  {
    title: 'Dubai and Phuket',
    description: 'Combine contemporary Dubai with the beautiful beaches of Phuket to experience the best of both city and beach.',
    duration: 10,
    image: assetMap["1.jpeg"], // Replace with appropriate images
  },
  {
    title: 'Phuket and Phi Phi Islands',
    description: 'A luxury combination for beach worshippers, keen divers and those wanting a romantic environment amongst some stunning scenery.',
    duration: 10,
    image: assetMap["2.jpeg"], // Replace with appropriate images
  },
  // Add more as needed
];

const Antigua: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  // Add state for selected hotel filter
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  // Add state for selected location filter
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  // Add state for selected tab
  const [selectedTab, setSelectedTab] = useState<'HOTELS' | 'OFFERS' | 'MULTI-CENTRES' | 'TRAVEL GUIDE' | 'ABOUT & FAQ'>('HOTELS');

  // Get unique locations from hotels
  const hotelLocations = Array.from(new Set(hotels.map(h => h.location)));

  // Filter hotels based on selectedHotel and selectedLocation
  const filteredHotels = hotels.filter(h => {
    const hotelMatch = selectedHotel ? h.name === selectedHotel : true;
    const locationMatch = selectedLocation ? h.location === selectedLocation : true;
    return hotelMatch && locationMatch;
  });

  // Offer filters (simple: by hotel name)
  const [selectedOfferHotel, setSelectedOfferHotel] = useState<string | null>(null);
  const [selectedOfferMonth, setSelectedOfferMonth] = useState<string | null>(null);
  const [selectedOfferPrice, setSelectedOfferPrice] = useState<string | null>(null);
  const [selectedOfferDuration, setSelectedOfferDuration] = useState<number | null>(null);
  const [selectedOfferRating, setSelectedOfferRating] = useState<number | null>(null);
  const offerHotelNames = Array.from(new Set(offers.map(o => o.hotel)));

  // Get unique board types from offers
  const offerBoards = Array.from(new Set(offers.map(o => o.board)));
  const [selectedOfferBoard, setSelectedOfferBoard] = useState<string | null>(null);

  // Helper: extract month (e.g., 'September 2025') from offer string
  function extractMonth(offerStr: string): string | null {
    // Match 'Travel from DD/MM/YYYY' or 'Travel between DD/MM/YYYY and DD/MM/YYYY'
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

  // Helper: extract duration (nights) from board string
  function extractNights(boardStr: string): number | null {
    const match = boardStr.match(/(\d+)\s*Nights?/i);
    return match ? parseInt(match[1], 10) : null;
  }

  // Get unique months and durations from offers
  const offerMonths = Array.from(new Set(offers.map(o => extractMonth(o.offer)).filter(Boolean)));
  const offerDurations = Array.from(new Set(offers.map(o => extractNights(o.board)).filter(Boolean)));

  // Price ranges
  const priceRanges = [
    { label: '< £2000', value: '<2000' },
    { label: '£2000–£2500', value: '2000-2500' },
    { label: '> £2500', value: '>2500' },
  ];

  // Filtering logic for offers
  const filteredOffers = offers.filter(o => {
    const hotelMatch = selectedOfferHotel ? o.hotel === selectedOfferHotel : true;
    const month = extractMonth(o.offer);
    const monthMatch = selectedOfferMonth ? month === selectedOfferMonth : true;
    const price = o.price;
    let priceMatch = true;
    if (selectedOfferPrice === '<2000') priceMatch = price < 2000;
    else if (selectedOfferPrice === '2000-2500') priceMatch = price >= 2000 && price <= 2500;
    else if (selectedOfferPrice === '>2500') priceMatch = price > 2500;
    const duration = extractNights(o.board);
    const durationMatch = selectedOfferDuration ? duration === selectedOfferDuration : true;
    // Get hotel rating from hotels array
    const hotelObj = hotels.find(h => h.name === o.hotel);
    const rating = hotelObj ? hotelObj.rating : null;
    const ratingMatch = selectedOfferRating ? rating === selectedOfferRating : true;
    const boardMatch = selectedOfferBoard ? o.board === selectedOfferBoard : true;
    return hotelMatch && monthMatch && priceMatch && durationMatch && ratingMatch && boardMatch;
  });

  // State to track current image index for each hotel
  const [hotelImageIndexes, setHotelImageIndexes] = useState<{ [hotelName: string]: number }>({});

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

  // Booking modal state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingItinerary, setBookingItinerary] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', dates: '', requests: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setBookingItinerary(null);
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

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: { xs: 300, md: 420 }, background: `url(${assetMap["anti.jpeg"]}) center/cover`, display: 'flex', alignItems: 'flex-end' }}>
        <Container sx={{ zIndex: 2, pb: 4 }}>
          <Typography variant="h1" color="white" sx={{ textShadow: '0 2px 8px rgba(30,58,138,0.7)' }}>
            Antigua Holidays
          </Typography>
          <Typography variant="h5" color="white" sx={{ mb: 2, textShadow: '0 2px 8px rgba(30,58,138,0.7)' }}>
            365 beaches, historic harbors, and the perfect Caribbean escape
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 3, fontWeight: 700 }}>
            Request a Quote
          </Button>
        </Container>
        {/* Enhanced Search Form Overlay */}
        <Box sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: { xs: -36, md: -48 },
          display: 'flex',
          justifyContent: 'center',
          zIndex: 5,
          pointerEvents: 'none',
        }}>
          <Box sx={{ width: '100%', pointerEvents: 'auto', px: { xs: 1, sm: 2, md: 4 } }}>
            <EnhancedSearchForm />
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(30,58,138,0.35)' }} />
      </Box>

      {/* About Antigua Section */}
      <Container sx={{ mt: 8 }}>
        <Paper elevation={4} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, background: 'lightblue', mb: 6 }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InfoIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
                <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  About Antigua
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: 'text.primary', lineHeight: 1.8 }}>
                Say hello to Antigua holidays! Few sights will take your breath away as easily, or quickly, as those on this tropical island - panoramic views of a turquoise ocean, a white sandy beach and fluttering palm trees.
                <Collapse in={showMore} timeout="auto" unmountOnExit>
                  <Box component="span" sx={{ display: 'block', mt: 2 }}>
                    There are numerous ways to enjoy our luxury Antigua holidays, from going all inclusive or indulging in a spa break at an adults-only property, to relaxing with your family at a child-friendly resort. If you take your time to discover this gorgeous island paradise for yourself, you will soon understand why Antigua, and the Caribbean Islands, have become so popular. Book now for 2025 and 2026 holidays to Antigua and start planning the ultimate escape.
                    <br /><br />
                    Beach holidays in Antigua really are something special; the island has 365 beaches (one for each day of the year), so there's plenty of variety! However, they all have some things in common - quintessential Caribbean sunsets, warm climates and the perfect atmosphere.
                    <br /><br />
                    Our Caribbean Travel Consultants will help tailor your dream Caribbean holiday, customised to all your preferences and requirements. Plus, we are ATOL protected for your peace of mind. So sit back, relax and enjoy every second of your dream Antigua holiday!
                  </Box>
                </Collapse>
                <Button variant="outlined" color="primary" sx={{ mt: 2, ml: 3, fontWeight: 600, borderRadius: 2, px: 3, py: 1, boxShadow: 1 }} onClick={() => setShowMore((prev) => !prev)}>
                  {showMore ? 'Read less' : 'Read more'}
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Navigation Tabs Bar (interactive) and Main Section: Switch by selectedTab */}
      <Container sx={{ mt: 0, mb: 1 }}>
        <Box sx={{ width: '100%', bgcolor: '#f8fafc', pt: 1, pb: 0.5, boxShadow: '0 2px 12px 0 rgba(30,58,138,0.07)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
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
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: selectedTab === label ? 'white' : '#f3f4f6',
                  boxShadow: selectedTab === label ? '0 2px 8px 0 rgba(30,58,138,0.10)' : 'none',
                  fontWeight: selectedTab === label ? 700 : 600,
                  color: selectedTab === label ? 'text.primary' : 'text.secondary',
                  fontSize: 14,
                  letterSpacing: 0.5,
                  cursor: 'pointer',
                  border: selectedTab === label ? '1px solid #e5e7eb' : '1px solid transparent',
                  transition: 'all 0.2s',
                  mr: 0.5
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
        <Container sx={{ mt: 4, mb: 8 }}>
          <Grid container spacing={4}>
            {/* Sidebar Filters (Hotels) */}
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} color="text.primary">FILTERS</Typography>
                  <Button variant="text" color="primary" size="small" sx={{ fontWeight: 600, textTransform: 'none', p: 0 }} onClick={() => { setSelectedHotel(null); setSelectedLocation(null); }}>Clear all</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, bgcolor: 'grey.100', borderRadius: 2, px: 1 }}>
                  <SearchIcon color="action" />
                  <InputBase placeholder="Type Hotel Name" sx={{ ml: 1, flex: 1, fontSize: 15 }} />
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>HOTEL RATING</Typography>
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
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>HOTEL</Typography>
                <Box>
                  {hotelNames.map(hotel => (
                    <Box key={hotel.name} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedHotel(hotel.name)}>
                      <Checkbox color="primary" size="small" checked={selectedHotel === hotel.name} readOnly />
                      <img src={hotel.img} alt={hotel.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }} />
                      <Typography variant="body2" color="text.primary">{hotel.name}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>DESTINATION</Typography>
                <Box>
                  {hotelLocations.map(location => (
                    <Box key={location} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedLocation(location)}>
                      <Checkbox color="primary" size="small" checked={selectedLocation === location} readOnly />
                      <Typography variant="body2" color="text.primary">{location}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            {/* Main Hotel Results */}
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  Showing {filteredHotels.length} results for <span style={{ color: '#1e3a8a' }}>Hotels to Antigua</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">VIEW</Typography>
                  <Button size="small" color="primary" variant="outlined" sx={{ minWidth: 32, px: 1, borderRadius: 2 }}> <GridViewIcon fontSize="small" /> </Button>
                  <Button size="small" color="primary" variant="outlined" sx={{ minWidth: 32, px: 1, borderRadius: 2 }}> <MapIcon fontSize="small" /> </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>SORTED BY</Typography>
                  <Button size="small" color="primary" variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, ml: 1 }}>Star</Button>
                </Box>
              </Box>
              {/* Hotel Card */}
              {filteredHotels.map((hotel, idx) => (
                <Paper key={idx} elevation={3} sx={{ display: 'flex', mb: 4, borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper' }}>
                  {/* Image/Carousel */}
                  <Box sx={{ width: 320, minHeight: 220, position: 'relative', bgcolor: 'grey.200', display: { xs: 'none', sm: 'block' } }}>
                    <img
                      src={hotel.images[hotelImageIndexes[hotel.name] || 0]}
                      alt={hotel.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'white', boxShadow: 1 }}
                      size="small"
                      onClick={() => handlePrevImage(hotel.name, hotel.images.length)}
                    >
                      <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'white', boxShadow: 1 }}
                      size="small"
                      onClick={() => handleNextImage(hotel.name, hotel.images.length)}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {/* Hotel Info */}
                  <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h5" fontWeight={700} color="primary" sx={{ mb: 0.5 }}>{hotel.name} {Array.from({ length: hotel.rating }).map((_, i) => <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20, verticalAlign: 'middle' }} />)}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{hotel.location}</Typography>
                      <Typography variant="body2" color="text.secondary">PRICE FOR 2 PEOPLE £{hotel.priceForTwo}</Typography>
                      <Typography variant="h5" color="secondary" fontWeight={700} sx={{ mb: 1 }}>
                        from £{hotel.pricePerPerson} pp <span style={{ fontSize: 14, color: '#64748b' }}>(inc. flights)</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{hotel.nights}</Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mb: 0.5 }}>Offers</Typography>
                      <Typography variant="body2" color="text.secondary">{hotel.offer}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button variant="contained" color="primary" sx={{ fontWeight: 700, borderRadius: 2, px: 4 }}>Search</Button>
                      <Button variant="outlined" color="primary" sx={{ fontWeight: 700, borderRadius: 2, px: 4 }}>Hotel Details</Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Container>
      )}

      {selectedTab === 'OFFERS' && (
        <Container sx={{ mt: 4, mb: 8 }}>
          <Grid container spacing={4}>
            {/* Sidebar Filters (Offers) */}
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} color="text.primary">FILTERS</Typography>
                  <Button variant="text" color="primary" size="small" sx={{ fontWeight: 600, textTransform: 'none', p: 0 }} onClick={() => {
                    setSelectedOfferHotel(null);
                    setSelectedOfferMonth(null);
                    setSelectedOfferPrice(null);
                    setSelectedOfferDuration(null);
                    setSelectedOfferRating(null);
                    setSelectedOfferBoard(null);
                  }}>Clear all</Button>
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>HOTEL</Typography>
                <Box>
                  {offerHotelNames.map(name => (
                    <Box key={name} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferHotel(name)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferHotel === name} readOnly />
                      <Typography variant="body2" color="text.primary">{name}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>HOTEL RATING</Typography>
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
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>BOARD</Typography>
                <Box>
                  {offerBoards.map(board => (
                    <Box key={board} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferBoard(selectedOfferBoard === board ? null : board)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferBoard === board} readOnly />
                      <Typography variant="body2" color="text.primary">{board}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>MONTH</Typography>
                <Box>
                  {offerMonths.map(month => (
                    <Box key={month as string} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferMonth(month as string)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferMonth === month} readOnly />
                      <Typography variant="body2" color="text.primary">{month}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>PRICE</Typography>
                <Box>
                  {priceRanges.map(range => (
                    <Box key={range.value} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferPrice(range.value)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferPrice === range.value} readOnly />
                      <Typography variant="body2" color="text.primary">{range.label}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}>DURATION</Typography>
                <Box>
                  {offerDurations.map(duration => (
                    <Box key={duration as number} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setSelectedOfferDuration(duration as number)}>
                      <Checkbox color="primary" size="small" checked={selectedOfferDuration === duration} readOnly />
                      <Typography variant="body2" color="text.primary">{duration} Nights</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            {/* Main Offers Results */}
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  Showing {filteredOffers.length} special offers
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {filteredOffers.map((offer, idx) => (
                  <Grid item xs={12} sm={6} md={6} key={idx}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'primary.light', borderWidth: 1, borderStyle: 'solid' }}>
                      <CardMedia component="img" height="160" image={offer.image} alt={offer.hotel} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" color="primary.main" gutterBottom>{offer.hotel}</Typography>
                        <Typography variant="body2" color="text.secondary">{offer.location}</Typography>
                        <Typography variant="body1" color="secondary.main" fontWeight={700} sx={{ mt: 1 }}>
                          from £{offer.price} pp
                        </Typography>
                        <Chip icon={<LocalOfferIcon />} label={offer.board} color="secondary" size="small" sx={{ mt: 1, mb: 1 }} />
                        <Typography variant="caption" color="primary.dark">{offer.offer}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                          <Button variant="contained" color="primary" size="small" sx={{ fontWeight: 700, borderRadius: 2, minWidth: 120 }}>
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
        <Container sx={{ mt: 4, mb: 8 }}>
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

      {/* Booking Modal */}
      <Dialog open={bookingOpen} onClose={handleCloseBooking} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Book: {bookingItinerary?.title}
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

export default Antigua; 