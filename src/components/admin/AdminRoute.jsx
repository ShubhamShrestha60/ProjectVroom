// AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Redirect to admin login page if not authenticated
    return <Navigate to="/adminLogin" />;
  }
  return children;
};

export default AdminRoute;
