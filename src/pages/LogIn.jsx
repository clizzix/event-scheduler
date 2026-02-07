import React from 'react';

const LogIn = () => {
    return (
        <div className="hero bg-base-200 min-h-screen w-full">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <fieldset className="fieldset">
                        <legend className="text-3xl mb-4 font-bold">
                            Login Now!
                        </legend>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                        />
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-neutral mt-4 hover:bg-base-300">
                            Login
                        </button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
