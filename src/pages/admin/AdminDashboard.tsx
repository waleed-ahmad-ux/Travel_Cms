import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'; // path adjust karein agar file aur folder structure alag hai

const AdminDashboard: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"   // full screen height
      textAlign="center"
    >
      {/* Logo */}
      <Box mb={3}>
        <img
          src={logo}
          alt="Airworld Tours Logo"
          style={{ width: 180, height: 'auto' }}
        />
      </Box>

      {/* Welcome Text */}
      <Typography variant="h2" component="h1">
        Welcome to Airworld Tours CMS
      </Typography>
    </Box>
  );
};

export default AdminDashboard;
