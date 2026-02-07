import React from 'react';

const SignUp = () => {
    return (
        <div className="hero bg-base-200 min-h-screen w-full">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form>
                        <fieldset className="fieldset">
                            <legend className="text-3xl mb-4 font-bold">
                                Create Account
                            </legend>
                            <label htmlFor="name" className="label">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="input"
                                placeholder="e.g John Doe"
                            />
                            <label htmlFor="email" className="label">
                                E-Mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input"
                                placeholder="e.g example@example.com"
                            />
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="input"
                                placeholder="Password"
                            />
                            <div>
                                <a className="link link-hover">
                                    Forgot password?
                                </a>
                            </div>
                            <button className="btn btn-neutral mt-4 hover:bg-base-300">
                                Sign Up
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
