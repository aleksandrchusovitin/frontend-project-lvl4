import React, { useEffect } from 'react';
// import { useRollbar } from '@rollbar/react/lib';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { Channels, Chat } from '../components';
import { actions } from '../store/slices';

import { useAuth } from '../hooks';
import routes from '../routes.js';
import toast from '../toast';

const { getData } = actions;

const MainPage = () => {
  const auth = useAuth();

  const headers = auth.getAuthHeader();
  const { t } = useTranslation();
  // const rollbar = useRollbar();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers });
      dispatch(getData(data));
    };

    fetchData()
      .catch(() => {
        // rollbar.error(err);
        toast(t('toasts.connectionError'), 'error');
      });
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </div>
    </div>
  );
};

export default MainPage;
