import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Autocomplete,
  IconButton,
  Typography,
  Popover,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { destinations } from '../services/destinationService';

const destinationNames = destinations.map(d => d.name);

const airports = [
  'London Heathrow (LHR)',
  'London Gatwick (LGW)',
  'Manchester (MAN)',
  'Birmingham (BHX)',
  'Edinburgh (EDI)',
  'Glasgow (GLA)',
];

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  const handlePassengerChange = (type: keyof PassengerCount, delta: number) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, Math.min(9, prev[type] + delta))
    }));
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ 
        display: 'grid', 
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          md: '3fr 3fr 2fr 2fr 2fr'
        }
      }}>
        <Autocomplete
          freeSolo
          options={destinationNames}
          sx={{ flex: 2 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Where do you want to go?"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          onChange={(_, value) => setSearchQuery(value || '')}
        />
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="When?"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ flex: 1 }}
          />
        </LocalizationProvider>

        <Autocomplete
          options={airports}
          sx={{ flex: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Departure from" />
          )}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            variant="outlined"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ flex: 1, minWidth: 120, color: 'black', borderColor: 'black' }}
          >
            {passengers.adults + passengers.children + passengers.infants} Travelers
          </Button>

          <Button 
            variant="contained" 
            sx={{ flex: 1, minWidth: 120 }}
            onClick={() => {
              // Handle search
              onSearch(searchQuery);
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" gutterBottom>
            Travelers
          </Typography>
          {(Object.keys(passengers) as Array<keyof PassengerCount>).map((type) => (
            <Box
              key={type}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 1,
              }}
            >
              <Typography sx={{ textTransform: 'capitalize' }}>
                {type}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handlePassengerChange(type, -1)}
                  disabled={type === 'adults' ? passengers[type] <= 1 : passengers[type] <= 0}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{passengers[type]}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handlePassengerChange(type, 1)}
                  disabled={passengers[type] >= 9}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Popover>
    </Paper>
  );
};
