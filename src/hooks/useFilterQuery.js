/* eslint-disable no-param-reassign */
import { useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useSearchParams } from 'react-router-dom';
import { filterFields } from '@const';

const filterFieldsNormalized = Object.fromEntries(
  filterFields.map(({ name, ...rest }) => [name, rest])
);

const fieldNames = Object.keys(filterFieldsNormalized);

const setDefaultPage = (searchParams) => {
  const page = searchParams.get('page');
  if (!page) {
    searchParams.set('page', filterFieldsNormalized.page.initialValue);
  }
  return searchParams;
};

const validateSearchParams = (searchParams) => {
  const searchParamsEntries = Array.from(searchParams.entries());
  const validEntries = searchParamsEntries.filter(([param, value]) => {
    const isNameValid = fieldNames.includes(param);
    if (!isNameValid) {
      return false;
    }
    const { type, values } = filterFieldsNormalized[param];
    switch (type) {
      case 'input':
        return true;
      case 'select':
        return values.includes(value);
      case 'page':
        return !Number.isNaN(Number(value));
      default:
        return false;
    }
  });
  const validSearchParams = new URLSearchParams(validEntries);
  return setDefaultPage(validSearchParams);
};

const getInitialQueryState = (searchParams) =>
  Object.entries(filterFieldsNormalized).reduce((acc, [key, { initialValue }]) => {
    const searchValue = searchParams.get(key);
    return { ...acc, [key]: searchValue || initialValue };
  }, {});

const useFilterQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const validSearchParams = validateSearchParams(searchParams);
  const initialQueryState = getInitialQueryState(validSearchParams);

  const [query, setQuery] = useImmer(initialQueryState);
  const { page, ...filter } = query;

  const setFilter = useCallback(
    (filterValues) => {
      const {
        page: { initialValue: defaultPage },
      } = filterFieldsNormalized;
      setQuery((draft) => {
        draft.page = defaultPage;
        fieldNames.forEach((name) => {
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
    setQuery((draft) => {
      Array.from(validSearchParams.entries).forEach(([param, value]) => {
        if (draft[param] !== value) {
          draft[param] = value;
        }
      });
    });
  }, [validSearchParams]);

  useEffect(() => {
    setSearchParams(validSearchParams);
  }, [searchParams]);

  return { page, filter, setFilter, setPage };
};

export default useFilterQuery;
