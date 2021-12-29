import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useSocket } from '../../hooks';
import { actions } from '../../store/slices';
import toast from '../../toast';
import { getChannelWithActionId } from '../../store/selectors';

const RemoveChannel = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsReducers);
  const id = useSelector(getChannelWithActionId);
  const socket = useSocket();

  const { t } = useTranslation();

  const handleDelete = async () => {
    dispatch(actions.currentChannelIdUpdated(channels[0].id));
    try {
      await socket.removeChannel({ id });
      toast(t('toasts.channelDeleted'), 'success');
    } catch {
      toast(t('toasts.channelDeletedError'), 'error');
    }

    handleClose();
  };

  return (
    <>
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
    </>
  );
};

export default RemoveChannel;
