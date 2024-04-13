import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
  lat: 39.0997,
  lng: -94.5786
};

const MapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBhzfmXlyyjH3UMGM3JvpwFlJHFZZ6j9Ng" // 替换为你的Google Maps API密钥
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* 子组件如标记可以放在这里 */ }
        <Marker
          position={center}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
