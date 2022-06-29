import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { characterPropTypes } from '@lib/PropTypes/PropTypesValues';
import CharactersListItem from './CharactersListItem';

const CharactersList = ({ characters }) => (
  <StyledImageList gap={6}>
    {characters.map((character) => (
      <CharactersListItem character={character} key={character.id} />
    ))}
  </StyledImageList>
);

const StyledImageList = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 300px)',
  justifyContent: 'center',
  gap: '6px',
  margin: 0,
  paddingLeft: 0,
  listStyle: 'none',

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, 200px)',
  },
}));

CharactersList.propTypes = {
  characters: PropTypes.arrayOf(characterPropTypes).isRequired,
};

export default CharactersList;
