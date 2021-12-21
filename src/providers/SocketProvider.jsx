import React from 'react';
import { useTranslation } from 'react-i18next';
import { socketContext } from '../context/index.js';

const promisify = (socketFunction, errorMessage) => (...args) => new Promise((resolve, reject) => {
  socketFunction(...args, ({ status, data }) => {
    if (status !== 'ok') {
      reject(new Error(errorMessage));
    }
    resolve(data);
  });
});

const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();

  const errorMessage = t('errors.serverConnectionLost');

  const addMessage = promisify((...args) => socket.emit('newMessage', ...args), errorMessage);
  const addChannel = promisify((...args) => socket.emit('newChannel', ...args), errorMessage);
  const removeChannel = promisify((...args) => socket.emit('removeChannel', ...args), errorMessage);
  const renameChannel = promisify((...args) => socket.emit('renameChannel', ...args), errorMessage);

  return (
    <socketContext.Provider value={{
      addMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
