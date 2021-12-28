import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import SubmitMessage from './SubmitMessage.jsx';
import Message from './Message.jsx';

const Chat = () => {
  const messagesBoxRef = useRef(null);
  const { t } = useTranslation();
  const {
    channelsReducers: { channels, currentChannelId },
    messagesReducers: { messages },
  } = useSelector((state) => state);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  });

  const messagesForCurrentChannel = messages
    .filter((m) => m.channelId === currentChannelId);

  const getCurrentChannelName = (channelId) => {
    const currentChannel = channels.find((c) => c.id === channelId);
    return currentChannel?.name;
  };

  return (
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
          {messagesForCurrentChannel.map(({ id, text, username }) => (
            <Message
              key={id}
              text={text}
              username={username}
            />
          ))}
        </div>
        <SubmitMessage currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default Chat;
