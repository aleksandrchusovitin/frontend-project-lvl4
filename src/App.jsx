import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './providers/index.js';

import { useAuth } from './hooks/index.js';
import {
  MainPage,
  Login,
  Page404,
  NavBar,
  SignUp,
} from './pages';

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
