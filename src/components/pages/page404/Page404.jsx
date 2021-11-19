import React from 'react';
import { Link } from 'react-router-dom';

import './page404.css';

const Page404 = () => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <h1>Oops!</h1>
        <h2>404 - The Page can&#39;t be found</h2>
      </div>
      <Link to="/">Go TO Homepage</Link>
    </div>
  </div>
);

export default Page404;
