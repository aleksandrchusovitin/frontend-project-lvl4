import React, { useRef, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as filter from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAuth, useSocket } from '../hooks';

import toast from '../toast';
import { getCurrentChannelId } from '../store/selectors.js';

const SubmitMessage = () => {
  const addMessageInputRef = useRef(null);
  const { t } = useTranslation();
  const auth = useAuth();
  const socket = useSocket();
  const rollbar = useRollbar();

  useEffect(() => {
    addMessageInputRef.current.focus();
  });

  const currentChannelId = useSelector(getCurrentChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.mixed().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { userName } = auth;
      const newMessage = {
        channelId: currentChannelId,
        text: filter.clean(values.body),
        username: userName,
      };
      try {
        await socket.addMessage(newMessage);
      } catch (err) {
        toast(t('toasts.messageSendingError'), 'error');
        rollbar.error(err);
      }

      resetForm('');
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="body"
            data-testid="new-message"
            aria-label={t('mainPage.inputs.newMessageLabel')}
            placeholder={t('mainPage.inputs.message')}
            onChange={formik.handleChange}
            value={formik.values.body}
            required
            autoComplete="off"
            ref={addMessageInputRef}
          />
          <div className="input-group-append">
            <button type="submit" disabled={!formik.dirty} className="btn btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">{t('mainPage.buttons.submit')}</span>
            </button>
          </div>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SubmitMessage;
