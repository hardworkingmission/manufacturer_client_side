import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MyGoogleMap = () => {
  return (
    <MapContainer style={{height:'300px', width:'100%'}} center={[34.307144, -106.018066]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[34.307144, -106.018066]}>
          <Popup>
          350 Glover Greens Suite 677 <br />New Maxico
          </Popup>
        </Marker>
    </MapContainer>
  );
};

export default MyGoogleMap;