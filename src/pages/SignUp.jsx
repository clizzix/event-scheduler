import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
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
            toast.success('Signed up successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error.message);
            toast.error(error.message || 'Sign up failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero min-h-screen w-full">
            <div className="card w-full max-w-sm shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                <div className="card-body">
                    <form onSubmit={handleSignUp}>
                        <fieldset className="fieldset">
                            <legend className="text-3xl mb-4 font-bold text-white">
                                Create Account
                            </legend>
                            <label htmlFor="name" className="label text-white">
                                Name
                            </label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                className="input bg-white/20 text-white placeholder-white/70 border-white/30"
                                placeholder="e.g John Doe"
                                onChange={handleChange}
                                value={formData.name}
                                required
                            />
                            <label htmlFor="email" className="label text-white">
                                E-Mail
                            </label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="input bg-white/20 text-white placeholder-white/70 border-white/30"
                                placeholder="e.g example@example.com"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                            <label
                                htmlFor="password"
                                className="label text-white"
                            >
                                Password
                            </label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                className="input bg-white/20 text-white placeholder-white/70 border-white/30"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                minLength={8}
                            />
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
