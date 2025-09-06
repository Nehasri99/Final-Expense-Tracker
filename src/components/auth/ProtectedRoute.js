import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // If a token exists, the user is logged in, so show the requested page.
    // Otherwise, redirect them to the login page.
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;