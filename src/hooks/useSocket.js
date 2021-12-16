import { useContext } from 'react';

import context from '../context/index.js';

const useSocket = () => useContext(context);

export default useSocket;
