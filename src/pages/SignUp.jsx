import React, { useState, useRef, useEffect } from 'react';
import { useRollbar } from '@rollbar/react';
import { Form, Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import routes from '../routes.js';
import { useAuth } from '../hooks';
import toast from '../toast';

import signUpLogo from '../../assets/images/signup_logo.jpg';

const SignUp = () => {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const usernameInputRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const rollbar = useRollbar();

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, t('signUpPage.inputs.validationErrors.username'))
        .max(20, t('signUpPage.inputs.validationErrors.username'))
        .required(t('signUpPage.inputs.validationErrors.requiredField')),
      password: yup
        .string()
        .min(6, t('signUpPage.inputs.validationErrors.password'))
        .required(t('signUpPage.inputs.validationErrors.requiredField')),
      confirmPassword: yup
        .string()
        .required(t('signUpPage.inputs.validationErrors.requiredField'))
        .oneOf([yup.ref('password'), null], t('signUpPage.inputs.validationErrors.confirmPassword')),
    }),
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const res = await axios.post(routes.signUpPath(), values);
        auth.logIn(res.data);

        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(t('signUpPage.inputs.validationErrors.dublicateUsername'));
          rollbar.error(err);
          return;
        }
        toast(t('toasts.connectionError'), 'error');
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signUpLogo} className="rounded-circle" alt={t('signUpPage.header')} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUpPage.header')}</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder={t('signUpPage.inputs.validationErrors.username')}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    ref={usernameInputRef}
                    isInvalid={
                      (formik.errors.username
                        && formik.touched.username)
                        || registrationFailed
                      }
                  />
                  <Form.Label htmlFor="username">{t('signUpPage.inputs.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={t('signUpPage.inputs.validationErrors.password')}
                    aria-describedby="passwordHelpBlock"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      (formik.errors.password
                        && formik.touched.password)
                        || registrationFailed
                      }
                  />
                  <Form.Label htmlFor="password">{t('signUpPage.inputs.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder={t('signUpPage.inputs.validationErrors.confirmPassword')}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      (formik.errors.confirmPassword
                        && formik.touched.confirmPassword)
                        || registrationFailed
                      }
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signUpPage.inputs.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.confirmPassword || t('signUpPage.inputs.validationErrors.dublicateUsername')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('signUpPage.buttons.signUp')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
