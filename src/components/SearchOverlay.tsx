import React, { useState } from 'react';
import { Box, Typography, IconButton, InputBase, Button, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme } from '@mui/material/styles';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
}

const Overlay = styled(Box)(({ }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(30, 58, 138, 0.85)', // primary.main with opacity
  zIndex: 3000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SearchBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(30, 58, 138, 0.15)',
  padding: theme.spacing(4, 4, 3, 4),
  minWidth: 350,
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: 320,
  maxWidth: '80vw',
  background: theme.palette.background.default,
  borderRadius: 8,
  padding: theme.spacing(1.5, 2),
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
  boxShadow: '0 2px 8px rgba(30, 58, 138, 0.07)',
  marginBottom: theme.spacing(2),
}));

const PopularLink = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  cursor: 'pointer',
  marginRight: theme.spacing(2),
  '&:hover': {
    color: theme.palette.secondary.main,
    textDecoration: 'underline',
  },
}));

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const handleSearch = () => {
    if (onSearch) onSearch(query);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const popular = ['Dubai', 'Atlantis Palm', 'Florida', 'New York'];

  return (
    <Fade in={open} unmountOnExit>
      <Overlay>
        <SearchBox>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 12, right: 12, color: theme.palette.primary.main }}
            aria-label="Close search overlay"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main, fontFamily: theme.typography.h2.fontFamily }}>
            Search our site
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <StyledInput
              autoFocus
              placeholder="Enter keyword..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              inputProps={{ 'aria-label': 'search input' }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2, px: 4, py: 1.5, borderRadius: 2, fontWeight: 600, boxShadow: 0 }}
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 3, color: theme.palette.text.secondary }}>
            Popular searches:
            {popular.map((item, idx) => (
              <PopularLink key={item} onClick={() => { setQuery(item); if (onSearch) onSearch(item); onClose(); }}>
                {item}{idx < popular.length - 1 ? ',' : ''}
              </PopularLink>
            ))}
          </Typography>
        </SearchBox>
      </Overlay>
    </Fade>
  );
};

export default SearchOverlay; 