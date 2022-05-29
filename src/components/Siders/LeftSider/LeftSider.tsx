import React, { ReactElement } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';

import { DeleteOutlined, SnippetsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const handleGetNotes = () => {

}

const handleGetDeletedNotes = () => {

}

const items: MenuProps['items'] = [
  {
    key: 'item 1',
    icon: React.createElement(SnippetsOutlined),
    label: 'Заметки',
  },
  {
    key: 'item 2',
    icon: React.createElement(DeleteOutlined),
    label: 'Корзина',
  },
];

export function LeftSider(): ReactElement {
  return (
    <Sider>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}></Menu>
    </Sider>
  );
}
