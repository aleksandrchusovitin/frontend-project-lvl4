// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import './locales/i18next/i18next.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/app/App.jsx';
import store from './store/index.js';

import '../assets/application.scss';

export default async (instanceSocket) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App socket={instanceSocket} />
      </Provider>
    </React.StrictMode>
  );
};
