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
import { currentChannelIdUpdated } from '../../store/slices/channelsSlice.js';

const AddChannel = ({ socket }) => {
  const addInputRef = useRef(null);

  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);
  const channelsNames = channels.map((c) => c.name);

  useEffect(() => {
    addInputRef.current.focus();
  }, []);

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(modalSetting(null));
  };

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

      const promise = new Promise((resolve, reject) => {
        socket.emit('newChannel', newChannel, ({ status, data }) => {
          if (status !== 'ok') {
            reject(new Error(t('errors.serverConnectionLost')));
            return;
          }
          dispatch(currentChannelIdUpdated(data.id));
          resolve(data);
        });
      });
      await promise;

      resetForm('');

      dispatch(modalSetting(null));
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
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
    </Modal>
  );
};

export default AddChannel;
