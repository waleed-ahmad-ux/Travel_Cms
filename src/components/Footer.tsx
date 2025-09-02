//import React from 'react';
import { Box, Container, Grid, Typography, TextField, Button, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { assetMap } from '../assets/assetMap';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      
      //bgcolor: 'grey.100', 
      //bgcolor: 'rgb(218, 227, 229)', 
       background: 'white',
      color: 'text.secondary' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="flex-start">
          {/* Confidence & Protection Section */}
          <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 0 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold', letterSpacing: 1, textAlign: 'center' }}>
                BOOK WITH CONFIDENCE
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, width: '100%' }}>
                <img src={assetMap["trustpilot.png"]} alt="Trustpilot" style={{ height: 60, maxHeight: 60, objectFit: 'contain', margin: '0 auto', display: 'block' }} />
              </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold', letterSpacing: 1, textAlign: 'center' }}>
                YOUR HOLIDAY PROTECTED
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, width: '100%' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={assetMap["ATOL logo.png"]} alt="ATOL Protected" style={{ height: 36, maxHeight: 36, objectFit: 'contain', background: '#fff', borderRadius: 3, padding: 2, margin: '0 auto', display: 'block' }} />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.disabled', textAlign: 'center' }}>ATOL Protected</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={assetMap["IATA logo.png"]} alt="IATA" style={{ height: 36, maxHeight: 36, objectFit: 'contain', background: '#fff', borderRadius: 3, padding: 2, margin: '0 auto', display: 'block' }} />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.disabled', textAlign: 'center' }}>IATA Member</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={assetMap["ABTA logo.png"]} alt="ABTA" style={{ height: 36, maxHeight: 36, objectFit: 'contain', background: '#fff', borderRadius: 3, padding: 2, margin: '0 auto', display: 'block' }} />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.disabled', textAlign: 'center' }}>ABTA Member</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'grey.200', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 3, boxShadow: 0 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold', letterSpacing: 1 }}>
                SIGN UP FOR EXCLUSIVE OFFERS
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                Get the latest deals and updates straight to your inbox!
              </Typography>
              <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField 
                  variant="outlined" 
                  size="small" 
                  placeholder="Your email address" 
                  sx={{ bgcolor: 'white', flexGrow: 1 }}
                  type="email"
                  required
                  aria-label="Email address"
                />
                <Button 
                  variant="contained" 
                  size="small"
                  sx={{ 
                    bgcolor: 'primary.main', 
                    '&:hover': { bgcolor: 'primary.dark' },
                    minWidth: '98px',
                  }}
                  type="submit"
                >
                  SIGN UP
                </Button>
              </Box>
              {/* Placeholder for feedback */}
              <Typography variant="caption" sx={{ color: 'success.main', mt: 1, display: 'none' }}>
                Thank you for subscribing!
              </Typography>
              <Typography variant="caption" sx={{ color: 'error.main', mt: 1, display: 'none' }}>
                Please enter a valid email address.
              </Typography>
            </Box>
          </Grid>

          {/* Contact & Social Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold', letterSpacing: 1 }}>
              CONTACT US
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <span style={{ color: 'green', fontSize: '1.3rem', marginRight: 6, display: 'flex', alignItems: 'center' }}>📞</span>
              <Typography component="a" href="tel:+441234567890" sx={{ color: 'blue', fontWeight: 'bold', fontSize: '1.4rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'secondary.dark' } }}>
                020 8906 3411
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <EmailIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography component="a" href="mailto:info@airworldtours.com" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }}>
                info@airworldtours.com
              </Typography>
            </Box>
            <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold', letterSpacing: 1, mt: 2 }}>
              FOLLOW US
            </Typography>
            <Box sx={{ mb: 1 }}>
              <IconButton sx={{ color: 'primary.main', fontSize: 28, transition: 'color 0.2s', '&:hover': { color: 'primary.dark' } }} aria-label="Instagram"><InstagramIcon fontSize="inherit" /></IconButton>
              <IconButton sx={{ color: 'primary.main', fontSize: 28, transition: 'color 0.2s', '&:hover': { color: 'primary.dark' } }} aria-label="Facebook"><FacebookIcon fontSize="inherit" /></IconButton>
              <IconButton sx={{ color: 'primary.main', fontSize: 28, transition: 'color 0.2s', '&:hover': { color: 'primary.dark' } }} aria-label="Twitter"><TwitterIcon fontSize="inherit" /></IconButton>
              <IconButton sx={{ color: 'primary.main', fontSize: 28, transition: 'color 0.2s', '&:hover': { color: 'primary.dark' } }} aria-label="Pinterest"><PinterestIcon fontSize="inherit" /></IconButton>
              <IconButton sx={{ color: 'primary.main', fontSize: 28, transition: 'color 0.2s', '&:hover': { color: 'primary.dark' } }} aria-label="YouTube"><YouTubeIcon fontSize="inherit" /></IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider above navigation links */}
        <Box sx={{ mt: 6, mb: 0 }}>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mb: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              <Typography variant="body1" component="a" href="#" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }}>
                About Us
              </Typography>
              <Typography variant="body1" component="a" href="#" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }}>
                Contact
              </Typography>
              <Typography variant="body1" component="a" href="#" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }}>
                Destinations
              </Typography>
              <Typography variant="body1" component="a" href="#" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }}>
                Terms & Conditions
              </Typography>
              <Typography variant="body1" component="a" href="#" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }}>
                Privacy Policy
              </Typography>
              <Typography variant="body1" component="a" href="/admin" sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '0.9rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'primary.main' } }}>
                Admin
              </Typography>
            </Box>
            <Button onClick={handleBackToTop} sx={{ ml: { sm: 4 }, color: 'secondary.main', fontWeight: 'bold', fontSize: '1.15rem', textTransform: 'none', transition: 'color 0.2s', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}>
              ↑ Back to top
            </Button>
          </Box>
        </Box>

        {/* Legal & Info */}
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="caption">
            For the latest travel advice including security and local laws, plus passport and visa information, check www.gov.uk/foreign-travel-advice
          </Typography>
        </Box>
      </Container>
      <Box sx={{ bgcolor: 'primary.dark', p: 1, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'white' }}>
          © {new Date().getFullYear()} Airworld Tours. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 