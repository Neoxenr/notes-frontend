import { ReactElement } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['clean'],
  ],
};

type OnChangeHandler = {
  (e: any): void;
};

type Props = {
  value: string;
  placeholder: string;
  readOnly: boolean;
  onChange: OnChangeHandler;
};

export function NoteEditor({
  value,
  onChange,
  placeholder,
  readOnly,
}: Props): ReactElement {
  return (
    <div>
      <ReactQuill
        theme={readOnly ? 'bubble' : 'snow'}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={value}
        modules={modules}
        onChange={onChange}
      />
    </div>
  );
}
