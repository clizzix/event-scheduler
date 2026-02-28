import React, { useState, useEffect, useRef } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { CreateEventSchema, type Event } from '../schema';
import { z } from 'zod';

type UpdateBtnProps = {
    event: Event;
};
const UpdateBtn = ({ event }: UpdateBtnProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                date: event.date
                    ? new Date(event.date).toISOString().slice(0, 16)
                    : '',
                location: event.location || '',
                latitude: event.latitude || 0,
                longitude: event.longitude || 0,
            });
        }
    }, [event]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to update an event');
            setLoading(false);
            return;
        }
        try {
            const validatedData = CreateEventSchema.parse(formData);
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/events/${event.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(validatedData),
                },
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update event');
            }

            toast.success('Event updated successfully!');
            modalRef.current?.close();
            window.location.reload();
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error(error.issues[0]?.message || 'Validation failed');
            } else {
                const message =
                    error instanceof Error ? error.message : 'Unknown error';
                toast.error(message || 'Failed to update event.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!event) return null;

    return (
        <>
            <button
                className="btn btn-primary mt-2 text-white absolute top-8 right-24"
                onClick={() => modalRef.current?.showModal()}
            >
                <MdEdit size={24} />
            </button>

            <dialog
                ref={modalRef}
                id={`update_modal_${event.id}`}
                className="modal text-base-content"
                onClick={(e) => {
                    if (e.target === modalRef.current) {
                        modalRef.current.close();
                    }
                }}
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
