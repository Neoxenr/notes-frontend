import {
  GetNotesParams,
  GetNoteParams,
  AddNoteParams,
  UpdateNoteParams,
  RestoreNoteParams,
  DeleteNoteParams,
} from '../../common';
import { Note } from '../../common/entity/types';
import { api } from '../api';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], GetNotesParams>({
      query: ({ userId, isTrash }) => ({
        url: `users/${userId}/notes`,
        params: {
          trash: isTrash,
        },
      }),
      providesTags: ['Note'],
    }),
    getNote: builder.query<Note, GetNoteParams>({
      query: ({ userId, noteId }) => `users/${userId}/notes/${noteId}`,
    }),
    addNote: builder.mutation<Note, AddNoteParams>({
      query: ({ userId, dto }) => ({
        url: `users/${userId}/notes`,
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, UpdateNoteParams>({
      query: ({ userId, noteId, dto }) => ({
        url: `users/${userId}/notes/${noteId}`,
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: ['Note'],
    }),
    restoreNote: builder.mutation<Note, RestoreNoteParams>({
      query: ({ userId, noteId }) => ({
        url: `users/${userId}/notes/${noteId}/restore`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<boolean, DeleteNoteParams>({
      query: ({ userId, noteId, isSoftDelete }) => ({
        url: `users/${userId}/notes/${noteId}`,
        params: {
          softDelete: isSoftDelete,
        },
        method: 'DELETE',
      }),
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
} = extendedApi;
