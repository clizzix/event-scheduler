import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, Link } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
