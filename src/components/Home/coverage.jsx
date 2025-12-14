import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom'; // <- Fix import

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: '/map-icon.png',
  iconRetinaUrl: '/map-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

L.Marker.prototype.options.icon = customIcon;

const CoveragePage = () => {
  const mapRef = useRef(null);
  const [serviceCenters, setServiceCenters] = useState([]);
  const defaultPosition = [23.6850, 90.3563]; // Center of Bangladesh

  useEffect(() => {
    fetch('/coverage.json')
      .then(res => res.json())
      .then(data => setServiceCenters(data))
      .catch(err => console.error('Failed to load coverage data:', err));
  }, []);

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Our Library Coverage</h1>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Explore all partner libraries where BookCourier delivers books directly to your doorstep.
        </p>
      </div>

      {/* Map */}
      <div className="w-full h-64 md:h-96 lg:h-[600px] rounded-lg overflow-hidden shadow-lg mb-8">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          scrollWheelZoom={false} // Prevent map zoom on page scroll
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
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(', ')}
                <br />
                Status: {center.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Button */}
      <div className="text-center">
        <Link to="/coverage">
          <button className="btn btn-primary px-6 py-2 rounded-lg hover:btn-secondary transition">
            Find Nearby Libraries
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoveragePage;
