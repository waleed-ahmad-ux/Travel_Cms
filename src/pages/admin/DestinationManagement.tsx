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
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Avatar,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  Search
} from '@mui/icons-material';
import { destinations } from '../../services/destinationService';
import type { CMSDestination } from '../../types/index';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const DestinationManagement: React.FC = () => {
  const [destinationList, setDestinationList] = useState<CMSDestination[]>(
    destinations.map(dest => ({
      ...dest,
      about: dest.id === '5' ? 
        "Uncover the Wonders of Thailand\n\nWelcome to Thailand! From the bustling streets of Bangkok to the tranquil beaches of Phuket and the lush jungles of Chiang Mai, Thailand offers a world of adventure, relaxation, and cultural discovery.\n\nWhether you're seeking vibrant nightlife, ancient temples, or world-class cuisine, Thailand has something for everyone. Enjoy luxury resorts, friendly locals, and unforgettable experiences. Book your 2025 and 2026 Thailand holidays now and start your journey to the Land of Smiles!" 
        : undefined,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      gallery: []
    }))
  );
  const [filteredDestinations, setFilteredDestinations] = useState<CMSDestination[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<CMSDestination | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const [formData, setFormData] = useState<Partial<CMSDestination>>({
    name: '',
    description: '',
    about: '',
    imageUrl: '',
    region: '',
    activities: [],
    isPublished: true
  });

  const regions = ['Asia', 'Caribbean', 'Europe', 'Middle East'];

  useEffect(() => {
    filterDestinations();
  }, [searchTerm, regionFilter, destinationList]);

  const filterDestinations = () => {
    let filtered = [...destinationList];

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(dest => dest.isPublished);
    } else if (tabValue === 2) {
      filtered = filtered.filter(dest => !dest.isPublished);
    }

    if (searchTerm) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dest.about && dest.about.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (regionFilter) {
      filtered = filtered.filter(dest => dest.region === regionFilter);
    }

    setFilteredDestinations(filtered);
  };

  const handleOpenDialog = (destination?: CMSDestination) => {
    if (destination) {
      setEditingDestination(destination);
      setFormData(destination);
    } else {
      setEditingDestination(null);
      setFormData({
        name: '',
        description: '',
        about: '',
        imageUrl: '',
        region: '',
        activities: [],
        isPublished: true
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingDestination(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingDestination) {
      // Update existing destination
      const updatedList = destinationList.map(dest =>
        dest.id === editingDestination.id ? { 
          ...dest, 
          ...formData,
          updatedAt: new Date().toISOString()
        } : dest
      );
      setDestinationList(updatedList);
    } else {
      // Add new destination
      const newDestination: CMSDestination = {
        id: (destinationList.length + 1).toString(),
        name: formData.name || '',
        description: formData.description || '',
        about: formData.about || '',
        imageUrl: formData.imageUrl || '',
        region: formData.region || '',
        activities: formData.activities || [],
        isPublished: formData.isPublished || true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        gallery: []
      };
      setDestinationList([...destinationList, newDestination]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setDestinationList(destinationList.filter(dest => dest.id !== id));
    }
  };

  const handleActivitiesChange = (value: string) => {
    const activities = value.split(',').map(activity => activity.trim()).filter(Boolean);
    setFormData({ ...formData, activities });
  };

  const handleToggleVisibility = (destination: CMSDestination) => {
    const updatedList = destinationList.map(dest =>
      dest.id === destination.id 
        ? { ...dest, isPublished: !dest.isPublished, updatedAt: new Date().toISOString() }
        : dest
    );
    setDestinationList(updatedList);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Destination Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Destination
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="All Destinations" />
        <Tab label="Published" />
        <Tab label="Draft" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {/* Filters */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Search destinations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ minWidth: 300 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Region</InputLabel>
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              label="Filter by Region"
            >
              <MenuItem value="">All Regions</MenuItem>
              {regions.map(region => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Destinations Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Activities</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDestinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>
                    <Avatar
                      src={destination.imageUrl}
                      alt={destination.name}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {destination.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {destination.description.substring(0, 50)}...
                    </Typography>
                    {destination.about && (
                      <Typography variant="caption" color="primary" noWrap>
                        About: {destination.about.substring(0, 30)}...
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={destination.region} size="small" />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {destination.activities.slice(0, 2).map((activity, index) => (
                        <Chip
                          key={index}
                          label={activity}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {destination.activities.length > 2 && (
                        <Chip
                          label={`+${destination.activities.length - 2}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={destination.isPublished ? 'Published' : 'Draft'}
                      size="small"
                      color={destination.isPublished ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleVisibility(destination)}
                      color={destination.isPublished ? 'success' : 'default'}
                    >
                      {destination.isPublished ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(destination)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(destination.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography>Published destinations will be shown here</Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography>Draft destinations will be shown here</Typography>
      </TabPanel>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDestination ? 'Edit Destination' : 'Add New Destination'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the destination"
            />

            <TextField
              fullWidth
              label="About Section"
              multiline
              rows={6}
              value={formData.about || ''}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              placeholder="Detailed about section content (e.g., 'Uncover the Wonders of Thailand...')"
              helperText="This is the detailed about section that will be displayed on the destination page"
            />

            {editingDestination ? (
              <TextField
                fullWidth
                label="Image URL"
                type="url"
                value={formData.imageUrl || ''}
                InputProps={{ readOnly: true }}
                helperText="View-only while editing."
              />
            ) : (
              <TextField
                fullWidth
                label="Image URL"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                helperText="Paste a direct image link (JPEG/PNG/WebP)."
              />
            )}

            {!!formData.imageUrl && (
              <Box display="flex" alignItems="center" gap={2} mt={1}>
                <Avatar src={formData.imageUrl} alt="Preview" sx={{ width: 56, height: 56 }} />
                <Typography variant="body2" color="textSecondary">Preview</Typography>
              </Box>
            )}

            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Select
                value={formData.region || ''}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                label="Region"
              >
                {regions.map(region => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Activities (comma-separated)"
              value={formData.activities?.join(', ') || ''}
              onChange={(e) => handleActivitiesChange(e.target.value)}
              placeholder="Beach, Sightseeing, Adventure"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublished || false}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
              }
              label="Published (Visible on frontend)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingDestination ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DestinationManagement;
