import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log('Logout clicked');
    handleMenuClose();
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          My Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
