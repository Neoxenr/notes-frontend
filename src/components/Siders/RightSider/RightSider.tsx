import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Sider from 'antd/lib/layout/Sider';
import { RightHeader } from '../../Headers';
import { NoteForm } from '../../NoteForm';

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
