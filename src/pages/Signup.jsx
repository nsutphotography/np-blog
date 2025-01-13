import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debug from 'debug';

// Create a debug instance for the 'signup' module
const log = debug('signup');

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Log the input data for debugging
    log('Attempting to sign up with email:', email, 'username:', username);

    try {
      // Send POST request to the backend for signup
      const response = await axios.post('http://localhost:3000/user/signup', {
        email,
        username,
        password,
      });

      log('Signup response:', response);

      if (response.status === 201) {
        // If signup is successful, redirect to login
        navigate('/login');
      }
    } catch (error) {
      log('Signup failed:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSignup}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
