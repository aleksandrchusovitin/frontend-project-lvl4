import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { modalSetting } from '../../store/slices/modalSlice.js';
import toast from '../../toast/index.js';

const RenameChannel = ({ socket, channelWithAction }) => {
  const { id } = channelWithAction;
  const oldChannelName = channelWithAction.name;
  const renameInputRef = useRef(null);

  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);
  const channelsNames = channels.map((c) => c.name);

  useEffect(() => {
    renameInputRef.current.focus();
    renameInputRef.current.select();
  }, []);

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(modalSetting(null));
  };

  const formik = useFormik({
    initialValues: {
      name: oldChannelName,
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames),
    }),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      resetForm('');

      const promise = new Promise((resolve, reject) => {
        socket.emit('renameChannel', { id, name }, ({ status }) => {
          if (status !== 'ok') {
            reject(new Error(t('errors.serverConnectionLost')));
            toast(t('toasts.channelRenamedError'), 'error');
            return;
          }
          resolve();
        });
      });
      await promise;
      toast(t('toasts.channelRenamed'), 'success');

      dispatch(modalSetting(null));
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              className="mb-2"
              name="name"
              aria-label={t('modals.renameChannel.inputAriaLabel')}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={renameInputRef}
              isInvalid={formik.errors.name}
            />
            <div className="invalid-feedback">{formik.errors.name && t('modals.renameChannel.inputFeedback')}</div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                {t('modals.renameChannel.buttons.cancel')}
              </button>
              <Button type="submit" disabled={formik.isSubmitting}>{t('modals.renameChannel.buttons.submit')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
