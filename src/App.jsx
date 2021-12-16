import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
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

import { addMessage } from './store/slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './store/slices/channelsSlice.js';

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

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV,
    },
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
