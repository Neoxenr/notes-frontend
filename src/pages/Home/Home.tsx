import { ReactElement, useEffect } from 'react';

import { Layout } from 'antd';

import { Notes } from '../../components/Notes';

import { MiddleHeader } from '../../components/Headers';
import { LeftSider, RightSider } from '../../components/Siders';

import './style.css';

const { Content } = Layout;

export function Home(): ReactElement {
  console.log('FFFFF');

  return (
    <Layout>
      <LeftSider />
      <Content>
        <MiddleHeader />
        <Notes />
      </Content>
      <RightSider />
    </Layout>
  );
}
