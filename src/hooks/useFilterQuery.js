/* eslint-disable no-param-reassign */
import { useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const validateSearchParams = (searchParams, initialParams) => {
  const entries = searchParams.entries();
  const validEntries = Array.from(entries).filter(([param]) => initialParams.includes(param));
  return new URLSearchParams(validEntries);
};

const getInitialQueryState = (searchParams, initialParamsValues) =>
  Object.entries(initialParamsValues).reduce((acc, [key, initialValue]) => {
    const searchValue = searchParams.get(key);
    return { ...acc, [key]: searchValue || initialValue };
  }, {});

const useFilterQuery = (initialParamsValues) => {
  const initialParams = Object.keys(initialParamsValues);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const validSearchParams = validateSearchParams(searchParams, initialParams);
  const initialQueryState = getInitialQueryState(validSearchParams, initialParamsValues);

  const [query, setQuery] = useImmer(initialQueryState);
  const { page, ...filter } = query;

  const setFilter = useCallback(
    (filterValues) => {
      const { page: defaultPage } = initialParamsValues;
      setQuery((draft) => {
        draft.page = defaultPage;
        initialParams.forEach((name) => {
          if (name !== 'page') {
            draft[name] = filterValues[name];
          }
        });
      });
      Object.entries(filterValues).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      });
      searchParams.set('page', defaultPage);
      setSearchParams(searchParams);
    },
    [setQuery]
  );

  const setPage = useCallback(
    (num) => {
      setQuery((draft) => {
        draft.page = String(num);
      });
    },
    [setQuery]
  );

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

  return { page, filter, setFilter, setPage };
};

export default useFilterQuery;
