import React, { ReactElement, useEffect } from 'react';
import { Button, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import { NoteEditor } from '../NoteEditor';
import { useSelector } from 'react-redux';
import { useGetNoteQuery } from '../../api';

interface IPostCreate {
  body: string;
}

export function NoteForm(): ReactElement {
  const [form] = Form.useForm();

  const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  const noteId = useSelector(
    (state: { currentNote: { id: string } }) => state.currentNote.id,
  );
  console.log
  const { data, error, isLoading } = useGetNoteQuery({ userId, noteId });

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.resetFields();
      form.setFieldsValue({ body: data !== undefined ? data.text : '' });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOnFinish = (values: IPostCreate) => {
    // logic to submit form to server
    console.log(values.body);
    // form.resetFields();
  };

  return (
    <>
      <Title level={5}>Your Post</Title>

      <Form
        name="note-form"
        layout="vertical"
        form={form}
        initialValues={{ body: data !== undefined ? data.text : '' }}
        onFinish={handleOnFinish}>
        <Form.Item
          name="body"
          rules={[
            {
              required: true,
              message: 'Please enter body of post',
            },
          ]}>
          {/* @ts-ignore */}
          <NoteEditor value={form.getFieldValue} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
