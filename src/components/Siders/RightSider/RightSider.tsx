import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RightHeader } from '../../Headers';
import { NoteForm } from '../../NoteForm';
import { Layout } from 'antd';

import './style.css';

const { Sider } = Layout;

export function RightSider(): ReactElement {
  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );

  return (
    <Sider width={550}>
      {noteId !== undefined && (
        <>
          <RightHeader />
          <NoteForm />
        </>
      )}
    </Sider>
  );
}
