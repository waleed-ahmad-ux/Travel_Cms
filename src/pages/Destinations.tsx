import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {     Box, 
  Container, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SearchForm } from '../components/SearchForm2';
import { destinations, searchDestinations } from '../services/destinationService';
import type { Destination } from '../types';

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 2),
  marginBottom: theme.spacing(6),
  position: 'relative',
}));

const regions = ['Asia', 'Caribbean', 'Europe', 'Middle East'];

export const Destinations = () => {
  const navigate = useNavigate();  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Handle region filter
    const regionParam = params.get('region');
    if (regionParam) {
      setSelectedRegion(regionParam);
    }
    
    // Handle specific destination
    const destinationParam = params.get('destination');
    if (destinationParam) {
      setSearchQuery(destinationParam);
    }
    
    // Handle hotel filter
    const hotelParam = params.get('hotel');
    if (hotelParam) {
      setSearchQuery(hotelParam.replace(' hotels', ''));
      setSelectedRegion('hotels');
    }
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    const results = searchDestinations(
      searchQuery,
      selectedRegion || undefined
    );
    setFilteredDestinations(results);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedRegion]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <Box>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2000,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <HeaderSection>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 3 }}>
            Explore Destinations
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Find your perfect getaway among our handpicked destinations
          </Typography>
          <Box sx={{ mt: 4 }}>
            <SearchForm onSearch={handleSearch} />
          </Box>
        </Container>
      </HeaderSection>

      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filter by Region
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {regions.map((region) => (
              <Chip
                key={region}
                label={region}
                onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                color={region === selectedRegion ? 'primary' : 'default'}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Box>        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {filteredDestinations.map((destination) => (<Box key={destination.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1.5 }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
                onClick={() => navigate(`/destination/${destination.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.imageUrl}
                  alt={destination.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {destination.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {destination.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Chip label={destination.region} size="small" />
                  </Box>
                </CardContent>              </Card>
            </Box>          ))}
        </Box>
      </Container>
    </Box>
  );
};
