import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { characterPropTypes } from '@lib/PropTypes/PropTypesValues';
import { activeCharacterActions } from '@store';

const CharactersListItem = ({ character }) => {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  const setActiveCharacter = () => {
    dispatch(activeCharacterActions.setCharacter(character));
  };

  return (
    <StyledItem>
      <StyledLink to={`${pathname}/${character.id}${search}`} onClick={setActiveCharacter}>
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
      </StyledLink>
    </StyledItem>
  );
};

const StyledItem = styled('li')(() => ({
  position: 'relative',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  borderRadius: '8px',
  overflow: 'hidden',
  '&:hover, &:active, &:focus': {
    zIndex: 1,
    boxShadow: `5px 5px 15px 5px ${theme.palette.text.secondary}`,
  },
}));

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
  borderRadius: '0 0 8px 8px',
}));

CharactersListItem.propTypes = characterPropTypes;

export default CharactersListItem;
