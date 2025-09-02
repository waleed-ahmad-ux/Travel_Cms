import { Box, Container, Typography, Button, Card, CardMedia, CardContent, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import { EnhancedSearchForm } from '../components/EnhancedSearchForm';
import { HolidayCarousel } from '../components/HolidayCarousel';
import React, { useRef, useState, useEffect } from 'react';
import { assetMap } from '../assets/assetMap';
import FeaturedDestinationsGrid from '../components/FeaturedDestinationsGrid';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const HeroSection = styled(Box)<{ backgroundimage: string }>(({ theme, backgroundimage }) => ({
  backgroundImage: `url(${backgroundimage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(8),
  marginTop: theme.spacing(-21.1),
  position: 'relative',
  overflow: 'hidden',
}));

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

const featuredDestinations = [
  {
    title: 'Luxury Maldives',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    description: 'Experience paradise with crystal clear waters and overwater villas',
    price: '£1,999',
  },
  {
    title: 'Dubai Extravaganza',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    description: 'Discover luxury shopping and desert adventures in Dubai',
    price: '£899',
  },
  {
    title: 'Greek Islands',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    description: 'Enjoy the beautiful beaches and crystal clear waters of the Greek Islands',
    price: '£799',
  },
];

// Custom hook for scroll-triggered count up
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <HeroSection backgroundimage={heroImages[currentHeroIndex]}>
        {/* Overlay for text readability */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.45)',
          zIndex: 0,
        }} />
        <Container maxWidth={false} disableGutters sx={{ position: 'relative', zIndex: 1, pt: 3, width: '100vw' }}>
          <EnhancedSearchForm />
        </Container>
      </HeroSection>

      <FeaturedDestinationsGrid />

      <HolidayCarousel />

      <Container maxWidth={false} sx={{ py: 8, bgcolor: 'rgb(23, 46, 77)', borderRadius: 4, width: '100vw' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center', mb: 4 }}>
          Featured Holiday Deals
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {featuredDestinations.map((destination, index) => (
            <Box key={index} sx={{ flex: '0 1 340px', maxWidth: 420 }}>
              <Card sx={{
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
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.image}
                  alt={destination.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {destination.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {destination.description}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
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
      <Box sx={{ bgcolor: 'rgba(232, 244, 253, 0.95)', py: 8, borderRadius: 4, width: '100vw', display: 'flex', justifyContent: 'center' }}>
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
              <Typography variant="body2" color="text.secondary">
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
                  <Typography variant="body2" color="primary.main">
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
              <Typography variant="body2" color="text.secondary">
                1M+ ratings on our app
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>

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
