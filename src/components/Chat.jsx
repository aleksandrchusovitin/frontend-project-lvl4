import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SubmitMessage from './SubmitMessage.jsx';

const Chat = ({
  channels,
  messages,
  currentChannelId,
}) => {
  const messagesBoxRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  });

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
    // !! Здесь ниже тоже проблема вылезла пришлось магическое число вводить
    const currentChannel = channels ? channels.find((c) => c.id === channelId) : 1;
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
          {renderMessagesList(messagesForCurrentChannel)}
        </div>
        <SubmitMessage currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default Chat;
