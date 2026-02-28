import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard.tsx';
import Hero from '../components/Hero.tsx';
import {
    GetEventsResponseSchema,
    type Event,
    type GetEventsResponse,
} from '../schema/index.ts';
import { z } from 'zod';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/events/`,
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
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <Hero />

            <div className="carousel w-full">
                {events && events.length > 0 ? (
                    events.map((event, index) => {
                        const prevSlide = index === 0 ? events.length : index;
                        const nextSlide =
                            index === events.length - 1 ? 1 : index + 2;
                        return (
                            <div
                                key={event.id}
                                id={`slide${index + 1}`}
                                className="carousel-item relative w-full"
                            >
                                <div className="w-full flex justify-center items-center">
                                    <div className="w-full md:w-1/2 lg:w-1/3">
                                        <EventCard event={event} />
                                    </div>
                                </div>
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a
                                        href={`#slide${prevSlide}`}
                                        className="btn btn-circle"
                                    >
                                        ❮
                                    </a>
                                    <a
                                        href={`#slide${nextSlide}`}
                                        className="btn btn-circle"
                                    >
                                        ❯
                                    </a>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full text-center p-4">
                        No upcoming Events....
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
