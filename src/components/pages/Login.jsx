import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const usernameInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
                  <img className="rounded-circle" src="" alt="Войти" />
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
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
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
export default Login;
