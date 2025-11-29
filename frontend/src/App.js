import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Research from './pages/Research';
import Reports from './pages/Reports';
import Footer from './components/Footer';

// Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
