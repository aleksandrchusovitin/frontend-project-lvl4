import React from 'react';
// import { useTranslation } from 'react-i18next';
import { socketContext } from '../context/index.js';

// eslint-disable-next-line max-len
// const promisify = (socketFunction, errorMessage) => (...args) => new Promise((resolve, reject) => {
//   socketFunction(...args, ({ status, data }) => {
//     if (status !== 'ok') {
//       reject(new Error(errorMessage));
//     }
//     resolve(data);
//   });
// });

const SocketProvider = ({ socket, children }) => {
  // const { t } = useTranslation();

  // const errorMessage = t('errors.serverConnectionLost');

  // const addMessage = promisify((...args) => socket.emit('newMessage', ...args), errorMessage);
  // const addMessage = (args) => new Promise((resolve, reject) => {
  //   socket.emit('newMessage', args.message, ({ status, data }) => {
  //     console.log('args', args)
  //     console.log('status', status)
  //     console.log('data', data)
  //     if (status !== 'ok') {
  //       reject(new Error(errorMessage));
  //     }
  //     resolve(data);
  //   });
  // });
  // const addChannel = promisify((...args) => socket.emit('newChannel', ...args), errorMessage);
  // eslint-disable-next-line max-len
  // const removeChannel = promisify((...args) => socket.emit('removeChannel', ...args), errorMessage);
  // eslint-disable-next-line max-len
  // const renameChannel = promisify((...args) => socket.emit('renameChannel', ...args), errorMessage);

  const addMessage = async (message) => socket.emit('newMessage', message);
  const addChannel = async (channel) => socket.emit('newChannel', channel);
  const removeChannel = async ({ id }) => socket.emit('removeChannel', { id });
  const renameChannel = async ({ id, name }) => socket.emit('renameChannel', { id, name });

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
