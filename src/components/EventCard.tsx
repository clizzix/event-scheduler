import { Link } from 'react-router';
import type { Event } from '../schema';

type EventCardProps = {
    event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
    return (
        <div className="flex flex-col gap-4 p-4 m-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            <div>
                <h1 className="text-3xl text-accent font-bold">
                    {event.title}
                </h1>
                <p className="italic text-white/70">{event.description}</p>
            </div>
            <div>
                <p className="badge badge-secondary badge-outline">
                    {new Date(event.date).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZoneName: 'short',
                    })}
                </p>
                <p className="text-white/90">📍 {event.location}</p>
            </div>
            <Link
                className="btn btn-outline btn-accent w-content-fit self-end"
                to={`/events/${event.id}`}
            >
                Show More
            </Link>
        </div>
    );
};

export default EventCard;
