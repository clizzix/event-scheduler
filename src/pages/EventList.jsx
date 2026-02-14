import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import CreateEvent from '../components/CreateEvent';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/events?page=${currentPage}&limit=10`,
                { cache: 'no-store' },
            );
            const data = await res.json();
            setEvents(data.results);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [currentPage]);

    const handleEventCreated = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        } else {
            fetchEvents();
        }
    };

    return (
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 justify-center mt-4">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <CreateEvent onEventCreated={handleEventCreated} />
        </div>
    );
};

export default EventList;
