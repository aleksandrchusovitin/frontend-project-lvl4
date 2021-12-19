import { useContext } from 'react';

import { authContext } from '../context/index.js';

const useAuth = () => useContext(authContext);

export default useAuth;
