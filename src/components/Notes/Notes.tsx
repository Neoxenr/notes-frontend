import React, { ReactElement, useEffect } from 'react';

import { Col, Row, Skeleton } from 'antd';
import { Note } from './components/Note';

import { useGetNotesQuery, usePrefetch } from '../../api/notes/notes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setId } from '../../store/slices/currentNoteSlice';

export function Notes(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';
  const isBasketClicked = useSelector(
    (state: { navigation: { isBasketClicked: boolean } }) =>
      state.navigation.isBasketClicked,
  );

  const { data, isLoading, isFetching } = useGetNotesQuery({
    userId,
    isTrash: isBasketClicked,
  });
  const prefetchNote = usePrefetch('getNote');

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      prefetchNote({ userId, noteId: data[0].id }, { force: true });
      dispatch(setId(data[0].id));
    }
  }, [data]);

  if (isLoading) {
    // измени
    return <Skeleton active />;
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.map((note) => {
        return (
          <Col key={note.id} span={6}>
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
