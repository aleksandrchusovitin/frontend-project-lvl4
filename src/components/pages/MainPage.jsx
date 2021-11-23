import React, { useEffect } from 'react';
import axios from 'axios';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import * as yup from 'yup';

import {
  channelsFetching,
  channelsFetchingError,
  channelsFetched,
  currentChannelIdUpdated,
  currentChannelIdFetched,
} from '../../store/slices/channelsSlice.js';

import {
  messagesFetching,
  messagesFetched,
  messagesFetchingError,
} from '../../store/slices/messagesSlice.js';

import useAuth from '../../hooks/index.js';
import routes from '../../routes.js';

const getAuthHeader = (auth) => {
  const user = JSON.parse(auth.getUserToken());

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const MainPage = ({ socket }) => {
  const auth = useAuth();
  const headers = getAuthHeader(auth);

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { channels: { channels, currentChannelId }, messages: { messages } } = store;

  useEffect(() => {
    dispatch(channelsFetching);

    const fetchChannelsData = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers });

      dispatch(channelsFetched(data.channels));
      dispatch(currentChannelIdFetched(data.currentChannelId));
    };

    try {
      fetchChannelsData();
    } catch {
      dispatch(channelsFetchingError);
    }
  }, []);

  useEffect(() => {
    dispatch(messagesFetching);

    const fetchMessagesData = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers });

      dispatch(messagesFetched(data.messages));
    };

    try {
      fetchMessagesData();
    } catch {
      dispatch(messagesFetchingError);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.mixed().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const newMessage = { channelId: currentChannelId, text: values.body };

      socket.emit('newMessage', newMessage);
      resetForm('');
    },
  });

  const handleChangeChannel = (channelId) => () => {
    dispatch(currentChannelIdUpdated(channelId));
  };

  const renderChannelsList = (channelsData) => {
    const items = channelsData.map(({ id, name }) => {
      const className = cn('w-100 rounded-0 text-start btn', { 'btn-secondary': currentChannelId === id });

      return (
        <li key={id} className="nav-item w-100">
          <button type="button" className={className} onClick={handleChangeChannel(id)}>
            <span className="me-1">#</span>
            {name}
          </button>
        </li>
      );
    });

    return (
      <ul className="nav flex-column nav-pills nav-fill px-2">{items}</ul>
    );
  };

  const messagesForCurrentChannel = messages
    .filter((m) => m.channelId === currentChannelId);

  const renderMessagesList = (messagesData) => messagesData.map(({ id, text }) => <div key={id} className="text-break mb-2">{text}</div>);

  const getCurrentChannelName = (channelId) => {
    const currentChannel = channels.find((c) => c.id === channelId);
    return currentChannel.name;
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Каналы</span>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden" />
              </button>
            </div>
            {channels && renderChannelsList(channels)}
          </div>
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
                <span className="text-muted">{`${messagesForCurrentChannel.length} сообщений`}</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                {renderMessagesList(messagesForCurrentChannel)}
              </div>
              <div className="mt-auto px-5 py-3">
                <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
                  <InputGroup hasValidation>
                    <Form.Control
                      className="border-0 p-0 ps-2"
                      name="body"
                      data-testid="new-message"
                      placeholder="Введите сообщение..."
                      onChange={formik.handleChange}
                      value={formik.values.body}
                      required
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
                        <span className="visually-hidden">Отправить</span>
                      </button>
                    </div>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
