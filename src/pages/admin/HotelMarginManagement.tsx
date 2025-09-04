import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { TrendingUp as MarginIcon } from '@mui/icons-material';

const HotelManagement: React.FC = () => {
  const [starRating, setStarRating] = useState('');
  const [margin, setMargin] = useState('');

  const handleApply = () => {
    alert(`Applied:
Hotel Star Rating: ${starRating}
Hotel Margin: ${margin}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={3}
    >
      <Box maxWidth={600} width="100%" textAlign="center">
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={3}>
          <MarginIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4">Hotel Rating And Margin</Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {/* Star Rating */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Hotel Star Rating</InputLabel>
              <Select
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
                label="Hotel Star Rating"
              >
                <MenuItem value="5 Star">5 Star</MenuItem>
                <MenuItem value="4 Star">4 Star</MenuItem>
                <MenuItem value="3 Star">3 Star</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Hotel Margin */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Hotel Margin</InputLabel>
              <Select
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                label="Hotel Margin"
              >
                <MenuItem value="10%">10%</MenuItem>
                <MenuItem value="15%">15%</MenuItem>
                <MenuItem value="20%">20%</MenuItem>
                <MenuItem value="25%">25%</MenuItem>
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

export default HotelManagement;
