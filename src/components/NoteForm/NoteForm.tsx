import { ReactElement, useEffect } from 'react';
import { Button, Form, Input, Skeleton } from 'antd';
import { NoteEditor } from '../NoteEditor';
import { useSelector } from 'react-redux';
import { useGetNoteQuery, useUpdateNoteMutation } from '../../api';

type NoteUpdate = {
  title: string;
  body: string;
};

export function NoteForm(): ReactElement {
  const [form] = Form.useForm();

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';
  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );

  const { data, error, isLoading } = useGetNoteQuery({ userId, noteId });
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

  if (isLoading) {
    return <Skeleton active />;
  }

  const handleOnFinish = async ({ title, body }: NoteUpdate) => {
    updateNote({ userId, noteId, dto: { title, text: body } });
    // form.resetFields
  };

  return (
    <Form
      name="note-form"
      layout="vertical"
      form={form}
      onFinish={handleOnFinish}>
      <Form.Item name="title">
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item name="body">
        {/* @ts-ignore */}
        <NoteEditor placeholder="Наберите текст" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={isUpdating}>
          Сохранить изменения
        </Button>
      </Form.Item>
    </Form>
  );
}
