import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid
} from '@mui/material';

const FlightManagement: React.FC = () => {
  const [cabinClass, setCabinClass] = useState('');
  const [flightStops, setFlightStops] = useState('');

  const handleApply = () => {
    alert(`Applied:\nCabin Class: ${cabinClass}\nFlight Stops: ${flightStops}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      p={3}
    >
      <Box maxWidth={600} width="100%">
        <Typography variant="h4" gutterBottom>
          Flight Management
        </Typography>

        <Grid container spacing={3}>
          {/* Cabin Class */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Cabin Class</InputLabel>
              <Select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                label="Cabin Class"
              >
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="First">First</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Flight Stops */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Flight Stops</InputLabel>
              <Select
                value={flightStops}
                onChange={(e) => setFlightStops(e.target.value)}
                label="Flight Stops"
              >
                <MenuItem value="Direct">Direct</MenuItem>
                <MenuItem value="2 Stops">2 Stops</MenuItem>
                <MenuItem value="3 Stops">3 Stops</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Apply Button */}
<Grid item xs={12}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleApply}
    sx={{ width: '200px', mx: 'auto' }}
  >
    Apply to All
  </Button>
</Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default FlightManagement;
