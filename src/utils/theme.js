import { createTheme } from '@mui/material';

export const getInitialMode = () => {
  // Check localStorage for a stored theme or default to 'dark'
  return localStorage.getItem('themeMode') || 'dark';
};

export const saveModeToLocalStorage = (mode) => {
  // Save the current theme mode to localStorage
  localStorage.setItem('themeMode', mode);
};

export const createAppTheme = (mode) => {
  // Create a Material-UI theme based on the mode
  return createTheme({
    palette: {
      mode,
    },
  });
};
