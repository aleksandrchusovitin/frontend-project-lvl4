// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import './locales/i18next/i18next.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/app/App.jsx';
import store from './store/index.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('chat'),
);
