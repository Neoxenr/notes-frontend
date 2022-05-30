import { Button, Space } from 'antd';
import { ReactElement } from 'react';
import { useAddNoteMutation } from '../../../api/notes';
import { Search } from '../../Search';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

const { Header } = Layout;

export function MiddleHeader(): ReactElement {
  const [addNote, { isLoading: isCreating }] = useAddNoteMutation();

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const isBasketClicked = useSelector(
    (state: { navigation: { isBasketClicked: boolean } }) =>
      state.navigation.isBasketClicked,
  );

  const handleClick = async (): Promise<void> => {
    if (!isCreating) {
      try {
        await addNote({
          userId,
          dto: { title: 'Без названия', text: 'HAHA' },
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
        <Button
          hidden={isBasketClicked}
          onClick={handleClick}
          loading={isCreating}>
          Create
        </Button>
        <Button>Change view</Button>
      </Space>
    </Header>
  );
}
