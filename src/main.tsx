import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {theme, ThemeProvider} from './helpers/styled-component';
import {store} from './redux/store';
import {ConfigProvider} from 'antd';
import {initializeApp} from 'firebase/app';
import firebaseConfig from './helpers/configs/firebase';

import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css';
import 'material-icons/iconfont/material-icons.css';

import Application from './App';
import GlobalStyled from './components/GlobalStyled';

initializeApp(firebaseConfig);

ConfigProvider.config({
  theme: {
    primaryColor: '#2A5681',
  },
});

const MOUNT_NODE = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(MOUNT_NODE);

root.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ConfigProvider>
          <GlobalStyled>
            <Application />
          </GlobalStyled>
        </ConfigProvider>
      </BrowserRouter>
    </ThemeProvider>
  </ReduxProvider>
);
