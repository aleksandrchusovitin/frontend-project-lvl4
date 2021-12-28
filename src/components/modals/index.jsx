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
  const { isOpened } = useSelector((state) => state.modalReducers);

  if (isOpened === null) {
    return null;
  }
  const SelectedModal = modals[isOpened];

  return <SelectedModal />;
};

export default Modal;
