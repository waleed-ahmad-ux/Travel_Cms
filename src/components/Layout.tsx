import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FixedSearchBar } from './FixedSearchBar';
import Footer from './Footer';

export const Layout = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <FixedSearchBar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Public nested routes */}
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};
