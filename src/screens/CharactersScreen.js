import React from 'react';
import { useGetCharactersQuery } from '@redux';
import { Outlet } from 'react-router-dom';
import { Pagination, CharactersList, SearchForm } from '@components';
import { useFilterQuery } from '@hooks';

const initialParamsValues = {
  gender: '',
  name: '',
  species: '',
  status: '',
  type: '',
  page: '1',
};

const CharactersScreen = () => {
  const { page, filterQuery, setFilter, setPage } = useFilterQuery(initialParamsValues);
  const { data, isLoading, error } = useGetCharactersQuery({ page, query: filterQuery });

  if (isLoading) {
    return <p>is Loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  const { results, info } = data;

  return (
    <section>
      <SearchForm query={filterQuery} setQuery={setFilter} />
      <Pagination pagesQuantity={info.pages} page={Number(page)} setPage={setPage}>
        <CharactersList characters={results} />
      </Pagination>
      <Outlet />
    </section>
  );
};

export default CharactersScreen;
