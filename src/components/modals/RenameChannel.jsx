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
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { useSocket } from '../../hooks';
import toast from '../../toast';
import { getChannelsNames, getPrevChannelName, getChannelWithActionId } from '../../store/selectors.js';

const RenameChannel = ({ handleClose }) => {
  const channelsNames = useSelector(getChannelsNames);
  const prevChannelName = useSelector(getPrevChannelName);
  const id = useSelector(getChannelWithActionId);

  const renameInputRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    renameInputRef.current.focus();
    renameInputRef.current.select();
  }, []);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: prevChannelName,
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames),
    }),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      resetForm('');
      try {
        await socket.renameChannel({ id, name });
        toast(t('toasts.channelRenamed'), 'success');
      } catch {
        toast(t('toasts.channelRenamedError'), 'error');
      }

      handleClose();
    },
  });

  return (
    <>
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
    </>
  );
};

export default RenameChannel;
