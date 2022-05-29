import { Button, Space } from 'antd';
import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteNoteMutation } from '../../../api';
import { useRestoreNoteMutation } from '../../../api';
import { setId } from '../../../store/slices/currentNoteSlice';

export function RightHeader(): ReactElement {
  const dispatch = useDispatch();

  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );
  const isBasketClicked = useSelector(
    (state: { navigation: { isBasketClicked: boolean } }) =>
      state.navigation.isBasketClicked,
  );

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [restoreNote, { isLoading: isRestoring }] = useRestoreNoteMutation();

  const handleClickDelete = async (isSoftDelete: boolean): Promise<void> => {
    if (!isDeleting) {
      try {
        await deleteNote({
          userId,
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
          userId,
          noteId,
        }).unwrap();
      } catch (err) {
        console.error('Failed to restore the note: ', err);
      }
    }
    dispatch(setId(undefined));
  };

  return (
    <Space>
      <Button
        type="primary"
        onClick={() =>
          isBasketClicked ? handleClickDelete(false) : handleClickDelete(true)
        }
        loading={isDeleting}>
        {isBasketClicked ? 'Удалить навсегда' : 'Удалить'}
      </Button>
      <Button
        type="primary"
        hidden={!isBasketClicked}
        onClick={handleClickRestore}
        loading={isRestoring}>
        Восстановить
      </Button>
    </Space>
  );
}
