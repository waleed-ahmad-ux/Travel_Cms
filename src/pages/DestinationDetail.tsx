import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Rating, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CardMedia,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FlightIcon from '@mui/icons-material/Flight';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getDestinationById, destinations } from '../services/destinationService';
import { searchHotels } from '../services/hotelService';
import { useState, useEffect } from 'react';

const HeaderImage = styled(Box)({
  height: '50vh',
  width: '100%',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

interface EnhancedDestinationDetail {
  weather: {
    averageTemp: string;
    rainfall: string;
    sunshine: string;
    drySeason: string;
    wetSeason: string;
  };
  attractions: string[];
  food: string[];
  practicalInfo: {
    location: string;
    hurricaneSeason: string;
    plugs: string;
    bestAreas: {
      westCoast: string;
      southCoast: string;
    };
  };
}

// Enhanced destination data with additional information
const destinationDetails: Record<string, EnhancedDestinationDetail> = {
  // Dynamically generate placeholder data for all destinations
  ...destinations.reduce((acc, dest) => {
    acc[dest.id] = {
      weather: {
        averageTemp: `Average temperature in ${dest.name} is generally pleasant.`,
        rainfall: `Rainfall varies by season in ${dest.name}.`,
        sunshine: `Enjoy plenty of sunshine in ${dest.name}.`,
        drySeason: `The dry season in ${dest.name} is ideal for visiting.`,
        wetSeason: `The wet season in ${dest.name} might have occasional showers.`,
      },
      attractions: [
        `Explore unique landmarks in ${dest.name}`,
        `Visit natural wonders in ${dest.name}`,
        `Discover cultural sites in ${dest.name}`,
        `Enjoy outdoor activities in ${dest.name}`,
      ],
      food: [
        `Try local delicacies in ${dest.name}`,
        `Savor traditional dishes of ${dest.name}`,
        `Experience the vibrant food scene in ${dest.name}`,
      ],
      practicalInfo: {
        location: `${dest.name} is located in the ${dest.region} region.`,
        hurricaneSeason: `Hurricane season for ${dest.name} (if applicable) is typically from June to November.`,
        plugs: `Check local plug types and voltage for ${dest.name}.`,
        bestAreas: {
          westCoast: `West coast of ${dest.name} offers serene experiences.`,
          southCoast: `South coast of ${dest.name} has vibrant activities.`,
        },
      },
    };
    return acc;
  }, {} as Record<string, EnhancedDestinationDetail>),
};

export const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = getDestinationById(id || '');
  const enhancedDetails = destinationDetails[id as keyof typeof destinationDetails];

  const [hotelSearchQuery, setHotelSearchQuery] = useState('');
  const [minHotelRating, setMinHotelRating] = useState<number | null>(null);
  const [filteredHotels, setFilteredHotels] = useState(() => searchHotels(id || '', '', null, ''));

  useEffect(() => {
    if (id) {
      setFilteredHotels(searchHotels(id, hotelSearchQuery, minHotelRating, hotelSearchQuery));
    }
  }, [id, hotelSearchQuery, minHotelRating]);

  const handleHotelSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHotelSearchQuery(event.target.value);
  };

  const handleRatingFilterChange = (rating: number) => {
    setMinHotelRating(prevRating => (prevRating === rating ? null : rating));
  };

  if (!destination) {
    return (
      <Container>
        <Typography variant="h4">Destination not found</Typography>
        <Button onClick={() => navigate('/destinations')}>Back to Destinations</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <HeaderImage
        sx={{
          backgroundImage: `url(${destination.imageUrl})`,
        }}
      >
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography variant="h2" color="white" gutterBottom>
            {destination.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<PlaceIcon />}
              label={destination.region}
              sx={{ bgcolor: 'primary.main', color: 'white' }}
            />
          </Box>
        </Container>
      </HeaderImage>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              About {destination.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {destination.description}
            </Typography>

            {enhancedDetails && (
              <>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WbSunnyIcon />
                      <Typography variant="h6">Weather & Climate</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold">Average Temperature</Typography>
                        <Typography variant="body2">{enhancedDetails.weather.averageTemp}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold">Annual Rainfall</Typography>
                        <Typography variant="body2">{enhancedDetails.weather.rainfall}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold">Sunshine Hours</Typography>
                        <Typography variant="body2">{enhancedDetails.weather.sunshine}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold">Best Time to Visit</Typography>
                        <Typography variant="body2">{enhancedDetails.weather.drySeason}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BeachAccessIcon />
                      <Typography variant="h6">Top Attractions</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {enhancedDetails.attractions.map((attraction: string, index: number) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <PlaceIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={attraction} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RestaurantIcon />
                      <Typography variant="h6">Food & Drink</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {enhancedDetails.food.map((foodItem: string, index: number) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <RestaurantIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={foodItem} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlightIcon />
                      <Typography variant="h6">Practical Information</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">Location</Typography>
                        <Typography variant="body2">{enhancedDetails.practicalInfo.location}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">Hurricane Season</Typography>
                        <Typography variant="body2">{enhancedDetails.practicalInfo.hurricaneSeason}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">Plugs & Voltage</Typography>
                        <Typography variant="body2">{enhancedDetails.practicalInfo.plugs}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">Best Areas to Stay</Typography>
                        <Typography variant="body2">
                          West Coast: {enhancedDetails.practicalInfo.bestAreas.westCoast}
                        </Typography>
                        <Typography variant="body2">
                          South Coast: {enhancedDetails.practicalInfo.bestAreas.southCoast}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Hotels in {destination.name}
              </Typography>
              <TextField
                label="Search hotels"
                variant="outlined"
                fullWidth
                size="small"
                value={hotelSearchQuery}
                onChange={handleHotelSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaceIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle1" gutterBottom>Filter by Rating:</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                {[5, 4, 3].map(rating => (
                  <FormControlLabel
                    key={rating}
                    control={
                      <Checkbox
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                        checked={minHotelRating === rating}
                        onChange={() => handleRatingFilterChange(rating)}
                      />
                    }
                    label={`${rating} Stars & Up`}
                  />
                ))}
              </Box>

              {filteredHotels.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredHotels.map((hotel) => (
                    <Grid item xs={12} key={hotel.id}>
                      <Card variant="outlined">
                        <CardMedia
                          component="img"
                          height="140"
                          image={hotel.imageUrl}
                          alt={hotel.name}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {hotel.name}
                          </Typography>
                          <Rating value={hotel.rating} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary">
                            {hotel.location}
                          </Typography>
                          <Typography variant="body1" color="primary.main" fontWeight="bold">
                            £{hotel.pricePerNight} / night
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            {hotel.offers}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hotels found matching your criteria.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
