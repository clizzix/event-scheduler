import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';

const DeleteBtn = ({ eventId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?'))
            return;

        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to delete an event');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete event');
            }

            navigate('/events');
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {error && (
                <p className="text-error text-sm absolute top-20 right-8 bg-base-100 p-2 rounded">
                    {error}
                </p>
            )}
            <button
                type="button"
                className="btn btn-error mt-2 text-white absolute top-8 right-8"
                disabled={loading}
                onClick={handleDelete}
            >
                <MdDelete size={24} />
            </button>
        </div>
    );
};

export default DeleteBtn;
