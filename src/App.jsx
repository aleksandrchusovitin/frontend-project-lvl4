import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import authContext from './context/index.js';
import useAuth from './hooks/index.js';
import {
  MainPage,
  Login,
  Page404,
  NavBar,
  SignUp,
} from './pages';

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

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = ({ socket }) => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MainPage socket={socket} />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  </AuthProvider>
);

export default App;
