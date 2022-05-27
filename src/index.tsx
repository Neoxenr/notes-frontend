import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

import './index.css';

import { store } from './store';

import { Home } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
