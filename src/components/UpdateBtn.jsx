import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';

const UpdateBtn = ({ event }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        latitude: '',
        longitude: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                date: event.date
                    ? new Date(event.date).toISOString().slice(0, 16)
                    : '',
                location: event.location || '',
                latitude: event.latitude || '',
                longitude: event.longitude || '',
            });
        }
    }, [event]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to update an event');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/events/${event.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        date: new Date(formData.date).toISOString(),
                        location: formData.location,
                        latitude: parseFloat(formData.latitude) || 0,
                        longitude: parseFloat(formData.longitude) || 0,
                    }),
                },
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update event');
            }

            document.getElementById(`update_modal_${event.id}`).close();
            window.location.reload();
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!event) return null;

    return (
        <>
            <button
                className="btn btn-primary mt-2 text-white absolute top-8 right-24"
                onClick={() =>
                    document
                        .getElementById(`update_modal_${event.id}`)
                        .showModal()
                }
            >
                <MdEdit size={24} />
            </button>

            <dialog
                id={`update_modal_${event.id}`}
                className="modal text-base-content"
            >
                <div className="modal-box w-11/12 max-w-5xl  bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
                    <h3 className="font-bold text-lg mb-4">Update Event</h3>

                    <div className="flex flex-col gap-4 items-center w-full ">
                        <form
                            className="flex flex-col gap-4 w-3/4"
                            onSubmit={handleUpdate}
                        >
                            <input
                                type="text"
                                name="title"
                                placeholder="Event Title"
                                className="input input-bordered w-full"
                                required
                                value={formData.title}
                                onChange={handleChange}
                            />

                            <input
                                type="datetime-local"
                                name="date"
                                className="input input-bordered w-full"
                                required
                                value={formData.date}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location (Address)"
                                className="input input-bordered w-full"
                                required
                                value={formData.location}
                                onChange={handleChange}
                            />
                            <div className="flex gap-2 w-full">
                                <input
                                    type="number"
                                    step="any"
                                    name="latitude"
                                    placeholder="Latitude"
                                    className="input input-bordered w-1/2"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    step="any"
                                    name="longitude"
                                    placeholder="Longitude"
                                    className="input input-bordered w-1/2"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                />
                            </div>
                            <textarea
                                name="description"
                                placeholder="Description..."
                                className="textarea textarea-bordered w-full"
                                rows={5}
                                required
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {error && (
                                <p className="text-error text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                className="btn btn-secondary mt-2"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Event'}
                            </button>
                        </form>

                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default UpdateBtn;
