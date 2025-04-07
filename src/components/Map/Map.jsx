import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ address }) => {
    const [coordinates, setCoordinates] = useState({ lat: 10.762622, lng: 106.660172 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const geocodeAddress = async () => {
            if (!address) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(false);
                const formattedAddress = `${address.addressLine}, ${address.ward}, ${address.district}, ${address.province}, Vietnam`;

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        formattedAddress
                    )}&limit=1`
                );

                const data = await response.json();

                if (data && data.length > 0) {
                    setCoordinates({
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon)
                    });
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error geocoding address:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        geocodeAddress();
    }, [address]);

    if (loading) {
        return (
            <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mb-2"></div>
                    <span className="text-gray-500">Đang tải bản đồ...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-500">Không thể tải bản đồ. Vui lòng thử lại sau.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[300px] rounded-lg overflow-hidden border border-gray-200">
            <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordinates.lat, coordinates.lng]}>
                    <Popup>
                        <div className="font-medium">
                            {address?.addressLine}, {address?.ward}, {address?.district}, {address?.province}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map; 