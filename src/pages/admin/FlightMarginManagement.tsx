import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Alert,
  Card,
  CardContent,
  Grid,
  Slider
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  TrendingUp,
  FlightTakeoff,
  AttachMoney,
  Percent
} from '@mui/icons-material';
import { flightMarginService } from '../../services/adminService';
import type { FlightMargin } from '../../types/admin';

const FlightMarginManagement: React.FC = () => {
  const [margins, setMargins] = useState<FlightMargin[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openApplyAllDialog, setOpenApplyAllDialog] = useState(false);
  const [editingMargin, setEditingMargin] = useState<FlightMargin | null>(null);

  const [formData, setFormData] = useState<Partial<FlightMargin>>({
    region: '',
    destination: '',
    marginPercentage: 15,
    fixedMargin: 0,
    seasonalMultiplier: 1,
    updatedBy: 'admin'
  });

  const [applyAllData, setApplyAllData] = useState({
    region: '',
    marginPercentage: 15,
    fixedMargin: 0,
    seasonalMultiplier: 1
  });

  const regions = ['Asia', 'Caribbean', 'Europe', 'Middle East', 'Africa', 'Americas'];

  useEffect(() => {
    loadMargins();
  }, []);

  const loadMargins = async () => {
    try {
      const data = await flightMarginService.getFlightMargins();
      setMargins(data);
    } catch (error) {
      console.error('Error loading flight margins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (margin?: FlightMargin) => {
    if (margin) {
      setEditingMargin(margin);
      setFormData(margin);
    } else {
      setEditingMargin(null);
      setFormData({
        region: '',
        destination: '',
        marginPercentage: 15,
        fixedMargin: 0,
        seasonalMultiplier: 1,
        updatedBy: 'admin'
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingMargin(null);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      if (editingMargin) {
        await flightMarginService.updateFlightMargin(editingMargin.id, formData);
      } else {
        await flightMarginService.createFlightMargin(formData as Omit<FlightMargin, 'id' | 'updatedAt'>);
      }
      await loadMargins();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving flight margin:', error);
    }
  };

  const handleDelete = async (marginId: string) => {
    if (window.confirm('Are you sure you want to delete this flight margin configuration?')) {
      try {
        await flightMarginService.deleteFlightMargin(marginId);
        await loadMargins();
      } catch (error) {
        console.error('Error deleting flight margin:', error);
      }
    }
  };

  const getMarginColor = (percentage: number) => {
    if (percentage < 10) return 'success';
    if (percentage < 20) return 'warning';
    return 'error';
  };

  const calculateExamplePrice = (basePrice: number, marginPercentage: number, fixedMargin: number = 0, seasonalMultiplier: number = 1) => {
    return ((basePrice * (1 + marginPercentage / 100)) + fixedMargin) * seasonalMultiplier;
  };

  const handleApplyToAllRegions = async () => {
    if (!applyAllData.region || !applyAllData.marginPercentage) {
      alert('Please select a region and enter a margin percentage');
      return;
    }

    try {
      const newMargins: Omit<FlightMargin, 'id' | 'updatedAt'>[] = regions.map(region => ({
        region,
        destination: '',
        marginPercentage: applyAllData.marginPercentage,
        fixedMargin: applyAllData.fixedMargin,
        seasonalMultiplier: applyAllData.seasonalMultiplier,
        updatedBy: 'admin'
      }));

      // Remove existing margins for all regions and add new ones
      for (const marginData of newMargins) {
        await flightMarginService.createFlightMargin(marginData);
      }

      await loadMargins();
      setOpenApplyAllDialog(false);
      setApplyAllData({
        region: '',
        marginPercentage: 15,
        fixedMargin: 0,
        seasonalMultiplier: 1
      });
    } catch (error) {
      console.error('Error applying margins to all regions:', error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Flight Margin Management
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenApplyAllDialog(true)}
          >
            Apply to All Regions
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Margin Rule
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Configure profit margins for different regions and destinations. These margins will be automatically applied to flight prices.
      </Alert>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <FlightTakeoff color="primary" />
                <Box>
                  <Typography variant="h6">{margins.length}</Typography>
                  <Typography color="textSecondary">Active Rules</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Percent color="success" />
                <Box>
                  <Typography variant="h6">
                    {margins.length > 0 ? (margins.reduce((sum, m) => sum + m.marginPercentage, 0) / margins.length).toFixed(1) : 0}%
                  </Typography>
                  <Typography color="textSecondary">Avg Margin</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <TrendingUp color="warning" />
                <Box>
                  <Typography variant="h6">
                    {Math.max(...margins.map(m => m.marginPercentage), 0)}%
                  </Typography>
                  <Typography color="textSecondary">Highest Margin</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <AttachMoney color="info" />
                <Box>
                  <Typography variant="h6">
                    £{margins.reduce((sum, m) => sum + (m.fixedMargin || 0), 0)}
                  </Typography>
                  <Typography color="textSecondary">Total Fixed</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Margins Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Region</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Margin %</TableCell>
              <TableCell>Fixed Margin</TableCell>
              <TableCell>Seasonal Multiplier</TableCell>
              <TableCell>Example (£500 base)</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {margins.map((margin) => (
              <TableRow key={margin.id}>
                <TableCell>
                  <Chip label={margin.region} color="primary" size="small" />
                </TableCell>
                <TableCell>
                  {margin.destination || <Typography color="textSecondary">All destinations</Typography>}
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${margin.marginPercentage}%`}
                    color={getMarginColor(margin.marginPercentage) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {margin.fixedMargin ? `£${margin.fixedMargin}` : '-'}
                </TableCell>
                <TableCell>
                  {margin.seasonalMultiplier ? `${margin.seasonalMultiplier}x` : '-'}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main">
                    £{calculateExamplePrice(500, margin.marginPercentage, margin.fixedMargin, margin.seasonalMultiplier).toFixed(0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(margin.updatedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    by {margin.updatedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(margin)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(margin.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {margins.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            No margin rules configured
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Add margin rules to automatically calculate flight prices
          </Typography>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingMargin ? 'Edit Flight Margin' : 'Add Flight Margin Rule'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <Box display="flex" gap={2}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={formData.region || ''}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  label="Region"
                  required
                >
                  {regions.map(region => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Specific Destination (optional)"
                value={formData.destination || ''}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Leave empty for all destinations in region"
              />
            </Box>

            <Box>
              <Typography gutterBottom>
                Margin Percentage: {formData.marginPercentage || 0}%
              </Typography>
              <Slider
                value={formData.marginPercentage || 0}
                onChange={(_, value) => setFormData({ ...formData, marginPercentage: value as number })}
                min={0}
                max={50}
                step={0.5}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 10, label: '10%' },
                  { value: 20, label: '20%' },
                  { value: 30, label: '30%' },
                  { value: 50, label: '50%' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Fixed Margin (£)"
                type="number"
                value={formData.fixedMargin || ''}
                onChange={(e) => setFormData({ ...formData, fixedMargin: parseFloat(e.target.value) || 0 })}
                helperText="Additional fixed amount added to price"
              />

              <TextField
                fullWidth
                label="Seasonal Multiplier"
                type="number"
                inputProps={{ step: 0.1, min: 0.1, max: 3 }}
                value={formData.seasonalMultiplier || 1}
                onChange={(e) => setFormData({ ...formData, seasonalMultiplier: parseFloat(e.target.value) || 1 })}
                helperText="Peak season multiplier (e.g., 1.2 for 20% increase)"
              />
            </Box>

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
                        Final: £{calculateExamplePrice(
                          basePrice,
                          formData.marginPercentage || 0,
                          formData.fixedMargin || 0,
                          formData.seasonalMultiplier || 1
                        ).toFixed(0)}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingMargin ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Apply to All Regions Dialog */}
      <Dialog open={openApplyAllDialog} onClose={() => setOpenApplyAllDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply Margin to All Regions</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <FormControl fullWidth required>
              <InputLabel>Region</InputLabel>
              <Select
                value={applyAllData.region}
                onChange={(e) => setApplyAllData(prev => ({ ...prev, region: e.target.value }))}
                label="Region"
              >
                {regions.map(region => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography gutterBottom>
                Margin Percentage: {applyAllData.marginPercentage}%
              </Typography>
              <Slider
                value={applyAllData.marginPercentage}
                onChange={(_, value) => setApplyAllData(prev => ({ ...prev, marginPercentage: value as number }))}
                min={0}
                max={50}
                step={0.5}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 10, label: '10%' },
                  { value: 20, label: '20%' },
                  { value: 30, label: '30%' },
                  { value: 50, label: '50%' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Fixed Margin (£)"
                type="number"
                value={applyAllData.fixedMargin}
                onChange={(e) => setApplyAllData(prev => ({ ...prev, fixedMargin: parseFloat(e.target.value) || 0 }))}
                helperText="Additional fixed amount added to price"
              />

              <TextField
                fullWidth
                label="Seasonal Multiplier"
                type="number"
                inputProps={{ step: 0.1, min: 0.1, max: 3 }}
                value={applyAllData.seasonalMultiplier}
                onChange={(e) => setApplyAllData(prev => ({ ...prev, seasonalMultiplier: parseFloat(e.target.value) || 1 }))}
                helperText="Peak season multiplier"
              />
            </Box>

            <Alert severity="info">
              This will apply the margin settings to all {regions.length} regions. 
              Existing margins for the same regions will be replaced.
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
                        Final: £{calculateExamplePrice(
                          basePrice,
                          applyAllData.marginPercentage,
                          applyAllData.fixedMargin,
                          applyAllData.seasonalMultiplier
                        ).toFixed(0)}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplyAllDialog(false)}>Cancel</Button>
          <Button onClick={handleApplyToAllRegions} variant="contained" color="secondary">
            Apply to All Regions
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlightMarginManagement;
