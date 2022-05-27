import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import ReactQuill from 'react-quill';

import { useDispatch, useSelector } from 'react-redux';
import { useGetNoteQuery } from '../../api';

import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

export function NoteEditor({ value, onChange, placeholder }: Props): ReactElement {
  // const userId: string = '4b10ef6e-991f-4e62-b275-57193a2280fa';

  // const noteId = useSelector(
  //   (state: { currentNote: { id: string } }) => state.currentNote.id,
  // );

  // const { data, error, isLoading } = useGetNoteQuery({ userId, noteId });

  // const [text, setText] = useState('');

  // useEffect(() => {
  //   setText(data !== undefined ? data.text : '');
  // }, [data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // const handleChange = async (text: string): Promise<void> => {
  //   setText(text);
  // };

  return (
    <div>
      <ReactQuill
        placeholder={placeholder}
        theme="snow"
        // value={value}
        defaultValue={value}
        modules={modules}
        onChange={onChange}
      />
    </div>
  );
}
