import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Modal from './components/modals/index.jsx';
import { AuthProvider } from './providers';

import { useAuth } from './hooks';
import {
  MainPage,
  Login,
  Page404,
  SignUp,
} from './pages';
import { NavBar, Container } from './components';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
      <ToastContainer />
      <Modal />
    </Router>
  </AuthProvider>
);

export default App;
