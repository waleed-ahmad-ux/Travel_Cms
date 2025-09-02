// FeaturedDestinationsGrid: Displays a grid of hand-picked featured travel destinations
import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { assetMap } from '../assets/assetMap';

// Array of featured destinations, each with title, location, image/video, CTA, and description
const destinations = [
  {
    title: 'Explore Maldives',
    location: 'Maldives, Asia',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    cta: 'Discover Maldives',
    description: 'Crystal-clear waters, white sandy beaches, and luxury resorts await you in the Maldives.',
  },
  {
    title: 'Caribbean Bliss in Antigua',
    location: 'Antigua, Caribbean',
    imageUrl: assetMap["anti.jpeg"], // Use S3 asset
    cta: 'See Antigua',
    description: 'Experience vibrant culture, stunning beaches, and year-round sunshine in Antigua.',
  },
  {
    title: 'Experience UAE',
    location: 'Dubai, Middle East',
    imageUrl: assetMap["1.jpeg"], // Use S3 asset
    cta: 'Visit UAE',
    description: 'Discover futuristic skylines, luxury shopping, and desert adventures in the UAE.',
  },
  // Duplicate Maldives entry for demonstration (can be removed or replaced)
  {
    title: 'Explore Maldives',
    location: 'Maldives, Asia',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    cta: 'Discover Maldives',
    description: 'Crystal-clear waters, white sandy beaches, and luxury resorts await you in the Maldives.',
  },
];

// Main component: renders a grid of destination cards
const FeaturedDestinationsGrid: React.FC = () => {
  return (
    // Outer container with padding
    <Box sx={{ pt: 4, pb: 8 }}> 
      {/* Section title and subtitle */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize:'2.25rem',
            textTransform: 'uppercase',
            color: 'rgb(255, 183, 3)',
            letterSpacing: 1,
            position: 'relative',
            display: 'inline-block'
          }}
        >
          Featured Destinations
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'rgb(255, 183, 3)',
            mt: 2,
            fontWeight: 700,
            fontSize: '1.25rem',
          }}
        >
          Hand-picked escapes across the world, curated for your luxury journey
        </Typography>
      </Box>
      {/* Grid of destination cards */}
      <Grid container spacing={4} justifyContent="center">
        {destinations.map((dest, idx) => (
          <Grid item xs={12} sm={8} md={4} lg={3} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{
              width: { xs: '100%', sm: 320, md: 300 },
              maxWidth: 340,
              height: 440,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 6,
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'grey.200',
              transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.045)',
                boxShadow: 12,
                borderColor: 'primary.main',
              },
            }}>
              {/* Use video for Maldives, image for others, with gradient overlay */}
              <Box sx={{ position: 'relative', height: 220, width: '100%', overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                {/* If destination is Maldives, show video, else show image */}
                {dest.title === 'Explore Maldives' ? (
                  <video
                    src={assetMap["1.mov"]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="220"
                    image={dest.imageUrl}
                    alt={dest.title}
                    sx={{ objectFit: 'cover', height: 220, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  />
                )}
                {/* Gradient overlay for better text visibility */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.65) 100%)',
                  pointerEvents: 'none',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }} />
                {/* Destination title over image/video */}
                <Typography variant="h5" fontWeight="bold" sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  color: 'white',
                  zIndex: 2,
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  fontSize: '1.4rem' 
                }}>
                  {dest.title}
                </Typography>
              </Box>
              {/* Card content: location and description */}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', pt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ 
                     color: 'rgba(231, 184, 53, 1)',
                    mr: 1 }} />
                  <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 500, fontSize: '1.2rem' }}>
                    {dest.location}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48, fontSize: '1.1rem', fontWeight: 'normal' }}>
                  {dest.description}
                </Typography>
              </CardContent>
              {/* Card actions: CTA button */}
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  endIcon={<LocationOnIcon sx={{ 
                    color: 'rgba(231, 184, 53, 1)'
                     }} />}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'scale(1.04)',
                      boxShadow: 6,
                    },
                  }}
                >
                  {dest.cta}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedDestinationsGrid; 