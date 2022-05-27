import Sider from 'antd/lib/layout/Sider';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RightHeader } from '../../Headers';
import { NoteForm } from '../../NoteForm';
import { NoteEditor } from '../../NoteEditor';

export function RightSider(): ReactElement {
  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );

  return (
    <Sider width={600}>
      {noteId !== undefined ? (
        <>
          <RightHeader />
          <NoteForm />
        </>
      ) : (
        <></>
      )}
    </Sider>
  );
}
