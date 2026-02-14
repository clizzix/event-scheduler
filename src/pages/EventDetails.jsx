import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { MdArrowBack } from 'react-icons/md';
import SimpleMap from '../components/SimpleMap';
import DeleteBtn from '../components/DeleteBtn';
import UpdateBtn from '../components/UpdateBtn';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    if (isLoading)
        return <div className="text-center mt-10 text-white">Loading...</div>;
    if (!event)
        return (
            <div className="text-center mt-10 text-white">Event not found</div>
        );

    return (
        <div className="container mx-auto p-4">
            <Link to="/events" className="btn btn-ghost mb-4 gap-2 text-white">
                <MdArrowBack /> Back to Events
            </Link>
            <div className="card bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
                <div className="card-body">
                    <h1 className="card-title text-4xl mb-4 text-accent font-bold">
                        {event.title}
                    </h1>
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
                        <div className="text-lg text-white/90">
                            📍 {event.location}
                        </div>
                    </div>
                    <p className="text-lg italic text-white/70">
                        {event.description}
                    </p>
                    <div>
                        <UpdateBtn event={event} />
                        <DeleteBtn eventId={event.id} />
                    </div>
                </div>

                <div>
                    <SimpleMap event={event} />
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
