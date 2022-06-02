import { ReactElement, useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import {
  resetNavigationState,
  setIsBasketClicked,
  setIsNotesClicked,
} from '../../../store/slices/navigationSlice';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import {
  resetCurrentNoteState,
  setId,
} from '../../../store/slices/currentNoteSlice';
import {
  resetAuthorizeSlice,
  resetButtonClicked,
  resetSearchedText,
} from '../../../store';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import {
  DeleteOutlined,
  LogoutOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

import './style.css';

export function LeftSider(): ReactElement {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const handleGetNotes: MenuClickEventHandler = async (): Promise<void> => {
    dispatch(setIsNotesClicked(true));
    dispatch(resetSearchedText());
  };

  const handleGetDeletedNotes: MenuClickEventHandler =
    async (): Promise<void> => {
      dispatch(setIsBasketClicked(true));
      dispatch(resetSearchedText());
    };

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('token');

    // ?
    dispatch(api.util.resetApiState());

    dispatch(resetAuthorizeSlice());
    dispatch(resetButtonClicked());
    dispatch(resetCurrentNoteState());
    dispatch(resetNavigationState());
    dispatch(resetSearchedText());

    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <SnippetsOutlined />,
      label: 'Заметки',
      onClick: handleGetNotes,
    },
    {
      key: '2',
      icon: <DeleteOutlined />,
      label: 'Корзина',
      onClick: handleGetDeletedNotes,
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Выход',
      onClick: handleLogout,
    },
  ];

  return (
    <Sider
      width={140}
      collapsible
      // breakpoint=''
      collapsed={collapsed}
      onCollapse={(value: any) => setCollapsed(value)}>
      <Menu defaultSelectedKeys={['1']} items={items} />
    </Sider>
  );
}
