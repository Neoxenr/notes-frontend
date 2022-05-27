import { CreateNoteDto } from '../../common/dto/types';
import { Note } from '../../common/types';
import { api } from '../api';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], string>({
      query: (userId) => `users/${userId}/notes/`,
      providesTags: ['Note'],
    }),
    getNote: builder.query<Note, { userId: string; noteId: string }>({
      query: ({ userId, noteId }) => {
        return `users/${userId}/notes/${noteId}`;
      },
      // providesTags: (result, error, { userId, noteId }) => {
      //   return [{ type: 'Note', noteId }];
      // },
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
    deleteNote: builder.mutation<boolean, { userId: string; noteId: string }>({
      query: ({ userId, noteId }) => ({
        url: `users/${userId}/notes/${noteId}`,
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
  usePrefetch,
} = extendedApi;
