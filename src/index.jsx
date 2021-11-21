// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/app/App.jsx';
import store from './store/index.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('chat'),
);
