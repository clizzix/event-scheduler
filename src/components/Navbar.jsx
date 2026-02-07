import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router';

const Navbar = () => {
    useLocation();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Event-Scheduler
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'bg-primary' : ''
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <NavLink
                                    to="login"
                                    className={({ isActive }) =>
                                        isActive ? 'bg-primary' : ''
                                    }
                                >
                                    Log In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="signup"
                                    className={({ isActive }) =>
                                        isActive ? 'bg-primary' : ''
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/protected"
                            className={({ isActive }) =>
                                isActive ? 'bg-primary' : ''
                            }
                        >
                            Events
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
