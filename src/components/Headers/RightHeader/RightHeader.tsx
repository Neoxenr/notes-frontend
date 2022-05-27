import { Button, Space } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteNoteMutation } from '../../../api';
import { setId } from '../../../store/slices/currentNoteSlice';

export function RightHeader(): ReactElement {
  const dispatch = useDispatch();

  const noteId = useSelector((state: { currentNote: { id: string } }) => {
    return state.currentNote.id;
  });

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  const handleClick = async (): Promise<void> => {
    // затемни
    if (!isLoading) {
      try {
        await deleteNote({
          userId,
          noteId,
        }).unwrap();
      } catch (err) {
        console.error('Failed to delete the note: ', err);
      }
    }
    dispatch(setId(undefined));
  };

  return (
    <Space>
      <Button onClick={handleClick}>Delete note</Button>
    </Space>
  );
}
