import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../App';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ProfileMenu from './ProfileMenu';

import { AuthContext } from '../context/AuthContext';
import { use } from 'react';
import debugLib from 'debug';
const debug = debugLib('app:navbar');

const Navbar = () => {
  const colorMode = useContext(ColorModeContext);
  const accessToken = localStorage.getItem('accessToken');

  const userDataState = useContext(AuthContext);
  debug('User data:', userDataState.userData);
  const isDarkMode = localStorage.getItem('themeMode') === 'dark';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NP-Blog
        </Typography>
        <Button color="inherit" component={Link} to="/">
              Home
            </Button>
        {debug('User data: before home signup login', userDataState.userData)}
        {!userDataState.userData ? (
          <>
            
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
