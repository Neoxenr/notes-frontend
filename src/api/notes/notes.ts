import { CreateNoteDto } from '../../common/dto/types';
import { Note } from '../../common/types';
import { api } from '../api';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], { userId: string; isTrash: boolean }>({
      query: ({ userId, isTrash }) => ({
        url: `users/${userId}/notes`,
        params: {
          trash: isTrash,
        },
      }),
      providesTags: ['Note'],
    }),
    getNote: builder.query<Note, { userId: string; noteId: string }>({
      query: ({ userId, noteId }) => `users/${userId}/notes/${noteId}`,
    }),
    addNote: builder.mutation<Note, { userId: string; dto: CreateNoteDto }>({
      query: ({ userId, dto }) => ({
        url: `users/${userId}/notes`,
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<
      Note,
      { userId: string; noteId: string; dto: CreateNoteDto }
    >({
      query: ({ userId, noteId, dto }) => ({
        url: `users/${userId}/notes/${noteId}`,
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: ['Note'],
    }),
    restoreNote: builder.mutation<Note, { userId: string; noteId: string }>({
      query: ({ userId, noteId }) => ({
        url: `users/${userId}/notes/${noteId}/restore`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<
      boolean,
      { userId: string; noteId: string; isSoftDelete: boolean }
    >({
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
