import {
  CloseSquareOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Popover, Space, Spin } from 'antd';
import { ReactElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteNoteMutation, useGetNoteQuery } from '../../../api';
import { useRestoreNoteMutation } from '../../../api';
import { setId } from '../../../store/slices/currentNoteSlice';

import './style.css';

export function RightHeader(): ReactElement {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

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

  const { data, isFetching } = useGetNoteQuery({ noteId });

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
          hidden={!isBasketClicked}
          onClick={handleClickRestore}
          loading={isRestoring}
          icon={<ReloadOutlined title="Восстановить" />}
        />
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
              <DeleteOutlined title="Поместить в корзину" />
            )
          }
        />
        <Popover
          overlayStyle={{ width: 150 }}
          content={
            <>
              <p>
                {`Дата создания: ${new Date(
                  data ? data.createdAt : '',
                ).toLocaleDateString()}`}
              </p>
              <p>{`Дата изменения: \n${new Date(
                data ? data.updatedAt : '',
              ).toLocaleDateString()}`}</p>
              <a onClick={hide}>Закрыть</a>
            </>
          }
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}>
          <Button
            size="large"
            type="link"
            icon={<InfoCircleOutlined title="Информация о заметке" />}
          />
        </Popover>
      </Space>
    </>
  );
}
