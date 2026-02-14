import { Link } from 'react-router';

const EventCard = ({ event }) => {
    return (
        <div className="flex flex-col gap-4 bg-base-300 p-4 m-4 rounded-md border border-black shadow-md">
            <div>
                <h1 className="text-3xl text-accent font-bold">
                    {event.title}
                </h1>
                <p className="italic">{event.description}</p>
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
                <p>📍 {event.location}</p>
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
