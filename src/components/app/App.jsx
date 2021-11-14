import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { MainPage, Login, Page404 } from '../pages';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>
);

export default App;
