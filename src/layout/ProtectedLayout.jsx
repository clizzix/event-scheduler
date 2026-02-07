import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
    const isAuthenticated = Math.random() > 0.5 ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
