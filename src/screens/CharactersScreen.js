/* eslint-disable no-param-reassign */

import React, { useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useGetCharactersQuery } from '@redux';
import { useSearchParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Pagination, CharactersList, SearchForm } from '@components';

const initialParamsValues = [
  ['name', ''],
  ['species', ''],
  ['type', ''],
  ['status', ''],
  ['gender', ''],
  ['page', '1'],
];

const initialParams = initialParamsValues.map(([param]) => param);

const getInitialQueryState = (searchParams) => {
  const entries = initialParamsValues.map(([name, defaultValue]) => {
    const value = searchParams.get(name);
    return [name, value || defaultValue];
  });
  return Object.fromEntries(entries);
};

const validateSearchParams = (searchParams) => {
  const entries = searchParams.entries();
  const validEntries = Array.from(entries).filter(([param]) => initialParams.includes(param));
  return new URLSearchParams(validEntries);
};

const CharactersScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validSearchParams = validateSearchParams(searchParams);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initialQueryState = getInitialQueryState(searchParams);

  const [query, setQuery] = useImmer(initialQueryState);

  const setFilter = useCallback(
    (filter) => {
      setQuery((draft) => {
        draft.page = 1;
        initialParams.forEach((name) => {
          if (name !== 'page') {
            draft[name] = filter[name];
          }
        });
      });
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value);
        }
      });
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    },
    [setQuery]
  );

  const setPage = useCallback(
    (page) => {
      setQuery((draft) => {
        draft.page = String(page);
      });
    },
    [setQuery]
  );

  const { page, ...filterQuery } = query;

  const { data, isLoading, error } = useGetCharactersQuery({ page, query: filterQuery });

  useEffect(() => {
    const paramsString = validSearchParams.toString();
    if (!searchParams.get('page')) {
      navigate(`${pathname}?page=${page}${paramsString ? `&${paramsString}` : ''}`, {
        replace: true,
      });
    }
  }, []);

  useEffect(() => {
    setQuery((draft) => {
      Array.from(validSearchParams.entries).forEach(([param, value]) => {
        if (draft[param] !== value) {
          draft[param] = value;
        }
      });
    });
  }, [validSearchParams]);

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
