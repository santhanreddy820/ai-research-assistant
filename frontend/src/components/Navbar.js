import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Description as ReportsIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';

const Navbar = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'New Research', icon: <SearchIcon />, path: '/research' },
    { text: 'My Reports', icon: <ReportsIcon />, path: '/reports' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                name="darkMode"
                color="default"
              />
            }
            label={darkMode ? 'Dark Mode' : 'Light Mode'}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 700 }}
        >
          AI Research Assistant
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                sx={{ mx: 1 }}
              >
                {item.text}
              </Button>
            ))}
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
              sx={{ ml: 1 }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
