import React from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, CharacterDetails, LoadingSpinner } from '@components';
import { useGetCharacterQuery } from '@redux';

const normalizeData = (data) => ({
  image: data.image,
  name: data.name,
  status: data.status,
  species: data.species,
  gender: data.gender,
  type: data.type,
  origin: data.origin.name,
  location: data.location.name,
});

const getParentPath = (path) => path.split('/').slice(0, -1).join('/');

const CharacterDetailsScreen = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const parentPath = getParentPath(pathname);
  let element;
  const storedCharacter = useSelector((state) => state.activeCharacter.character);

  if (storedCharacter) {
    element = <CharacterDetails character={normalizeData(storedCharacter)} />;
  } else {
    const { id } = useParams();
    const { data, isLoading, error } = useGetCharacterQuery(id);
    element = (
      <>
        {isLoading && <LoadingSpinner />}
        {error && <div>error</div>}
        {!isLoading && !error && <CharacterDetails character={normalizeData(data)} />}
      </>
    );
  }

  const onClose = () => {
    navigate(`${parentPath}${search}`);
  };

  return createPortal(
    <Modal onClose={onClose} open>
      {element}
    </Modal>,
    document.getElementById('modal_root')
  );
};

export default CharacterDetailsScreen;
