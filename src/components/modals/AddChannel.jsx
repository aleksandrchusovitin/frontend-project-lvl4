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

import { useSocket } from '../../hooks';
import { actions } from '../../store/slices';
import toast from '../../toast';
import { getChannelsNames } from '../../store/selectors.js';

const AddChannel = ({ handleClose }) => {
  const addInputRef = useRef(null);
  const socket = useSocket();

  const dispatch = useDispatch();
  const channelsNames = useSelector(getChannelsNames);

  useEffect(() => {
    addInputRef.current.focus();
  }, []);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames),
    }),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      const newChannel = { name: values.name };
      try {
        const channel = await socket.addChannel(newChannel);
        dispatch(actions.currentChannelIdUpdated(channel.id));
        toast(t('toasts.channelCreated'), 'success');
      } catch {
        toast(t('toasts.channelCreatedError'), 'error');
      }

      resetForm('');

      handleClose();
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel.header')}</Modal.Title>
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
              aria-label={t('modals.addChannel.inputAriaLabel')}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={addInputRef}
              isInvalid={formik.errors.name}
            />
            <div className="invalid-feedback">{formik.errors.name && t('modals.addChannel.inputFeedback')}</div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                {t('modals.addChannel.buttons.cancel')}
              </button>
              <Button type="submit" disabled={formik.isSubmitting}>{t('modals.addChannel.buttons.submit')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
