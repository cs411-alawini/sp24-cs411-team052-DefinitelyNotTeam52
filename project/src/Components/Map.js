import React, {forwardRef} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Map.css'; 

const center = {
  lat: 39.0997,
  lng: -94.5786
};


const MapComponent = forwardRef((props, ref) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBhzfmXlyyjH3UMGM3JvpwFlJHFZZ6j9Ng" // 替换为你的Google Maps API密钥
    >
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={5}
        >
        { /* 子组件如标记可以放在这里 */ }
        
      </GoogleMap>
      </div>
    </LoadScript>
  );
});

export default MapComponent;
