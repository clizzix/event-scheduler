import React from 'react';

const EventCard = ({ event }) => {
    return (
        <div className="flex flex-col gap-4 bg-base-300 p-4 m-4 rounded-md border border-black shadowm-md">
            <div>
                <h1 className="text-3xl text-accent font-bold">
                    {event.title}
                </h1>
                <p className="italic">{event.description}</p>
            </div>
            <div>
                <p className="text-secondary">
                    {new Date(event.date).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZoneName: 'short',
                    })}
                </p>
                <p>@{event.location}</p>
            </div>
        </div>
    );
};

export default EventCard;
