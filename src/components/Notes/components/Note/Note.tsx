import React, { ReactElement, useEffect } from 'react';

import { Card } from 'antd';
import { usePrefetch } from '../../../../api/notes';
import { useDispatch } from 'react-redux';
import { setId } from '../../../../store/slices/currentNoteSlice';
import { AppDispatch } from '../../../../store/store';

import parse from 'html-react-parser';

type NoteProps = {
  id: string;
  title: string;
  text: string;
  updatedAt: string;
};

export function Note(props: NoteProps): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const prefetchNote = usePrefetch('getNote');

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  // const handleMouseEnter = async (): Promise<void> => {
  //   if (!props.isFirst) {
  //     prefetchNote({ userId, noteId: props.id }, { ifOlderThan: 2 });
  //   }
  // };

  const handleClick = async (): Promise<void> => {
    dispatch(setId(props.id));
  };

  // useEffect(() => {
  //   if (props.isFirst) {
  //     prefetchNote({ userId, noteId: props.id }, { ifOlderThan: 2 });
  //     dispatch(setId(props.id));
  //   }
  // });

  return (
    <Card
      hoverable
      className="note"
      title={props.title}
      onClick={handleClick}
      // onMouseEnter={handleMouseEnter}
      >
      <div>{parse(props.text)}</div>
      <p>{props.id}</p>
    </Card>
  );
}
