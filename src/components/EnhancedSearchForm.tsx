// EnhancedSearchForm: A comprehensive search form for flights, hotels, and twin-centre holidays
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Popover,
  Stack,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SearchIcon from '@mui/icons-material/Search';
//import PersonIcon from '@mui/icons-material/Person';
//import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
//import ChildCareIcon from '@mui/icons-material/ChildCare';
//import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
//import logoPng from '../assets/logo.png';
//import reactSvg from '../assets/react.svg';
//import { keyframes } from '@mui/system';
//import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// List of airport options grouped by region
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

// List of popular destinations grouped by region
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

// Cabin class options
const cabinClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

// Keyframes for dynamic animation (not currently used in this file)

// Main EnhancedSearchForm component
// Add forceMobile to props
export interface EnhancedSearchFormProps {
  fixedDestination?: string;
  forceMobile?: boolean;
}

// Props for renderFormContent helper
interface RenderFormContentProps {
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  handleSearchTypeChange: (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => void;
  fixedDestination?: string;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  destination2: string;
  setDestination2: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  departureAirport: string;
  setDepartureAirport: React.Dispatch<React.SetStateAction<string>>;
  cabinClass: string;
  setCabinClass: React.Dispatch<React.SetStateAction<string>>;
  departureDate: Date | null;
  setDepartureDate: React.Dispatch<React.SetStateAction<Date | null>>;
  nights: string;
  setNights: React.Dispatch<React.SetStateAction<string>>;
  nights2: string;
  setNights2: React.Dispatch<React.SetStateAction<string>>;
  directFlights: boolean;
  setDirectFlights: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: number;
  setRooms: React.Dispatch<React.SetStateAction<number>>;
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  anchorEl: null | HTMLElement;
  openGuest: boolean;
  handleGuestClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleGuestClose: () => void;
  guestSummary: string;
  handleChildrenChange: (newChildren: number) => void;
  childAges: number[];
  setChildAges: React.Dispatch<React.SetStateAction<number[]>>;
  handleSearch: () => void;
}

export const EnhancedSearchForm: React.FC<EnhancedSearchFormProps> = ({ fixedDestination, forceMobile }) => {
  const navigate = useNavigate();
  // State variables for form fields
  const [searchType, setSearchType] = useState('flight-hotel'); // Type of search (flight+hotel, hotel-only, twin-centres)
  const [destination, setDestination] = useState(fixedDestination || ''); // Main destination
  const [destination2, setDestination2] = useState(''); // Second destination (for twin-centres)
  const [departureAirport, setDepartureAirport] = useState(''); // Selected departure airport
  const [cabinClass, setCabinClass] = useState(''); // Selected cabin class
  const [departureDate, setDepartureDate] = useState<Date | null>(null); // Departure date
  const [nights, setNights] = useState('7'); // Number of nights for main destination
  const [nights2, setNights2] = useState('7'); // Number of nights for second destination
  const [directFlights, setDirectFlights] = useState(false); // Direct flights only toggle
  const [rooms, setRooms] = useState(1); // Number of rooms
  const [adults, setAdults] = useState(2); // Number of adults
  const [children, setChildren] = useState(0); // Number of children
  const [open, setOpen] = useState(false); // Autocomplete open state for destination
  const [open2, setOpen2] = useState(false); // Autocomplete open state for destination2
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Anchor for guest popover
  const [childAges, setChildAges] = useState<number[]>([]); // Ages of children
  const [showOverlay, setShowOverlay] = useState(false); // For mobile overlay

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTabletPortrait = useMediaQuery('(min-width:768px) and (max-width:1366px) and (orientation:portrait)');
  // Use forceMobile if provided, otherwise fallback to media queries
  const showMobile = forceMobile ?? (isMobile || isTabletPortrait);

  // Prevent background scrolling when overlay is open
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showOverlay]);

  // Handle search type toggle (flight+hotel, hotel-only, twin-centres)
  const handleSearchTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setSearchType(newValue);
    }
  };

  // Handle the search button click: navigate to /destinations with search state
  const handleSearch = () => {
    navigate('/destinations', {
      state: {
        searchType,
        destination,
        destination2,
        departureAirport,
        cabinClass,
        departureDate,
        nights,
        nights2,
        directFlights,
        rooms,
        adults,
        children,
      },
    });
  };

  // Handlers for guest/room popover
  const handleGuestClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGuestClose = () => {
    setAnchorEl(null);
  };
  const openGuest = Boolean(anchorEl);

  // Helper to summarize guest/room selection for display
  const guestSummary = `${adults} adult${adults !== 1 ? 's' : ''}, ${children} child${children !== 1 ? 'ren' : ''}, ${rooms} room${rooms !== 1 ? 's' : ''}`;

  // Handle changes in number of children and update child ages array
  const handleChildrenChange = (newChildren: number) => {
    if (newChildren > children) {
      setChildAges([...childAges, 2]); // default age 2
    } else if (newChildren < children) {
      setChildAges(childAges.slice(0, newChildren));
    }
    setChildren(newChildren);
  };

  // Helper to render the main form content (to avoid code duplication)
  function renderFormContent({
    searchType,
    setSearchType,
    handleSearchTypeChange,
    fixedDestination,
    destination,
    setDestination,
    destination2,
    setDestination2,
    open,
    setOpen,
    open2,
    setOpen2,
    departureAirport,
    setDepartureAirport,
    cabinClass,
    setCabinClass,
    departureDate,
    setDepartureDate,
    nights,
    setNights,
    nights2,
    setNights2,
    directFlights,
    setDirectFlights,
    rooms,
    setRooms,
    adults,
    setAdults,
    children,
    setChildren,
    anchorEl,
    openGuest,
    handleGuestClick,
    handleGuestClose,
    guestSummary,
    handleChildrenChange,
    childAges,
    setChildAges,
    handleSearch
  }: RenderFormContentProps) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 'none',
          bgcolor: 'transparent',
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          m: 0,
        }}
      >
        {/* Toggle between search types */}
        {/* Mobile: show as separate buttons in a single horizontal line with solid backgrounds */}
        <Box sx={{ 
          display: { xs: 'block', md: 'none' }, 
          width: '100%', mb: 2,
          '@media (max-width:1024px)': { display: 'block' },
          '@media (min-width:1025px)': { display: 'none' }
        }}>
          <Stack direction="row" spacing={0.5} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant={searchType === 'flight-only' ? 'contained' : 'outlined'}
              color="primary"
              sx={{
                minWidth: 80,
                bgcolor: searchType === 'flight-only' ? 'primary.main' : 'white',
                color: searchType === 'flight-only' ? 'white' : 'primary.main',
                borderColor: 'primary.main',
                fontWeight: 700,
                fontSize: 12,
                py: 1,
                flexDirection: 'row',
                gap: 0.3,
                boxShadow: 'none',
                borderRadius: 99,
                '&:hover': {
                  bgcolor: searchType === 'flight-only' ? 'primary.dark' : '#f0f0f0',
                },
              }}
              startIcon={<FlightTakeoffIcon />}
              onClick={() => setSearchType('flight-only')}
            >
              Flight & Hotels
            </Button>
            <Button
              variant={searchType === 'hotel-only' ? 'contained' : 'outlined'}
              color="primary"
              sx={{
                minWidth: 80,
                bgcolor: searchType === 'hotel-only' ? 'primary.main' : 'white',
                color: searchType === 'hotel-only' ? 'white' : 'primary.main',
                borderColor: 'primary.main',
                fontWeight: 700,
                fontSize: 12,
                py: 1,
                flexDirection: 'row',
                gap: 0.3,
                boxShadow: 'none',
                borderRadius: 99,
                '&:hover': {
                  bgcolor: searchType === 'hotel-only' ? 'primary.dark' : '#f0f0f0',
                },
              }}
              startIcon={<HotelIcon />}
              onClick={() => setSearchType('hotel-only')}
            >
              Hotels Only
            </Button>
          </Stack>
        </Box>
        {/* Desktop: keep ToggleButtonGroup as before */}
        <Box sx={{ 
          display: { xs: 'none', md: 'block' }, 
          width: 'auto', mx: 'auto',
          '@media (max-width:1024px)': { display: 'none' },
          '@media (min-width:1025px)': { display: 'block' }
        }}>
          <ToggleButtonGroup
            value={searchType}
            exclusive
            onChange={handleSearchTypeChange}
            aria-label="search type"
            sx={{
              mb: 2,
              bgcolor: '#3451a1',
              borderRadius: 99,
              boxShadow: 1,
              alignSelf: 'center',
              textAlign: 'center',
              flexDirection: 'row',
              width: 'auto',
              '& .MuiToggleButton-root': {
                borderRadius: 99,
                fontWeight: 700,
                fontSize: 16,
                px: 3,
                py: 1,
                border: 'none',
                color: 'white',
                justifyContent: 'center',
                gap: 1,
                '&.Mui-selected': {
                  bgcolor: '#3451a1',
                  color: 'white',
                },
                '&:hover': {
                  bgcolor: '#4666c5',
                },
              },
            }}
          >
            {/* Flight & Hotel option */}
            <ToggleButton value="flight-hotel" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightTakeoffIcon sx={{ mr: 1 }} /> Flight & Hotel
            </ToggleButton>
            {/* Flight Only option */}
            <ToggleButton value="flight-only" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightTakeoffIcon sx={{ mr: 1 }} /> Flight Only
            </ToggleButton>
            {/* Hotels Only option */}
            <ToggleButton value="hotel-only" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HotelIcon sx={{ mr: 1 }} /> Hotels Only
            </ToggleButton>
            {/* Twin Centres option */}
            <ToggleButton value="twin-centres" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationCityIcon sx={{ mr: 1 }} /> Twin Centres
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {/* Main form row: destination, airport, class, date, nights, guests */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 1 }} // Slightly decreased vertical spacing for mobile
            alignItems={{ xs: 'stretch', md: 'flex-end' }}
            justifyContent="center"
            sx={{
              width: '100%',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              overflowX: { xs: 'visible', md: 'auto' },
              pb: 1,
              justifyContent: 'center',
              display: 'flex',
              gap: 0,
              '@media (max-width:1024px)': { flexDirection: 'column' },
              '@media (min-width:1025px)': { flexDirection: 'row' }
            }}
          >
            {/* Destination Autocomplete */}
            <Box sx={{ width: { xs: '90%', md: 220 }, mb: { xs: 1, md: 0 }, mx: { xs: 'auto', md: 0 } }}>
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase', fontSize: 13 }}>Destination</Typography>
              <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                freeSolo
                options={popularDestinations}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                groupBy={(option) => (typeof option === 'string' ? '' : option.region)}
                value={destination}
                onChange={(_, newValue) => {
                  if (fixedDestination) return; // Do not allow change if fixed
                  if (typeof newValue === 'string') setDestination(newValue);
                  else if (newValue) setDestination(newValue.name);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Destination/hotel name"
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'white',
                      width: '100%',
                      height: '56px',
                      boxShadow: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontSize: 16,
                        height: '56px',
                        bgcolor: 'white',
                        color: 'black',
                        fontWeight: 700,
                        '& .MuiOutlinedInput-input': {
                          color: 'black',
                          fontWeight: 700,
                          '::placeholder': {
                            color: 'black',
                            opacity: 1,
                          },
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'black',
                        fontWeight: 700,
                        '::placeholder': {
                          color: 'black',
                          opacity: 1,
                        },
                      },
                      '& input::placeholder': {
                        color: 'black',
                        opacity: 1,
                      },
                    }}
                    inputProps={{ ...params.inputProps, style: { 
                      padding: '12px 14px',
                       fontSize: 16 ,
                       color: 'black',
                       textAlign: 'left'
                    } }}
                  />
                )}
                PaperComponent={(props) => <Paper {...props} elevation={3} />}
                popupIcon={undefined}
                forcePopupIcon={true}
              />
            </Box>
            {/* Destination 2 for twin-centres */}
            {searchType === 'twin-centres' && (
              <Box sx={{ width: { xs: '90%', md: 220 }, mb: { xs: 1, md: 0 }, mx: { xs: 'auto', md: 0 } }}>
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase', fontSize: 13 }}>Destination 2</Typography>
                <Autocomplete
                  open={open2}
                  onOpen={() => setOpen2(true)}
                  onClose={() => setOpen2(false)}
                  freeSolo
                  options={popularDestinations}
                  getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                  groupBy={(option) => (typeof option === 'string' ? '' : option.region)}
                  value={destination2}
                  onChange={(_, newValue) => {
                    if (typeof newValue === 'string') setDestination2(newValue);
                    else if (newValue) setDestination2(newValue.name);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Destination/hotel name"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        bgcolor: 'white',
                        width: '100%',
                        height: '56px',
                        boxShadow: 2,
                        fontWeight: 700,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: 16,
                          height: '56px',
                          bgcolor: 'white',
                          color: 'black',
                          fontWeight: 700,
                          '::placeholder': {
                            color: 'black',
                            opacity: 1,
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                          fontWeight: 700,
                          '::placeholder': {
                            color: 'black',
                            opacity: 1,
                          },
                        },
                        '& input::placeholder': {
                          color: 'black',
                          opacity: 1,
                        },
                      }}
                      inputProps={{ ...params.inputProps, style: { padding: '12px 14px', fontSize: 16, fontWeight: 700 ,color:'black', textAlign: 'left' } }}
                    />
                  )}
                  PaperComponent={(props) => <Paper {...props} elevation={3} />}
                  popupIcon={undefined}
                  forcePopupIcon={true}
                />
              </Box>
            )}
            {/* 2-column layout for Flying From and Cabin Class on mobile */}
            {searchType !== 'hotel-only' && (
              <>
                {/* Mobile: 2-column row */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '90%', flexDirection: 'row', gap: 1, mb: 1, mx: 'auto' }}>
                  <Box sx={{ width: '50%' }}>
                    {/* Flying From */}
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>Flying From</Typography>
                    <Autocomplete
                      options={Object.entries(airports).flatMap(([region, cities]) => cities.map(city => ({ region, city })))}
                      groupBy={(option) => option.region}
                      getOptionLabel={(option) => option.city}
                      value={departureAirport ? { region: '', city: departureAirport } : undefined}
                      onChange={(_, newValue) => setDepartureAirport(newValue?.city || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Fly from"
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            bgcolor: 'white',
                            width: '100%',
                            height: '56px',
                            boxShadow: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              fontSize: 16,
                              height: '56px',
                              bgcolor: 'white',
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& input::placeholder': {
                              color: 'black',
                              opacity: 1,
                            },
                          }}
                          inputProps={{ ...params.inputProps, style: { padding: '12px 14px', fontSize: 16,color:'black' ,fontWeight: 700, textAlign: 'left' } }}
                        />
                      )}
                      disableClearable
                      PaperComponent={(props) => <Paper {...props} elevation={3} />}
                    />
                  </Box>
                  <Box sx={{ width: '50%', ml: 1 }}>
                    {/* Cabin Class */}
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>Cabin Class</Typography>
                    <Autocomplete
                      options={cabinClasses}
                      getOptionLabel={option => option}
                      value={cabinClass}
                      onChange={(_, newValue) => setCabinClass(newValue || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select class"
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            bgcolor: 'white',
                            width: '100%',
                            height: '56px',
                            boxShadow: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              fontSize: 16,
                              height: '56px',
                              bgcolor: 'white',
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& input::placeholder': {
                              color: 'black',
                              opacity: 1,
                            },
                          }}
                          inputProps={{ ...params.inputProps, style: { padding: '12px 14px', fontSize: 16 ,fontWeight:700,color:'black', textAlign: 'left' } }}
                        />
                      )}
                      PaperComponent={(props) => <Paper {...props} elevation={3} />}
                    />
                  </Box>
                </Box>
                {/* Desktop: original stacking */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', gap: 2, width: 'auto', mb: 0, mx: 0 }}>
                  <Box sx={{ width: { md: 180 }, mb: { md: 0 } }}>
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>Flying From</Typography>
                    <Autocomplete
                      options={Object.entries(airports).flatMap(([region, cities]) => cities.map(city => ({ region, city })))}
                      groupBy={(option) => option.region}
                      getOptionLabel={(option) => option.city}
                      value={departureAirport ? { region: '', city: departureAirport } : undefined}
                      onChange={(_, newValue) => setDepartureAirport(newValue?.city || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Fly from"
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            bgcolor: 'white',
                            width: '100%',
                            height: '56px',
                            boxShadow: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              fontSize: 16,
                              height: '56px',
                              bgcolor: 'white',
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& input::placeholder': {
                              color: 'black',
                              opacity: 1,
                            },
                          }}
                          inputProps={{ ...params.inputProps, style: { padding: '12px 14px', fontSize: 16,color:'black' ,fontWeight: 700, textAlign: 'left' } }}
                        />
                      )}
                      disableClearable
                      PaperComponent={(props) => <Paper {...props} elevation={3} />}
                    />
                  </Box>
                  <Box sx={{ width: { md: 150 }, mb: { md: 0 } }}>
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>Cabin Class</Typography>
                    <Autocomplete
                      options={cabinClasses}
                      getOptionLabel={option => option}
                      value={cabinClass}
                      onChange={(_, newValue) => setCabinClass(newValue || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select class"
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            bgcolor: 'white',
                            width: '100%',
                            height: '56px',
                            boxShadow: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              fontSize: 16,
                              height: '56px',
                              bgcolor: 'white',
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: 'black',
                              fontWeight: 700,
                              '::placeholder': {
                                color: 'black',
                                opacity: 1,
                              },
                            },
                            '& input::placeholder': {
                              color: 'black',
                              opacity: 1,
                            },
                          }}
                          inputProps={{ ...params.inputProps, style: { padding: '12px 14px', fontSize: 16 ,fontWeight:700,color:'black', textAlign: 'left' } }}
                        />
                      )}
                      PaperComponent={(props) => <Paper {...props} elevation={3} />}
                    />
                  </Box>
                </Box>
              </>
            )}
            {/* Date Picker for departure date */}
            <Box sx={{ width: { xs: '90%', md: 150 }, mb: { xs: 1, md: 0 }, mx: { xs: 'auto', md: 0 } }}>
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>When</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={null}
                  value={departureDate}
                  onChange={(newValue) => setDepartureDate(newValue)}
                  slotProps={{
                    textField: {
                      placeholder: 'From Date',
                      variant: 'outlined',
                      sx: {
                        borderRadius: 2,
                        bgcolor: 'white',
                        width: '100%',
                        height: '56px',
                        boxShadow: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: 16,
                          height: '56px',
                          bgcolor: 'white',
                        },
                      },
                      inputProps: { style: { padding: '12px 14px', fontSize: 16,color:'black' ,fontWeight:700, textAlign: 'left' } },
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            {/* 2-column layout for Nights and Guests & Rooms on mobile */}
            <>
              {/* Mobile: 2-column row */}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '90%', flexDirection: 'row', gap: 1, mb: 1, mx: 'auto' }}>
                <Box sx={{ width: '50%' }}>
                  {/* Nights */}
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase', fontSize: 13 }}>Nights</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 2, height: '56px', boxShadow: 2, px: 1 }}>
                    <IconButton size="small" onClick={() => {
                      const min = 1;
                      const current = Number(nights);
                      if (current > min) setNights((current - 1).toString());
                    }} sx={{ color: 'black' }}>-</IconButton>
                    <Typography sx={{ color: 'black', fontWeight: 700, fontSize: 18, minWidth: 40, textAlign: 'center' }}>{nights}</Typography>
                    <IconButton size="small" onClick={() => {
                      const max = 21;
                      const current = Number(nights);
                      if (current < max) setNights((current + 1).toString());
                    }} sx={{ color: 'black' }}>+</IconButton>
                  </Box>
                </Box>
                <Box sx={{ width: '50%', ml: 1 }}>
                  {/* Guests & Rooms */}
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>Guests & Rooms</Typography>
                  <TextField
                    label={null}
                    value={guestSummary}
                    variant="outlined"
                    placeholder="Rooms 1, Adults 2, Children 0"
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'white',
                      width: '100%',
                      height: '56px',
                      boxShadow: 2,
                      '& input': { padding: '12px 14px', fontSize: 16, fontWeight: 700, color: 'black' },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontSize: 16,
                        height: '56px',
                        bgcolor: 'white',
                        color: 'black',
                        '& .MuiOutlinedInput-input': {
                          color: 'black',
                          fontWeight: 700,
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'black',
                        fontWeight: 700,
                      },
                      '& .MuiSelect-icon': {
                        color: 'black',
                      },
                    }}
                    onClick={handleGuestClick}
                    InputProps={{
                      readOnly: true,
                      endAdornment: <ExpandMoreIcon sx={{ cursor: 'pointer', color: 'black' }} />,
                    }}
                  />
                  {/* Popover for selecting guests and rooms */}
                  <Popover
                    open={openGuest}
                    anchorEl={anchorEl}
                    onClose={handleGuestClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    PaperProps={{
                      sx: {
                        bgcolor: 'white',
                        color: 'black',
                      }
                    }}
                  >
                    <Box sx={{ p: 2, minWidth: 220 }}>
                      {/* Adults selector */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ color: 'black' }}>Adults</Typography>
                        <IconButton size="small" onClick={() => setAdults(Math.max(1, adults - 1))} sx={{ color: 'black' }}>-</IconButton>
                        <Typography sx={{ color: 'black' }}>{adults}</Typography>
                        <IconButton size="small" onClick={() => setAdults(adults + 1)} sx={{ color: 'black' }}>+</IconButton>
                      </Stack>
                      {/* Children selector */}
                      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography sx={{ color: 'black' }}>Children</Typography>
                        <IconButton size="small" onClick={() => handleChildrenChange(Math.max(0, children - 1))} sx={{ color: 'black' }}>-</IconButton>
                        <Typography sx={{ color: 'black' }}>{children}</Typography>
                        <IconButton size="small" onClick={() => handleChildrenChange(children + 1)} sx={{ color: 'black' }}>+</IconButton>
                      </Stack>
                      {/* Child ages dropdowns */}
                      {children > 0 && (
                        <Box mt={1}>
                          {Array.from({ length: children }).map((_, idx) => (
                            <Stack direction="row" alignItems="center" spacing={1} key={idx} mb={0.5}>
                              <Typography sx={{ color: 'black', minWidth: 60 }}>Age {idx + 1}</Typography>
                              <Select
                                value={childAges[idx] ?? ''}
                                onChange={e => {
                                  const newAges = [...childAges];
                                  newAges[idx] = Number(e.target.value);
                                  setChildAges(newAges);
                                }}
                                displayEmpty
                                size="small"
                                sx={{ bgcolor: 'white', minWidth: 70 }}
                              >
                                <MenuItem value="" disabled>Select</MenuItem>
                                {Array.from({ length: 18 }).map((_, age) => (
                                  <MenuItem key={age} value={age}>{age}</MenuItem>
                                ))}
                              </Select>
                            </Stack>
                          ))}
                        </Box>
                      )}
                      {/* Rooms selector */}
                      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography sx={{ color: 'black' }}>Rooms</Typography>
                        <IconButton size="small" onClick={() => setRooms(Math.max(1, rooms - 1))} sx={{ color: 'black' }}>-</IconButton>
                        <Typography sx={{ color: 'black' }}>{rooms}</Typography>
                        <IconButton size="small" onClick={() => setRooms(rooms + 1)} sx={{ color: 'black' }}>+</IconButton>
                      </Stack>
                    </Box>
                  </Popover>
                </Box>
              </Box>
              {/* Desktop: original stacking */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', gap: 2, width: 'auto', mb: 0, mx: 0 }}>
                <Box sx={{ width: { md: 110 }, mb: { md: 0 } }}>
                  {/* Nights */}
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase', fontSize: 13 }}>Nights</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 2, height: '56px', boxShadow: 2, px: 1 }}>
                    <IconButton size="small" onClick={() => {
                      const min = 1;
                      const current = Number(nights);
                      if (current > min) setNights((current - 1).toString());
                    }} sx={{ color: 'black' }}>-</IconButton>
                    <Typography sx={{ color: 'black', fontWeight: 700, fontSize: 18, minWidth: 40, textAlign: 'center' }}>{nights}</Typography>
                    <IconButton size="small" onClick={() => {
                      const max = 21;
                      const current = Number(nights);
                      if (current < max) setNights((current + 1).toString());
                    }} sx={{ color: 'black' }}>+</IconButton>
                  </Box>
                </Box>
                {/* Nights 2 for twin-centres */}
                {searchType === 'twin-centres' && (
                  <Box sx={{ width: { md: 110 }, mb: { md: 0 } }}>
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase', fontSize: 13 }}>Nights 2</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 2, height: '56px', boxShadow: 2, px: 1 }}>
                      <IconButton size="small" onClick={() => {
                        const min = 1;
                        const current = Number(nights2);
                        if (current > min) setNights2((current - 1).toString());
                      }} sx={{ color: 'black' }}>-</IconButton>
                      <Typography sx={{ color: 'black', fontWeight: 700, fontSize: 18, minWidth: 40, textAlign: 'center' }}>{nights2}</Typography>
                      <IconButton size="small" onClick={() => {
                        const max = 21;
                        const current = Number(nights2);
                        if (current < max) setNights2((current + 1).toString());
                      }} sx={{ color: 'black' }}>+</IconButton>
                    </Box>
                  </Box>
                )}
                <Box sx={{ width: { md: searchType === 'twin-centres' ? 210 : 210 }, mb: { md: 0 } }}>
                  {/* Guests & Rooms */}
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, mb: 0.5, textTransform: 'uppercase' }}>Guests & Rooms</Typography>
                  <TextField
                    label={null}
                    value={guestSummary}
                    variant="outlined"
                    placeholder="Rooms 1, Adults 2, Children 0"
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'white',
                      width: '100%',
                      height: '56px',
                      boxShadow: 2,
                      '& input': { padding: '12px 14px', fontSize: 16, fontWeight: 700, color: 'black' },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontSize: 16,
                        height: '56px',
                        bgcolor: 'white',
                        color: 'black',
                        '& .MuiOutlinedInput-input': {
                          color: 'black',
                          fontWeight: 700,
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'black',
                        fontWeight: 700,
                      },
                      '& .MuiSelect-icon': {
                        color: 'black',
                      },
                    }}
                    onClick={handleGuestClick}
                    InputProps={{
                      readOnly: true,
                      endAdornment: <ExpandMoreIcon sx={{ cursor: 'pointer', color: 'black' }} />,
                    }}
                  />
                  {/* Popover for selecting guests and rooms */}
                  <Popover
                    open={openGuest}
                    anchorEl={anchorEl}
                    onClose={handleGuestClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    PaperProps={{
                      sx: {
                        bgcolor: 'white',
                        color: 'black',
                      }
                    }}
                  >
                    <Box sx={{ p: 2, minWidth: 220 }}>
                      {/* Adults selector */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ color: 'black' }}>Adults</Typography>
                        <IconButton size="small" onClick={() => setAdults(Math.max(1, adults - 1))} sx={{ color: 'black' }}>-</IconButton>
                        <Typography sx={{ color: 'black' }}>{adults}</Typography>
                        <IconButton size="small" onClick={() => setAdults(adults + 1)} sx={{ color: 'black' }}>+</IconButton>
                      </Stack>
                      {/* Children selector */}
                      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography sx={{ color: 'black' }}>Children</Typography>
                        <IconButton size="small" onClick={() => handleChildrenChange(Math.max(0, children - 1))} sx={{ color: 'black' }}>-</IconButton>
                        <Typography sx={{ color: 'black' }}>{children}</Typography>
                        <IconButton size="small" onClick={() => handleChildrenChange(children + 1)} sx={{ color: 'black' }}>+</IconButton>
                      </Stack>
                      {/* Child ages dropdowns */}
                      {children > 0 && (
                        <Box mt={1}>
                          {Array.from({ length: children }).map((_, idx) => (
                            <Stack direction="row" alignItems="center" spacing={1} key={idx} mb={0.5}>
                              <Typography sx={{ color: 'black', minWidth: 60 }}>Age {idx + 1}</Typography>
                              <Select
                                value={childAges[idx] ?? ''}
                                onChange={e => {
                                  const newAges = [...childAges];
                                  newAges[idx] = Number(e.target.value);
                                  setChildAges(newAges);
                                }}
                                displayEmpty
                                size="small"
                                sx={{ bgcolor: 'white', minWidth: 70 }}
                              >
                                <MenuItem value="" disabled>Select</MenuItem>
                                {Array.from({ length: 18 }).map((_, age) => (
                                  <MenuItem key={age} value={age}>{age}</MenuItem>
                                ))}
                              </Select>
                            </Stack>
                          ))}
                        </Box>
                      )}
                      {/* Rooms selector */}
                      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography sx={{ color: 'black' }}>Rooms</Typography>
                        <IconButton size="small" onClick={() => setRooms(Math.max(1, rooms - 1))} sx={{ color: 'black' }}>-</IconButton>
                        <Typography sx={{ color: 'black' }}>{rooms}</Typography>
                        <IconButton size="small" onClick={() => setRooms(rooms + 1)} sx={{ color: 'black' }}>+</IconButton>
                      </Stack>
                    </Box>
                  </Popover>
                </Box>
              </Box>
            </>
          </Stack>
          {/* Direct flights only checkbox (not shown for hotel-only) */}
          {searchType !== 'hotel-only' && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <input type="checkbox" checked={directFlights} onChange={e => setDirectFlights(e.target.checked)} id="direct-flights" style={{ marginRight: 6 }} />
              <label htmlFor="direct-flights" style={{ color: 'white', fontSize: 15 }}>Direct flights only</label>
            </Box>
          )}
          {/* Reset and Search buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              mt: 1,
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            {/* Reset button: clears all fields */}
            <Button
              variant="text"
              size="small"
              color="inherit"
              startIcon={<span style={{ fontSize: 18, display: 'inline-block', transform: 'rotate(-20deg)' }}>↻</span>}
              sx={{
                color: 'white',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                // width and margin removed to keep button right-aligned and natural size
                px: 2,
                py: 1,
                minWidth: 80,
                height: 36,
                fontSize: 13,
              }}
              onClick={() => {
                setDestination('');
                setDepartureAirport('');
                setCabinClass('');
                setDepartureDate(null);
                setNights('7');
                setDirectFlights(false);
                setRooms(1);
                setAdults(2);
                setChildren(0);
              }}
            >
              Reset Search
            </Button>
            {/* Search button: triggers handleSearch */}
            <Button
              variant="contained"
              size="small"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{
                minWidth: 80,
                fontSize: 12,
                py: 1,
                px: 2,
                fontWeight: 700,
                borderRadius: 99,
                bgcolor: 'primary.dark', // theme dark blue
                color: 'white',
                boxShadow: 2,
                textTransform: 'uppercase',
                letterSpacing: 1,
                // Removed width and height overrides
                '&:hover': { bgcolor: 'primary.main' },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      );
    }

  // Render the search form UI
  return (
    <>
      {/* Mobile: Overlay for EnhancedSearchForm */}
      {showOverlay && showMobile && (
        <Box
          sx={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'primary.main',
            zIndex: 1400,
            alignItems: { xs: 'center', '@media (min-width:1024px) and (max-width:1024px) and (orientation:portrait)': 'flex-start' },
            justifyContent: { xs: 'center', '@media (min-width:1024px) and (max-width:1024px) and (orientation:portrait)': 'flex-start' },
            overflowY: 'hidden',
            flexDirection: 'column',
            p: 0,
            m: 0,
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={() => setShowOverlay(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              zIndex: 1500,
              bgcolor: 'rgba(0,0,0,0.3)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
            }}
            aria-label="Close search form"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          {/* The search form itself, only on mobile in overlay */}
          <Box sx={{ width: '100%', mt: 18 }}>
            {/* Main search form, mobile only in overlay */}
            <Box
              sx={{
                width: '100%',
                minHeight: 700,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(235, 232, 232, 0)',
                p: 0,
                m: 0,
                mt: 0,
                // Custom media query for 1024x1366 portrait
                '@media (min-width:1024px) and (max-width:1366px) and (orientation:portrait)': {
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingLeft: theme => theme.spacing(6),
                },
              }}
            >
              {/* Main Form Content (mobile overlay) */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: { xs: 'center', '@media (min-width:1024px) and (max-width:1024px) and (orientation:portrait)': 'flex-start' },
                  justifyContent: { xs: 'center', '@media (min-width:1024px) and (max-width:1024px) and (orientation:portrait)': 'flex-start' },
                  m: 0,
                  p: 0,
                }}
              >
                {/* Main Form Content (mobile overlay) */}
                {renderFormContent({
                  searchType,
                  setSearchType,
                  handleSearchTypeChange,
                  fixedDestination,
                  destination,
                  setDestination,
                  destination2,
                  setDestination2,
                  open,
                  setOpen,
                  open2,
                  setOpen2,
                  departureAirport,
                  setDepartureAirport,
                  cabinClass,
                  setCabinClass,
                  departureDate,
                  setDepartureDate,
                  nights,
                  setNights,
                  nights2,
                  setNights2,
                  directFlights,
                  setDirectFlights,
                  rooms,
                  setRooms,
                  adults,
                  setAdults,
                  children,
                  setChildren,
                  anchorEl,
                  openGuest,
                  handleGuestClick,
                  handleGuestClose,
                  guestSummary,
                  handleChildrenChange,
                  childAges,
                  setChildAges,
                  handleSearch
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {/* Mobile: Overlaying Destination Button (always on top) */}
      {showMobile && (
        <Box sx={{
          display: 'flex',
          position: 'fixed',
          bottom: 30,
          left: 0,
          width: '100%',
          zIndex: 2000,
          justifyContent: 'flex-start',
          pointerEvents: 'auto',
          ml: 0.5,
        }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 99,
              fontWeight: 700,
              fontSize: 13, // Changed from 18 to 13 for smaller font
              px: { xs: 2, sm: 3, md: 5 },
              py: 1.5,
              boxShadow: 3,
              bgcolor: 'primary.dark',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
            onClick={() => setShowOverlay(prev => !prev)}
          >
            Search Destination
          </Button>
        </Box>
      )}
      {/* Desktop: show the form as before */}
      {!showMobile && (
        <Box
          sx={{
            width: '100%',
            minHeight: 700,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            bgcolor: 'rgba(235, 232, 232, 0)',
            p: 0,
            m: 0,
            mt: { xs: 0, md: 6 },
          }}
        >
          {/* Search Form Container (desktop) */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              m: 0,
              p: 0,
            }}
          >
            {/* Main Form Box (desktop) */}
            {renderFormContent({
              searchType,
              setSearchType,
              handleSearchTypeChange,
              fixedDestination,
              destination,
              setDestination,
              destination2,
              setDestination2,
              open,
              setOpen,
              open2,
              setOpen2,
              departureAirport,
              setDepartureAirport,
              cabinClass,
              setCabinClass,
              departureDate,
              setDepartureDate,
              nights,
              setNights,
              nights2,
              setNights2,
              directFlights,
              setDirectFlights,
              rooms,
              setRooms,
              adults,
              setAdults,
              children,
              setChildren,
              anchorEl,
              openGuest,
              handleGuestClick,
              handleGuestClose,
              guestSummary,
              handleChildrenChange,
              childAges,
              setChildAges,
              handleSearch
            })}
          </Box>
        </Box>
      )}
    </>
  );
};
