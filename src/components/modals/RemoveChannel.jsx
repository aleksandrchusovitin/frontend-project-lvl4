import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useSocket } from '../../hooks/index.js';
import { modalSetting } from '../../store/slices/modalSlice.js';
import { currentChannelIdUpdated } from '../../store/slices/channelsSlice.js';
import toast from '../../toast/index.js';

const RemoveChannel = ({ channelWithAction }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);
  const socket = useSocket();

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(modalSetting(null));
  };

  const handleDelete = async () => {
    currentChannelIdUpdated(channels[0].id);
    const { id } = channelWithAction;
    try {
      await socket.removeChannel({ id });
      toast(t('toasts.channelDeleted'), 'success');
    } catch {
      toast(t('toasts.channelDeletedError'), 'error');
    }

    dispatch(modalSetting(null));
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel.header')}</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.bodyQuestion')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>{t('modals.removeChannel.buttons.cancel')}</Button>
          <Button variant="danger" onClick={handleDelete}>{t('modals.removeChannel.buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
