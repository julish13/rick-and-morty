import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList } from '@redux/features/charactersSlice';

const Characters = () => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state) => state.characters);
  useEffect(() => {
    dispatch(fetchList(activePage));
  }, []);
  return <h2>Characters</h2>;
};

export default Characters;
