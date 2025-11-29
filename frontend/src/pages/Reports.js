import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
  Paper,
  TextField,
  InputAdornment,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock data - in a real app, this would come from your backend
const mockReports = [
  {
    id: '1',
    title: 'Advances in Artificial Intelligence',
    topic: 'Artificial Intelligence',
    date: '2023-11-15',
    papers: 12,
    status: 'completed',
    summary: 'A comprehensive review of recent advances in AI and machine learning techniques.',
  },
  {
    id: '2',
    title: 'Blockchain Technology Overview',
    topic: 'Blockchain',
    date: '2023-11-10',
    papers: 8,
    status: 'completed',
    summary: 'Analysis of blockchain technology and its applications across various industries.',
  },
  {
    id: '3',
    title: 'Quantum Computing Research',
    topic: 'Quantum Computing',
    date: '2023-11-05',
    papers: 15,
    status: 'in-progress',
    summary: 'Exploring the latest developments in quantum computing and quantum algorithms.',
  },
  {
    id: '4',
    title: 'Neural Networks in Healthcare',
    topic: 'Healthcare AI',
    date: '2023-10-28',
    papers: 20,
    status: 'completed',
    summary: 'Applications of neural networks in medical diagnosis and treatment planning.',
  },
];

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuOpen = (event, report) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  const handleDelete = (reportId) => {
    // In a real app, this would call an API to delete the report
    setReports(reports.filter(report => report.id !== reportId));
    handleMenuClose();
  };

  const handleEdit = (reportId) => {
    // In a real app, this would navigate to an edit page
    console.log('Edit report:', reportId);
    handleMenuClose();
  };

  const handleShare = (reportId) => {
    // In a real app, this would open a share dialog
    console.log('Share report:', reportId);
    handleMenuClose();
  };

  const handleDownload = (reportId) => {
    // In a real app, this would download the report
    console.log('Download report:', reportId);
    handleMenuClose();
  };

  const handleNewReport = () => {
    navigate('/research');
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || report.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'papers') {
      comparison = b.papers - a.papers;
    }
    
    return sortOrder === 'asc' ? -comparison : comparison;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          My Research Reports
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewReport}
        >
          New Report
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilter(filter === 'all' ? 'completed' : filter === 'completed' ? 'in-progress' : 'all')}
          >
            {filter === 'all' ? 'All' : filter === 'completed' ? 'Completed' : 'In Progress'}
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() => {
              if (sortBy === 'date') {
                setSortBy('title');
                setSortOrder('asc');
              } else if (sortBy === 'title') {
                setSortBy('papers');
                setSortOrder('desc');
              } else {
                setSortBy('date');
                setSortOrder('desc');
              }
            }}
          >
            {sortBy === 'date' 
              ? 'Sort by Date' 
              : sortBy === 'title' 
                ? 'Sort by Title' 
                : 'Sort by Papers'}
            {sortBy === 'title' && ` (${sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`}
            {sortBy === 'papers' && ` (${sortOrder === 'desc' ? 'Most' : 'Fewest'} first)`}
          </Button>
        </Box>

        {sortedReports.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            No reports found. Create your first research report to get started.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {sortedReports.map((report) => (
              <Grid item xs={12} key={report.id}>
                <Card
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    '&:hover': {
                      boxShadow: 3,
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {report.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Topic: {report.topic} • {new Date(report.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={getStatusLabel(report.status)}
                        color={getStatusColor(report.status)}
                        size="small"
                        sx={{ ml: 1, alignSelf: 'flex-start' }}
                      />
                    </Box>
                    
                    <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                      {report.summary}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<DescriptionIcon />}
                        label={`${report.papers} papers`}
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        size="small"
                        onClick={() => console.log('View report:', report.id)}
                        sx={{ ml: 'auto' }}
                      >
                        View Full Report
                      </Button>
                    </Box>
                  </Box>
                  
                  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                    <IconButton
                      aria-label="more"
                      aria-controls="report-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleMenuOpen(e, report)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      <Menu
        id="report-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(selectedReport?.id)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDownload(selectedReport?.id)}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare(selectedReport?.id)}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDelete(selectedReport?.id)} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Reports;
