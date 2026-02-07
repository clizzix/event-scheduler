import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/Signup';
import ProtectedLayout from './layout/ProtectedLayout';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import EventList from './pages/EventList';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route element={<ProtectedLayout />}>
                        <Route path="/events" element={<EventList />} />
                        <Route
                            path="/events/create"
                            element={<CreateEvent />}
                        />
                        <Route path="/events/:id" element={<EventDetails />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
