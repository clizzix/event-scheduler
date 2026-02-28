import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';
import { type Event } from '../schema';

type MarkerProps = {
    lat: number;
    lng: number;
    children?: React.ReactNode;
};

const Marker = ({ lat, lng }: MarkerProps) => (
    <MdLocationOn className="text-error text-4xl" />
);

type SimpleMapProp = {
    event: Event;
};

const SimpleMap = ({ event }: SimpleMapProp) => {
    const lat = event?.latitude || 0;
    const lng = event?.longitude || 0;
    const defaultProps = {
        center: { lat, lng },
        zoom: 11,
    };
    return (
        <div className="h-96 w-full">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Marker key={event?.id} lat={lat} lng={lng} />
            </GoogleMapReact>
        </div>
    );
};

export default SimpleMap;
