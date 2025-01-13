import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in.');
      return;
    }

    axios.get('http://localhost:3000/blog/my-blogs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setBlogs(response.data); // Assuming the response data is an array of blog objects
      })
      .catch((error) => {
        console.error('Error fetching user blogs:', error);
        setError('Failed to fetch blogs. Please try again later.');
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard Page
      </Typography>
      {error && <Typography color="error" paragraph>{error}</Typography>}
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {blog.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
