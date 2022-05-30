import { CreateNoteDto } from '../../dto/types';

export type GetNotesParams = {
  userId: string;
  isTrash: boolean;
};

export type GetNoteParams = {
  userId: string;
  noteId: string;
};

export type AddNoteParams = {
  userId: string;
  dto: CreateNoteDto;
};

export type UpdateNoteParams = {
  userId: string;
  noteId: string;
  dto: CreateNoteDto;
};

export type RestoreNoteParams = {
  userId: string;
  noteId: string;
};

export type DeleteNoteParams = {
  userId: string;
  noteId: string;
  isSoftDelete: boolean;
};
