import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import EventCard from '../components/EventCard';
import CreateEvent from '../components/CreateEvent';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/events`,
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
    }, []);

    const filteredEvents = events.filter((event) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            event.title.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 justify-center mt-4">
                {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <CreateEvent />
        </div>
    );
};

export default EventList;
