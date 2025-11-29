import React from 'react';
import { Container, Box, Typography, Link, Divider } from '@mui/material';
import { GitHub as GitHubIcon, Twitter as TwitterIcon, Email as EmailIcon } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            © {currentYear} AI Research Assistant. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
            <Link
              href="https://github.com/yourusername/ai-research-assistant"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <GitHubIcon sx={{ mr: 0.5 }} />
              GitHub
            </Link>
            
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <TwitterIcon sx={{ mr: 0.5 }} />
              Twitter
            </Link>
            
            <Link
              href="mailto:support@airesearchassistant.com"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <EmailIcon sx={{ mr: 0.5 }} />
              Contact
            </Link>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Link href="/privacy" color="text.secondary" variant="body2">
            Privacy Policy
          </Link>
          <Link href="/terms" color="text.secondary" variant="body2">
            Terms of Service
          </Link>
          <Link href="/docs" color="text.secondary" variant="body2">
            Documentation
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
