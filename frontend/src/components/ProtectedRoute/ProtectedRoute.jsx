import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ content }) {
  const { isAuth } = useAuth();

  return isAuth ? content : <Navigate to='/login' replace />;
}

ProtectedRoute.propTypes = {
  content: PropTypes.node.isRequired,
};
