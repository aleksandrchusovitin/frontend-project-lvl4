// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import * as filter from 'leo-profanity';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import App from './App.jsx';
import { SocketProvider } from './providers';
import reducer, { actions } from './store/slices';
import resources from './locales';
import '../assets/application.scss';

export default async (instanceSocket) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const store = configureStore({
    reducer,
  });

  instanceSocket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  instanceSocket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  instanceSocket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });
  instanceSocket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel(payload));
  });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    enabled: process.env.NODE_ENV === 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV,
    },
  };

  const ruDict = filter.getDictionary('ru');
  filter.add(ruDict);

  const i18nInstance = i18n.createInstance();
  const defaultLanguage = 'ru';

  await i18nInstance
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: defaultLanguage,
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

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
