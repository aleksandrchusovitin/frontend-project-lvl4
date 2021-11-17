import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from 'react-router-dom';

import authContext from '../../context/index.js';
import useAuth from '../../hooks/index.js';
import { MainPage, LoginPage, Page404 } from '../pages';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

// const PrivateRoute = ({ children, path }) => {
//   const auth = useAuth();

//   return (
//     <Route
//       path={path}
//       render={({ location }) => (auth.loggedIn
//         ? children
//         : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
//     />
//   );
// };

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
