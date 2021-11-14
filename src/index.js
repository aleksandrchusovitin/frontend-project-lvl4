// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/app/App.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <App />,
  document.getElementById('chat'),
);
