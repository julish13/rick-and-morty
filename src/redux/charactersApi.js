import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character/' }),
  endpoints: (build) => ({
    getCharacters: build.query({
      query: (page = 1, query = '') => `?page=${page}${query ? `&${query}` : ''}`,
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
