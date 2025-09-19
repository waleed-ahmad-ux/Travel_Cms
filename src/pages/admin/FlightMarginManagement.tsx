import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Slider,
  Alert,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { flightMarginService, packageMarginService } from '../../services/adminService';
import type { FlightMargin, PackageMargin } from '../../types/admin';

const FlightMarginManagement: React.FC = () => {
  const [marginPercentage, setMarginPercentage] = useState(15);
  const [flightMargins, setFlightMargins] = useState<FlightMargin[]>([]);
  const [packageMargins, setPackageMargins] = useState<PackageMargin[]>([]);
  const [loading, setLoading] = useState(false);
  const [applyTarget, setApplyTarget] = useState<'flights' | 'package'>('flights');

  // Flight margins are now global; no regions list needed

  // Load existing flight margins on component mount
  useEffect(() => {
    loadFlightMargins();
    loadPackageMargins();
  }, []);

  const loadFlightMargins = async () => {
    try {
      setLoading(true);
      const margins = await flightMarginService.getFlightMargins();
      setFlightMargins(margins);
    } catch (error) {
      console.error('Error loading flight margins:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPackageMargins = async () => {
    try {
      setLoading(true);
      const margins = await packageMarginService.getPackageMargins();
      setPackageMargins(margins);
    } catch (error) {
      console.error('Error loading package margins:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateExamplePrice = (basePrice: number, marginPercentage: number) => {
    return basePrice * (1 + marginPercentage / 100);
  };

  const handleApplyToAllRegions = async () => {
    const targetLabel = applyTarget === 'flights' ? 'flight' : 'package';
    const confirmMessage = `Apply ${marginPercentage}% ${targetLabel} margin globally?\n\nThis will replace any existing ${targetLabel} margin.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      if (applyTarget === 'flights') {
        const existingMargins = await flightMarginService.getFlightMargins();
        for (const margin of existingMargins) {
          await flightMarginService.deleteFlightMargin(margin.id);
        }
        await flightMarginService.createFlightMargin({
          region: 'All',
          destination: '',
          marginPercentage,
          updatedBy: 'admin',
        });
        alert(`Successfully applied a global ${marginPercentage}% flight margin!`);
      } else {
        const existingPkgMargins = await packageMarginService.getPackageMargins();
        for (const margin of existingPkgMargins) {
          await packageMarginService.deletePackageMargin(margin.id);
        }
        await packageMarginService.createPackageMargin({
          region: 'All',
          destination: '',
          marginPercentage,
          updatedBy: 'admin',
        });
        alert(`Successfully applied a global ${marginPercentage}% package margin!`);
      }
      setMarginPercentage(15);
      // Refresh lists after applying margins
      loadFlightMargins();
      loadPackageMargins();
    } catch (error) {
      console.error('Error applying margins to all regions:', error);
      alert('Failed to apply margins. Please try again.');
    }
  };

  // No delete action in simplified view

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Flight Margin Management
      </Typography>

      <Grid container spacing={3}>
        {/* Apply Margins Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                  Apply Global Margin
                </Typography>

              <Box display="flex" flexDirection="column" gap={3} mt={2}>
                  <FormControl fullWidth>
                    <InputLabel id="apply-target-label">Apply To</InputLabel>
                    <Select
                      labelId="apply-target-label"
                      label="Apply To"
                      value={applyTarget}
                      onChange={(e) => setApplyTarget(e.target.value as 'flights' | 'package')}
                    >
                      <MenuItem value="flights">Flights Only</MenuItem>
                      <MenuItem value="package">Package</MenuItem>
                    </Select>
                  </FormControl>
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
                  This will set a global {applyTarget === 'flights' ? 'flight' : 'package'} margin of {marginPercentage}%. Existing margin will be replaced.
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
                  Apply Global Margin
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Existing Margins List */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">
                  Current Flight Margin
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={loadFlightMargins}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Typography>Loading margins...</Typography>
              ) : flightMargins.length === 0 ? (
                <Alert severity="info">
                  No flight margins have been applied yet. Use the form to apply margins to regions.
                </Alert>
              ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Margin</TableCell>
                        <TableCell>Updated By</TableCell>
                        <TableCell>Updated At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {flightMargins.map((margin) => (
                        <TableRow key={margin.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {margin.marginPercentage}%
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {margin.updatedBy}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">
                              {formatDate(margin.updatedAt)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
          {/* Current Package Margin (stacked below) */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">
                  Current Package Margin
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={loadPackageMargins}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Typography>Loading package margin...</Typography>
              ) : packageMargins.length === 0 ? (
                <Alert severity="info">No package margin has been set.</Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Margin</TableCell>
                        <TableCell>Updated By</TableCell>
                        <TableCell>Updated At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        const margin = packageMargins[0];
                        return (
                          <TableRow key={margin.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight="bold">
                                {margin.marginPercentage}%
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{margin.updatedBy}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {formatDate(margin.updatedAt)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightMarginManagement;
