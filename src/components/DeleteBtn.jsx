import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const DeleteBtn = ({ eventId }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!eventId) {
            toast.error('Invalid Event ID');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this event?'))
            return;

        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to delete an event');
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
            toast.success('Deleted Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            navigate('/events');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to delete event.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <button
            type="button"
            className="btn btn-error mt-2 text-white absolute top-8 right-8"
            disabled={loading}
            onClick={handleDelete}
        >
            <MdDelete size={24} />
        </button>
    );
};

export default DeleteBtn;
