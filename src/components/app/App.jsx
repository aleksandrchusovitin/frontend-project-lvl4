import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import authContext from '../../context/index.js';
import useAuth from '../../hooks/index.js';
import { MainPage, LoginPage, Page404 } from '../pages';

const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem('user');
  const [token, setToken] = useState(userToken);

  const loggedIn = token != null;
  const logIn = (item) => setToken(item);
  const logOut = () => {
    localStorage.removeItem('user');
    setToken(null);
  };
  const getUserToken = () => localStorage.getItem('user');

  return (
    <authContext.Provider value={{
      token,
      loggedIn,
      logOut,
      logIn,
      getUserToken,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
