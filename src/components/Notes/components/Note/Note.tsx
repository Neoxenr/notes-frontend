import React, { ReactElement, useEffect } from 'react';

import { Card } from 'antd';
import { usePrefetch } from '../../../../api/notes';
import { useDispatch } from 'react-redux';
import { setId } from '../../../../store/slices/currentNoteSlice';
import { AppDispatch } from '../../../../store/store';

type NoteProps = {
  id: string;
  title: string;
  text: string;
  updatedAt: string;
  isFirst: boolean;
};

export function Note(props: NoteProps): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const prefetchNote = usePrefetch('getNote');

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const handleMouseEnter = async (): Promise<void> => {
    prefetchNote({ userId, noteId: props.id });
  };

  const handleClick = async (): Promise<void> => {
    dispatch(setId(props.id));
  };

  // console.log('(((');

  useEffect(() => {
    if (props.isFirst) {
      dispatch(setId(props.id));
    }
  });

  return (
    <Card
      hoverable
      className="note"
      title={props.title}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}>
      <p><strong>{props.isFirst && 'FIRST'}</strong></p>
      <p>{props.text}</p>
      <p>{props.id}</p>
    </Card>
  );
}
