import React, { ReactElement } from 'react';

import { Layout } from 'antd';

import { Notes } from '../../components/Notes';

import { MiddleHeader, RightHeader } from '../../components/Headers';
import { NoteEditor } from '../../components/NoteEditor';

import './style.css';
import { RightSider } from '../../components/Siders';

const { Sider, Content } = Layout;

export function Home(): ReactElement {
  console.log('FFFFF');

  return (
    <Layout>
      <Sider>left sidebar</Sider>
      <Content>
        <MiddleHeader />
        <Notes />
      </Content>
      {/* мб сделать его выдвигающимся */}
      <RightSider />
    </Layout>
  );
}
