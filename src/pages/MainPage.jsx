import React, { useEffect } from 'react';
// import { useRollbar } from '@rollbar/react/lib';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import getModal from '../components/modals';
import { Channels, Chat } from '../components';
import {
  channelsFetching,
  channelsFetchingError,
  channelsFetched,
  currentChannelIdFetched,
} from '../store/slices/channelsSlice.js';

import {
  messagesFetching,
  messagesFetched,
  messagesFetchingError,
} from '../store/slices/messagesSlice.js';

import { useAuth } from '../hooks';
import routes from '../routes.js';
import toast from '../toast';

const MainPage = () => {
  const auth = useAuth();

  const headers = auth.getAuthHeader();
  const { t } = useTranslation();
  // const rollbar = useRollbar();

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const {
    channels: { channels, currentChannelId },
    messages: { messages },
    modal: { isOpened },
  } = store;

  useEffect(() => {
    dispatch(channelsFetching);
    dispatch(messagesFetching);

    const fetchData = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers });

      dispatch(channelsFetched(data.channels));
      dispatch(currentChannelIdFetched(data.currentChannelId));
      dispatch(messagesFetched(data.messages));
    };

    fetchData()
      .catch(() => {
        // rollbar.error(err);
        toast(t('toasts.connectionError'), 'error');
        dispatch(channelsFetchingError);
        dispatch(messagesFetchingError);
      });
  }, []);

  const getModalContent = (modalState) => {
    if (modalState === null) {
      return null;
    }
    const Modal = getModal(modalState);

    return <Modal />; // channelWithAction={channelWithAction}
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
        />
        <Chat
          messages={messages}
          currentChannelId={currentChannelId}
        />
      </div>
      {getModalContent(isOpened)}
    </div>
  );
};

export default MainPage;
