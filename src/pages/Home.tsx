// React and Material UI imports
import {
  Box, Container, Typography, Button, Card,
  CardMedia, CardContent, Stack, useTheme, useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
//import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
// npm install @fontsource/great-vibes

// Custom components
import { EnhancedSearchForm } from '../components/EnhancedSearchForm';
import { HolidayCarousel } from '../components/HolidayCarousel';
//import { HeroImageCarousel } from '../components/HeroImageCarousel';

// React hooks
import React, { useRef, useState, useEffect } from 'react';

// Background images for hero section
import { assetMap } from '../assets/assetMap';

// Featured destination images

// Grid of featured destinations
import FeaturedDestinationsGrid from '../components/FeaturedDestinationsGrid';

// Icons (optional use)
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';


//  STYLED COMPONENTS

// Hero section with rotating background image
const HeroSection = styled(Box)<{ backgroundimage: string }>(({ theme, backgroundimage }) => ({
  backgroundImage: `url(${backgroundimage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(8),
  marginTop: theme.spacing(-25.1),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minHeight: '100vh',
    width: '100vw',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: '100vh',
    width: '100vw',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
}));

// Floating chat button
const ChatButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  zIndex: 1000,
  borderRadius: 25,
  padding: theme.spacing(1.5, 3),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Array of featured destinations to display in cards
const featuredDestinations = [
  {
    title: 'Luxury Maldives',
    image: assetMap["mal2.jpeg"],
    description: 'Experience paradise with crystal clear waters and overwater villas',
    price: '\u00a31,999',
  },
  {
    title: 'Dubai Extravaganza',
    image: assetMap["1.jpeg"],
    description: 'Discover luxury shopping and desert adventures in Dubai',
    price: '\u00a3899',
  },
  {
    title: 'Greek Islands',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    description: 'Enjoy the beautiful beaches and crystal clear waters of the Greek Islands',
    price: '\u00a3799',
  },
  {
    title: 'Luxury Maldives',
    image: assetMap["mal2.jpeg"],
    description: 'Experience paradise with crystal clear waters and overwater villas',
    price: '\u00a31,999',
  },
  {
    title: 'Dubai Extravaganza',
    image: assetMap["1.jpeg"],
    description: 'Discover luxury shopping and desert adventures in Dubai',
    price: '\u00a3899',
  },
];


// Custom hook: triggers a count-up animation when scrolled into view
function useScrollTriggeredCountUp(ref: React.RefObject<HTMLSpanElement | null>, end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const isCounting = useRef(false);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    let observer: IntersectionObserver;
    let counter: ReturnType<typeof setInterval>;
    let frame = 0;

    function startCount() {
      frame = 0;
      isCounting.current = true;
      counter = setInterval(() => {
        frame++;
        const progress = easeOutExpo(frame / totalFrames);
        setCount(Math.round(end * progress));
        if (frame === totalFrames) {
          clearInterval(counter);
          isCounting.current = false;
        }
      }, frameRate);
    }

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isCounting.current) {
            startCount();
          } else if (!entry.isIntersecting) {
            setCount(0);
            isCounting.current = false;
            clearInterval(counter);
          }
        },
        { threshold: 0.7 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer && ref.current) observer.unobserve(ref.current);
      clearInterval(counter);
    };
  }, [ref, end, duration, totalFrames, frameRate]);

  return count;
}


// MAIN HOME COMPONENT
export const Home = () => {
  const heroImages = [
    assetMap["2.jpeg"],
    assetMap["3.jpeg"],
    assetMap["4.jpeg"],
    assetMap["5.jpeg"],
    assetMap["6.jpeg"],
    assetMap["7.jpeg"]
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const theme = useTheme();
  // Tablet portrait sizes: 1024x1366, 820x1180, 768x1024
  const isTabletPortrait = useMediaQuery('(min-width:768px) and (max-width:1366px) and (orientation:portrait)');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const showMobileStyle = isMobile || isTabletPortrait;

  // Auto-rotate hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>

      {/* 🔹 HERO SECTION (with rotating background) */}
      <HeroSection backgroundimage={heroImages[currentHeroIndex]}>
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
       {/* Fixed Caption */}
        {/* Desktop: Show text above search bar */}
        {!showMobileStyle && (
          <Typography
            variant="h2"
            sx={{
              display: 'block',
              position: 'absolute',
              bottom: '7%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontWeight: 'normal',
              fontSize: { md: '4rem' },
              zIndex: 2,
              textAlign: 'center',
              textShadow: '0 2px 12px rgba(0,0,0,0.25)',
              letterSpacing: 4,
              fontFamily: '"Great Vibes", cursive',
              width: '100%',
              maxWidth: '95vw',
              px: { md: 0 },
            }}
          >
            <span style={{ fontSize: '2em', fontWeight: 700, verticalAlign: 'middle', fontFamily: '"Great Vibes", cursive' }}>Holidays</span>
            <span style={{ fontSize: '1.5em', marginLeft: '0.5em', verticalAlign: 'middle', fontFamily: '"Great Vibes", cursive' }}>
              for Discerning Travellers
            </span>
          </Typography>
        )}
        {/*  SEARCH FORM: Move this box higher by adjusting `pt` value */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            position: 'relative',
            zIndex: 1,
            pt: { xs: 2, md: 1 },
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            px: { xs: 1, md: 0 },
          }}
        >
          <EnhancedSearchForm forceMobile={showMobileStyle} />
          {/* Mobile & Tablet Portrait: Show text below search bar */}
          {showMobileStyle && (
            <Typography
              variant="h2"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 66,
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '2rem',
                zIndex: 2,
                textAlign: 'center',
                textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                letterSpacing: 4,
                fontFamily: '"Great Vibes", cursive',
                width: '100%',
                maxWidth: '95vw',
                px: 2,
              }}
            >
              <span style={{ fontSize: '1.5em', fontWeight: 700, verticalAlign: 'middle', fontFamily: '"Great Vibes", cursive', textAlign: 'center' }}>Holidays</span>
              <span style={{ fontSize: '1.1em', marginLeft: '0.5em', verticalAlign: 'middle', fontFamily: '"Great Vibes", cursive', textAlign: 'center' }}>
                for Discerning Travellers
              </span>
            </Typography>
          )}
        </Container>
      </HeroSection>

      {/* FEATURED DESTINATIONS GRID */}
      <Box
        sx={{
          bgcolor: 'rgb(0, 29, 61)',
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 0 },
        }}
      >
        <FeaturedDestinationsGrid />
      </Box>

      {/* HOLIDAY OFFERS CAROUSEL */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
          backgroundColor: 'rgb(252, 255, 255)',
        }}
      >
        <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <HolidayCarousel />
        </Box>
      </Box>

      {/* FEATURED HOLIDAY CARDS SECTION */}
      <Container
        maxWidth={false}
        sx={{
          py: 8,
         
          bgcolor:'rgb(0, 29, 61)',
          borderRadius: 0, // Remove the border to have no curves
          width: '100vw',
        }}
      >
        <Typography
          variant="h3"
      sx={{
     // mt: -10, // Move up by 4 spacing units (adjust as needed)
      //fontFamily: '"Playfair Display", serif',
      textAlign:'center',
      fontWeight: 700,
      mb:4,
      fontSize:'2.25rem',
      textTransform: 'uppercase',
      color: 'rgb(255, 255, 255)',
      letterSpacing: 1,
      position: 'relative',
      display: 'block'
       }}
         // sx={{ color: 'white', textAlign: 'center', mb: 4 }}
        >
          Featured Holiday Deals
          
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {featuredDestinations.map((destination, index) => (
            <Box key={index} sx={{ flex: '0 1 340px', maxWidth: 420 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: 1,
                  transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 6,
                    borderColor: 'primary.light',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.image}
                  alt={destination.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{fontSize: '1.4rem'}} >
                    {destination.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{fontSize: '1.1rem'}} >
                    {destination.description}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} >
                      from {destination.price}
                    </Typography>
                    <Button variant="contained" size="small">
                      View Deal
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>


      {/* New Info Section */}
      <Box sx={{ bgcolor: 'rgb(0, 119, 182)', py: 8, borderRadius: 0, width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg" sx={{ mb: 10, bgcolor: 'transparent', p: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {/* Card 1: Save when you compare */}
            <Card sx={{ flex: '1 1 300px', minWidth: 280, maxWidth: 370, borderRadius: 4, boxShadow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: '1px solid', borderColor: 'grey.200', transition: 'all 0.3s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6, borderColor: 'primary.light' } }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {/* Car rental icons instead of brand avatars */}
                <CarRentalIcon sx={{ fontSize: 36, color: 'primary.main', bgcolor: 'grey.100', borderRadius: '50%', p: 0.5 }} />
                <DirectionsCarIcon sx={{ fontSize: 36, color: 'primary.main', bgcolor: 'grey.100', borderRadius: '50%', p: 0.5 }} />
                <LocalTaxiIcon sx={{ fontSize: 36, color: 'primary.main', bgcolor: 'grey.100', borderRadius: '50%', p: 0.5 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Save when you compare
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem', fontWeight: 'normal' }}>
                More deals. More sites. One search
              </Typography>
            </Card>

            {/* Card 2: Searches this week */}
            {(() => {
              const countRef = React.useRef<HTMLSpanElement>(null);
              const count = useScrollTriggeredCountUp(countRef, 410000, 100);
              return (
                <Card sx={{ flex: '1 1 300px', minWidth: 280, maxWidth: 370, borderRadius: 4, boxShadow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: '1px solid', borderColor: 'grey.200', transition: 'all 0.3s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6, borderColor: 'primary.light' } }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {/* Placeholder user avatars */}
                    <Box component="img" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User1" sx={{ width: 36, height: 36, borderRadius: '50%' }} />
                    <Box component="img" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User2" sx={{ width: 36, height: 36, borderRadius: '50%' }} />
                    <Box component="img" src="https://randomuser.me/api/portraits/men/65.jpg" alt="User3" sx={{ width: 36, height: 36, borderRadius: '50%' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    <span ref={countRef}>{count.toLocaleString()}+</span>
                  </Typography>
                  <Typography variant="body2" color="primary.main" sx={{ fontSize: '1.2rem', fontWeight: 'normal' }}>
                    searches this week
                  </Typography>
                </Card>
              );
            })()}

            {/* Card 3: Travelers love us */}
            <Card sx={{ flex: '1 1 300px', minWidth: 280, maxWidth: 370, borderRadius: 4, boxShadow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: '1px solid', borderColor: 'grey.200', transition: 'all 0.3s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6, borderColor: 'primary.light' } }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Box key={i} component="span" sx={{ color: '#fbbf24', fontSize: 28 }}>&#9733;</Box>
                ))}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Travelers love us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem', fontWeight: 'normal' }}>
                1M+ ratings on our app
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>


      {/* 🔹 FLOATING CHAT BUTTON */}
      <ChatButton
        variant="contained"
        startIcon={<ChatIcon />}
        onClick={() => alert('Chat feature coming soon!')}
      >
        Chat with us
      </ChatButton>
    </Box>
  );
};
