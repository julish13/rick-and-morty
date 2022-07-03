import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character/' }),
  endpoints: (build) => ({
    getCharacters: build.query({
      query: ({ page = 1, query }) => {
        const filteredEntries = Object.entries(query).filter(([, value]) => value);
        const queryString = new URLSearchParams(filteredEntries).toString();
        return `?page=${page}${queryString ? `&${queryString}` : ''}`;
      },
    }),
    getCharacter: build.query({
      query: (id) => id,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = charactersApi;
