import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../App';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ProfileMenu from './ProfileMenu';


const Navbar = () => {
  const colorMode = useContext(ColorModeContext);
  const accessToken = localStorage.getItem('accessToken');

  const isDarkMode = localStorage.getItem('themeMode') === 'dark';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NP-Blog
        </Typography>
        {!accessToken ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <ProfileMenu />
          </>
        )}
        <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
