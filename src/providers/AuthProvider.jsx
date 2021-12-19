import React, { useState } from 'react';
import { authContext } from '../context/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = currentUser ? currentUser.token : null;
  const [userName, setUserName] = useState(currentUser ? currentUser.username : null);

  const loggedIn = token != null;
  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUserName(data.username);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUserName(null);
  };
  const getAuthHeader = () => {
    if (userName && token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  };

  return (
    <authContext.Provider value={{
      userName,
      loggedIn,
      logOut,
      logIn,
      getAuthHeader,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
