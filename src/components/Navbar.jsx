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
        <div className="navbar bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Galaxy-Events
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
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
