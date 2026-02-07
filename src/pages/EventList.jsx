import React from 'react';
import { Outlet, Link } from 'react-router';
import { MdAdd } from 'react-icons/md';

const EventList = () => {
    return (
        <div>
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
