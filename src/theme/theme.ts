import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // Dark blue - primary brand color
      light: '#3b82f6', // Light blue - lighter variant
      dark: '#1e40af', // Darker blue for hover states 
    },
    secondary: {
      main: '#60a5fa', // Light blue - secondary accent
      light: '#93c5fd', // Very light blue
      dark: '#3b82f6', // Medium blue for contrast
      //main: '#D4AF37', // Gold
    },
    background: {
      default: '#f8fafc', // Very light blue-gray background
      paper: '#ffffff',
      
    },
    text: {
      primary: '#1e293b', // Dark blue-gray for text
      secondary: '#64748b', // Medium gray for secondary text
      //secondary: '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
  },
});
