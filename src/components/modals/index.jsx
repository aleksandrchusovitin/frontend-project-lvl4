import React from 'react';
import { useSelector } from 'react-redux';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  addingChannel: AddChannel,
  removingChannel: RemoveChannel,
  renamingChannel: RenameChannel,
};

const Modal = () => {
  const {
    modalReducers: { isOpened },
    channelsReducers: { channelWithAction },
  } = useSelector((state) => state);

  if (isOpened === null) {
    return null;
  }
  const SelectedModal = modals[isOpened];

  return <SelectedModal channelWithAction={channelWithAction} />;
};

export default Modal;
