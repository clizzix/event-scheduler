import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
