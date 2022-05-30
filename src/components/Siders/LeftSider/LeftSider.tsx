import React, { MouseEventHandler, ReactElement } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';

import { DeleteOutlined, SnippetsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { setIsBasketClicked } from '../../../store/slices/navigationSlice';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { setId } from '../../../store/slices/currentNoteSlice';

export function LeftSider(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const handleGetNotes: MenuClickEventHandler = async (): Promise<void> => {
    dispatch(setIsBasketClicked(false));
    dispatch(setId(undefined));
  };

  // добавь модалку, мол, заметка в корзине
  const handleGetDeletedNotes: MenuClickEventHandler =
    async (): Promise<void> => {
      dispatch(setIsBasketClicked(true));
      dispatch(setId(undefined));
    };

  const items: MenuProps['items'] = [
    {
      key: 'item 1',
      icon: React.createElement(SnippetsOutlined),
      label: 'Заметки',
      onClick: handleGetNotes,
    },
    {
      key: 'item 2',
      icon: React.createElement(DeleteOutlined),
      label: 'Корзина',
      onClick: handleGetDeletedNotes,
    },
  ];

  return (
    <Sider>
      <Menu mode="inline" defaultSelectedKeys={['1']} items={items}></Menu>
    </Sider>
  );
}
