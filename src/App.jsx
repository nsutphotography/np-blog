import React, { useState, createContext, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { getInitialMode, saveModeToLocalStorage, createAppTheme } from './utils/theme';

// Context for theme mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState(getInitialMode); // Default to dark mode

  useEffect(() => {
    // Save the initial mode to localStorage
    saveModeToLocalStorage(mode);
  }, [mode]);

  const colorMode = {
    toggleColorMode: () => {
      const newMode = mode === 'light' ? 'dark' : 'light';
      setMode(newMode);
      saveModeToLocalStorage(newMode);
    },
  };

  const theme = createAppTheme(mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
