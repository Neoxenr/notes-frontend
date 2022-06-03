import { api } from '../api';
import { Note } from '../../common/entity/types';
import {
  AddNoteParams,
  DeleteNoteParams,
  GetNoteParams,
  GetNotesParams,
  RestoreNoteParams,
  UpdateNoteParams,
} from '../../common';

const extendedNotesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], GetNotesParams>({
      query: ({ isTrash }) => {
        const token = localStorage.getItem('token');

        const request = {
          url: `notes`,
          params: {
            trash: isTrash,
          },
          headers: new Headers(
            token ? { Authorization: `Bearer ${token}` } : {},
          ),
        };

        return request;
      },
      providesTags: ['Note'],
    }),
    getNote: builder.query<Note, GetNoteParams>({
      query: ({ noteId }) => {
        const token = localStorage.getItem('token');

        const request = {
          url: `notes/${noteId}`,
          headers: new Headers(
            token ? { Authorization: `Bearer ${token}` } : {},
          ),
        };

        return request;
      },
    }),
    addNote: builder.mutation<Note, AddNoteParams>({
      query: ({ dto }) => {
        const token = localStorage.getItem('token');

        const request = {
          url: `notes`,
          method: 'POST',
          body: dto,
          headers: new Headers(
            token ? { Authorization: `Bearer ${token}` } : {},
          ),
        };

        return request;
      },
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, UpdateNoteParams>({
      query: ({ noteId, dto }) => {
        const token = localStorage.getItem('token');

        const request = {
          url: `notes/${noteId}`,
          method: 'PATCH',
          body: dto,
          headers: new Headers(
            token ? { Authorization: `Bearer ${token}` } : {},
          ),
        };

        return request;
      },
      invalidatesTags: ['Note'],
    }),
    restoreNote: builder.mutation<Note, RestoreNoteParams>({
      query: ({ noteId }) => {
        const token = localStorage.getItem('token');

        const request = {
          url: `notes/${noteId}/restore`,
          method: 'PATCH',
          headers: new Headers(
            token ? { Authorization: `Bearer ${token}` } : {},
          ),
        };

        return request;
      },
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<boolean, DeleteNoteParams>({
      query: ({ noteId, isSoftDelete }) => {
        const token = localStorage.getItem('token');

        const request = {
          url: `notes/${noteId}`,
          params: {
            softDelete: isSoftDelete,
          },
          method: 'DELETE',
          headers: new Headers(
            token ? { Authorization: `Bearer ${token}` } : {},
          ),
        };

        return request;
      },
      invalidatesTags: ['Note'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useRestoreNoteMutation,
  usePrefetch,
} = extendedNotesApi;
