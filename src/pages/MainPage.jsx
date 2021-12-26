import React, { useState, useRef, useEffect } from 'react';
// import { useRollbar } from '@rollbar/react/lib';
import axios from 'axios';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import 'react-toastify/dist/ReactToastify.css';
import getModal from '../components/modals';
import { Channels } from '../components';
import {
  channelsFetching,
  channelsFetchingError,
  channelsFetched,
  currentChannelIdUpdated,
  currentChannelIdFetched,
} from '../store/slices/channelsSlice.js';

import {
  messagesFetching,
  messagesFetched,
  messagesFetchingError,
} from '../store/slices/messagesSlice.js';

import { openModal } from '../store/slices/modalSlice.js';

import { useAuth, useSocket } from '../hooks';
import routes from '../routes.js';
import toast from '../toast';

const MainPage = () => {
  const [channelWithAction, setChannelWithAction] = useState({});
  const auth = useAuth();
  const socket = useSocket();

  const headers = auth.getAuthHeader();
  const { t } = useTranslation();
  const addMessageInputRef = useRef(null);
  const messagesBoxRef = useRef(null);
  // const rollbar = useRollbar();

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const {
    channels: { channels, currentChannelId },
    messages: { messages },
    modal: { isOpened },
  } = store;

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  });

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

  const ruDict = filter.getDictionary('ru');
  filter.add(ruDict);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.mixed().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { userName } = auth;
      const newMessage = {
        channelId: currentChannelId,
        text: filter.clean(values.body),
        username: userName,
      };
      await socket.addMessage(newMessage);

      resetForm('');
    },
  });

  const handleAddChannel = (action) => () => {
    dispatch(openModal(action));
  };

  const handleChangeChannel = (channelId) => () => {
    dispatch(currentChannelIdUpdated(channelId));
    addMessageInputRef.current.focus();
  };

  const handleRemoveChannel = (id, name, action) => async (e) => {
    e.preventDefault();
    setChannelWithAction({ id, name });
    dispatch(openModal(action));
  };

  const handleRenameChannel = (id, name, action) => async (e) => {
    e.preventDefault();
    setChannelWithAction({ id, name });
    dispatch(openModal(action));
  };

  const messagesForCurrentChannel = messages
    .filter((m) => m.channelId === currentChannelId);

  const renderMessagesList = (messagesData) => messagesData.map(({ id, text, username }) => (
    <div key={id} className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {text}
    </div>
  ));

  const getCurrentChannelName = (channelId) => {
    const currentChannel = channels.find((c) => c.id === channelId);
    return currentChannel?.name;
  };

  const getModalContent = (modalState) => {
    if (modalState === null) {
      return null;
    }
    const Modal = getModal(modalState);

    return <Modal channelWithAction={channelWithAction} />;
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels
          channels={channels}
          handleAddChannel={handleAddChannel}
          handleChangeChannel={handleChangeChannel}
          handleRemoveChannel={handleRemoveChannel}
          handleRenameChannel={handleRenameChannel}
          currentChannelId={currentChannelId}
        />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {currentChannelId && getCurrentChannelName(currentChannelId)}
                </b>
              </p>
              <span className="text-muted">{t('mainPage.messages.message', { count: messagesForCurrentChannel.length })}</span>
            </div>
            <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
              {renderMessagesList(messagesForCurrentChannel)}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
                <InputGroup hasValidation>
                  <Form.Control
                    className="border-0 p-0 ps-2"
                    name="body"
                    data-testid="new-message"
                    aria-label={t('mainPage.inputs.newMessageLabel')}
                    placeholder={t('mainPage.inputs.message')}
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    required
                    autoComplete="off"
                    ref={addMessageInputRef}
                  />
                  <div className="input-group-append">
                    <button type="submit" disabled={!formik.dirty} className="btn btn-group-vertical">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                      <span className="visually-hidden">{t('mainPage.buttons.submit')}</span>
                    </button>
                  </div>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {getModalContent(isOpened)}
    </div>
  );
};

export default MainPage;
