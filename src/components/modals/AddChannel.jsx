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
import { useDispatch } from 'react-redux';

import { modalSetting } from '../../store/slices/modalSlice.js';

const AddChannel = () => {
  const addInputRef = useRef(null);

  const dispatch = useDispatch();

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
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
              aria-label="Имя канала"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={addInputRef}
            />
            <div className="invalid-feedback" />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                {t('modals.addChannel.buttons.cancel')}
              </button>
              <Button type="submit">{t('modals.addChannel.buttons.submit')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
