import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import authContext from '../../context/index.js';
import useAuth from '../../hooks/index.js';
import { MainPage, LoginPage, Page404 } from '../pages';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  const getUserToken = () => localStorage.getItem('user');

  return (
    <authContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getUserToken,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = () => {
  const auth = useAuth();
  console.log(auth); // !
  return auth.loggedIn ? <MainPage /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
