import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Note'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://notes-dolgushin.herokuapp.com/',
  }),
  endpoints: () => ({}),
});
