import { ReactElement } from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { setId } from '../../../../store/slices/currentNoteSlice';
import { AppDispatch } from '../../../../store/store';

import './style.css';
import Meta from 'antd/lib/card/Meta';

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
      size="small"
      hoverable
      title={props.title}
      onClick={handleClick}
      loading={props.isLoading}>
      <Meta
        description={props.text
          .replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, ' ')
        }
      />
    </Card>
  );
}
