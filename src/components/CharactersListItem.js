import React from 'react';
import styled from 'styled-components';
import { characterPropTypes } from '@lib/PropTypes/PropTypesValues';
import { Typography } from '@mui/material';

const CharactersListItem = ({ character }) => (
  <StyledItem>
    <StyledImage
      src={character.image}
      alt={character.name}
      loading="lazy"
      width="300"
      height="300"
    />
    <StyledTypography variant="h2" component="h2">
      {character.name}
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

CharactersListItem.propTypes = characterPropTypes;

export default CharactersListItem;
