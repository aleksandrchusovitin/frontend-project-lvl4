import { useContext } from 'react';

import { socketContext } from '../context/index.js';

const useSocket = () => useContext(socketContext);

export default useSocket;
