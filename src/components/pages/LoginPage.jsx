import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';

import useAuth from '../../hooks/index.js';
import routes from '../../routes.js';

import loginLogo from '../../../assets/images/form_enter.png';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);
  const auth = useAuth();

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        const { data, data: { token } } = res;
        localStorage.setItem('user', JSON.stringify(data));
        auth.logIn(token);

        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          usernameInputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img className="rounded-circle" src={loginLogo} alt="Войти" />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3 form-group">
                    <Form.Control
                      type="text"
                      placeholder="Ваш ник"
                      name="username"
                      id="username"
                      required
                      autoComplete="username"
                      ref={usernameInputRef}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3 form-group">
                    <Form.Control
                      type="password"
                      placeholder="Пароль"
                      name="password"
                      id="password"
                      required
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                  </Form.Group>
                  <Button
                    variant="outline-primary"
                    className="w-100 mb-3"
                    type="submit"
                  >
                    Войти
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a className="ml-5" href="/signup">Регистрация</a>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
