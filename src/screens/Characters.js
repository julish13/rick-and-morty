import React, { useState, useEffect } from 'react';
import { useGetCharactersQuery } from '@redux';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Pagination, CharactersList } from '@components';

const Characters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const searchParamsPage = Number(searchParams.get('page'));

  const initialPage = searchParamsPage || 1;
  const [page, setPage] = useState(initialPage);
  // const [query, setQuery] = useState(query);

  const { data, isLoading, error } = useGetCharactersQuery(
    page
    // query
  );

  useEffect(() => {
    if (!searchParams.get('page')) {
      navigate(`${pathname}?page=${page}`, { replace: true });
    }
  }, []);

  useEffect(() => {
    if (searchParamsPage) {
      setPage(searchParamsPage);
    }
  }, [searchParamsPage]);

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
