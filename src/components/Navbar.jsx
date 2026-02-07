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
        <div className="navbar bg-base-300 shadow-md">
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
                                isActive ? 'bg-secondary text-white' : ''
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
                                        isActive
                                            ? 'bg-secondary text-white'
                                            : ''
                                    }
                                >
                                    Log In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="signup"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-secondary text-white'
                                            : ''
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
                            to="/events"
                            className={({ isActive }) =>
                                isActive ? 'bg-secondary text-white' : ''
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
