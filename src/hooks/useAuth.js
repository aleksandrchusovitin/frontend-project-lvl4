import { useContext } from 'react';

import context from '../context/index.js';

const useAuth = () => useContext(context);

export default useAuth;
