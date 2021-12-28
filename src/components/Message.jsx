import React from 'react';

const Message = ({ text, username }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {text}
  </div>
);

export default Message;
