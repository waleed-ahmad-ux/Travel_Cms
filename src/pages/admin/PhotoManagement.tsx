import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Alert,
  LinearProgress,
  //Fab
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  CloudUpload,
  ViewModule,
  ViewList,
  ViewComfy
  //FilterList
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { photoService } from '../../services/adminService';
import { destinations } from '../../services/destinationService';
import type { Photo } from '../../types/admin';

const PhotoManagement: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<string>('general');
  const [uploadTags, setUploadTags] = useState<string>('');
  const [uploadDestination, setUploadDestination] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [previewSize, setPreviewSize] = useState<'small' | 'medium' | 'large'>('medium');

  const categories = ['destination', 'hotel', 'activity', 'general'];

  useEffect(() => {
    loadPhotos();
  }, [categoryFilter, destinationFilter]);

  const loadPhotos = async () => {
    try {
      const data = await photoService.getPhotos(categoryFilter || undefined, destinationFilter || undefined);
      setPhotos(data);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        const tags = uploadTags.split(',').map(tag => tag.trim()).filter(Boolean);
        await photoService.uploadPhoto(
          file,
          uploadCategory,
          tags,
          uploadDestination || undefined
        );
      }
      await loadPhotos();
      setUploadDialogOpen(false);
      setUploadTags('');
      setUploadDestination('');
    } catch (error) {
      console.error('Error uploading photos:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true
  });

  const handleDeletePhoto = async (photoId: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await photoService.deletePhoto(photoId);
        await loadPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  const handleEditPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setEditDialogOpen(true);
  };

  const handleUpdatePhoto = async () => {
    if (!selectedPhoto) return;
    
    try {
      await photoService.updatePhoto(selectedPhoto.id, selectedPhoto);
      await loadPhotos();
      setEditDialogOpen(false);
      setSelectedPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = !categoryFilter || photo.category === categoryFilter;
    const matchesDestination = !destinationFilter || photo.destinationId === destinationFilter;
    return matchesCategory && matchesDestination;
  });

  const getGridSize = () => {
    switch (previewSize) {
      case 'small':
        return { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
      case 'medium':
        return { xs: 12, sm: 6, md: 4, lg: 3 };
      case 'large':
        return { xs: 12, sm: 6, md: 6, lg: 4 };
      default:
        return { xs: 12, sm: 6, md: 4, lg: 3 };
    }
  };

  const getImageHeight = () => {
    switch (previewSize) {
      case 'small':
        return 120;
      case 'medium':
        return 200;
      case 'large':
        return 300;
      default:
        return 200;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4">
            Photo Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {filteredPhotos.length} photos • {previewSize} preview size
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setUploadDialogOpen(true)}
        >
          Upload Photos
        </Button>
      </Box>

      {/* Filters */}
      <Box mb={3} display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
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
                {destination.name} ({destination.region})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Preview Size</InputLabel>
          <Select
            value={previewSize}
            onChange={(e) => setPreviewSize(e.target.value as 'small' | 'medium' | 'large')}
            label="Preview Size"
          >
            <MenuItem value="small">
              <Box display="flex" alignItems="center" gap={1}>
                <ViewModule fontSize="small" />
                Small
              </Box>
            </MenuItem>
            <MenuItem value="medium">
              <Box display="flex" alignItems="center" gap={1}>
                <ViewList fontSize="small" />
                Medium
              </Box>
            </MenuItem>
            <MenuItem value="large">
              <Box display="flex" alignItems="center" gap={1}>
                <ViewComfy fontSize="small" />
                Large
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        {/* Quick Size Toggle Buttons */}
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            color={previewSize === 'small' ? 'primary' : 'default'}
            onClick={() => setPreviewSize('small')}
            title="Small preview"
          >
            <ViewModule />
          </IconButton>
          <IconButton
            size="small"
            color={previewSize === 'medium' ? 'primary' : 'default'}
            onClick={() => setPreviewSize('medium')}
            title="Medium preview"
          >
            <ViewList />
          </IconButton>
          <IconButton
            size="small"
            color={previewSize === 'large' ? 'primary' : 'default'}
            onClick={() => setPreviewSize('large')}
            title="Large preview"
          >
            <ViewComfy />
          </IconButton>
        </Box>
      </Box>

      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2}>
          {filteredPhotos.map((photo) => (
            <Grid item {...getGridSize()} key={photo.id}>
              <Card>
                <CardMedia
                  component="img"
                  height={getImageHeight()}
                  image={photo.url}
                  alt={photo.originalName}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle2" noWrap>
                    {photo.originalName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {(photo.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                  {photo.destinationId && (
                    <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                      📍 {destinations.find(d => d.id === photo.destinationId)?.name || 'Unknown Destination'}
                    </Typography>
                  )}
                  <Box mt={1}>
                    <Chip
                      label={photo.category}
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    {photo.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleEditPhoto(photo)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {filteredPhotos.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            No photos found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Upload some photos to get started
          </Typography>
        </Box>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Photos</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                label="Category"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Tags (comma-separated)"
              value={uploadTags}
              onChange={(e) => setUploadTags(e.target.value)}
              margin="normal"
              placeholder="beach, sunset, tropical"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Destination</InputLabel>
              <Select
                value={uploadDestination}
                onChange={(e) => setUploadDestination(e.target.value)}
                label="Destination (optional)"
              >
                <MenuItem value="">
                  <em>No specific destination</em>
                </MenuItem>
                {destinations.map(destination => (
                  <MenuItem key={destination.id} value={destination.id}>
                    {destination.name} ({destination.region})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? 'action.hover' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <input {...getInputProps()} />
            <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop the files here...' : 'Drag & drop photos here'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              or click to select files
            </Typography>
          </Box>

          {uploading && (
            <Box mt={2}>
              <Alert severity="info">Uploading photos...</Alert>
              <LinearProgress sx={{ mt: 1 }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Photo</DialogTitle>
        <DialogContent>
          {selectedPhoto && (
            <>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={selectedPhoto.tags.join(', ')}
                onChange={(e) => setSelectedPhoto({
                  ...selectedPhoto,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedPhoto.category}
                  onChange={(e) => setSelectedPhoto({
                    ...selectedPhoto,
                    category: e.target.value as Photo['category']
                  })}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Destination</InputLabel>
                <Select
                  value={selectedPhoto.destinationId || ''}
                  onChange={(e) => setSelectedPhoto({
                    ...selectedPhoto,
                    destinationId: e.target.value || undefined
                  })}
                  label="Destination"
                >
                  <MenuItem value="">
                    <em>No specific destination</em>
                  </MenuItem>
                  {destinations.map(destination => (
                    <MenuItem key={destination.id} value={destination.id}>
                      {destination.name} ({destination.region})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdatePhoto} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PhotoManagement;
