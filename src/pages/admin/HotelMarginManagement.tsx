import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Slider,
  Alert,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { TrendingUp as MarginIcon } from '@mui/icons-material';
import { hotelMarginService, packageMarginService } from '../../services/adminService';
import type { HotelMargin, PackageMargin } from '../../types/admin';

const HotelManagement: React.FC = () => {
  const [marginPercentage, setMarginPercentage] = useState(10);
  const [applyTarget, setApplyTarget] = useState<'hotels' | 'package'>('hotels');
  const [rating, setRating] = useState<'5 Star' | '4 Star' | '3 Star'>('5 Star');
  const [packageRating, setPackageRating] = useState<'5 Star' | '4 Star' | '3 Star'>('5 Star');
  const [hotelMargins, setHotelMargins] = useState<HotelMargin[]>([]);
  const [packageMargins, setPackageMargins] = useState<PackageMargin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHotelMargins();
    loadPackageMargins();
  }, []);

  const loadHotelMargins = async () => {
    try {
      setLoading(true);
      const margins = await hotelMarginService.getHotelMargins();
      setHotelMargins(margins);
    } catch (error) {
      console.error('Error loading hotel margins:', error);
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

  const handleApply = async () => {
    const targetLabel = applyTarget === 'hotels' ? `hotel (${rating})` : `package (${packageRating})`;
    if (!window.confirm(`Apply ${marginPercentage}% ${targetLabel} margin?`)) return;

    try {
      if (applyTarget === 'hotels') {
        const existing = await hotelMarginService.getHotelMargins();
        // remove existing margin for this rating only
        for (const m of existing) {
          if (m.rating === rating) await hotelMarginService.deleteHotelMargin(m.id);
        }
        await hotelMarginService.createHotelMargin({
          region: 'All',
          destination: '',
          marginPercentage,
          updatedBy: 'admin',
          rating,
        });
        alert(`Applied ${marginPercentage}% hotel margin for ${rating}.`);
      } else {
        const existingPkg = await packageMarginService.getPackageMargins();
        for (const m of existingPkg) {
          if (m.rating === packageRating) await packageMarginService.deletePackageMargin(m.id);
        }
        await packageMarginService.createPackageMargin({
          region: 'All',
          destination: '',
          marginPercentage,
          updatedBy: 'admin',
          rating: packageRating,
        });
        alert(`Applied ${marginPercentage}% package margin for ${packageRating}.`);
      }
      setMarginPercentage(10);
      loadHotelMargins();
      loadPackageMargins();
    } catch (error) {
      console.error('Error applying margin:', error);
      alert('Failed to apply margin.');
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <MarginIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4">Hotel Margin Management</Typography>
      </Box>

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
                    onChange={(e) => setApplyTarget(e.target.value as 'hotels' | 'package')}
                  >
                    <MenuItem value="hotels">Hotels Only</MenuItem>
                    <MenuItem value="package">Package</MenuItem>
                  </Select>
                </FormControl>

                {applyTarget === 'hotels' && (
                  <FormControl fullWidth>
                    <InputLabel id="rating-label">Hotel Rating</InputLabel>
                    <Select
                      labelId="rating-label"
                      label="Hotel Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value as '5 Star' | '4 Star' | '3 Star')}
                    >
                      <MenuItem value="5 Star">5 Star</MenuItem>
                      <MenuItem value="4 Star">4 Star</MenuItem>
                      <MenuItem value="3 Star">3 Star</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {applyTarget === 'package' && (
                  <FormControl fullWidth>
                    <InputLabel id="pkg-rating-label">Package Rating</InputLabel>
                    <Select
                      labelId="pkg-rating-label"
                      label="Package Rating"
                      value={packageRating}
                      onChange={(e) => setPackageRating(e.target.value as '5 Star' | '4 Star' | '3 Star')}
                    >
                      <MenuItem value="5 Star">5 Star</MenuItem>
                      <MenuItem value="4 Star">4 Star</MenuItem>
                      <MenuItem value="3 Star">3 Star</MenuItem>
                    </Select>
                  </FormControl>
                )}

                <Box>
                  <Typography gutterBottom>
                    Margin Percentage: {marginPercentage}%
                  </Typography>
                  <Slider
                    value={marginPercentage}
                    onChange={(_, v) => setMarginPercentage(v as number)}
                    min={0}
                    max={50}
                    step={0.5}
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Alert severity="info">
                  {applyTarget === 'hotels' ? (
                    <>This will set a {rating} hotel margin of {marginPercentage}%. Existing {rating} margin will be replaced.</>
                  ) : (
                    <>This will set a {packageRating} package margin of {marginPercentage}%. Existing {packageRating} margin will be replaced.</>
                  )}
                </Alert>

                <Button variant="contained" color="primary" size="large" onClick={handleApply}>
                  Apply Global Margin
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Hotel Margin */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Current Hotel Margin</Typography>
                <Button variant="outlined" size="small" onClick={loadHotelMargins} disabled={loading}>
                  Refresh
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {loading ? (
                <Typography>Loading margins...</Typography>
              ) : hotelMargins.length === 0 ? (
                <Alert severity="info">No hotel margin has been set.</Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rating</TableCell>
                        <TableCell>Margin</TableCell>
                        <TableCell>Updated By</TableCell>
                        <TableCell>Updated At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hotelMargins.map((margin) => (
                        <TableRow key={margin.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">{margin.rating || '-'}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">{margin.marginPercentage}%</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{margin.updatedBy}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">{new Date(margin.updatedAt).toLocaleString()}</Typography>
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
                <Typography variant="h5">Current Package Margin</Typography>
                <Button variant="outlined" size="small" onClick={loadPackageMargins} disabled={loading}>
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
                        <TableCell>Rating</TableCell>
                        <TableCell>Margin</TableCell>
                        <TableCell>Updated By</TableCell>
                        <TableCell>Updated At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {packageMargins.map((margin) => (
                        <TableRow key={margin.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">{margin.rating || '-'}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">{margin.marginPercentage}%</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{margin.updatedBy}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">{new Date(margin.updatedAt).toLocaleString()}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
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

export default HotelManagement;
