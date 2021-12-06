import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import authContext from '../../context/index.js';
import useAuth from '../../hooks/index.js';
import {
  MainPage,
  LoginPage,
  Page404,
  NavBar,
} from '../pages';

import { addMessage } from '../../store/slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../../store/slices/channelsSlice.js';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')) || { username: null, token: null }; // ! Нужно фиксить, пока по другому не придумал
  // ! так же названия переменных user, currentUser, data, item.....

  const [currentUser, setCurrentUser] = useState(user);
  const loggedIn = currentUser.token != null;
  const logIn = (item) => setCurrentUser(item);
  const logOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(() => ({ token: null }));
  };
  const getUserName = () => currentUser.username;
  const setUser = (data) => localStorage.setItem('user', JSON.stringify(data));
  const getAuthHeader = () => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }

    return {};
  };

  return (
    <authContext.Provider value={{
      currentUser,
      loggedIn,
      logOut,
      logIn,
      setUser,
      getUserName,
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

const App = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });
  }, [socket]);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <NavBar />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainPage socket={socket} />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <div className="Toastify" />
      </Router>
    </AuthProvider>
  );
};

export default App;
