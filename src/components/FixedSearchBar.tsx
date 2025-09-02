import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Autocomplete,
  InputAdornment,
  Slide,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const airports = {
  London: [
    'All London',
    'London Heathrow',
    'London Gatwick',
    'London City',
    'London Stansted'
  ],
  North: [
    'Manchester',
    'Leeds / Bradford',
    'Teeside',
    'Humberside',
    'Newcastle'
  ],
  Midlands: [
    'Birmingham',
    'Norwich'
  ],
  Scotland: [
    'Aberdeen',
    'Edinburgh',
    'Glasgow'
  ],
  Southwest: [
    'Bristol',
    'Cardiff',
    'Exeter',
    'Newquay'
  ],
  South: [
    'Guernsey',
    'Jersey',
    'Southampton'
  ],
  'Northern Ireland': [
    'Belfast',
    'Belfast City'
  ]
};

const popularDestinations = [
  // Asia
  { name: 'Hong Kong', region: 'Asia' },
  { name: 'Indonesia', region: 'Asia' },
  { name: 'Malaysia', region: 'Asia' },
  { name: 'Singapore', region: 'Asia' },
  { name: 'Thailand', region: 'Asia' },
  // Caribbean
  { name: 'Antigua', region: 'Caribbean' },
  { name: 'Bahamas', region: 'Caribbean' },
  { name: 'Cuba', region: 'Caribbean' },
  { name: 'Jamaica', region: 'Caribbean' },
  { name: 'St Lucia', region: 'Caribbean' },
  { name: 'Trinidad and Tobago', region: 'Caribbean' },
  // Europe
  { name: 'Cyprus', region: 'Europe' },
  { name: 'Greece', region: 'Europe' },
  { name: 'Malta', region: 'Europe' },
  { name: 'Portugal', region: 'Europe' },
  { name: 'Spain', region: 'Europe' },
  { name: 'Tenerife', region: 'Europe' },
  { name: 'Türkiye', region: 'Europe' },
  // Middle East
  { name: 'UAE', region: 'Middle East' },
];

export const FixedSearchBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [destination, setDestination] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.6; // Show when 60% of viewport height is scrolled
      setIsVisible(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    navigate('/destinations', {
      state: {
        destination,
        departureAirport,
        departureDate,
      },
    });
  };

  return (
    <>
      <Slide direction="down" in={isVisible} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
            boxShadow: 3,
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: 'transparent',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '2fr 2fr 1fr 1fr',
                  md: '2fr 2fr 1fr 1fr auto',
                },
                alignItems: 'center',
                maxWidth: 'lg',
                mx: 'auto',
              }}
            >
              <Autocomplete
                freeSolo
                options={popularDestinations}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') return option;
                  return option.name;
                }}
                groupBy={(option) => {
                  if (typeof option === 'string') return '';
                  return option.region;
                }}
                value={destination}
                onChange={(_, newValue) => {
                  if (typeof newValue === 'string') {
                    setDestination(newValue);
                  } else if (newValue) {
                    setDestination(newValue.name);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Destination"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon color="action" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Autocomplete
                options={Object.entries(airports).flatMap(([region, cities]) => 
                  cities.map(city => ({ region, city }))
                )}
                groupBy={(option) => option.region}
                getOptionLabel={(option) => option.city}
                value={departureAirport ? { region: '', city: departureAirport } : undefined}
                onChange={(_, newValue) => setDepartureAirport(newValue?.city || '')}
                sx={{
                  '& .MuiAutocomplete-groupLabel': {
                    color: theme.palette.primary.dark,
                    fontWeight: 700,
                    background: 'transparent',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: theme.palette.primary.light,
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Fly from"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightTakeoffIcon color="action" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="When?"
                  value={departureDate}
                  onChange={(newValue) => setDepartureDate(newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                    },
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Nights"
                type="number"
                defaultValue="7"
                size="small"
                InputProps={{
                  inputProps: { min: 1, max: 30 },
                }}
              />

              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{
                  minWidth: 'auto',
                  px: 3,
                  height: 40,
                }}
              >
                Search
              </Button>
            </Box>
          </Paper>
        </Box>
      </Slide>
      
      {/* Spacer to prevent content from being hidden behind fixed search bar */}
      {isVisible && (
        <Box sx={{ height: 80, display: { xs: 'none', sm: 'none', md: 'block' } }} />
      )}
    </>
  );
}; 