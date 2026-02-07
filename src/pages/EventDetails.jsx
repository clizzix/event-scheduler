import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { MdArrowBack } from 'react-icons/md';
import SimpleMap from '../components/SimpleMap';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`,
                );
                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, [id]);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (!event) return <div className="text-center mt-10">Event not found</div>;

    return (
        <div className="container mx-auto p-4">
            <Link to="/events" className="btn btn-ghost mb-4 gap-2">
                <MdArrowBack /> Back to Events
            </Link>
            <div className="card bg-base-300 shadow-xl border border-base-300">
                <div className="card-body">
                    <h1 className="card-title text-4xl mb-4">{event.title}</h1>
                    <div className="flex flex-col gap-2 mb-6">
                        <div className="badge badge-secondary badge-outline">
                            {new Date(event.date).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZoneName: 'short',
                            })}
                        </div>
                        <div className="text-lg text-gray-600">
                            📍 {event.location}
                        </div>
                    </div>
                    <p className="text-lg italic">{event.description}</p>
                </div>
                <div>
                    <SimpleMap event={event} />
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
