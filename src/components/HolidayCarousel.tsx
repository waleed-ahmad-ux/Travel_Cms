import { useState, useEffect, useRef } from 'react';
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
  useTheme,
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
  padding: theme.spacing(6, 0),
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  perspective: '1200px',
  transformStyle: 'preserve-3d',
}));

const CarouselTrack = styled(Box)(() => ({
  display: 'flex',
  transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gap: 32,
  willChange: 'transform',
  transformStyle: 'preserve-3d',
}));

const CarouselCard = styled(Card)(({  }) => ({
  minWidth: 350,
  maxWidth: 400,
  height: 480,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: 20,
  border: 'none',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: `
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
  `,
  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  transform: 'rotateX(5deg) rotateY(-5deg) translateZ(0px)',
  '&:hover': {
    transform: 'rotateX(0deg) rotateY(0deg) translateY(-20px) translateZ(20px) scale(1.05)',
    boxShadow: `
      0 30px 60px rgba(0, 0, 0, 0.2),
      0 15px 30px rgba(0, 0, 0, 0.1),
      inset 0 2px 0 rgba(255, 255, 255, 0.9),
      inset 0 -2px 0 rgba(0, 0, 0, 0.1)
    `,
    '& .card-image': {
      transform: 'scale(1.1) rotateX(-2deg)',
    },
    '& .card-content': {
      background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
      transform: 'translateZ(10px)',
    },
    '& .card-glow': {
      opacity: 1,
      transform: 'scale(1.1)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    borderRadius: 20,
    zIndex: 1,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    opacity: 0,
    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    zIndex: 0,
    pointerEvents: 'none',
  },
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%) translateZ(0px)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: theme.palette.primary.main,
  zIndex: 10,
  width: 64,
  height: 64,
  borderRadius: '50%',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: `
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
  `,
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transformStyle: 'preserve-3d',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-50%) translateZ(10px) scale(1.15) rotateY(5deg)',
    boxShadow: `
      0 20px 50px rgba(0, 0, 0, 0.25),
      0 8px 20px rgba(0, 0, 0, 0.15),
      inset 0 2px 0 rgba(255, 255, 255, 0.3),
      inset 0 -2px 0 rgba(0, 0, 0, 0.2)
    `,
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: theme.palette.text.disabled,
    transform: 'translateY(-50%) translateZ(0px)',
  },
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: 16,
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: `
    0 8px 24px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  zIndex: 3,
  transform: 'translateZ(5px)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  '&:hover': {
    transform: 'translateZ(8px) scale(1.05)',
    boxShadow: `
      0 12px 32px rgba(0, 0, 0, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.3)
    `,
  },
}));

const DotIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(4),
}));

const Dot = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  width: active ? 16 : 10,
  height: active ? 16 : 10,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  cursor: 'pointer',
  transform: active ? 'translateZ(5px)' : 'translateZ(0px)',
  boxShadow: active 
    ? `
        0 8px 20px rgba(0, 0, 0, 0.2),
        0 2px 8px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3)
      `
    : '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[600],
    transform: active ? 'translateZ(8px) scale(1.3)' : 'translateZ(3px) scale(1.2)',
    boxShadow: `
      0 12px 28px rgba(0, 0, 0, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 2px 0 rgba(255, 255, 255, 0.4)
    `,
  },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
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

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
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
        ref={carouselRef}
        sx={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: 520 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselButton
          onClick={prevSlide}
          disabled={isTransitioning}
          sx={{ left: 16 }}
        >
          <ChevronLeftIcon sx={{ fontSize: 28 }} />
        </CarouselButton>

        <Box sx={{ overflow: 'hidden', px: 8, width: '100%' }}>
          <CarouselTrack
            sx={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            }}
          >
            {holidayDeals.map((deal, index) => (
              <CarouselCard 
                key={deal.id} 
                sx={{ 
                  flex: `0 0 ${100 / visibleCount}%`,
                  transform: `rotateX(${5 - (index - currentIndex) * 2}deg) rotateY(${-5 + (index - currentIndex) * 3}deg) translateZ(${(index - currentIndex) * -10}px)`,
                  opacity: index === currentIndex ? 1 : 0.7,
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={deal.image}
                    alt={deal.title}
                    className="card-image"
                    sx={{
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      objectFit: 'cover',
                      transform: 'translateZ(0px)',
                    }}
                  />
                  <Box 
                    className="card-glow"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                      opacity: 0,
                      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      zIndex: 1,
                    }}
                  />
                  <PriceChip label={`from ${deal.price}pp`} />
                </Box>
                <CardContent 
                  className="card-content"
                  sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    p: 3,
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: 'translateZ(0px)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: theme.palette.grey[800],
                      lineHeight: 1.3,
                    }}
                  >
                    {deal.title}
                  </Typography>
                  
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <LocationOnIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                      {deal.location}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <FlightIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                      {deal.duration} • {deal.board}
                    </Typography>
                  </Stack>
                  
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      mb: 2,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {deal.deal}
                  </Box>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        py: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                        boxShadow: `
                          0 8px 20px rgba(0, 0, 0, 0.2),
                          0 2px 8px rgba(0, 0, 0, 0.1),
                          inset 0 1px 0 rgba(255, 255, 255, 0.2)
                        `,
                        transform: 'translateZ(0px)',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                          transform: 'translateY(-4px) translateZ(5px) scale(1.02)',
                          boxShadow: `
                            0 12px 28px rgba(0, 0, 0, 0.3),
                            0 4px 12px rgba(0, 0, 0, 0.15),
                            inset 0 2px 0 rgba(255, 255, 255, 0.3)
                          `,
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </CarouselCard>
            ))}
          </CarouselTrack>
        </Box>

        <CarouselButton
          onClick={nextSlide}
          disabled={isTransitioning}
          sx={{ right: 16 }}
        >
          <ChevronRightIcon sx={{ fontSize: 28 }} />
        </CarouselButton>
      </Box>

      {/* Dot Indicators */}
      <DotIndicator>
        {holidayDeals.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotIndicator>

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