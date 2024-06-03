import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './RegistrationPage.module.scss';
import Cookies from 'js-cookie';

const initialValues = {
  email: '',
  password: '',
  role: 'admin', // default role
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const onSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await axios.post('http://localhost:3000/admin-local-auth/sign-up', {
      role: values.role,
      email: values.email,
      password: values.password,
    });
    console.log(response.data); // Handle success response
    Cookies.set('token', response.data.token, { expires: 7 }); // Save token to cookies with 7 days expiration
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      setErrors({ apiError: error.response.data.message || 'Registration failed' });
    } else if (error.request) {
      console.error('Error request:', error.request);
      setErrors({ apiError: 'No response from server' });
    } else {
      console.error('Error message:', error.message);
      setErrors({ apiError: 'Error during registration' });
    }
  }
  setSubmitting(false);
};

const Register = () => {
  return (
    <div className={styles.loginContainer}>
      <h1>Register</h1>
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
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
            </div>
            {errors.apiError && <div className={styles.apiError}>{errors.apiError}</div>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
