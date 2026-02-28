import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import EventCard from '../components/EventCard.tsx';
import CreateEvent from '../components/CreateEvent';
import { type Event, GetEventsResponseSchema } from '../schema';
import { z } from 'zod';
import { toast } from 'react-toastify';

const EventList = () => {
    const [events, setEvents] = useState<Event[]>([]);
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
            const json = await res.json();
            const { data, error, success } =
                GetEventsResponseSchema.safeParse(json);
            if (!success) {
                throw new Error(error.message);
            }
            setEvents(data.results);
            console.log(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error(error.issues[0]?.message || 'Failed Validation');
            } else {
                const message =
                    error instanceof Error ? error.message : 'Unknown error';
                toast.error(message || 'Failed to Fetch Events');
            }
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
