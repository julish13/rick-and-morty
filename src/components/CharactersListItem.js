import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const CharactersListItem = ({ image, name }) => (
    <StyledItem>
      <StyledImage src={image} alt={name} loading="lazy" width="300" height="300" />
      <StyledTypography variant="h2" component="h2">
        {name}
      </StyledTypography>
    </StyledItem>
  );

const StyledItem = styled('li')`
  position: relative;
`;

const StyledImage = styled('img')(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '200px',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'block',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  backgroundColor: theme.palette.background.overlay,
  color: theme.palette.text.light,
  padding: '8px',
}));

CharactersListItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CharactersListItem;
