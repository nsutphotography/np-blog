import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, FormControlLabel, Switch, Box } from '@mui/material';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: true,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in.');
      return;
    }

    axios.post(
      'http://localhost:3000/blog/create',
      {
        title: formData.title,
        description: formData.description,
        isPublic: formData.isPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          isPublic: true,
        });
      })
      .catch((error) => {
        console.error('Error creating blog:', error);
        setError('Failed to create blog. Please try again later.');
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Blog
      </Typography>
      {error && <Typography color="error" paragraph>{error}</Typography>}
      {success && <Typography color="success.main" paragraph>Blog created successfully!</Typography>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              name="isPublic"
            />
          }
          label="Make this blog public"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Blog
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBlog;
