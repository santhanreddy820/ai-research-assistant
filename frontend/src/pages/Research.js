import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const steps = [
  'Define Research Topic',
  'Review & Select Papers',
  'Generate Report',
];

const Research = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [researchTopic, setResearchTopic] = useState('');
  const [maxPapers, setMaxPapers] = useState(5);
  const [isSearching, setIsSearching] = useState(false);
  const [papers, setPapers] = useState([]);
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSearch = async () => {
    if (!researchTopic.trim()) {
      setError('Please enter a research topic');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - in a real app, this would come from your backend
      const mockPapers = Array.from({ length: 5 }, (_, i) => ({
        id: `paper-${i + 1}`,
        title: `Research Paper on ${researchTopic} - ${i + 1}`,
        authors: [`Author ${i + 1}A`, `Author ${i + 1}B`],
        abstract: `This is a sample abstract for a research paper about ${researchTopic}. It demonstrates the type of content that would be returned from a real search.`,
        year: 2023 - i,
        url: `https://example.com/paper-${i + 1}`,
        selected: false,
      }));

      setPapers(mockPapers);
      handleNext();
    } catch (err) {
      showSnackbar('Error searching for papers. Please try again.', 'error');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePaperSelect = (paperId) => {
    setPapers(prevPapers =>
      prevPapers.map(paper =>
        paper.id === paperId
          ? { ...paper, selected: !paper.selected }
          : paper
      )
    );
  };

  const handleGenerateReport = () => {
    const selected = papers.filter(paper => paper.selected);
    if (selected.length === 0) {
      showSnackbar('Please select at least one paper', 'warning');
      return;
    }
    setSelectedPapers(selected);
    handleNext();
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setResearchTopic('');
    setMaxPapers(5);
    setPapers([]);
    setSelectedPapers([]);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Research Topic"
              variant="outlined"
              value={researchTopic}
              onChange={(e) => setResearchTopic(e.target.value)}
              placeholder="Enter your research topic or question"
              sx={{ mb: 3 }}
              error={!!error}
              helperText={error}
            />
            <TextField
              fullWidth
              type="number"
              label="Maximum Papers to Retrieve"
              variant="outlined"
              value={maxPapers}
              onChange={(e) => setMaxPapers(parseInt(e.target.value) || 1)}
              inputProps={{ min: 1, max: 20 }}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={isSearching}
                startIcon={<SearchIcon />}
              >
                {isSearching ? 'Searching...' : 'Search Papers'}
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            {isSearching ? (
              <Box sx={{ width: '100%', py: 4 }}>
                <LinearProgress />
                <Typography align="center" sx={{ mt: 2 }}>
                  Searching for papers about "{researchTopic}"...
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Found {papers.length} papers about "{researchTopic}"
                </Typography>
                <Grid container spacing={2}>
                  {papers.map((paper) => (
                    <Grid item xs={12} key={paper.id}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderLeft: paper.selected ? '4px solid #1976d2' : '4px solid transparent',
                          transition: 'all 0.2s',
                          '&:hover': {
                            boxShadow: 3,
                          },
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="flex-start">
                            <Box flexGrow={1}>
                              <Typography variant="h6" component="div">
                                {paper.title}
                              </Typography>
                              <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                                {paper.authors.join(', ')} • {paper.year}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {paper.abstract.length > 200
                                  ? `${paper.abstract.substring(0, 200)}...`
                                  : paper.abstract}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip
                                  label="View Abstract"
                                  size="small"
                                  variant="outlined"
                                  onClick={() => {}}
                                />
                                <Chip
                                  label="View PDF"
                                  size="small"
                                  variant="outlined"
                                  onClick={() => window.open(paper.url, '_blank')}
                                />
                              </Box>
                            </Box>
                            <IconButton
                              color={paper.selected ? 'primary' : 'default'}
                              onClick={() => handlePaperSelect(paper.id)}
                              sx={{ ml: 1 }}
                            >
                              {paper.selected ? <CheckCircleIcon /> : <DescriptionIcon />}
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Research complete! Your report is being generated based on {selectedPapers.length} selected papers.
            </Alert>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Selected Papers:
            </Typography>
            <List>
              {selectedPapers.map((paper) => (
                <ListItem key={paper.id}>
                  <ListItemText
                    primary={paper.title}
                    secondary={`${paper.authors.join(', ')} • ${paper.year}`}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // In a real app, this would generate and download the report
                  showSnackbar('Generating your research report...', 'info');
                }}
                startIcon={<DescriptionIcon />}
                sx={{ mr: 2 }}
              >
                Generate Full Report
              </Button>
              <Button
                variant="outlined"
                onClick={handleReset}
                startIcon={<DeleteIcon />}
              >
                Start New Research
              </Button>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        New Research Project
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {renderStepContent(index)}
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleReset}
                        sx={{ mt: 1, mr: 1 }}
                        startIcon={<SearchIcon />}
                      >
                        Start New Research
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={activeStep === 1 ? handleGenerateReport : handleSearch}
                        disabled={isSearching}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {activeStep === 1 ? 'Generate Report' : 'Next'}
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Research;
