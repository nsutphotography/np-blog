import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debugLib from 'debug';

// Create a debug instance for the 'login' module
const debug = debugLib('app:login');

const Login = () => {
  debug('Rendering Login component');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    debug('Attempting to login with email:', email);
    e.preventDefault();

    // debug the input data for debugging
    debug('Attempting to debug in with email:', email);

    try {
      // Send POST request to the backend for login
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password,
      });
      console.log(response);

      debug('Login response:', response);

      if (response.status === 201) {
        // Store the accessToken and user details in localStorage (or use your preferred method)
        debug('Storing accessToken and user details in localStorage', response.data);
        console.log("at",response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);

        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      }
    } catch (error) {
      debug('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
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
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
