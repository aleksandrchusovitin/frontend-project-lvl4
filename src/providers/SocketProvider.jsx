import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Context from '../context/index.js';
import toast from '../toast/index.js';
import { currentChannelIdUpdated } from '../store/slices/channelsSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const addMessage = async (newMessage) => {
    const promise = new Promise((resolve, reject) => {
      socket.emit('newMessage', newMessage, ({ status }) => {
        if (status !== 'ok') {
          reject(new Error(t('errors.serverConnectionLost')));
          return;
        }
        resolve();
      });
    });
    await promise;
  };
  const addChannel = async (newChannel) => {
    const promise = new Promise((resolve, reject) => {
      socket.emit('newChannel', newChannel, ({ status, data }) => {
        if (status !== 'ok') {
          reject(new Error(t('errors.serverConnectionLost')));
          toast(t('toasts.signUpError'), 'error');
          return;
        }
        dispatch(currentChannelIdUpdated(data.id));
        resolve(data);
      });
    });
    await promise;
  };
  const removeChannel = async (id) => {
    const promise = new Promise((resolve, reject) => {
      socket.emit('removeChannel', { id }, ({ status }) => {
        if (status !== 'ok') {
          reject(new Error(t('errors.serverConnectionLost')));
          toast(t('toasts.channelDeletedError'), 'error');
          return;
        }
        resolve();
      });
    });
    await promise;
  };
  const renameChannel = async (id, name) => {
    const promise = new Promise((resolve, reject) => {
      socket.emit('renameChannel', { id, name }, ({ status }) => {
        if (status !== 'ok') {
          reject(new Error(t('errors.serverConnectionLost')));
          toast(t('toasts.channelRenamedError'), 'error');
          return;
        }
        resolve();
      });
    });
    await promise;
  };

  return (
    <Context.Provider value={{
      addMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export default SocketProvider;
