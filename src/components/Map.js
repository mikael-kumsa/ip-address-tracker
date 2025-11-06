import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ location }) => {
  // Default coordinates (New York) in case no location data
  const defaultPosition = [40.7128, -74.0060];
  
  const position = location && location.lat && location.lon 
    ? [location.lat, location.lon] 
    : defaultPosition;

  return (
    <div className="map-container">
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <strong>IP Location</strong><br />
            {location ? `${location.city}, ${location.country}` : 'Unknown location'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;