import {
  CloseSquareOutlined,
  DeleteOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Space, Spin } from 'antd';
import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteNoteMutation, useGetNoteQuery } from '../../../api';
import { useRestoreNoteMutation } from '../../../api';
import { setId } from '../../../store/slices/currentNoteSlice';

import './style.css';

export function RightHeader(): ReactElement {
  const dispatch = useDispatch();

  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );
  const isBasketClicked = useSelector(
    (state: { navigation: { isBasketClicked: boolean } }) =>
      state.navigation.isBasketClicked,
  );

  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [restoreNote, { isLoading: isRestoring }] = useRestoreNoteMutation();

  const { isFetching } = useGetNoteQuery({ noteId });

  const handleClickDelete = async (isSoftDelete: boolean): Promise<void> => {
    if (!isDeleting) {
      try {
        await deleteNote({
          noteId,
          isSoftDelete,
        }).unwrap();
      } catch (err) {
        console.error('Failed to delete the note: ', err);
      }
    }
    dispatch(setId(undefined));
  };

  const handleClickRestore = async (): Promise<void> => {
    if (!isRestoring) {
      try {
        await restoreNote({
          noteId,
        }).unwrap();
      } catch (err) {
        console.error('Failed to restore the note: ', err);
      }
    }
    dispatch(setId(undefined));
  };

  return (
    <>
      {isFetching && (
        <Spin
          size="large"
          className="spinner"
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      )}
      <Space hidden={isFetching}>
        <Button
          size="large"
          type="link"
          onClick={() =>
            isBasketClicked ? handleClickDelete(false) : handleClickDelete(true)
          }
          loading={isDeleting}
          icon={
            isBasketClicked ? (
              <CloseSquareOutlined title="Удалить навсегда" />
            ) : (
              <DeleteOutlined title="Удалить" />
            )
          }
        />
        <Button
          size="large"
          type="link"
          hidden={!isBasketClicked}
          onClick={handleClickRestore}
          loading={isRestoring}
          icon={<ReloadOutlined title="Восстановить" />}
        />
      </Space>
    </>
  );
}
