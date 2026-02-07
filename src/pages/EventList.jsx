import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router';
import { MdAdd } from 'react-icons/md';
import EventCard from '../components/EventCard';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/events?page=${currentPage}&limit=10`,
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
        fetchEvents();
    }, []);

    return (
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 justify-center">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <Link
                to="events"
                className="btn btn-primary fixed bottom-4 right-4 rounded-full"
            >
                <MdAdd size={24} />
            </Link>
            <Outlet />
        </div>
    );
};

export default EventList;
