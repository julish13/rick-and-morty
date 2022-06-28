import React, { useState } from 'react';
import { useGetCharactersQuery } from '@redux';
import { useSearchParams } from 'react-router-dom';
import { Pagination, CharactersList } from '@components';

const Characters = () => {
  const [searchParams] = useSearchParams();
  const searchParamsPage = Number(searchParams.get('page'));
  const initialPage = searchParamsPage || 1;
  const [page, setPage] = useState(initialPage);
  // const [query, setQuery] = useState(query);
  const { data, isLoading, error } = useGetCharactersQuery(
    page
    // query
  );

  if (isLoading) {
    return <p>is Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>error</p>;
  }

  const { results, info } = data;

  return (
    <Pagination pagesQuantity={info.pages} page={page} setPage={setPage}>
      <CharactersList characters={results} />
    </Pagination>
  );
};

export default Characters;
