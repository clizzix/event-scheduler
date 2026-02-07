import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { email, password } = formData;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                },
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            navigate('/events');
        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen w-full">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <legend className="text-3xl mb-4 font-bold">
                                Login Now!
                            </legend>
                            <label className="label">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input"
                                placeholder="Email"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                            <label className="label">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="input"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                            <div>
                                <a className="link link-hover">
                                    Forgot password?
                                </a>
                            </div>
                            {error && (
                                <p className="text-error text-sm mt-2">
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`btn btn-neutral mt-4 ${loading ? 'bg-base-300 cursor-not-allowed' : 'hover:bg-base-300'}`}
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
