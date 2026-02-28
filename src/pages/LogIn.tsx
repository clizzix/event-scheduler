import { useState, type ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { LoginRequestSchema, LoginResponseSchema } from '../schema/index.js';

const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const validatedData = LoginRequestSchema.safeParse(formData);

            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(validatedData),
                },
            );

            const data: unknown = await res.json();

            if (!res.ok) {
                const errorData = data as { message?: string };
                throw new Error(errorData.message || 'Login failed');
            }

            const responseData = LoginResponseSchema.parse(data);

            localStorage.setItem('token', responseData.token);
            toast.success('Logged in successfully!');
            navigate('/events');
        } catch (error: unknown) {
            if (error instanceof z.ZodError) {
                toast.error(error.issues[0]?.message || 'Validation failed');
            } else {
                const message =
                    error instanceof Error ? error.message : 'Unknown error';
                toast.error(message || 'Login failed.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero min-h-screen w-full">
            <div className="card w-full max-w-sm shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <legend className="text-3xl mb-4 font-bold text-white">
                                Login Now!
                            </legend>
                            <label className="label text-white">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input bg-white/20 text-white placeholder-white/70 border-white/30"
                                placeholder="Email"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                            <label className="label text-white">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="input bg-white/20 text-white placeholder-white/70 border-white/30"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                            <div>
                                <a className="link link-hover text-white">
                                    Forgot password?
                                </a>
                            </div>
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
