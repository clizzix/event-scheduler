import React, { useState, useRef, useMemo } from 'react';
import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';

const Marker = () => (
    <div style={{ transform: 'translate(-50%, -100%)' }}>
        <MdLocationOn className="text-error text-4xl" />
    </div>
);

export default function AutoMap({ onLocationSelect }) {
    const [markerCoords, setMarkerCoords] = useState(null);
    const containerRef = useRef(null);

    const handleApiLoaded = (map, maps) => {
        // Create the modern element
        const autocomplete = document.createElement('gmp-place-autocomplete');

        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(autocomplete);
        }

        // Listen for selection
        autocomplete.addEventListener('gmp-placeselect', async (event) => {
            const place = event.target.place; // This is the modern Place object

            if (!place) return;

            try {
                // Fetch the specific fields required
                await place.fetchFields({
                    fields: ['location', 'formattedAddress', 'viewport'],
                });

                if (place.location) {
                    const lat = place.location.lat();
                    const lng = place.location.lng();
                    const address = place.formattedAddress;

                    // 1. Update Map UI
                    setMarkerCoords({ lat, lng });
                    map.setCenter(place.location);
                    map.setZoom(15);

                    // 2. Notify Parent (This updates the Ref in CreateEvent)
                    onLocationSelect({ lat, lng, address });
                }
            } catch (err) {
                console.error('Fetch fields failed:', err);
            }
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <div ref={containerRef} className="w-full" />
            <div
                style={{ height: '300px', width: '100%' }}
                className="rounded-lg overflow-hidden border"
            >
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                        libraries: ['places'],
                    }}
                    defaultCenter={{ lat: 52.52, lng: 13.4 }} // Default (e.g., Berlin)
                    defaultZoom={11}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                        handleApiLoaded(map, maps)
                    }
                >
                    {markerCoords && (
                        <Marker lat={markerCoords.lat} lng={markerCoords.lng} />
                    )}
                </GoogleMapReact>
            </div>
        </div>
    );
}
