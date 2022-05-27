import { Button, Space } from 'antd';
import { ReactElement } from 'react';
import { useAddNoteMutation } from '../../../api/notes';
import { Search } from '../../Search';
import { Layout } from 'antd';

const { Header } = Layout;

export function MiddleHeader(): ReactElement {
  const [addNote, { isLoading }] = useAddNoteMutation();

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const handleClick = async (): Promise<void> => {
    // затемни
    if (!isLoading) {
      try {
        await addNote({
          userId,
          dto: { title: 'Без названия', text: 'test' },
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
        <Button onClick={handleClick}>Create</Button>
        <Button>Change view</Button>
      </Space>
    </Header>
  );
}
