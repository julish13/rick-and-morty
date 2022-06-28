import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CharactersListItem from './CharactersListItem';

const CharactersList = ({ characters }) => (
  <StyledImageList gap={6}>
    {characters.map((character) => (
      <CharactersListItem image={character.image} name={character.name} key={character.id} />
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
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      origin: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
      episode: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default CharactersList;
