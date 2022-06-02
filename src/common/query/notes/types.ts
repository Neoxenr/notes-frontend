import { CreateNoteDto } from '../../dto';

export type GetNotesParams = {
  isTrash: boolean;
};

export type GetNoteParams = {
  noteId: string;
};

export type AddNoteParams = {
  dto: CreateNoteDto;
};

export type UpdateNoteParams = {
  noteId: string;
  dto: CreateNoteDto;
};

export type RestoreNoteParams = {
  noteId: string;
};

export type DeleteNoteParams = {
  noteId: string;
  isSoftDelete: boolean;
};
