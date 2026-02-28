import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layout/MainLayout.tsx';
import Home from './pages/Home.tsx';
import LogIn from './pages/LogIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ProtectedLayout from './layout/ProtectedLayout.tsx';
import EventDetails from './pages/EventDetails.tsx';
import EventList from './pages/EventList.tsx';

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
                        <Route path="/events/:id" element={<EventDetails />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
