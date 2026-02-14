import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/events?search=${searchTerm}`);
    };
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            navigate('/events');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="input flex items-center gap-2">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    className="grow"
                    required
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </label>
        </form>
    );
};

export default Searchbar;
