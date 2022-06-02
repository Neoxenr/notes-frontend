import { ReactElement, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { NoteEditor } from '../NoteEditor';
import { useSelector } from 'react-redux';
import { useGetNoteQuery, useUpdateNoteMutation } from '../../api';

type NoteUpdate = {
  title: string;
  body: string;
};

export function NoteForm(): ReactElement {
  const [form] = Form.useForm();

  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );
  const isBasketClicked = useSelector(
    (state: { navigation: { isBasketClicked: boolean } }) =>
      state.navigation.isBasketClicked,
  );

  const { data, isFetching, isLoading } = useGetNoteQuery({ noteId });
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.resetFields();
      form.setFieldsValue(
        data !== undefined
          ? { body: data.text, title: data.title }
          : { body: '', title: '' },
      );
    }
  }, [data]);

  const handleOnFinish = async ({ title, body }: NoteUpdate) => {
    updateNote({
      noteId,
      dto: { title, text: body },
    });
  };

  return (
    <Form
      hidden={isFetching}
      name="note-form"
      layout="vertical"
      form={form}
      onFinish={handleOnFinish}>
      <Form.Item name="title">
        <Input readOnly={isBasketClicked} placeholder="Название" />
      </Form.Item>
      <Form.Item name="body">
        {/* @ts-ignore */}
        <NoteEditor readOnly={isBasketClicked} placeholder="Наберите текст" />
      </Form.Item>
      <Form.Item hidden={isBasketClicked}>
        <Button htmlType="submit" type="primary" loading={isUpdating}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
