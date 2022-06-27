import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList } from '@redux/features/charactersSlice';

const Characters = () => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state) => state.characters);
  useEffect(() => {
    dispatch(fetchList(activePage));
  }, []);
  return <h1>Characters</h1>;
};

export default Characters;
