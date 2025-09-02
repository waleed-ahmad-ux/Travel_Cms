import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Container,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CarouselContainer = styled(Box)({
  position: 'relative',
  height: '70vh',
  minHeight: 500,
  overflow: 'hidden',
});

const SlideContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: 'opacity 1s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
    zIndex: 1,
  },
});

const SlideContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  color: 'white',
  maxWidth: 600,
  padding: theme.spacing(4),
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: theme.palette.primary.main,
  zIndex: 3,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: 'translateY(-50%) scale(1.1)',
  },
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: theme.palette.primary.main,
  zIndex: 3,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));

const IndicatorContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 3,
}));

const Indicator = styled(Box)<{ active: boolean }>(({ active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? 'white' : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: active ? 'white' : 'rgba(255, 255, 255, 0.8)',
    transform: 'scale(1.2)',
  },
}));

const slides = [
  {
    title: 'Explore Hong Kong',
    location: 'Hong Kong, Asia',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    cta: 'Discover Hong Kong',
  },
  {
    title: 'Caribbean Bliss in Antigua',
    location: 'Antigua, Caribbean',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5',
    cta: 'See Antigua',
  },
  {
    title: 'Greek Island Magic',
    location: 'Greece, Europe',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    cta: 'Explore Greece',
  },
  {
    title: 'Experience UAE',
    location: 'UAE, Middle East',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    cta: 'Visit UAE',
  },
];

export const HeroImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <CarouselContainer>
      {slides.map((slide, index) => (
        <SlideContainer
          key={index}
          sx={{
            backgroundImage: `url(${slide.imageUrl})`,
            opacity: index === currentSlide ? 1 : 0,
          }}
        >
          <Container maxWidth="lg" disableGutters>
            <SlideContent>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                {slide.title}
              </Typography>

              <Typography
                variant="h5"
                sx={{ mb: 3, opacity: 0.9, fontWeight: 300 }}
              >
                {slide.location}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {slide.location}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 6,
                  },
                }}
              >
                {slide.cta}
              </Button>
            </SlideContent>
          </Container>
        </SlideContainer>
      ))}

      <CarouselButton onClick={prevSlide} sx={{ left: { xs: 16, md: 32 } }}>
        <ChevronLeftIcon />
      </CarouselButton>

      <CarouselButton onClick={nextSlide} sx={{ right: { xs: 16, md: 32 } }}>
        <ChevronRightIcon />
      </CarouselButton>

      <ControlButton onClick={toggleAutoPlay}>
        {isAutoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </ControlButton>

      <IndicatorContainer>
        {slides.map((_, index) => (
          <Indicator
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </IndicatorContainer>
    </CarouselContainer>
  );
};
