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
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FlightTakeoff as FlightIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

interface Flight {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  isDirect: boolean;
  numberOfStops: number;
  isActive: boolean;
  isVisible: boolean;
  updatedAt: string;
  updatedBy: string;
}

const FlightManagement: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [formData, setFormData] = useState<Omit<Flight, 'id' | 'updatedAt' | 'updatedBy'>>({
    departureAirport: '',
    arrivalAirport: '',
    isDirect: true,
    numberOfStops: 0,
    isActive: true,
    isVisible: true
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });



  const airports = [
    { code: 'LHR', name: 'London Heathrow' },
    { code: 'LGW', name: 'London Gatwick' },
    { code: 'STN', name: 'London Stansted' },
    { code: 'LTN', name: 'London Luton' },
    { code: 'LCY', name: 'London City' },
    { code: 'MAN', name: 'Manchester' },
    { code: 'BHX', name: 'Birmingham' },
    { code: 'EDI', name: 'Edinburgh' },
    { code: 'GLA', name: 'Glasgow' },
    { code: 'BRS', name: 'Bristol' }
  ];



  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockFlights: Flight[] = [
      {
        id: '1',
        departureAirport: 'LHR',
        arrivalAirport: 'JFK',
        isDirect: true,
        numberOfStops: 0,
        isActive: true,
        isVisible: true,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: '2',
        departureAirport: 'LHR',
        arrivalAirport: 'DXB',
        isDirect: true,
        numberOfStops: 0,
        isActive: true,
        isVisible: true,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: '3',
        departureAirport: 'LHR',
        arrivalAirport: 'DOH',
        isDirect: true,
        numberOfStops: 0,
        isActive: true,
        isVisible: true,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: '4',
        departureAirport: 'LHR',
        arrivalAirport: 'IST',
        isDirect: true,
        numberOfStops: 0,
        isActive: true,
        isVisible: true,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: '5',
        departureAirport: 'LGW',
        arrivalAirport: 'CDG',
        isDirect: true,
        numberOfStops: 0,
        isActive: true,
        isVisible: true,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      }
    ];
    setFlights(mockFlights);
  }, []);

  const handleOpenDialog = (flight?: Flight) => {
    if (flight) {
      setEditingFlight(flight);
      setFormData({
        departureAirport: flight.departureAirport,
        arrivalAirport: flight.arrivalAirport,
        isDirect: flight.isDirect,
        numberOfStops: flight.numberOfStops,
        isActive: flight.isActive,
        isVisible: flight.isVisible
      });
    } else {
      setEditingFlight(null);
      setFormData({
        departureAirport: '',
        arrivalAirport: '',
        isDirect: true,
        numberOfStops: 0,
        isActive: true,
        isVisible: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFlight(null);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.departureAirport || !formData.arrivalAirport) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    try {
      if (editingFlight) {
        // Update existing flight
        const updatedFlight: Flight = {
          ...editingFlight,
          ...formData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin'
        };
        setFlights(prev => prev.map(flight => 
          flight.id === editingFlight.id ? updatedFlight : flight
        ));
        setSnackbar({
          open: true,
          message: 'Flight updated successfully',
          severity: 'success'
        });
      } else {
        // Add new flight
        const newFlight: Flight = {
          id: `flight_${Date.now()}`,
          ...formData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin'
        };
        setFlights(prev => [...prev, newFlight]);
        setSnackbar({
          open: true,
          message: 'Flight added successfully',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving flight:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save flight',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (flightId: string) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        setFlights(prev => prev.filter(flight => flight.id !== flightId));
        setSnackbar({
          open: true,
          message: 'Flight deleted successfully',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error deleting flight:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete flight',
          severity: 'error'
        });
      }
    }
  };

  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? `${code} - ${airport.name}` : code;
  };

  const getFlightTypeColor = (isDirect: boolean, stops: number) => {
    if (isDirect) return 'success';
    if (stops === 1) return 'warning';
    return 'error';
  };

  const getFlightTypeLabel = (isDirect: boolean, stops: number) => {
    if (isDirect) return 'Direct';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  };

  const handleToggleVisibility = (flight: Flight) => {
    const updatedFlight = { ...flight, isVisible: !flight.isVisible };
    setFlights(prev => prev.map(f => 
      f.id === flight.id ? updatedFlight : f
    ));
    setSnackbar({
      open: true,
      message: `Flight ${updatedFlight.isVisible ? 'made visible' : 'hidden'} successfully`,
      severity: 'success'
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <FlightIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4">Flight Management</Typography>
        </Box>
        <Tooltip title="Add New Flight">
          <Fab
            color="primary"
            aria-label="add flight"
            onClick={() => handleOpenDialog()}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Flights
              </Typography>
              <Typography variant="h4">
                {flights.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Flights
              </Typography>
              <Typography variant="h4">
                {flights.filter(f => f.isActive).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Direct Flights
              </Typography>
              <Typography variant="h4">
                {flights.filter(f => f.isDirect).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
                      <TableHead>
              <TableRow>
                <TableCell>Route</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FlightIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                      {flight.departureAirport} → {flight.arrivalAirport}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {getAirportName(flight.departureAirport)} → {getAirportName(flight.arrivalAirport)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getFlightTypeLabel(flight.isDirect, flight.numberOfStops)}
                    size="small"
                    color={getFlightTypeColor(flight.isDirect, flight.numberOfStops) as any}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={flight.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    color={flight.isActive ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={flight.isVisible ? 'Visible' : 'Hidden'}
                    size="small"
                    color={flight.isVisible ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleVisibility(flight)}
                      color={flight.isVisible ? 'success' : 'default'}
                    >
                      {flight.isVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(flight)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(flight.id)}
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

      {/* Add/Edit Flight Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingFlight ? 'Edit Flight' : 'Add New Flight'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Departure Airport</InputLabel>
                <Select
                  value={formData.departureAirport}
                  onChange={(e) => handleInputChange('departureAirport', e.target.value)}
                  label="Departure Airport"
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Arrival Airport</InputLabel>
                <Select
                  value={formData.arrivalAirport}
                  onChange={(e) => handleInputChange('arrivalAirport', e.target.value)}
                  label="Arrival Airport"
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isDirect}
                    onChange={(e) => handleInputChange('isDirect', e.target.checked)}
                  />
                }
                label="Direct Flight"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Stops"
                type="number"
                value={formData.numberOfStops}
                onChange={(e) => handleInputChange('numberOfStops', Number(e.target.value))}
                disabled={formData.isDirect}
                inputProps={{ min: 0, max: 5 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                }
                label="Active Flight"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isVisible}
                    onChange={(e) => handleInputChange('isVisible', e.target.checked)}
                  />
                }
                label="Visible on Frontend"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingFlight ? 'Update' : 'Add'} Flight
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

export default FlightManagement;
