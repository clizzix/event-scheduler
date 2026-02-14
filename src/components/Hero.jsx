import { Link } from 'react-router';
import React from 'react';

const Hero = () => {
    return (
        <div className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 py-16 text-center">
            <div
                className="z-10 flex flex-col gap-10 p-12 md:p-20 
                            bg-white/10 backdrop-blur-md 
                            border border-white/20 rounded-3xl 
                            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            >
                <h1 className="font-extrabold text-5xl md:text-7xl tracking-tight text-white">
                    Explore a{' '}
                    <span className="text-secondary drop-shadow-[0_0_15px_rgba(var(--secondary-rgb),0.5)]">
                        Galaxy
                    </span>{' '}
                    of Events
                </h1>

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white/90">
                        Global Events, Local Souls.
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg font-medium text-white/70 leading-relaxed">
                        <span className="italic text-white">
                            Find. Attend. Organize.
                        </span>{' '}
                        The simplest way to bridge the gap between where you are
                        and where the world is gathered.
                    </p>
                </div>

                <Link
                    to="/events"
                    className="mt-4 px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-opacity-90 transition-all self-center"
                >
                    Get Started
                </Link>
            </div>

            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px] z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] z-0" />
        </div>
    );
};

export default Hero;
