import { ReactElement } from 'react';

import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { setId } from '../../../../store/slices/currentNoteSlice';
import { AppDispatch } from '../../../../store/store';

import parse from 'html-react-parser';

type NoteProps = {
  id: string;
  title: string;
  text: string;
  updatedAt: string;
  isLoading: boolean;
};

export function Note(props: NoteProps): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = async (): Promise<void> => {
    dispatch(setId(props.id));
  };

  return (
    <Card
      hoverable
      className="note"
      title={props.title}
      onClick={handleClick}
      loading={props.isLoading}>
      <div>{parse(props.text)}</div>
      <p>{props.id}</p>
    </Card>
  );
}
