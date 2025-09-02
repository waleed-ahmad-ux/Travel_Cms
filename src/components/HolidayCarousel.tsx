import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlightIcon from '@mui/icons-material/Flight';
import { assetMap } from '../assets/assetMap';

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.background.default,
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  gap: theme.spacing(3),
}));

const CarouselCard = styled(Card)(({ theme }) => ({
  minWidth: 320,
  maxWidth: 380,
  height: 420,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.03)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.primary.light,
  },
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  zIndex: 2,
  width: 56,
  height: 56,
  boxShadow: theme.shadows[6],
  border: `2px solid ${theme.palette.primary.dark}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));

const holidayDeals = [
  {
    id: 1,
    title: 'The One & Only Royal Mirage',
    location: 'Dubai, Jumeirah Beach',
    image: assetMap["3.jpeg"],
    price: '\u00a31,119',
    duration: '5 Nights',
    board: 'Half Board',
    deal: 'Save up to 37% & Kids Stay & eat free',
    region: 'Middle East',
  },
  {
    id: 2,
    title: 'LUX* South Ari Atoll',
    location: 'Maldives',
    image: assetMap["mal.jpeg"],
    price: '\u00a32,765',
    duration: '7 Nights',
    board: 'All Inclusive',
    deal: 'Save up to 50% + FREE upgrade',
    region: 'Indian Ocean',
  },
  {
    id: 3,
    title: 'Fairmont Royal Pavilion',
    location: 'Barbados, West Coast',
    image: assetMap["barba.jpeg"],
    price: '\u00a32,279',
    duration: '7 Nights',
    board: 'Bed and Breakfast',
    deal: 'Up to 50% saving, Kids Stay and Eat Free',
    region: 'Caribbean',
  },
  {
    id: 4,
    title: 'Banyan Tree Phuket',
    location: 'Thailand, Phuket',
    image: assetMap["pukit.jpeg"],
    price: '\u00a33,249',
    duration: '10 Nights',
    board: 'Bed and Breakfast',
    deal: 'Save 30% With Private Transfers Included',
    region: 'Asia',
  },
  {
    id: 5,
    title: 'One&Only Le Saint Géran',
    location: 'Mauritius',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
    price: '£2,899',
    duration: '7 Nights',
    board: 'All Inclusive',
    deal: 'Honeymoon Special - Free Spa Treatment',
    region: 'Indian Ocean',
  },
  {
    id: 6,
    title: 'Sandals Royal Caribbean',
    location: 'Jamaica, Montego Bay',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    price: '£1,899',
    duration: '7 Nights',
    board: 'All Inclusive',
    deal: 'Couples Special - Free Airport Transfers',
    region: 'Caribbean',
  },
  {
    id: 7,
    title: 'Constance Moofushi',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: '£2,499',
    duration: '7 Nights',
    board: 'All Inclusive',
    deal: 'Free Seaplane Transfers',
    region: 'Indian Ocean',
  },
  {
    id: 8,
    title: 'Shangri-La Le Touessrok',
    location: 'Mauritius',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: '£2,799',
    duration: '7 Nights',
    board: 'Half Board',
    deal: 'Kids Stay Free + Resort Credit',
    region: 'Indian Ocean',
  },
  {
    id: 9,
    title: 'Hilton Barbados Resort',
    location: 'Barbados, Bridgetown',
    image: 'https://images.unsplash.com/photo-1465156799763-2c087c332922',
    price: '£1,599',
    duration: '5 Nights',
    board: 'Bed and Breakfast',
    deal: 'Save 25% + Free Room Upgrade',
    region: 'Caribbean',
  },
];

export const HolidayCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const total = holidayDeals.length;

  // Responsive visibleCount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1300) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const extendedDeals = [
    ...holidayDeals.slice(-visibleCount),
    ...holidayDeals,
    ...holidayDeals.slice(0, visibleCount),
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setFadeIn(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setFadeIn(true);
    }, 250);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setFadeIn(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setFadeIn(true);
    }, 250);
  };

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex === total + visibleCount) {
        setCurrentIndex(visibleCount);
      } else if (currentIndex === 0) {
        setCurrentIndex(total);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, total, visibleCount]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % holidayDeals.length); // added this code, so that carousel keeps moving
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <CarouselContainer sx={{ width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', position: 'relative' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ 
            fontWeight: 800,
            fontSize:'2.25rem',
            textTransform: 'uppercase',
            //color: 'rgb(0, 29, 61)',
            color: 'rgb(2,62,138)',
            letterSpacing: 1,
            position: 'relative',
            display: 'inline-block'
            //color: 'primary.dark' 
          }}
        >
          Our Best Holiday Offers
        </Typography>
        <Typography variant="body1" 
         sx={{
           color: 'rgb(0, 119, 182)',
            mt: 2,
           fontWeight: 700,
            //fontSize: '1rem',
            fontSize: '1.25rem', // ✅ Increased from default (~1rem) to 1.25rem
            }}
            >
          Discover Incredible Deals On Luxury Holidays Worldwide
        </Typography>
      </Box>

      <Box
        sx={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: 480 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselButton
          onClick={prevSlide}
          sx={{ left: 0, top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}
        >
          <ChevronLeftIcon sx={{ fontSize: 36 }} />
        </CarouselButton>

        <Box sx={{ overflow: 'hidden', px: 6, width: '100%' }}>
          <Fade in={fadeIn} timeout={300}>
            <div>
              <CarouselTrack
                sx={{
                  minWidth: '100%',
                  width: `calc(100% * ${extendedDeals.length / visibleCount})`,
                  transform: `translateX(-${(currentIndex * (100 / extendedDeals.length))}%)`,
                  transition: (isTransitioning || fadeIn) ? 'transform 0.5s cubic-bezier(.4,2,.6,1)' : 'none',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {extendedDeals.map((deal, idx) => (
                  <CarouselCard key={idx}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={deal.image}
                        alt={deal.title}
                      />
                      <PriceChip label={`from ${deal.price}pp`} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="h3" 
                      gutterBottom sx={{ 
                       // color:'rgb(255,255,255)',
                        fontWeight: 'bold' ,
                        fontSize:'1.2rem'}}>
                        {deal.title}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <LocationOnIcon color="primary" fontSize="small" />
                        <Typography variant="body2" color="text.secondary" sx={{fontSize:'1rem'}}>
                          {deal.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <FlightIcon color="primary" fontSize="small" />
                        <Typography variant="body2" color="text.secondary" sx={{fontSize:'1rem'}}>
                          {deal.duration} • {deal.board}
                        </Typography>
                      </Stack>
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        sx={{ 
                          fontWeight: 'bold', 
                          mb: 2,
                          backgroundColor: 'primary.light',
                          
                          //color: 'primary.dark',
                          color:'rgb(255,255,255)',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.8rem',
                        }}
                      >
                        {deal.deal}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          sx={{ 
                            textTransform: 'none',
                            fontWeight: 'bold',
                          }}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </CardContent>
                  </CarouselCard>
                ))}
              </CarouselTrack>
            </div>
          </Fade>
        </Box>

        <CarouselButton
          onClick={nextSlide}
          sx={{ right: 0, top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}
        >
          <ChevronRightIcon sx={{ fontSize: 36 }} />
        </CarouselButton>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
  <Button 
    variant="outlined" 
    size="large"
    color="secondary"
    sx={{ 
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '1.25rem', 
      px: 5,
      bgcolor: '#004080',         // ✅ Background color
      color:'rgba(243, 242, 238, 1)',              //  Text color
      borderColor: '#004080',     //  Border color (optional, matches background)
      '&:hover': {
        bgcolor: '#003366',       //  Hover background color
        borderColor: '#003366',   //  Hover border color
        color: '#fff',            //  Keep text white on hover
      },
    }}
  >
    Browse All Holiday Offers
  </Button>
</Box>

    </CarouselContainer>
  );
}; 