import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Slider,
  Alert,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { flightMarginService } from '../../services/adminService';

const FlightMarginManagement: React.FC = () => {
  const [marginPercentage, setMarginPercentage] = useState(15);

  const regions = ['Asia', 'Caribbean', 'Europe', 'Middle East', 'Africa', 'Americas'];

  const calculateExamplePrice = (basePrice: number, marginPercentage: number) => {
    return basePrice * (1 + marginPercentage / 100);
  };

  const handleApplyToAllRegions = async () => {
    try {
      const newMargins = regions.map(region => ({
        region,
        destination: '',
        marginPercentage,
        updatedBy: 'admin',
      }));

      for (const marginData of newMargins) {
        await flightMarginService.createFlightMargin(marginData);
      }

      alert('Margins applied to all regions successfully!');
      setMarginPercentage(15);
    } catch (error) {
      console.error('Error applying margins to all regions:', error);
      alert('Failed to apply margins. Please try again.');
    }
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
      <Box maxWidth={600} width="100%">
        <Typography variant="h4" gutterBottom textAlign="center">
          Apply Flight Margin to All Regions
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          {/* Margin Percentage Slider */}
          <Box>
            <Typography gutterBottom>
              Margin Percentage: {marginPercentage}%
            </Typography>
            <Slider
              value={marginPercentage}
              onChange={(_, value) => setMarginPercentage(value as number)}
              min={0}
              max={50}
              step={0.5}
              marks={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
                { value: 50, label: '50%' },
              ]}
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Info */}
          <Alert severity="info">
            This will apply the margin percentage to all {regions.length} regions. Existing margins will be replaced.
          </Alert>

          {/* Price Preview */}
          <Card sx={{ bgcolor: 'grey.50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Price Preview
              </Typography>
              <Grid container spacing={2}>
                {[500, 1000, 2000].map(basePrice => (
                  <Grid item xs={4} key={basePrice}>
                    <Typography variant="body2" color="textSecondary">
                      Base: £{basePrice}
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      Final: £{calculateExamplePrice(basePrice, marginPercentage).toFixed(0)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleApplyToAllRegions}
          >
            Apply to All Regions
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightMarginManagement;
