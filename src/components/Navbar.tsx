import { Box, AppBar, Toolbar, Typography, Button, Container, Stack, Menu, MenuItem, Fade, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import { destinations } from '../services/destinationService';
import { assetMap } from '../assets/assetMap';
import SearchOverlay from './SearchOverlay';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';


interface StyledButtonProps {
  component?: React.ElementType;
  to?: string;
}

const MainNavItem = styled(Button)<StyledButtonProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: '1.25rem', // Increased from 1.15rem
  padding: theme.spacing(2, 3), // More padding
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem', // Larger on big screens
    padding: theme.spacing(2.5, 4),
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
  },
}));

const IconButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  minWidth: 'unset',
  padding: theme.spacing(1.5), // Increased padding
  color: theme.palette.primary.main,
  fontSize: '1.5rem', // Larger icon size
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
    padding: theme.spacing(2),
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
  },
}));

export const Navbar = () => {
  const [destinationsAnchorEl, setDestinationsAnchorEl] = useState<null | HTMLElement>(null);
  const [holidayDealsAnchorEl, setHolidayDealsAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const regions = ['Asia', 'Europe', 'Middle East', 'Caribbean', 'Pacific', 'Americas'];
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const holidayDeals = [
    { title: 'All Offers', path: '/holiday-deals/all' },
    { title: 'Holiday Deals 2025', path: '/holiday-deals/2025' },
    { title: 'Last Minute Holiday Deals', path: '/holiday-deals/last-minute' },
    { title: 'Kids Go FREE Offers', path: '/holiday-deals/kids-free' },
    { title: 'Summer Holiday Deals', path: '/holiday-deals/summer' },
    { title: 'October Half Term Deals', path: '/holiday-deals/october-half-term' },
    { title: 'Christmas Holidays', path: '/holiday-deals/christmas' },
    { title: 'February Half Term Deals', path: '/holiday-deals/february-half-term' },
    { title: 'Easter Holiday Offers', path: '/holiday-deals/easter' },
    { title: 'May Half Term Deals', path: '/holiday-deals/may-half-term' },
    { title: 'Business Class Offers', path: '/holiday-deals/business-class' },
    { title: 'Holiday Deals 2026', path: '/holiday-deals/2026' },
    { title: 'Online Deals', path: '/holiday-deals/online' },
  ];

  const holidayDealCards = [
    { title: 'Last Minute Holiday Deals', path: '/holiday-deals/last-minute', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { title: 'Summer Holiday Offers', path: '/holiday-deals/summer', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
    { title: 'Kids Go FREE Offers', path: '/holiday-deals/kids-free', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
    { title: 'Christmas Holidays Offers', path: '/holiday-deals/christmas', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { title: '2026 Holiday Offers', path: '/holiday-deals/2026', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
    { title: 'Business Class Holiday Offers', path: '/holiday-deals/business-class', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  ];

  // Sort all destinations alphabetically for the All Destinations column
  const allDestinationsSorted = [...destinations].sort((a, b) => a.name.localeCompare(b.name));

  const handleDestinationClick = (event: React.MouseEvent<HTMLElement>) => {
    setDestinationsAnchorEl(event.currentTarget);
  };

  const handleHolidayDealsClick = (event: React.MouseEvent<HTMLElement>) => {
    setHolidayDealsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setDestinationsAnchorEl(null);
    setHolidayDealsAnchorEl(null);
  };

  const handleRegionClick = (region: string) => {
    setIsLoading(true);
    handleMenuClose();
    navigate(`/destinations?${region}`);
  };


  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <Fade in={true}>
            <CircularProgress color="secondary" />
          </Fade>
        </Box>
      )}
      {/* Unified Nav Bar: Utility + Main Nav */}
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0} 
        sx={{
          background: '#fff',
          color: 'black',
          zIndex: 1300,
          borderBottom: 1,
          borderColor: 'divider',
          top: 0,
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ flexDirection: 'column', alignItems: 'stretch', minHeight: 94, p: 0 }}>
            {/* Top Row: Utility */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', sm: 'flex-end' },
              alignItems: 'center',
              minHeight: 34,
              width: '100%',
              gap: { xs: 0.5, sm: 2 },
              py: { xs: 0.5, sm: 0 },
            }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5 },
                  alignItems: 'center',
                  mr: { xs: 0, sm: 3 },
                  px: 1,
                  py: 0.5,
                  borderRadius: 2,
                  background: '#fff',
                  // Make logos appear in a row with proper spacing and reduced size for mobile/tablet/iPad
                  '@media (max-width:1194px)': {
                    flexDirection: 'row',
                    gap: 0.5,
                    alignItems: 'center',
                    px: 0.5,
                  },
                }}
              >
                {/* Add a responsive logo class for ABTA, ATOL, IATA logos */}
                <style>{`
                  @media (max-width:1194px) {
                    .responsive-logo-abta { height: 22px !important; }
                    .responsive-logo-atol, .responsive-logo-iata { height: 28px !important; }
                  }
                `}</style>
                <img 
                  src={assetMap["ABTA logo.png"]} 
                  alt="ABTA" 
                  className="responsive-logo-abta"
                  style={{ height: 24, width: 'auto', objectFit: 'contain', borderRadius: 3, padding: 1, background: '#fff' }}
                />
                <img 
                  src={assetMap["ATOL logo.png"]} 
                  alt="ATOL" 
                  className="responsive-logo-atol"
                  style={{ height: 32, width: 'auto', objectFit: 'contain', borderRadius: 3, padding: 1, background: '#fff' }}
                />
                <img 
                  src={assetMap["IATA logo.png"]} 
                  alt="IATA" 
                  className="responsive-logo-iata"
                  style={{ height: 24, width: 'auto', objectFit: 'contain', borderRadius: 3, padding: 1, background: '#fff' }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneInTalkIcon sx={{ fontSize: { xs: 20, sm: 30 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: 16, sm: 30 }, color: 'primary.main' }}>
                  020 8906 3411
                </Typography>
                <AccessTimeIcon sx={{ fontSize: { xs: 14, sm: 20 }, ml: 2, mr: 0.5, color: 'primary.main', display: { xs: 'none', sm: 'inline-flex' },
                  // Hide for 820x1180 and 768x1024 screens
                  '@media (width:820px) and (height:1180px)': { display: 'none' },
                  '@media (width:768px) and (height:1024px)': { display: 'none' },
                }} />
                <Typography variant="body2" sx={{ fontSize: 14, color: 'text.secondary', display: { xs: 'none', sm: 'inline-flex' },
                  // Hide for 820x1180 and 768x1024 screens
                  '@media (width:820px) and (height:1180px)': { display: 'none' },
                  '@media (width:768px) and (height:1024px)': { display: 'none' },
                }}>
                  Mon-Fri: 09:00-18:00 | Sat: 10:00-16:00
                </Typography>
              </Box>
            </Box>
            {/* Bottom Row: Main Nav */}
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 60, position: 'relative', width: '100%' }}>
              {/* Left: Logo + Hamburger (responsive) */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: { xs: '100%', md: 'auto' },
                  justifyContent: { xs: 'space-between', md: 'flex-start' },
                  minWidth: 0,
                  flex: '0 0 auto',
                  // Fix logo/hamburger for 768x1024: logo left, hamburger right, no overlap
                  '@media (width:768px) and (height:1024px)': { width: '100%', justifyContent: 'space-between', alignItems: 'center' },
                  '@media (width:1366px) and (height:1024px)': { width: '100%', justifyContent: 'space-between', alignItems: 'center' },
                  '@media (width:1024px) and (height:1366px)': { width: '100%', justifyContent: 'space-between', alignItems: 'center' },
                  '@media (min-width:820px) and (max-width:1194px) and (max-height:1180px)': { width: '100%', justifyContent: 'space-between' },
                }}
              >
                <Box
                  component={RouterLink}
                  to="/"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 80,
                    position: 'relative',
                    zIndex: 2,
                    mt: { xs: 0, sm: '-40px' },
                    ml: { xs: 0, sm: -10 },
                    // Logo left for 768x1024 screens
                    '@media (width:768px) and (height:1024px)': { marginLeft: 0 },
                    '@media (width:1024px) and (height:1366px)': { marginLeft: 0 },
                    '@media (min-width:820px) and (max-width:1194px) and (max-height:1180px)': { minWidth: 80, marginLeft: 0 },
                    '@media (width:1366px) and (height:1024px)': { marginLeft: 0 },
                  }}
                >
                  <img 
                    src={assetMap["logo.png"]} 
                    alt="Airworld Tours Logo" 
                    style={{ 
                      height: '80px',
                      width: 'auto',
                      objectFit: 'contain',
                      borderRadius: 8,
                      padding: 0,
                      marginLeft: 0,
                    }} 
                  />
                </Box>
                {/* Hamburger for mobile/tablet/iPad Pro - move to right */}
                <Box sx={{ 
                  display: { xs: 'flex', md: 'none' }, 
                  alignItems: 'center', 
                  ml: 1, 
                  mt: { xs: 2, md: 0 },
                  position: { xs: 'static', md: 'static' },
                  // Hamburger stays left for 768x1024
                  '@media (width:768px) and (height:1024px)': { display: 'flex', position: 'static', right: 'auto', top: 'auto', ml: 1 },
                  '@media (width:1024px) and (height:1366px)': { display: 'flex', position: 'static', right: 'auto', top: 'auto', ml: 1 },
                  '@media (min-width:820px) and (max-width:1194px) and (max-height:1180px)': { display: 'flex', position: 'static', right: 'auto', top: 'auto', ml: 1 },
                  '@media (max-width:900px)': { display: 'flex' }, // already mobile
                  '@media (max-width:900px) and (max-height:700px)': { display: 'flex' }, // 900x700px
                  // Always hide hamburger for >=1370px
                  '@media (min-width:1370px)': { display: 'none' },
                  // Show hamburger for 1366x1024 and right align (ml: 1)
                  '@media (width:1366px) and (height:1024px)': { display: 'flex', position: 'static', right: 'auto', top: 'auto', ml: 1 },
                }}>
                  <IconButton onClick={() => setMobileDrawerOpen((open) => !open)} aria-label="Toggle navigation menu">
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Box>
              {/* Center: Menu Items */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: { md: 1, lg: 1.5 },
                  flex: '0 1 auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ml: 6, // Increased left margin to move nav menus to the right
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  maxWidth: '100vw',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    height: 8,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#ccc',
                    borderRadius: 4,
                  },
                  '@media (width:768px) and (height:1024px)': { display: 'none' },
                  '@media (width:1024px) and (height:1366px)': { display: 'none' },
                  '@media (min-width:820px) and (max-width:1194px) and (max-height:1180px)': { display: 'none' },
                  '@media (max-width:900px)': { display: 'none' }, // already mobile
                  '@media (max-width:900px) and (max-height:700px)': { display: 'none' }, // 900x700px
                  '@media (min-width:1370px)': { display: 'flex' },
                  // Hide desktop nav for 1366x1024
                  '@media (width:1366px) and (height:1024px)': { display: 'none' },
                }}
              >
                <MainNavItem
                  onClick={handleDestinationClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ fontSize: { md: '1rem', lg: '1.15rem' } }}
                >
                  Destinations
                </MainNavItem>
                <MainNavItem
                  onClick={handleHolidayDealsClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ fontSize: { md: '1rem', lg: '1.15rem' } }}
                >
                  Holiday Deals
                </MainNavItem>
                <MainNavItem
                  component={RouterLink}
                  to="/holiday-types"
                  sx={{ fontSize: { md: '1rem', lg: '1.15rem' } }}
                >
                  Holiday Types
                </MainNavItem>
                <MainNavItem
                  component={RouterLink}
                  to="/tailormade-holidays"
                  sx={{ fontSize: { md: '1rem', lg: '1.15rem' } }}
                >
                  Tailormade Holidays
                </MainNavItem>
                <MainNavItem
                  component={RouterLink}
                  to="/inspire-me"
                  sx={{ fontSize: { md: '1rem', lg: '1.15rem' } }}
                >
                  Inspire Me
                </MainNavItem>
              </Box>
              {/* Right: Icons */}
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                gap: 2, 
                alignItems: 'center', 
                justifyContent: 'flex-end', 
                flex: 1,
                // Hide icons for iPad Pro and mobile/tablet
                '@media (max-width:1366px) and (min-width:1024px) and (max-height:1366px) and (min-height:1024px)': { display: 'none' }, // iPad Pro 12.9"
                '@media (max-width:1194px) and (min-width:834px) and (max-height:834px) and (min-height:1194px)': { display: 'none' }, // iPad Pro 11"
                '@media (max-width:900px)': { display: 'none' }, // already mobile
                '@media (max-width:900px) and (max-height:700px)': { display: 'none' }, // 900x700px
              }}>
                <IconButton onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
                <IconButton component={RouterLink} to="/trip-ideas">
                  <FavoriteIcon />
                </IconButton>
                <IconButton component={RouterLink} to="/account">
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Toolbar>
        </Container>
        {/* Drawer for mobile nav */}
        <Drawer anchor="left" open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)}>
          <Box sx={{ 
            width: 260, 
            p: 2, 
            mt: { xs: 12, sm: 0 },
            // Extend mobile Drawer for 11", 13", 1024x1366, 900x700px, and iPad Pro screens
            '@media (max-width:1440px) and (min-width:1280px)': { display: 'block' }, // 13-inch
            '@media (max-width:1366px) and (min-width:1024px)': { display: 'block' }, // 11-inch
            '@media (max-width:1024px) and (max-height:1366px)': { display: 'block' }, // 1024x1366
            '@media (max-width:1366px) and (min-width:1024px) and (max-height:1366px) and (min-height:1024px)': { display: 'block' }, // iPad Pro 12.9"
            '@media (max-width:1194px) and (min-width:834px) and (max-height:834px) and (min-height:1194px)': { display: 'block' }, // iPad Pro 11"
            '@media (max-width:900px)': { display: 'block' }, // already mobile
            '@media (max-width:900px) and (max-height:700px)': { display: 'block' }, // 900x700px
            // Custom: push Drawer content down for specific breakpoints
            '@media (width:1024px) and (height:1366px)': { mt: 6 },
            '@media (width:820px) and (height:1180px)': { mt: 6 },
            '@media (width:768px) and (height:1024px)': { mt: 6 },
            '@media (width:1024px) and (height:768px)': { mt: 6 },
            '@media (width:1180px) and (height:820px)': { mt: 6 },
            '@media (width:1366px) and (height:1024px)': { mt: 6 },
          }} role="presentation">
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src={assetMap["logo.png"]} alt="Airworld Tours Logo" style={{ height: 40, width: 'auto', objectFit: 'contain', borderRadius: 8 }} />
            </Box>
            <Stack spacing={1}>
              
              <Button fullWidth onClick={(e) => { setMobileDrawerOpen(false); handleDestinationClick(e); }} endIcon={<KeyboardArrowDownIcon />}>Destinations</Button>
              <Button fullWidth onClick={(e) => { setMobileDrawerOpen(false); handleHolidayDealsClick(e); }} endIcon={<KeyboardArrowDownIcon />}>Holiday Deals</Button>
              <Button fullWidth component={RouterLink} to="/holiday-types" onClick={() => setMobileDrawerOpen(false)}>Holiday Types</Button>
              <Button fullWidth component={RouterLink} to="/tailormade-holidays" onClick={() => setMobileDrawerOpen(false)}>Tailormade Holidays</Button>
              <Button fullWidth component={RouterLink} to="/inspire-me" onClick={() => setMobileDrawerOpen(false)}>Inspire Me</Button>
              <Button fullWidth component={RouterLink} to="/trip-ideas" startIcon={<FavoriteIcon />} onClick={() => setMobileDrawerOpen(false)}>Trip Ideas</Button>
              <Button fullWidth component={RouterLink} to="/account" startIcon={<AccountCircleIcon />} onClick={() => setMobileDrawerOpen(false)}>Account</Button>
              <Button fullWidth startIcon={<SearchIcon />} onClick={() => { setMobileDrawerOpen(false); setSearchOpen(true); }}>Search</Button>
            </Stack>
          </Box>
        </Drawer>
        {/* Menus remain as popovers */}
        <Menu
          anchorEl={destinationsAnchorEl}
          open={Boolean(destinationsAnchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          sx={{
            '& .MuiMenu-paper': {
              mt: 1,
              width: { xs: '98vw', md: 1200 },
              maxWidth: '98vw',
              boxShadow: 3,
              px: 2,
              py: 3,
              overflowY: 'auto',
              maxHeight: { xs: '80vh', md: '60vh' },
            },
          }}
        >
          <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
            {/* Our Most Popular Destinations */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.main',
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                Our Most Popular Destinations
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 0 }}>
                {destinations.slice(0, 8).map((destination) => (
                  <MenuItem
                    key={destination.id}
                    onClick={() => {
                      handleMenuClose();
                      navigate(`/destination/${destination.id}`);
                    }}
                    sx={{
                      py: 1,
                      pl: 0,
                      '&:hover': {
                        color: 'secondary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {destination.name}
                  </MenuItem>
                ))}
              </Box>
            </Box>
            {/* Vertical separator - hide on mobile */}
            <Box sx={{ borderLeft: { xs: 0, md: 1 }, borderColor: 'divider', mx: { xs: 0, md: 2 }, display: { xs: 'none', md: 'block' } }} />
            {/* All Destinations */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.main',
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                All Destinations
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 0 }}>
                {allDestinationsSorted.map((destination) => (
                  <MenuItem
                    key={destination.id}
                    onClick={() => {
                      handleMenuClose();
                      navigate(`/destination/${destination.id}`);
                    }}
                    sx={{
                      py: 1,
                      pl: 0,
                      '&:hover': {
                        color: 'secondary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {destination.name}
                  </MenuItem>
                ))}
              </Box>
            </Box>
            {/* All Regions Column (existing) */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.main',
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                All Regions
              </Typography>
              {regions.map((region) => (
                <MenuItem 
                  key={region}
                  onClick={() => handleRegionClick(`region=${region.toLowerCase()}`)}
                  sx={{
                    py: 1,
                    pl: 0,
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {region}
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => handleRegionClick('')}
                sx={{
                  mt: 1,
                  py: 1,
                  pl: 0,
                  fontWeight: 600,
                  color: 'primary.main',
                  borderRadius: 1,
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                View All Regions
              </MenuItem>
            </Box>
            {/* Top Hotels Column (existing) */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.main',
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                Top Hotels
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  'Türkiye Hotels',
                  'UAE Hotels',
                  'Hong Kong Hotels',
                  'Indonesia Hotels',
                  'Malaysia Hotels',
                  'Singapore Hotels',
                  'Thailand Hotels',
                ].map((hotel) => (
                  <MenuItem 
                    key={hotel}
                    onClick={() => handleRegionClick(`hotel=${hotel.toLowerCase()}`)}
                    sx={{
                      py: 1,
                      pl: 0,
                      '&:hover': {
                        color: 'secondary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {hotel}
                  </MenuItem>
                ))}
              </Box>
            </Box>
          </Box>
        </Menu>
        <Menu
          anchorEl={holidayDealsAnchorEl}
          open={Boolean(holidayDealsAnchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          disableScrollLock={true}
          sx={{
            '& .MuiMenu-paper': {
              mt: 1,
              width: { xs: '98vw', md: 1100 },
              maxWidth: '98vw',
              boxShadow: 3,
              px: 2,
              py: 3,
              overflow: 'visible',
              overflowY: 'visible',
            },
          }}
        >
          <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
            {/* Left column: all deals */}
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.main',
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                Current Deals
              </Typography>
              {holidayDeals.map((deal) => (
                <MenuItem
                  key={deal.title}
                  component={RouterLink}
                  to={deal.path}
                  onClick={handleMenuClose}
                  sx={{
                    py: 1,
                    pl: 0,
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {deal.title}
                </MenuItem>
              ))}
            </Box>
            {/* Right column: image cards */}
            <Box sx={{ flex: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, alignItems: 'start', gridAutoRows: 'min-content' }}>
              {holidayDealCards.map((card) => (
                <Box
                  key={card.title}
                  component={RouterLink}
                  to={card.path}
                  onClick={handleMenuClose}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: '#f7f7fa',
                    boxShadow: 1,
                    transition: 'box-shadow 0.2s',
                    width: { xs: '100%', md: 220 },
                    p: 0,
                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', height: 170, mt: 2, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={card.img}
                      alt={card.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.3s, filter 0.3s',
                        '&:hover': {
                          transform: 'scale(1.06)',
                          filter: 'brightness(1.08)',
                        },
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.45)',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      fontSize: 15,
                      fontWeight: 500,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {card.title}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Menu>
      </AppBar>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* Spacer to push down main content below fixed navbars */}
      <Box sx={{ height: '94px' }} />
    </>
  );
};