import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ size = 100 }) => (
  <Box sx={{ display: 'flex', 'justify-content': 'center' }}>
    <CircularProgress size={size} />
  </Box>
);

LoadingSpinner.propTypes = {
  size: PropTypes.number.isRequired,
};

export default LoadingSpinner;
