import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './LoginPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/'); // Перенаправлення на головну сторінку або будь-яку іншу сторінку
    }
  }, [isAuth, navigate]);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:3000/admin-local-auth/login', values);
      login(response.data); // Використовуємо лише токен
      navigate('/'); // Перенаправлення після успішного логіну
    } catch (error) {
      if (error.response) {
        setErrors({ apiError: error.response.data.message || 'Invalid email or password' });
      } else if (error.request) {
        setErrors({ apiError: 'No response from server' });
      } else {
        setErrors({ apiError: 'Error during login' });
      }
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
            {errors.apiError && <div className={styles.apiError}>{errors.apiError}</div>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
