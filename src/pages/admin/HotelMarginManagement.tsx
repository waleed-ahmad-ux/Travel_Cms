import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Fab,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as MarginIcon
} from '@mui/icons-material';

interface HotelMargin {
  id: string;
  destinationId: string;
  destinationName: string;
  hotelCategory: 'budget' | 'mid-range' | 'luxury' | 'all';
  marginPercentage: number;
  fixedMargin?: number;
  seasonalMultiplier?: number;
  updatedAt: string;
  updatedBy: string;
}

const HotelMarginManagement: React.FC = () => {
  const [margins, setMargins] = useState<HotelMargin[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openApplyAllDialog, setOpenApplyAllDialog] = useState(false);
  const [editingMargin, setEditingMargin] = useState<HotelMargin | null>(null);
  const [formData, setFormData] = useState<Omit<HotelMargin, 'id' | 'updatedAt' | 'updatedBy'>>({
    destinationId: '',
    destinationName: '',
    hotelCategory: 'all',
    marginPercentage: 0,
    fixedMargin: 0,
    seasonalMultiplier: 1
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const [applyAllData, setApplyAllData] = useState({
    hotelCategory: 'all' as 'budget' | 'mid-range' | 'luxury' | 'all',
    marginPercentage: 0,
    fixedMargin: 0,
    seasonalMultiplier: 1
  });

  const destinations = [
    { id: '1', name: 'Maldives' },
    { id: '4', name: 'Dubai' },
    { id: '6', name: 'Antigua' },
    { id: '7', name: 'Barbados' },
    { id: '9', name: 'Jamaica' },
    { id: '10', name: 'St Lucia' },
    { id: '12', name: 'Cyprus' },
    { id: '13', name: 'Greece' }
  ];

  const hotelCategories = [
    { value: 'budget', label: 'Budget' },
    { value: 'mid-range', label: 'Mid-Range' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'all', label: 'All Categories' }
  ];

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockMargins: HotelMargin[] = [
      {
        id: '1',
        destinationId: '1',
        destinationName: 'Maldives',
        hotelCategory: 'luxury',
        marginPercentage: 25,
        fixedMargin: 500,
        seasonalMultiplier: 1.2,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: '2',
        destinationId: '4',
        destinationName: 'Dubai',
        hotelCategory: 'all',
        marginPercentage: 20,
        fixedMargin: 300,
        seasonalMultiplier: 1.1,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: '3',
        destinationId: '7',
        destinationName: 'Barbados',
        hotelCategory: 'mid-range',
        marginPercentage: 18,
        fixedMargin: 200,
        seasonalMultiplier: 1.0,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      }
    ];
    setMargins(mockMargins);
  }, []);

  const handleOpenDialog = (margin?: HotelMargin) => {
    if (margin) {
      setEditingMargin(margin);
      setFormData({
        destinationId: margin.destinationId,
        destinationName: margin.destinationName,
        hotelCategory: margin.hotelCategory,
        marginPercentage: margin.marginPercentage,
        fixedMargin: margin.fixedMargin || 0,
        seasonalMultiplier: margin.seasonalMultiplier || 1
      });
    } else {
      setEditingMargin(null);
      setFormData({
        destinationId: '',
        destinationName: '',
        hotelCategory: 'all',
        marginPercentage: 0,
        fixedMargin: 0,
        seasonalMultiplier: 1
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMargin(null);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDestinationChange = (destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    setFormData(prev => ({
      ...prev,
      destinationId,
      destinationName: destination?.name || ''
    }));
  };

  const handleSubmit = async () => {
    if (!formData.destinationId || !formData.destinationName) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    try {
      if (editingMargin) {
        // Update existing margin
        const updatedMargin: HotelMargin = {
          ...editingMargin,
          ...formData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin'
        };
        setMargins(prev => prev.map(margin => 
          margin.id === editingMargin.id ? updatedMargin : margin
        ));
        setSnackbar({
          open: true,
          message: 'Hotel margin updated successfully',
          severity: 'success'
        });
      } else {
        // Add new margin
        const newMargin: HotelMargin = {
          id: `margin_${Date.now()}`,
          ...formData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin'
        };
        setMargins(prev => [...prev, newMargin]);
        setSnackbar({
          open: true,
          message: 'Hotel margin added successfully',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving hotel margin:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save hotel margin',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (marginId: string) => {
    if (window.confirm('Are you sure you want to delete this hotel margin?')) {
      try {
        setMargins(prev => prev.filter(margin => margin.id !== marginId));
        setSnackbar({
          open: true,
          message: 'Hotel margin deleted successfully',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error deleting hotel margin:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete hotel margin',
          severity: 'error'
        });
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budget': return 'default';
      case 'mid-range': return 'primary';
      case 'luxury': return 'secondary';
      case 'all': return 'success';
      default: return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    return hotelCategories.find(cat => cat.value === category)?.label || category;
  };

  const handleApplyToAll = () => {
    if (!applyAllData.marginPercentage) {
      setSnackbar({
        open: true,
        message: 'Please enter a margin percentage',
        severity: 'error'
      });
      return;
    }

    try {
      const newMargins: HotelMargin[] = destinations.map(dest => ({
        id: `margin_${Date.now()}_${dest.id}`,
        destinationId: dest.id,
        destinationName: dest.name,
        hotelCategory: applyAllData.hotelCategory,
        marginPercentage: applyAllData.marginPercentage,
        fixedMargin: applyAllData.fixedMargin,
        seasonalMultiplier: applyAllData.seasonalMultiplier,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      }));

      // Remove existing margins for the same category and add new ones
      const filteredMargins = margins.filter(margin => 
        !(destinations.some(dest => dest.id === margin.destinationId) && 
          margin.hotelCategory === applyAllData.hotelCategory)
      );

      setMargins([...filteredMargins, ...newMargins]);
      setOpenApplyAllDialog(false);
      setApplyAllData({
        hotelCategory: 'all',
        marginPercentage: 0,
        fixedMargin: 0,
        seasonalMultiplier: 1
      });
      setSnackbar({
        open: true,
        message: `Margin applied to all destinations for ${getCategoryLabel(applyAllData.hotelCategory)} category`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error applying margins to all:', error);
      setSnackbar({
        open: true,
        message: 'Failed to apply margins to all destinations',
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <MarginIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4">Hotel Margin Management</Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenApplyAllDialog(true)}
          >
            Apply to All
          </Button>
          <Tooltip title="Add New Hotel Margin">
            <Fab
              color="primary"
              aria-label="add hotel margin"
              onClick={() => handleOpenDialog()}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Margins
              </Typography>
              <Typography variant="h4">
                {margins.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Destinations
              </Typography>
              <Typography variant="h4">
                {new Set(margins.map(m => m.destinationId)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Margin %
              </Typography>
              <Typography variant="h4">
                {(margins.reduce((acc, margin) => acc + margin.marginPercentage, 0) / margins.length).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Fixed Margins
              </Typography>
              <Typography variant="h4">
                £{(margins.reduce((acc, margin) => acc + (margin.fixedMargin || 0), 0) / 1000).toFixed(0)}k
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Destination</TableCell>
              <TableCell>Hotel Category</TableCell>
              <TableCell>Margin %</TableCell>
              <TableCell>Fixed Margin</TableCell>
              <TableCell>Seasonal Multiplier</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {margins.map((margin) => (
              <TableRow key={margin.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {margin.destinationName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getCategoryLabel(margin.hotelCategory)}
                    size="small"
                    color={getCategoryColor(margin.hotelCategory) as any}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    {margin.marginPercentage}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    £{margin.fixedMargin?.toLocaleString() || '0'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {margin.seasonalMultiplier}x
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(margin.updatedAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(margin)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(margin.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Margin Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingMargin ? 'Edit Hotel Margin' : 'Add New Hotel Margin'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Destination</InputLabel>
                <Select
                  value={formData.destinationId}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  label="Destination"
                >
                  {destinations.map((dest) => (
                    <MenuItem key={dest.id} value={dest.id}>
                      {dest.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Hotel Category</InputLabel>
                <Select
                  value={formData.hotelCategory}
                  onChange={(e) => handleInputChange('hotelCategory', e.target.value)}
                  label="Hotel Category"
                >
                  {hotelCategories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Margin Percentage (%)"
                type="number"
                value={formData.marginPercentage}
                onChange={(e) => handleInputChange('marginPercentage', Number(e.target.value))}
                required
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Fixed Margin (£)"
                type="number"
                value={formData.fixedMargin}
                onChange={(e) => handleInputChange('fixedMargin', Number(e.target.value))}
                inputProps={{ min: 0, step: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Seasonal Multiplier"
                type="number"
                value={formData.seasonalMultiplier}
                onChange={(e) => handleInputChange('seasonalMultiplier', Number(e.target.value))}
                inputProps={{ min: 0.1, max: 3, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMargin ? 'Update' : 'Add'} Margin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Apply to All Dialog */}
      <Dialog open={openApplyAllDialog} onClose={() => setOpenApplyAllDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply Margin to All Destinations</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Hotel Category</InputLabel>
                <Select
                  value={applyAllData.hotelCategory}
                  onChange={(e) => setApplyAllData(prev => ({ 
                    ...prev, 
                    hotelCategory: e.target.value as 'budget' | 'mid-range' | 'luxury' | 'all' 
                  }))}
                  label="Hotel Category"
                >
                  {hotelCategories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Margin Percentage (%)"
                type="number"
                value={applyAllData.marginPercentage}
                onChange={(e) => setApplyAllData(prev => ({ 
                  ...prev, 
                  marginPercentage: Number(e.target.value) 
                }))}
                required
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fixed Margin (£)"
                type="number"
                value={applyAllData.fixedMargin}
                onChange={(e) => setApplyAllData(prev => ({ 
                  ...prev, 
                  fixedMargin: Number(e.target.value) 
                }))}
                inputProps={{ min: 0, step: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Seasonal Multiplier"
                type="number"
                value={applyAllData.seasonalMultiplier}
                onChange={(e) => setApplyAllData(prev => ({ 
                  ...prev, 
                  seasonalMultiplier: Number(e.target.value) 
                }))}
                inputProps={{ min: 0.1, max: 3, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                This will apply the margin settings to all {destinations.length} destinations for the selected hotel category. 
                Existing margins for the same category will be replaced.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplyAllDialog(false)}>Cancel</Button>
          <Button onClick={handleApplyToAll} variant="contained" color="secondary">
            Apply to All Destinations
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HotelMarginManagement;
