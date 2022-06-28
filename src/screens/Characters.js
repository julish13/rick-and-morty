import React, { useState } from 'react';
import { useGetCharactersQuery } from '@redux';

const initialPage = 1;
const Characters = () => {
  const [page, setPage] = useState(initialPage);
  const { data, isLoading, error } = useGetCharactersQuery(page);

  if (isLoading) {
    return <p>is Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  return (
    <>
      <input value={page} onChange={(e) => setPage(e.target.value)} />
      <ul>
        {data.results.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default Characters;
