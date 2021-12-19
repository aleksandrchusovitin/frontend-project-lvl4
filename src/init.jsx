// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import './locales/i18next/i18next.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import { SocketProvider } from './providers/index.js';
import messages, { addMessage } from './store/slices/messagesSlice.js';
import channels, { addChannel, removeChannel, renameChannel } from './store/slices/channelsSlice.js';
import modal from './store/slices/modalSlice.js';

import '../assets/application.scss';

export default async (instanceSocket) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const store = configureStore({
    reducer: { channels, messages, modal },
    devTools: process.env.NODE_ENV !== 'production',
  });

  instanceSocket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  instanceSocket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  instanceSocket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });
  instanceSocket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV,
    },
  };

  return (
    <React.StrictMode>
      <RollBarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <SocketProvider socket={instanceSocket}>
              <App />
            </SocketProvider>
          </Provider>
        </ErrorBoundary>
      </RollBarProvider>
    </React.StrictMode>
  );
};
