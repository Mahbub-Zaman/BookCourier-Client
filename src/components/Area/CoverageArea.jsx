import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons

delete L.Icon.Default.prototype._getIconUrl;

const customIcon = new L.Icon({
    iconUrl: '/map-icon.png',       // your custom icon
    iconRetinaUrl: '/map-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [41, 41],             // width, height
    iconAnchor: [22, 41],           // point of the icon which corresponds to marker's location
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
});

L.Marker.prototype.options.icon = customIcon;


const CoverageArea = () => {
    const mapRef = useRef(null);
    const [serviceCenters, setServiceCenters] = useState([]);
    const defaultPosition = [23.6850, 90.3563];

    useEffect(() => {
        fetch('/coverage.json')
            .then(res => res.json())
            .then(data => setServiceCenters(data))
            .catch(err => console.error('Failed to load coverage data:', err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.location.value.trim().toLowerCase();
        if (!query) return;

        const district = serviceCenters.find(c =>
            c.district.toLowerCase().includes(query)
        );

        if (district && mapRef.current) {
            mapRef.current.flyTo([district.latitude, district.longitude], 12);
        } else {
            alert('District not found!');
        }
    };

    return (
        <div className="p-4">
            <title>BookCourier | Libraries Around You</title>
            {/* Header */}
            <div className="text-center mb-10">
                {/* text-green-500 */}
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                    Our Library Coverage
                </h1>
                <p className="text-secondary text-lg md:text-xl max-w-3xl mx-auto">
                    Explore all partner libraries where <span className="font-semibold">BookCourier</span> delivers books directly to your doorstep.
                </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        name="location"
                        placeholder="Search by district..."
                        className="flex-grow p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Search
                    </button>
                </div>
            </form>

        {/* Map */}
        <div className="max-w-7xl mx-auto my-8">
        {/* Map Container */}
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] rounded-xl shadow-lg overflow-hidden border border-gray-200">
            
            {/* Optional Floating Search */}
            <form
            onSubmit={handleSearch}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] md:w-1/2 bg-white p-2 rounded-xl shadow-md flex"
            >
            <input
                type="text"
                name="location"
                placeholder="Search by district"
                className="flex-grow p-2 outline-none rounded-l-md border border-gray-300"
            />
            <button
                type="submit"
                className="bg-gradient-to-r from-[#16DB96] to-[#14A651] text-white px-4 py-2 rounded-r-md hover:from-[#14C88F] hover:to-[#129344] transition-colors duration-200"
            >
                Search
            </button>
            </form>

            {/* Leaflet Map */}
            <MapContainer
            center={defaultPosition}
            zoom={7}
            scrollWheelZoom={true} // Disable zoom on scroll
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, idx) => (
                <Marker
                key={idx}
                position={[center.latitude, center.longitude]}
                eventHandlers={{
                    click: () => {
                    if (mapRef.current) {
                        mapRef.current.flyTo([center.latitude, center.longitude], 12);
                    }
                    },
                }}
                >
                <Popup className="font-semibold text-gray-700">
                    <strong className="text-green-600">{center.district}</strong>
                    <br />
                    Service Area: {center.covered_area.join(', ')}
                    <br />
                    Status: {center.status}
                </Popup>
                </Marker>
            ))}
            </MapContainer>
        </div>
        </div>
        </div>
    );
};

export default CoverageArea;
