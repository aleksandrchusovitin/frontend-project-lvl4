import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// import authContext from '../../context/index.js';
// import useAuth from '../../hooks/index.js';
import { MainPage, LoginPage, Page404 } from '../pages';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>
);

export default App;
