import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Description as DescriptionIcon,
  AutoAwesome as AutoAwesomeIcon,
  RocketLaunch as RocketLaunchIcon,
  Article as ReportsIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <SearchIcon fontSize="large" />,
    title: 'Smart Research',
    description: 'Automatically find and analyze relevant research papers on any topic.',
  },
  {
    icon: <DescriptionIcon fontSize="large" />,
    title: 'PDF Analysis',
    description: 'Upload and extract key information from research papers in PDF format.',
  },
  {
    icon: <AutoAwesomeIcon fontSize="large" />,
    title: 'AI Insights',
    description: 'Get AI-powered analysis and summaries of research findings.',
  },
  {
    icon: <RocketLaunchIcon fontSize="large" />,
    title: 'Save Time',
    description: 'Dramatically reduce the time needed for literature reviews and research.',
  },
];

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/research');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          pt: 8,
          pb: 6,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            AI Research Assistant
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="inherit"
            paragraph
            sx={{ mb: 4 }}
          >
            Automate your research process with AI-powered paper discovery and analysis.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleGetStarted}
              sx={{ color: 'white' }}
            >
              Start Researching
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container id="features" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 600, mb: 6 }}
        >
          Powerful Features for Researchers
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        width: 56,
                        height: 56,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                  }
                  title={
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  }
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 8,
          mt: 8,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="md" align="center">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to accelerate your research?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Join thousands of researchers who are already using AI Research Assistant to save time and
            discover insights faster.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetStarted}
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started for Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
