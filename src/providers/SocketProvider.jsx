import React from 'react';
import { socketContext } from '../context/index.js';

const promisify = (socketFunction) => (...args) => new Promise((resolve, reject) => {
  socketFunction(...args, ({ status, data }) => {
    if (status !== 'ok') {
      reject();
    }
    resolve(data);
  });
});

const SocketProvider = ({ socket, children }) => {
  const addMessage = promisify((...args) => socket.emit('newMessage', ...args));
  const addChannel = promisify((...args) => socket.emit('newChannel', ...args));
  const removeChannel = promisify((...args) => socket.emit('removeChannel', ...args));
  const renameChannel = promisify((...args) => socket.emit('renameChannel', ...args));

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
