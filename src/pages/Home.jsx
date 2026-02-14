import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/events/upcoming`,
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
            {events ? (
                events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))
            ) : (
                <div> No upcoming Events....</div>
            )}
        </div>
    );
};

export default Home;
