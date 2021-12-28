import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { actions } from '../../store/slices';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  addingChannel: AddChannel,
  removingChannel: RemoveChannel,
  renamingChannel: RenameChannel,
};

const Modal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const { isOpened, modalType } = useSelector((state) => state.modalReducers);

  if (modalType === null) {
    return null;
  }
  const SelectedModal = modals[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {SelectedModal && <SelectedModal handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
