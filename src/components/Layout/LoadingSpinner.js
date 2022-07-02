import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ size }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
    <CircularProgress size={size} />
  </Box>
);

LoadingSpinner.propTypes = {
  size: PropTypes.number,
};

LoadingSpinner.defaultProps = {
  size: 100,
};

export default LoadingSpinner;
