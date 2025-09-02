import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  PhotoLibrary,
  Place,
  People,
  TrendingUp,
  Visibility,
  Hotel,
  FlightTakeoff
} from '@mui/icons-material';
import { analyticsService } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
  totalDestinations: number;
  totalPhotos: number;
  totalHotels: number;
  totalUsers: number;
  activeUsers: number;
  recentUploads: any[];
  popularDestinations: Array<{ name: string; views: number }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await analyticsService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Welcome to your travel website admin panel. Here's an overview of your system.
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Destinations"
            value={stats?.totalDestinations || 0}
            icon={<Place />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Photos"
            value={stats?.totalPhotos || 0}
            icon={<PhotoLibrary />}
            color="#388e3c"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hotels"
            value={stats?.totalHotels || 0}
            icon={<Hotel />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={<People />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={stats?.activeUsers || 0}
            icon={<TrendingUp />}
            color="#7b1fa2"
          />
        </Grid>

        {/* Popular Destinations */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Popular Destinations
            </Typography>
            <List>
              {stats?.popularDestinations.map((dest, index) => (
                <ListItem key={dest.name}>
                  <ListItemAvatar>
                    <Avatar>
                      <Visibility />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={dest.name}
                    secondary={`${dest.views} views`}
                  />
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    color={index === 0 ? 'primary' : 'default'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <PhotoLibrary />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="New photo uploaded"
                  secondary="Thailand destination - 2 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <Place />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Destination updated"
                  secondary="Greece description modified - 5 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <People />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="New user registered"
                  secondary="editor@example.com - 1 day ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Chip
                label="Upload Photos"
                clickable
                color="primary"
                icon={<PhotoLibrary />}
                onClick={() => navigate('/admin/photos')}
              />
              <Chip
                label="Add Destination"
                clickable
                color="secondary"
                icon={<Place />}
                onClick={() => navigate('/admin/destinations')}
              />
                             <Chip
                 label="Manage Hotels"
                 clickable
                 color="default"
                 icon={<Hotel />}
                 onClick={() => navigate('/admin/hotels')}
               />
               <Chip
                 label="Manage Flights"
                 clickable
                 color="default"
                 icon={<FlightTakeoff />}
                 onClick={() => navigate('/admin/flights')}
               />
              <Chip
                label="Manage Users"
                clickable
                color="default"
                icon={<People />}
                onClick={() => navigate('/admin/users')}
              />
              <Chip
                label="Hotel Margins"
                clickable
                color="default"
                icon={<TrendingUp />}
                onClick={() => navigate('/admin/hotel-margins')}
              />
              <Chip
                label="Flight Margins"
                clickable
                color="default"
                icon={<TrendingUp />}
                onClick={() => navigate('/admin/flight-margins')}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
