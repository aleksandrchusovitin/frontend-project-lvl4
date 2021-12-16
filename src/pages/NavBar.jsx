import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Hexlet Chat
        </Link>
        {auth.loggedIn ? <button type="button" className="btn btn-primary" onClick={handleLogout}>{t('navBar.buttons.logout')}</button> : null}
      </div>
    </nav>
  );
};

export default NavBar;
