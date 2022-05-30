import React, { ReactElement } from 'react';

import { Input } from 'antd';
// мб в antd есть что-то для поиска
export function Search(): ReactElement {
  return <Input placeholder="Search" />;
}
