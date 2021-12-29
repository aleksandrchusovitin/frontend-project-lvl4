import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import SubmitMessage from './SubmitMessage.jsx';
import Message from './Message.jsx';
import { getCurrentChannelName, getMessagesForCurrentChannel } from '../store/selectors.js';

const Chat = () => {
  const messagesBoxRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  });

  const currentChannelName = useSelector(getCurrentChannelName);
  const messagesForCurrentChannel = useSelector(getMessagesForCurrentChannel);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">{t('mainPage.messages.message', { count: messagesForCurrentChannel.length })}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesForCurrentChannel.map(({ id, text, username }) => (
            <Message
              key={id}
              text={text}
              username={username}
            />
          ))}
        </div>
        <SubmitMessage />
      </div>
    </div>
  );
};

export default Chat;
