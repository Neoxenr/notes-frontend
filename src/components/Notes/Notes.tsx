import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row, Card } from 'antd';

import { Note } from './components/Note';
import { AppDispatch } from '../../store/store';
import { useGetNotesQuery } from '../../api/notes/notes';
import { setId } from '../../store/slices/currentNoteSlice';

export function Notes(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const { data, error, isLoading } = useGetNotesQuery(userId);

  if (isLoading) {
    // сделай норм подгрузку
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.map((note, index) => {
        return (
          <Col key={note.id} span={6}>
            <Note
              id={note.id}
              title={note.title}
              text={note.text}
              updatedAt={note.updatedAt}
              isFirst={index === 0}
            />
          </Col>
        );
      })}
    </Row>
  );
}
