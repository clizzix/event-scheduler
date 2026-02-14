import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

const CreateEvent = () => {
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

        if (!formData.location) {
            setError('Please enter a location');
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to create an event');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/events`,
                {
                    method: 'POST',
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
                throw new Error(data.error || 'Failed to create event');
            }

            document.getElementById('my_modal_4').close();
            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                latitude: '',
                longitude: '',
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className="btn btn-secondary fixed bottom-4 right-4 z-50"
                onClick={() =>
                    document.getElementById('my_modal_4').showModal()
                }
            >
                <MdAdd size={24} />
            </button>

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl  bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
                    <h3 className="font-bold text-lg mb-4">Host an Event</h3>

                    <div className="flex flex-col gap-4 items-center w-full">
                        <form
                            className="flex flex-col gap-4 w-3/4"
                            onSubmit={handleSubmit}
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
                                {loading ? 'Creating...' : 'Create Event'}
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
        </div>
    );
};

export default CreateEvent;
