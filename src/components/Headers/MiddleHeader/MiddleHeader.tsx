import { Button, Space } from 'antd';
import { ReactElement } from 'react';
import { Search } from '../../Search';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useAddNoteMutation } from '../../../api';
import { AppDispatch } from '../../../store/store';
import { changeView } from '../../../store';

import './style.css';

const { Header } = Layout;

export function MiddleHeader(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const [addNote, { isLoading: isCreating }] = useAddNoteMutation();

  const isBasketClicked = useSelector(
    (state: { navigation: { isBasketClicked: boolean } }) =>
      state.navigation.isBasketClicked,
  );

  const isChangeView = useSelector(
    (state: any) => state.buttonClicked.isChangeViewClick,
  );

  const handleClick = async (): Promise<void> => {
    if (!isCreating) {
      try {
        await addNote({
          dto: { title: 'Без названия', text: '' },
        }).unwrap();
      } catch (err) {
        console.error('Failed to create the note: ', err);
      }
    }
  };

  return (
    <Header>
      <Space>
        <Search />
        <Space>
          <Button
            hidden={isBasketClicked}
            onClick={handleClick}
            loading={isCreating}>
            Создать заметку
          </Button>
          <Button onClick={async () => dispatch(changeView(!isChangeView))}>
            Change view
          </Button>
        </Space>
      </Space>
    </Header>
  );
}
function dispatch(chan: any): void {
  throw new Error('Function not implemented.');
}
