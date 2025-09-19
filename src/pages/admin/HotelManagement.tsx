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
  Rating,
  Chip,
  Alert,
  Snackbar,
  Fab,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Avatar,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Hotel as HotelIcon,
  Visibility,
  VisibilityOff,
  Search
} from '@mui/icons-material';
import type { Hotel } from '../../types/index';
import { hotelService } from '../../services/adminService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

interface HotelFormData {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  location: string;
  priceForTwo: number;
  pricePerPerson: number;
  nightsAndBoard: string;
  offers: string;
  destinationId: string;
  isActive: boolean;
}

const HotelManagement: React.FC = () => {
  const [hotelsList, setHotelsList] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState<HotelFormData>({
    id: '',
    name: '',
    imageUrl: '',
    rating: 3,
    location: '',
    priceForTwo: 0,
    pricePerPerson: 0,
    nightsAndBoard: '',
    offers: '',
    destinationId: '',
    isActive: true
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const hotels = await hotelService.getHotels();
        setHotelsList(hotels);
      } catch (error) {
        console.error('Error loading hotels:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load hotels',
          severity: 'error'
        });
      }
    };

    loadHotels();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [searchTerm, destinationFilter, statusFilter, ratingFilter, tabValue, hotelsList]);

  const filterHotels = () => {
    let filtered = [...hotelsList];

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(hotel => hotel.isActive);
    } else if (tabValue === 2) {
      filtered = filtered.filter(hotel => !hotel.isActive);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.offers.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by destination
    if (destinationFilter) {
      filtered = filtered.filter(hotel => hotel.destinationId === destinationFilter);
    }

    // Filter by status
    if (statusFilter) {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(hotel => hotel.isActive === isActive);
    }

    // Filter by rating
    if (ratingFilter) {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter(hotel => hotel.rating >= minRating);
    }

    setFilteredHotels(filtered);
  };

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

  const handleOpenDialog = (hotel?: Hotel) => {
    if (hotel) {
      setEditingHotel(hotel);
      setFormData({
        id: hotel.id,
        name: hotel.name,
        imageUrl: hotel.imageUrl,
        rating: hotel.rating,
        location: hotel.location,
        priceForTwo: hotel.priceForTwo,
        pricePerPerson: hotel.pricePerPerson,
        nightsAndBoard: hotel.nightsAndBoard,
        offers: hotel.offers,
        destinationId: hotel.destinationId,
        isActive: hotel.isActive ?? true
      });
    } else {
      setEditingHotel(null);
      setFormData({
        id: `h_${Date.now()}`,
        name: '',
        imageUrl: '',
        rating: 3,
        location: '',
        priceForTwo: 0,
        pricePerPerson: 0,
        nightsAndBoard: '',
        offers: '',
        destinationId: '',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHotel(null);
  };

  const handleInputChange = (field: keyof HotelFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.destinationId) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    try {
      if (editingHotel) {
        // Update existing hotel
        await hotelService.updateHotel(editingHotel.id, formData);
        setHotelsList(prev => prev.map(hotel => 
          hotel.id === editingHotel.id ? { ...hotel, ...formData } : hotel
        ));
        setSnackbar({
          open: true,
          message: 'Hotel updated successfully',
          severity: 'success'
        });
      } else {
        // Add new hotel
        const newHotel = await hotelService.createHotel(formData);
        setHotelsList(prev => [...prev, newHotel]);
        setSnackbar({
          open: true,
          message: 'Hotel added successfully',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving hotel:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save hotel',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (hotelId: string) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await hotelService.deleteHotel(hotelId);
        setHotelsList(prev => prev.filter(hotel => hotel.id !== hotelId));
        setSnackbar({
          open: true,
          message: 'Hotel deleted successfully',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error deleting hotel:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete hotel',
          severity: 'error'
        });
      }
    }
  };

  const getDestinationName = (destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    return destination?.name || 'Unknown';
  };

  const handleToggleVisibility = async (hotel: Hotel) => {
    try {
      const updatedHotel = { ...hotel, isActive: !hotel.isActive };
      await hotelService.updateHotel(hotel.id, updatedHotel);
      setHotelsList(prev => prev.map(h => 
        h.id === hotel.id ? updatedHotel : h
      ));
      setSnackbar({
        open: true,
        message: `Hotel ${updatedHotel.isActive ? 'activated' : 'deactivated'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error toggling hotel visibility:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update hotel status',
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <HotelIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4">Hotel Management</Typography>
        </Box>
        <Tooltip title="Add New Hotel">
          <Fab
            color="primary"
            aria-label="add hotel"
            onClick={() => handleOpenDialog()}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Hotels
              </Typography>
              <Typography variant="h4">
                {filteredHotels.length}
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
                {new Set(filteredHotels.map(h => h.destinationId)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h4">
                {filteredHotels.length > 0 ? (filteredHotels.reduce((acc, hotel) => acc + hotel.rating, 0) / filteredHotels.length).toFixed(1) : '0.0'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4">
                £{filteredHotels.length > 0 ? (filteredHotels.reduce((acc, hotel) => acc + hotel.priceForTwo, 0) / 1000).toFixed(0) : '0'}k
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Box mb={3}>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={2}>
          <TextField
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Destination</InputLabel>
            <Select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              label="Filter by Destination"
            >
              <MenuItem value="">All Destinations</MenuItem>
              {destinations.map(destination => (
                <MenuItem key={destination.id} value={destination.id}>
                  {destination.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Min Rating</InputLabel>
            <Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              label="Min Rating"
            >
              <MenuItem value="">All Ratings</MenuItem>
              <MenuItem value="1">1+ Star</MenuItem>
              <MenuItem value="2">2+ Stars</MenuItem>
              <MenuItem value="3">3+ Stars</MenuItem>
              <MenuItem value="4">4+ Stars</MenuItem>
              <MenuItem value="5">5 Stars</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label={`All Hotels (${hotelsList.length})`} />
            <Tab label={`Active (${hotelsList.filter(h => h.isActive).length})`} />
            <Tab label={`Inactive (${hotelsList.filter(h => !h.isActive).length})`} />
          </Tabs>
        </Box>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell>Hotel</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Price (for 2)</TableCell>
                <TableCell>Board</TableCell>
                <TableCell>Offers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'background.paper', zIndex: 1 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      src={hotel.imageUrl}
                      variant="rounded"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {hotel.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ID: {hotel.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={getDestinationName(hotel.destinationId)}
                    size="small"
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Rating value={hotel.rating} readOnly size="small" />
                </TableCell>
                <TableCell>£{hotel.priceForTwo.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={hotel.nightsAndBoard}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main">
                    {hotel.offers}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={hotel.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    color={hotel.isActive ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'background.paper', zIndex: 1 }}>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleVisibility(hotel)}
                      color={hotel.isActive ? 'success' : 'default'}
                    >
                      {hotel.isActive ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(hotel)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(hotel.id)}
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
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell>Hotel</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Price (for 2)</TableCell>
                <TableCell>Board</TableCell>
                <TableCell>Offers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'background.paper', zIndex: 1 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={hotel.imageUrl}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {hotel.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ID: {hotel.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getDestinationName(hotel.destinationId)}
                      size="small"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Rating value={hotel.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>£{hotel.priceForTwo.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={hotel.nightsAndBoard}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="success.main">
                      {hotel.offers}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={hotel.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      color={hotel.isActive ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleVisibility(hotel)}
                        color={hotel.isActive ? 'success' : 'default'}
                      >
                        {hotel.isActive ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(hotel)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(hotel.id)}
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
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell>Hotel</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Price (for 2)</TableCell>
                <TableCell>Board</TableCell>
                <TableCell>Offers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'background.paper', zIndex: 1 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={hotel.imageUrl}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {hotel.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ID: {hotel.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getDestinationName(hotel.destinationId)}
                      size="small"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Rating value={hotel.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>£{hotel.priceForTwo.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={hotel.nightsAndBoard}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="success.main">
                      {hotel.offers}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={hotel.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      color={hotel.isActive ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleVisibility(hotel)}
                        color={hotel.isActive ? 'success' : 'default'}
                      >
                        {hotel.isActive ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(hotel)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(hotel.id)}
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
      </TabPanel>

      {/* Add/Edit Hotel Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hotel Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Destination</InputLabel>
                <Select
                  value={formData.destinationId}
                  onChange={(e) => handleInputChange('destinationId', e.target.value)}
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
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>Rating:</Typography>
                <Rating
                  value={formData.rating}
                  onChange={(_, value) => handleInputChange('rating', value || 3)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price for Two (£)"
                type="number"
                value={formData.priceForTwo}
                onChange={(e) => handleInputChange('priceForTwo', Number(e.target.value))}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price per Person (£)"
                type="number"
                value={formData.pricePerPerson}
                onChange={(e) => handleInputChange('pricePerPerson', Number(e.target.value))}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nights & Board"
                value={formData.nightsAndBoard}
                onChange={(e) => handleInputChange('nightsAndBoard', e.target.value)}
                placeholder="e.g., 7 NIGHTS ALL INCLUSIVE"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Offers"
                value={formData.offers}
                onChange={(e) => handleInputChange('offers', e.target.value)}
                placeholder="e.g., Early Bird Discount"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                }
                label="Active (Visible on frontend)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingHotel ? 'Update' : 'Add'} Hotel
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

export default HotelManagement;
