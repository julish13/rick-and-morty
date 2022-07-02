import React from 'react';
import { Outlet } from 'react-router-dom';
import { Pagination, CharactersList, SearchForm, LoadingSpinner, ErrorMessage } from '@components';
import { useGetCharactersQuery } from '@redux';
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
  const { page, filter, setFilter, setPage } = useFilterQuery(initialParamsValues);
  const { data, isLoading, error, isFetching } = useGetCharactersQuery({
    page,
    query: filter,
  });

  let content;

  if (isLoading || isFetching) {
    content = <LoadingSpinner />;
  }

  if (error) {
    const { status } = error;

    content = <ErrorMessage status={status} />;
  }

  if (!isLoading && !isFetching && !error) {
    const { info, results } = data;

    content = (
      <Pagination
        pagesQuantity={info.pages}
        page={Number(page)}
        setPage={setPage}
        itemsQuantity={info.count}
        itemsPerPage={results.length}
      >
        <CharactersList characters={results} />
      </Pagination>
    );
  }

  return (
    <section>
      <SearchForm query={filter} setQuery={setFilter} disabled={isLoading || isFetching} />
      {content}
      <Outlet />
    </section>
  );
};

export default CharactersScreen;
