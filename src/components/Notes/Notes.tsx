import { ReactElement, useEffect } from 'react';
import { Col, Row, Skeleton } from 'antd';
import { Note } from './components/Note';
import { useGetNotesQuery, usePrefetch } from '../../api/notes/notes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { resetCurrentNoteState, setId } from '../../store/slices/currentNoteSlice';

import './style.css';

export function Notes(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const navigation = useSelector((state: any) => state.navigation);
  const isChangeView = useSelector(
    (state: any) => state.buttonClicked.isChangeViewClick,
  );
  const searchedText = useSelector((state: any) => state.search.searchedText);

  const { data, isLoading, isFetching } = useGetNotesQuery({
    isTrash: navigation.isBasketClicked,
  });

  const prefetchNote = usePrefetch('getNote');

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      prefetchNote({ noteId: data[0].id }, { force: true });
      dispatch(setId(data[0].id));
    }
    if (data?.length === 0) {
      dispatch(resetCurrentNoteState());
    }
  }, [data]);

  if (isLoading || (isFetching && data.length === 0)) {
    return <Skeleton active />;
  }

  return (
    <Row gutter={[8, 8]}>
      {data?.map((note) => {
        return (
          <Col
            hidden={
              !note.title.toLowerCase().includes(searchedText.toLowerCase())
            }
            key={note.id}
            span={isChangeView ? 24 : 6}>
            <Note
              id={note.id}
              title={note.title}
              text={note.text}
              updatedAt={note.updatedAt}
              isLoading={isFetching}
            />
          </Col>
        );
      })}
    </Row>
  );
}
