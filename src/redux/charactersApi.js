import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character/' }),
  endpoints: (build) => ({
    getCharacters: build.query({
      query: ({ page = 1, query }) => {
        const queryString = new URLSearchParams(query).toString();
        console.log(query);
        return `?page=${page}${queryString ? `&${queryString}` : ''}`;
      },
    }),
    getCharacter: build.query({
      query: (id) => id,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = charactersApi;
