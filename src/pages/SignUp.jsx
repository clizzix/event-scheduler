import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { name, email, password } = formData;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                },
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Sign up failed');
            }
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen w-full">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSignUp}>
                        <fieldset className="fieldset">
                            <legend className="text-3xl mb-4 font-bold">
                                Create Account
                            </legend>
                            <label htmlFor="name" className="label">
                                Name
                            </label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                className="input"
                                placeholder="e.g John Doe"
                                onChange={handleChange}
                                value={formData.name}
                                required
                            />
                            <label htmlFor="email" className="label">
                                E-Mail
                            </label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="input"
                                placeholder="e.g example@example.com"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                className="input"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                minLength={8}
                            />
                            {error && (
                                <p className="text-error text-sm mt-2">
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-neutral mt-4 hover:bg-base-300"
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
