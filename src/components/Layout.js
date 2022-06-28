import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';

const Layout = ({ children }) => (
  <Container sx={{ p: 3, bgcolor: 'background.primary', height: '100vh' }}>
    <Typography
      align="center"
      variant="h1"
      component="h1"
      gutterBottom
      sx={{ color: 'text.primary' }}
    >
      Rick and Morty Characters
    </Typography>
    {children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
